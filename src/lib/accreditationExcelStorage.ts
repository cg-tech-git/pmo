import { Storage } from '@google-cloud/storage';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

// Try to use Storage SDK with ADC, fallback to gsutil commands
const storage = process.env.GCP_KEY_FILE 
  ? new Storage({
      projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE,
    })
  : new Storage(); // Use Application Default Credentials

const bucketName = 'pmo-documents-hybrid-shine-466111-s0';
const folderName = 'manpower - accreditation'; // Note: folder has spaces
const fileName = 'manpower-accreditation.xlsx';

// In-memory cache for submissions
let submissionsCache: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

export interface AccreditationSubmission {
  // Personal Information
  employeeId: string;
  dateOfBirth: string;
  dateOfJoining: string;
  language: string;
  jobTitle: string;
  department: string;
  contactNo: string;
  residenceLocation: string;
  salary: string;
  nationality: string;
  gender: string;
  photo?: string; // File attachment
  
  // MOL Information
  molNumber: string;
  molStartDate: string;
  molExpiryDate: string;
  
  // Emirates ID Information
  emiratesUidNo: string;
  emiratesIdNo: string;
  emiratesIdIssueDate: string;
  emiratesIdExpiryDate: string;
  emiratesIdCopy?: string; // File attachment
  
  // Passport Information
  passportIssueCountry: string;
  passportNo: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportHoldingConfirmation: string;
  
  // Visa Information
  visaIssuePlace: string;
  visaStartDate: string;
  visaExpireDate: string;
  visaCopy?: string; // File attachment
  
  // Certificate Information
  employeeThirdPartyCertificateType: string;
  certificateNo: string;
  certificateStartDate: string;
  certificateExpiryDate: string;
  msra?: string; // File attachment
  undertakingLetter?: string; // File attachment
  
  // Insurance Information
  groupsInsuranceType: string;
  groupsInsuranceStartDate: string;
  groupsInsuranceExpiryDate: string;
  wcInsurance: string;
  groupInsuranceCopy?: string; // File attachment
  
  // Metadata
  submissionDate: string;
  submissionTime: string;
}

// Field mapping from app to Excel columns
const fieldMapping: { [key: string]: string } = {
  employeeId: 'Employee ID',
  dateOfBirth: 'Date of Birth',
  dateOfJoining: 'Date of Joining',
  language: 'Language',
  jobTitle: 'Job Title',
  department: 'Department',
  contactNo: 'Contact No.',
  residenceLocation: 'Residence Location',
  salary: 'Salary',
  nationality: 'Nationality',
  gender: 'Gender',
  photo: 'Photo',
  molNumber: 'MOL Number',
  molStartDate: 'MOL Start Date',
  molExpiryDate: 'MOL Expiry Date',
  emiratesUidNo: 'Emirates UID No.',
  emiratesIdNo: 'Emirates ID No.',
  emiratesIdIssueDate: 'Emirates ID Issue Date',
  emiratesIdExpiryDate: 'Emirates ID Expiry Date',
  emiratesIdCopy: 'Emirates ID Copy',
  passportIssueCountry: 'Passport Issue Country',
  passportNo: 'Passport No.',
  passportIssueDate: 'Passport Issue Date',
  passportExpiryDate: 'Passport Expiry Date',
  passportHoldingConfirmation: 'Passport Holding Confirmation',
  visaIssuePlace: 'Visa Issue Place',
  visaStartDate: 'Visa Start Date',
  visaExpireDate: 'Visa Expiry Date',
  visaCopy: 'Visa Copy',
  employeeThirdPartyCertificateType: 'Employee Third Party Certificate Type',
  certificateNo: 'Certificate No.',
  certificateStartDate: 'Certificate Start Date',
  certificateExpiryDate: 'Certificate Expiry Date',
  msra: 'MSRA',
  undertakingLetter: 'Undertaking Letter',
  groupsInsuranceType: 'Group Insurance Type',
  groupsInsuranceStartDate: 'Group Insurance Start Date',
  groupsInsuranceExpiryDate: 'Group Insurance Expiry Date',
  wcInsurance: 'WC Insurance',
  groupInsuranceCopy: 'Group Insurance Copy'
};

export async function downloadExcelFromGCS(): Promise<Buffer> {
  // Use gsutil command as a fallback for authentication issues
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const fs = require('fs').promises;
  const path = require('path');
  const os = require('os');
  
  const execAsync = promisify(exec);
  const tempFile = path.join(os.tmpdir(), `accreditation-${Date.now()}.xlsx`);
  const gcsPath = `gs://${bucketName}/${folderName}/${fileName}`;
  
  try {
    console.log('Downloading from GCS using gsutil:', gcsPath);
    await execAsync(`gsutil cp "${gcsPath}" "${tempFile}"`);
    
    const buffer = await fs.readFile(tempFile);
    console.log('Downloaded buffer size:', buffer.length);
    
    // Clean up temp file
    await fs.unlink(tempFile);
    
    return buffer;
  } catch (error) {
    console.error('Error downloading with gsutil:', error);
    // Fallback to SDK method
    const bucket = storage.bucket(bucketName);
    const filePath = `${folderName}/${fileName}`;
    console.log('Falling back to SDK download:', `gs://${bucketName}/${filePath}`);
    const file = bucket.file(filePath);
    
    const [buffer] = await file.download();
    console.log('Downloaded buffer size:', buffer.length);
    return buffer;
  }
}

export async function uploadExcelToGCS(buffer: Buffer): Promise<void> {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`${folderName}/${fileName}`);
  
  await file.save(buffer, {
    metadata: {
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
  
  // Invalidate cache after upload
  submissionsCache = null;
}

export async function getAccreditationSubmissions(): Promise<AccreditationSubmission[]> {
  // Check cache first
  const now = Date.now();
  if (submissionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Returning cached accreditation submissions');
    return submissionsCache;
  }

  try {
    const buffer = await downloadExcelFromGCS();
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
    const sheetName = workbook.SheetNames[0];
    console.log('getAccreditationSubmissions - Reading sheet:', sheetName);
    const worksheet = workbook.Sheets[sheetName];
    
    // Get headers
    const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
    console.log('Headers found:', headers?.slice(0, 5));
    
    // Get all rows (excluding header)
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1) as any[][];
    console.log('Total rows found:', rows.length);
    if (rows.length > 0) {
      console.log('First row data:', rows[0]?.slice(0, 5));
    }
    
    // Convert rows to AccreditationSubmission objects
    const submissions: AccreditationSubmission[] = rows
      .filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''))
      .map(row => {
        const submission: any = {
          submissionDate: '',
          submissionTime: ''
        };
        
        // Map Excel columns to submission fields
        Object.entries(fieldMapping).forEach(([field, excelColumn]) => {
          const columnIndex = headers.indexOf(excelColumn);
          if (columnIndex !== -1) {
            const value = row[columnIndex];
            // Handle date fields
            if (field.includes('Date') && value instanceof Date) {
              submission[field] = format(value, 'yyyy-MM-dd');
            } else {
              submission[field] = value?.toString() || '';
            }
          }
        });
        
        return submission as AccreditationSubmission;
      });
    
    // Update cache
    submissionsCache = submissions;
    cacheTimestamp = now;
    
    return submissions;
  } catch (error) {
    console.error('Error getting accreditation submissions:', error);
    return [];
  }
}

export async function saveAccreditationSubmission(submission: Partial<AccreditationSubmission>): Promise<void> {
  try {
    // Download current Excel file
    const buffer = await downloadExcelFromGCS();
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Get headers
    const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
    
    // Get all existing rows
    const existingRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1) as any[][];
    
    // Create new row based on headers
    const newRow = headers.map(header => {
      // Find the field that maps to this header
      const field = Object.entries(fieldMapping).find(([_, excelCol]) => excelCol === header)?.[0];
      if (field && submission[field as keyof AccreditationSubmission] !== undefined) {
        const value = submission[field as keyof AccreditationSubmission];
        // Handle date fields
        if (field.includes('Date') && value) {
          return value; // Keep as string format yyyy-MM-dd
        }
        return value || '';
      }
      return '';
    });
    
    // Add submission metadata
    const now = new Date();
    newRow.push(format(now, 'yyyy-MM-dd')); // submission date
    newRow.push(format(now, 'HH:mm:ss')); // submission time
    
    // Create new worksheet with headers and all rows
    const allRows = [headers, ...existingRows, newRow];
    const newWorksheet = XLSX.utils.aoa_to_sheet(allRows);
    
    // Create new workbook
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    
    // Convert to buffer
    const newBuffer = XLSX.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Upload back to GCS
    await uploadExcelToGCS(Buffer.from(newBuffer));
    
    console.log('Accreditation submission saved successfully');
  } catch (error) {
    console.error('Error saving accreditation submission:', error);
    throw error;
  }
}

// Upload file attachments to GCS
export async function uploadAccreditationAttachment(
  file: File,
  employeeId: string,
  attachmentType: string
): Promise<string> {
  try {
    const bucket = storage.bucket(bucketName);
    const timestamp = Date.now();
    
    // Standardize folder naming: for employee ID "0001", create folder "0001"
    // This matches what's stored in the Excel file
    const folderPath = `${folderName}/attachments/${employeeId}`;
    const fileName = `${folderPath}/${attachmentType}_${timestamp}_${file.name}`;
    const gcsFile = bucket.file(fileName);
    
    console.log(`Uploading attachment to: ${fileName}`);
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await gcsFile.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });
    
    // Return the GCS path
    return `gs://${bucketName}/${fileName}`;
  } catch (error) {
    console.error('Error uploading attachment:', error);
    throw error;
  }
} 