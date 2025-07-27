import { NextRequest, NextResponse } from 'next/server';
import { getAccreditationSubmissions } from '@/lib/accreditationExcelStorage';
import { createGoogleSheet } from '@/lib/googleSheetsService';
import { addReportToHistory } from '@/lib/reportHistoryStorage';
import { auth } from '@/lib/firebase';
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');

// GCS configuration
const bucketName = 'pmo-documents-hybrid-shine-466111-s0';
const folderName = 'manpower - accreditation';

export async function POST(request: NextRequest) {
  try {
    const { employeeIds, selectedFields, format: requestFormat, accessToken } = await request.json();
    let format = requestFormat; // Make format mutable for fallback
    console.log('Report generation request:', { employeeIds, selectedFields, format, hasToken: !!accessToken });
    
    if (!selectedFields || selectedFields.length === 0) {
      return NextResponse.json(
        { error: 'No fields selected' },
        { status: 400 }
      );
    }

    // Fetch all accreditation submissions
    let allSubmissions;
    try {
      allSubmissions = await getAccreditationSubmissions();
      console.log('Fetched submissions:', allSubmissions.length);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw new Error('Failed to fetch accreditation data');
    }
    
    // Filter submissions based on selected employee IDs
    let filteredSubmissions = allSubmissions;
    if (employeeIds && employeeIds.length > 0 && employeeIds.some((id: string) => id !== '')) {
      console.log('Employee IDs to filter:', employeeIds);
      console.log('Sample employee IDs from data:', allSubmissions.slice(0, 5).map(s => s.employeeId));
      
      // Handle various employee ID formats (with or without EMP prefix)
      filteredSubmissions = allSubmissions.filter(sub => {
        const empId = sub.employeeId.toLowerCase();
        return employeeIds.some((id: string) => {
          const searchId = id.toLowerCase();
          // Match exact ID or with EMP prefix
          return empId === searchId || 
                 empId === `emp${searchId}` || 
                 empId === `emp-${searchId}` ||
                 empId.replace(/^emp/i, '') === searchId;
        });
      });
    } else {
      console.log('No employee IDs specified, including all employees');
    }
    
          console.log('Filtered submissions:', filteredSubmissions.length);
          
          // Check if we have any data
          if (filteredSubmissions.length === 0) {
            console.log('WARNING: No submissions match the criteria');
            if (employeeIds && employeeIds.length > 0) {
              console.log('Requested employee IDs:', employeeIds);
              console.log('Available employee IDs:', allSubmissions.slice(0, 10).map(s => s.employeeId));
            }
          }
    
      // Try Google Sheets first if token is available
      if (format === 'google-sheets' && accessToken) {
        // Create native Google Sheets
        console.log('Creating Google Sheet with access token');
        try {
          const title = `Accreditation Report - ${new Date().toISOString().split('T')[0]}`;
          
          // Prepare headers and rows
          const headers = ['Employee ID'];
          const fieldLabels: { [key: string]: string } = {
            dateOfBirth: 'Date of Birth',
            dateOfJoining: 'Date of Joining',
            language: 'Language',
            jobTitle: 'Job Title',
            department: 'Department',
            contactNo: 'Contact Number',
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

          // Add selected field headers
          selectedFields.forEach((field: string) => {
            headers.push(fieldLabels[field] || field);
          });

          // Create rows of data
          const rows = filteredSubmissions.map(submission => {
            const row = [submission.employeeId];
            selectedFields.forEach((field: string) => {
              const value = (submission as any)[field];
              // For attachment fields, just show the filename or "Attached" if URL exists
              if (value && value.startsWith('gs://')) {
                const filename = value.split('/').pop() || 'Attached';
                row.push(filename);
              } else {
                row.push(value || '');
              }
            });
            return row;
          });

          // Create Google Sheet
          console.log('Calling createGoogleSheet with', headers.length, 'headers and', rows.length, 'rows');
          const result = await createGoogleSheet(accessToken, title, headers, rows);
          console.log('Google Sheet created:', result);
          
          return NextResponse.json({
            success: true,
            url: result.url,
            spreadsheetId: result.spreadsheetId
          });
        } catch (error: any) {
          console.error('Error creating Google Sheet:', error);
          console.error('Error details:', error.message, error.stack);
          
          // Check for specific Google API errors
          if (error.code === 401) {
            throw new Error('Authentication failed. Please sign out and sign in again.');
          } else if (error.code === 403) {
            throw new Error('Permission denied. Please grant Google Sheets permissions.');
          }
          
          // Fall back to Excel download on Google Sheets error
          console.log('Google Sheets failed, falling back to Excel download');
          format = 'excel'; // Change format to trigger Excel generation below
        }
      }
      
      // Excel download (fallback or when no Google token)
      if (format === 'sheets' || format === 'excel' || (format === 'google-sheets' && !accessToken)) {
      // Create data for Google Sheets
      const headers = ['Employee ID'];
      const fieldLabels: { [key: string]: string } = {
        dateOfBirth: 'Date of Birth',
        dateOfJoining: 'Date of Joining',
        language: 'Language',
        jobTitle: 'Job Title',
        department: 'Department',
        contactNo: 'Contact Number',
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

      // Add selected field headers (exclude employeeId as it's already the first column)
      selectedFields.forEach((field: string) => {
        if (field !== 'employeeId') {
          headers.push(fieldLabels[field] || field);
        }
      });

      // Create rows of data
      const rows = filteredSubmissions.map(submission => {
        const row = [submission.employeeId];
        selectedFields.forEach((field: string) => {
          if (field !== 'employeeId') {
            const value = (submission as any)[field];
            // For attachment fields, just show the filename or "Attached" if URL exists
            if (value && value.startsWith('gs://')) {
              const filename = value.split('/').pop() || 'Attached';
              row.push(filename);
            } else {
              row.push(value || '');
            }
          }
        });
        return row;
      });

      // Create workbook using ExcelJS for better hyperlink support
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Accreditation Report');
      
      // Add headers
      worksheet.addRow(headers);
      
      // Style the header row
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };
      
      // Add data rows
      rows.forEach(row => {
        worksheet.addRow(row);
      });
      
      // Define column types for formatting
      const dateFields = [
        'Date of Birth', 'Date of Joining', 'MOL Start Date', 'MOL Expiry Date',
        'Emirates ID Issue Date', 'Emirates ID Expiry Date', 'Passport Issue Date',
        'Passport Expiry Date', 'Visa Start Date', 'Visa Expiry Date',
        'Certificate Start Date', 'Certificate Expiry Date',
        'Group Insurance Start Date', 'Group Insurance Expiry Date'
      ];
      
      const numberFields = ['Salary'];
      
      const idNumberFields = [
        'MOL Number', 'Emirates UID No.', 'Emirates ID No.', 
        'Passport No.', 'Certificate No.', 'Contact Number'
      ];
      
      // Apply column formatting
      headers.forEach((header, colIndex) => {
        const column = worksheet.getColumn(colIndex + 1);
        
        // Apply date formatting
        if (dateFields.includes(header)) {
          column.eachCell({ includeEmpty: false }, (cell: any, rowNumber: number) => {
            if (rowNumber > 1 && cell.value) { // Skip header row
              // Keep date as text but apply consistent format
              cell.alignment = { horizontal: 'center' };
            }
          });
        }
        
        // Apply number formatting for salary
        else if (numberFields.includes(header)) {
          column.eachCell({ includeEmpty: false }, (cell: any, rowNumber: number) => {
            if (rowNumber > 1 && cell.value) { // Skip header row
              // Try to parse as number
              const numValue = parseFloat(cell.value.toString().replace(/[^0-9.-]/g, ''));
              if (!isNaN(numValue)) {
                cell.value = numValue;
                cell.numFmt = '#,##0'; // Number format with thousand separators
              }
              cell.alignment = { horizontal: 'right' };
            }
          });
        }
        
        // Apply text formatting for ID numbers (keep as text to preserve leading zeros)
        else if (idNumberFields.includes(header)) {
          column.eachCell({ includeEmpty: false }, (cell: any, rowNumber: number) => {
            if (rowNumber > 1) { // Skip header row
              cell.alignment = { horizontal: 'center' };
              // Ensure it's treated as text
              if (cell.value) {
                cell.value = cell.value.toString();
              }
            }
          });
        }
        
        // Employee ID column (first column) - format as number
        else if (colIndex === 0) {
          column.eachCell({ includeEmpty: false }, (cell: any, rowNumber: number) => {
            if (rowNumber > 1) { // Skip header row
              // Convert to number (remove any leading zeros)
              const numValue = parseInt(cell.value.toString(), 10);
              if (!isNaN(numValue)) {
                cell.value = numValue;
                cell.numFmt = '0000'; // Format with 4 digits (adds leading zeros back)
              }
              cell.alignment = { horizontal: 'center' };
            }
          });
        }
      });
      
      // Define attachment fields
      const attachmentFields = [
        'Photo', 'Emirates ID Copy', 'Passport Holding Confirmation',
        'Visa Copy', 'MSRA', 'Undertaking Letter', 'Group Insurance Copy',
        'WC Insurance'
      ];
      
      // Process cells to add hyperlinks for attachments
      worksheet.eachRow((row: any, rowNumber: number) => {
        if (rowNumber === 1) return; // Skip header row
        
        row.eachCell((cell: any, colNumber: number) => {
          const header = headers[colNumber - 1];
          if (attachmentFields.includes(header)) {
            const cellValue = cell.value;
            if (cellValue && typeof cellValue === 'string' && 
                (cellValue.endsWith('.pdf') || cellValue.endsWith('.jpg') || cellValue.endsWith('.png'))) {
              
              // Get the employee ID from the row (first column)
              const employeeId = row.getCell(1).value;
              
              // Build the attachment URL
              const attachmentUrl = `/api/accreditation-attachment?file=${encodeURIComponent(cellValue)}&empId=${employeeId}`;
              const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
              const fullUrl = `${baseUrl}${attachmentUrl}`;
              
              // Set hyperlink with proper styling
              cell.value = {
                text: cellValue,
                hyperlink: fullUrl,
                tooltip: 'Click to download attachment'
              };
              
              // Apply hyperlink styling (blue and underlined)
              cell.font = {
                color: { argb: 'FF0563C1' }, // Excel hyperlink blue
                underline: true
              };
              cell.alignment = { horizontal: 'left' };
            }
          }
        });
      });
      
      // Apply general formatting for other text columns
      const processedColumns = new Set([
        ...dateFields, ...numberFields, ...idNumberFields, 
        ...attachmentFields, 'Employee ID'
      ]);
      
      headers.forEach((header, colIndex) => {
        if (!processedColumns.has(header)) {
          const column = worksheet.getColumn(colIndex + 1);
          column.eachCell({ includeEmpty: false }, (cell: any, rowNumber: number) => {
            if (rowNumber > 1) { // Skip header row
              cell.alignment = { horizontal: 'left', vertical: 'middle' };
            }
          });
        }
      });
      
      // Auto-fit columns
      worksheet.columns.forEach((column: any, index: number) => {
        let maxLength = headers[index].length;
        worksheet.getColumn(index + 1).eachCell({ includeEmpty: false }, (cell: any) => {
          const cellLength = cell.value ? cell.value.toString().length : 0;
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        });
        column.width = Math.min(maxLength + 2, 50);
      });
      
      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer();
      
      // Get user ID from request headers (you might get this differently based on your auth setup)
      const userId = request.headers.get('x-user-id') || 'anonymous';
      
      // Save report metadata to history
      const fileName = `accreditation-report-${new Date().toISOString().split('T')[0]}.xlsx`;
      try {
        await addReportToHistory({
          userId,
          fileName,
          employeeCount: filteredSubmissions.length,
          fieldCount: selectedFields.length,
          fileSize: buffer.length
        });
        console.log('Report saved to history');
      } catch (error) {
        console.error('Failed to save report to history:', error);
        // Don't fail the request if history saving fails
      }
      
      // Return Excel file
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${fileName}"`
        }
      });
    }

    // TODO: Implement PDF format
    return NextResponse.json(
      { error: 'PDF format not yet implemented' },
      { status: 501 }
    );

      } catch (error) {
      console.error('Error generating report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      console.error('Full error details:', { message: errorMessage, stack: errorStack });
      
      return NextResponse.json(
        { error: 'Failed to generate report', details: errorMessage },
        { status: 500 }
      );
    }
} 

// Add this GET endpoint for debugging
export async function GET() {
  try {
    const allSubmissions = await getAccreditationSubmissions();
    const employeeIds = allSubmissions.slice(0, 10).map(sub => sub.employeeId);
    
    return NextResponse.json({
      totalCount: allSubmissions.length,
      sampleEmployeeIds: employeeIds
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employee IDs' }, { status: 500 });
  }
} 