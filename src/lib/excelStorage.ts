import * as XLSX from 'xlsx';

// Excel file configuration
const BUCKET_NAME = 'pmo-documents-hybrid-shine-466111-s0';
const EXCEL_FILE_PATH = 'manpower-allocation/manpower-allocation.xlsx';
const GCS_URL = `gs://${BUCKET_NAME}/${EXCEL_FILE_PATH}`;

// Define the Excel row structure
interface ExcelRow {
  'Date ': string;
  'Time': string;
  'Job Number': string;
  'Country': string;
  'Division': string;
  'Camp': string;
  'Customer': string;
  'Customer Contact': string;
  'Project Name': string;
  'Project Manager': string;
  'Project Manager Contact': string;
  'Project Manager Email': string;
  'Employee ID': string;
  'Employee Name': string;
  'Employee Grade': string;
  'Supplier': string;
  'Supplier Contact': string;
  'Manpower Total': string;
}

// Define the app form structure (from existing types)
interface Employee {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeGrade: string;
}

interface CrossHiredManpower {
  id: string;
  supplierName: string;
  contactNumber: string;
  manpowerTotal: string;
}

interface ManpowerAllocationForm {
  date: string;
  time: string;
  jobNumber: string;
  country: string;
  division: string;
  camp: string;
  customer: string;
  customerContact: string;
  projectName: string;
  projectManager: string;
  projectManagerContact: string;
  projectManagerEmail: string;
  employees: Employee[];
  crossHiredManpower: CrossHiredManpower[];
}

export interface ManpowerSubmission {
  id: string;
  date: string;
  submissionDate: string;
  data: ManpowerAllocationForm;
  pdfUrl: string;
}

// Utility function to download Excel file from GCS
async function downloadExcelFile(): Promise<XLSX.WorkBook> {
  try {
    console.log('Attempting to download Excel file from GCS...');
    
    // Execute gsutil command to get file content as base64
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      // Try gcloud storage first
      const { stdout, stderr } = await execAsync(`gcloud storage cat "${GCS_URL}" | base64`);
      if (stderr) console.log('gcloud download stderr:', stderr);
      
      // Convert base64 to buffer and read as workbook
      const buffer = Buffer.from(stdout.trim(), 'base64');
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      
      console.log('Successfully downloaded and parsed Excel file');
      return workbook;
    } catch (gcloudError: any) {
      console.warn('gcloud download failed, trying gsutil:', gcloudError.message);
      
      // Fallback to gsutil
      try {
        const { stdout, stderr } = await execAsync(`gsutil -q cat "${GCS_URL}" | base64`);
        const buffer = Buffer.from(stdout.trim(), 'base64');
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        console.log('Successfully downloaded with gsutil fallback');
        return workbook;
      } catch (downloadError: any) {
        console.warn('Could not download existing file, creating new one:', downloadError.message);
        console.error('Download error details:', downloadError.stderr || downloadError.message);
        return createNewWorkbook();
      }
    }
  } catch (error) {
    console.error('Error in downloadExcelFile:', error);
    return createNewWorkbook();
  }
}

// Utility function to upload Excel file to GCS
async function uploadExcelFile(workbook: XLSX.WorkBook): Promise<void> {
  try {
    console.log('Uploading Excel file to GCS...');
    
    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Convert buffer to base64
    const base64Data = buffer.toString('base64');
    
    // Upload using gsutil with base64 input
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    // Use gcloud storage instead of gsutil for better authentication
    try {
      // First authenticate with metadata service
      console.log('Authenticating with metadata service...');
      await execAsync('gcloud auth application-default print-access-token > /dev/null 2>&1 || true');
      
      // Use gcloud storage cp instead of gsutil
      console.log(`Uploading to ${GCS_URL}...`);
      const { stdout, stderr } = await execAsync(`echo "${base64Data}" | base64 -d | gcloud storage cp - "${GCS_URL}"`);
      if (stdout) console.log('gcloud upload stdout:', stdout);
      if (stderr) console.log('gcloud upload stderr:', stderr);
      console.log('Successfully uploaded Excel file to GCS');
    } catch (uploadError: any) {
      console.error('gcloud command failed:', uploadError.message);
      console.error('gcloud stderr:', uploadError.stderr);
      console.error('gcloud stdout:', uploadError.stdout);
      console.error('gcloud exit code:', uploadError.code);
      
      // Fallback to gsutil without authentication check
      console.log('Falling back to gsutil...');
      try {
        const { stdout, stderr } = await execAsync(`echo "${base64Data}" | base64 -d | gsutil -q cp - "${GCS_URL}"`);
        console.log('Successfully uploaded with gsutil fallback');
      } catch (gsutilError: any) {
        console.error('gsutil fallback also failed:', gsutilError.message);
        throw uploadError; // Throw original error
      }
    }
  } catch (error: any) {
    console.error('Error uploading Excel file:', error);
    throw new Error(`Failed to upload Excel file: ${error.message}`);
  }
}

// Create a new workbook with headers
function createNewWorkbook(): XLSX.WorkBook {
  const headers: (keyof ExcelRow)[] = [
    'Date ', 'Time', 'Job Number', 'Country', 'Division', 'Camp',
    'Customer', 'Customer Contact', 'Project Name', 'Project Manager',
    'Project Manager Contact', 'Project Manager Email', 'Employee ID',
    'Employee Name', 'Employee Grade', 'Supplier', 'Supplier Contact',
    'Manpower Total'
  ];
  
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  return workbook;
}

// Convert form data to Excel rows
function formDataToExcelRows(formData: ManpowerAllocationForm): ExcelRow[] {
  const rows: ExcelRow[] = [];
  
  // Get the maximum number of entries (employees vs cross-hired manpower)
  const maxEmployees = formData.employees.length;
  const maxSuppliers = formData.crossHiredManpower.length;
  const maxEntries = Math.max(maxEmployees, maxSuppliers, 1); // At least one row
  
  for (let i = 0; i < maxEntries; i++) {
    const employee = formData.employees[i] || { employeeId: '', employeeName: '', employeeGrade: '' };
    const supplier = formData.crossHiredManpower[i] || { supplierName: '', contactNumber: '', manpowerTotal: '' };
    
    const row: ExcelRow = {
      'Date ': formData.date,
      'Time': formData.time,
      'Job Number': formData.jobNumber,
      'Country': formData.country,
      'Division': formData.division,
      'Camp': formData.camp,
      'Customer': formData.customer,
      'Customer Contact': formData.customerContact,
      'Project Name': formData.projectName,
      'Project Manager': formData.projectManager,
      'Project Manager Contact': formData.projectManagerContact,
      'Project Manager Email': formData.projectManagerEmail,
      'Employee ID': employee.employeeId,
      'Employee Name': employee.employeeName,
      'Employee Grade': employee.employeeGrade,
      'Supplier': supplier.supplierName,
      'Supplier Contact': supplier.contactNumber,
      'Manpower Total': supplier.manpowerTotal
    };
    
    rows.push(row);
  }
  
  return rows;
}

// Convert Excel rows back to form data
function excelRowsToFormData(rows: ExcelRow[], submissionId: string): ManpowerSubmission[] {
  // Group rows by submission (same project info)
  const groupedRows = new Map<string, ExcelRow[]>();
  
  rows.forEach(row => {
    const key = `${row['Date ']}-${row['Time']}-${row['Job Number']}-${row['Project Name']}`;
    if (!groupedRows.has(key)) {
      groupedRows.set(key, []);
    }
    groupedRows.get(key)!.push(row);
  });
  
  const submissions: ManpowerSubmission[] = [];
  
  groupedRows.forEach((groupRows, key) => {
    const firstRow = groupRows[0];
    
    // Extract employees
    const employees: Employee[] = groupRows
      .filter(row => row['Employee ID'] || row['Employee Name'])
      .map((row, index) => ({
        id: `${index + 1}`,
        employeeId: row['Employee ID'] || '',
        employeeName: row['Employee Name'] || '',
        employeeGrade: row['Employee Grade'] || ''
      }));
    
    // Extract cross-hired manpower
    const crossHiredManpower: CrossHiredManpower[] = groupRows
      .filter(row => row['Supplier'] || row['Supplier Contact'])
      .map((row, index) => ({
        id: `${index + 1}`,
        supplierName: row['Supplier'] || '',
        contactNumber: row['Supplier Contact'] || '',
        manpowerTotal: row['Manpower Total'] || ''
      }));
    
    const formData: ManpowerAllocationForm = {
      date: firstRow['Date '] || '',
      time: firstRow['Time'] || '',
      jobNumber: firstRow['Job Number'] || '',
      country: firstRow['Country'] || '',
      division: firstRow['Division'] || '',
      camp: firstRow['Camp'] || '',
      customer: firstRow['Customer'] || '',
      customerContact: firstRow['Customer Contact'] || '',
      projectName: firstRow['Project Name'] || '',
      projectManager: firstRow['Project Manager'] || '',
      projectManagerContact: firstRow['Project Manager Contact'] || '',
      projectManagerEmail: firstRow['Project Manager Email'] || '',
      employees: employees.length > 0 ? employees : [{ id: '1', employeeId: '', employeeName: '', employeeGrade: '' }],
      crossHiredManpower: crossHiredManpower.length > 0 ? crossHiredManpower : [{ id: '1', supplierName: '', contactNumber: '', manpowerTotal: '' }]
    };
    
    submissions.push({
      id: `submission-${Date.now()}-${Math.random()}`,
      date: formData.date,
      submissionDate: new Date().toISOString(),
      data: formData,
      pdfUrl: '#' // PDF URL would be generated separately
    });
  });
  
  return submissions;
}

// Save a new submission to Excel
export async function saveSubmissionToExcel(submission: ManpowerSubmission): Promise<void> {
  try {
    console.log('Starting to save submission to Excel...');
    
    // Download current Excel file (or create new one if doesn't exist)
    const workbook = await downloadExcelFile();
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    console.log('Downloaded/created workbook successfully');
    
    // Convert current data to array
    let currentData: any[][] = [];
    try {
      currentData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      console.log('Current data rows:', currentData.length);
    } catch (error) {
      console.warn('Error reading existing data, starting with headers only:', error);
      // Start with just headers if can't read existing data
      currentData = [[
        'Date ', 'Time', 'Job Number', 'Country', 'Division', 'Camp',
        'Customer', 'Customer Contact', 'Project Name', 'Project Manager',
        'Project Manager Contact', 'Project Manager Email', 'Employee ID',
        'Employee Name', 'Employee Grade', 'Supplier', 'Supplier Contact',
        'Manpower Total'
      ]];
    }
    
    // Convert form data to Excel rows
    const newRows = formDataToExcelRows(submission.data);
    console.log('Generated new rows:', newRows.length);
    
    // Convert new rows to array format
    const newRowsArray = newRows.map(row => [
      row['Date '], row['Time'], row['Job Number'], row['Country'],
      row['Division'], row['Camp'], row['Customer'], row['Customer Contact'],
      row['Project Name'], row['Project Manager'], row['Project Manager Contact'],
      row['Project Manager Email'], row['Employee ID'], row['Employee Name'],
      row['Employee Grade'], row['Supplier'], row['Supplier Contact'],
      row['Manpower Total']
    ]);
    
    // Append new rows to existing data
    const updatedData = [...currentData, ...newRowsArray];
    console.log('Total rows after append:', updatedData.length);
    
    // Create new worksheet
    const newWorksheet = XLSX.utils.aoa_to_sheet(updatedData);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
    
    console.log('Created new worksheet, starting upload...');
    
    // Upload updated Excel file
    await uploadExcelFile(workbook);
    
    // Clear cache so fresh data is fetched next time
    submissionsCache = null;
    
    console.log('Submission saved to Excel successfully');
  } catch (error) {
    console.error('Error saving submission to Excel:', error);
    throw error;
  }
}

// Simple cache for submissions data
let submissionsCache: {
  data: ManpowerSubmission[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 30000; // 30 seconds cache

// Get all submissions from Excel
export async function getSubmissionsFromExcel(): Promise<ManpowerSubmission[]> {
  try {
    // Check cache first
    if (submissionsCache && (Date.now() - submissionsCache.timestamp) < CACHE_DURATION) {
      console.log('Returning cached submissions data');
      return submissionsCache.data;
    }
    
    console.log('Downloading fresh data from Excel...');
    // Download Excel file
    const workbook = await downloadExcelFile();
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Check if worksheet has data beyond headers
    const range = worksheet['!ref'];
    if (!range) {
      console.log('No data in Excel sheet');
      return [];
    }
    
    // Convert to JSON, skip header row
    const allData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    
    // Remove header row and filter out empty rows
    const dataRows = allData.slice(1).filter(row => 
      row && row.length > 0 && row.some(cell => cell && cell.toString().trim() !== '')
    );
    
    if (dataRows.length === 0) {
      console.log('No data rows found in Excel');
      return [];
    }
    
    // Convert array data to ExcelRow objects
    const headers = allData[0] as string[];
    const rows: ExcelRow[] = dataRows.map(rowData => {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = rowData[index] || '';
      });
      return row as ExcelRow;
    });
    
    console.log('Converted Excel rows:', rows.length);
    
    // Convert to submissions
    const submissions = excelRowsToFormData(rows, 'excel-data');
    
    // Cache the results
    submissionsCache = {
      data: submissions,
      timestamp: Date.now()
    };
    
    console.log('Generated submissions:', submissions.length);
    return submissions;
  } catch (error) {
    console.error('Error getting submissions from Excel:', error);
    return [];
  }
}

// Get submissions by date
export async function getSubmissionsByDateFromExcel(date: string): Promise<ManpowerSubmission[]> {
  try {
    const allSubmissions = await getSubmissionsFromExcel();
    return allSubmissions.filter(submission => submission.date === date);
  } catch (error) {
    console.error('Error getting submissions by date from Excel:', error);
    return [];
  }
} 