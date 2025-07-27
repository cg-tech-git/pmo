import { Storage } from '@google-cloud/storage';
import { AccreditationSubmission } from './accreditationExcelStorage';

const storage = new Storage({
  projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE,
});

const bucketName = 'pmo-documents-hybrid-shine-466111-s0';

// Download file from GCS and convert to base64
export async function downloadAttachmentAsBase64(gcsPath: string): Promise<string | null> {
  try {
    if (!gcsPath || !gcsPath.startsWith('gs://')) {
      return null;
    }

    // Extract bucket and file path from gs:// URL
    const pathParts = gcsPath.replace('gs://', '').split('/');
    const bucket = storage.bucket(pathParts[0]);
    const filePath = pathParts.slice(1).join('/');
    const file = bucket.file(filePath);

    // Download file
    const [buffer] = await file.download();
    
    // Get file metadata for content type
    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType || 'application/octet-stream';

    // Convert to base64 data URI
    const base64 = buffer.toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error downloading attachment:', error);
    return null;
  }
}

// Generate HTML for attachment based on type
export function generateAttachmentHTML(
  fieldName: string,
  dataUri: string | null,
  originalPath: string
): string {
  if (!dataUri) {
    return `<p class="attachment-error">Attachment not available: ${fieldName}</p>`;
  }

  const isImage = dataUri.startsWith('data:image/');
  const isPDF = dataUri.startsWith('data:application/pdf');

  if (isImage) {
    return `
      <div class="attachment-container">
        <h4>${fieldName}</h4>
        <img src="${dataUri}" alt="${fieldName}" class="attachment-image" />
      </div>
    `;
  } else if (isPDF) {
    // For PDFs in reports, we'll show a preview icon and note
    return `
      <div class="attachment-container">
        <h4>${fieldName}</h4>
        <div class="pdf-attachment">
          <svg class="pdf-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#E57373"/>
            <path d="M14 2V8H20" fill="#FFCDD2"/>
            <text x="12" y="16" text-anchor="middle" fill="white" font-size="6" font-weight="bold">PDF</text>
          </svg>
          <p class="pdf-note">PDF Document Attached</p>
          <p class="pdf-filename">${originalPath.split('/').pop()}</p>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="attachment-container">
        <h4>${fieldName}</h4>
        <p class="attachment-note">Document attached: ${originalPath.split('/').pop()}</p>
      </div>
    `;
  }
}

// Generate accreditation report HTML template
export async function generateAccreditationReportHTML(
  submissions: AccreditationSubmission[],
  selectedFields: string[]
): Promise<string> {
  const attachmentFields = [
    'photo', 'emiratesIdCopy', 'visaCopy', 'msra', 
    'undertakingLetter', 'groupInsuranceCopy'
  ];

  // Process submissions and download attachments
  const processedSubmissions = await Promise.all(
    submissions.map(async (submission) => {
      const attachments: { [key: string]: string | null } = {};
      
      // Download attachments for selected fields
      for (const field of attachmentFields) {
        if (selectedFields.includes(field) && submission[field as keyof AccreditationSubmission]) {
          const gcsPath = submission[field as keyof AccreditationSubmission] as string;
          attachments[field] = await downloadAttachmentAsBase64(gcsPath);
        }
      }
      
      return { submission, attachments };
    })
  );

  // Generate HTML
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Manpower Accreditation Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #ddd;
        }
        .header h1 {
          color: #1a3158;
          margin-bottom: 10px;
        }
        .employee-section {
          margin-bottom: 40px;
          page-break-inside: avoid;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 8px;
        }
        .employee-header {
          background-color: #f5f5f5;
          padding: 10px;
          margin: -20px -20px 20px -20px;
          border-radius: 8px 8px 0 0;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .info-item {
          display: flex;
        }
        .info-label {
          font-weight: bold;
          min-width: 150px;
          color: #555;
        }
        .info-value {
          flex: 1;
        }
        .attachment-container {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        .attachment-container h4 {
          margin-top: 0;
          color: #1a3158;
        }
        .attachment-image {
          max-width: 300px;
          max-height: 400px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .pdf-attachment {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .pdf-icon {
          flex-shrink: 0;
        }
        .pdf-note {
          margin: 0;
          font-weight: bold;
          color: #555;
        }
        .pdf-filename {
          margin: 0;
          font-size: 0.9em;
          color: #777;
        }
        .attachment-error {
          color: #d32f2f;
          font-style: italic;
        }
        @media print {
          .employee-section {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Al Laith Projects Services</h1>
        <h2>Manpower Accreditation Report</h2>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
      </div>
      
      ${processedSubmissions.map(({ submission, attachments }) => `
        <div class="employee-section">
          <div class="employee-header">
            <h3>Employee ID: ${submission.employeeId}</h3>
          </div>
          
          <div class="info-grid">
            ${selectedFields
              .filter(field => !attachmentFields.includes(field))
              .map(field => `
                <div class="info-item">
                  <span class="info-label">${formatFieldName(field)}:</span>
                  <span class="info-value">${submission[field as keyof AccreditationSubmission] || 'N/A'}</span>
                </div>
              `).join('')}
          </div>
          
          ${attachmentFields
            .filter(field => selectedFields.includes(field) && submission[field as keyof AccreditationSubmission])
            .map(field => generateAttachmentHTML(
              formatFieldName(field),
              attachments[field] || null,
              submission[field as keyof AccreditationSubmission] as string
            )).join('')}
        </div>
      `).join('')}
    </body>
    </html>
  `;
}

// Helper function to format field names for display
function formatFieldName(field: string): string {
  const fieldNameMap: { [key: string]: string } = {
    employeeId: 'Employee ID',
    dateOfBirth: 'Date of Birth',
    dateOfJoining: 'Date of Joining',
    jobTitle: 'Job Title',
    contactNo: 'Contact Number',
    residenceLocation: 'Residence Location',
    molNumber: 'MOL Number',
    molStartDate: 'MOL Start Date',
    molExpiryDate: 'MOL Expiry Date',
    emiratesUidNo: 'Emirates UID No.',
    emiratesIdNo: 'Emirates ID No.',
    emiratesIdIssueDate: 'Emirates ID Issue Date',
    emiratesIdExpiryDate: 'Emirates ID Expiry Date',
    emiratesIdCopy: 'Emirates ID Copy',
    passportIssueCountry: 'Passport Issue Country',
    passportNo: 'Passport Number',
    passportIssueDate: 'Passport Issue Date',
    passportExpiryDate: 'Passport Expiry Date',
    passportHoldingConfirmation: 'Passport Holding Confirmation',
    visaIssuePlace: 'Visa Issue Place',
    visaStartDate: 'Visa Start Date',
    visaExpiryDate: 'Visa Expiry Date',
    visaCopy: 'Visa Copy',
    employeeThirdPartyCertificateType: 'Third Party Certificate Type',
    certificateNo: 'Certificate Number',
    certificateStartDate: 'Certificate Start Date',
    certificateExpiryDate: 'Certificate Expiry Date',
    msra: 'MSRA Document',
    undertakingLetter: 'Undertaking Letter',
    groupsInsuranceType: 'Group Insurance Type',
    groupsInsuranceStartDate: 'Group Insurance Start Date',
    groupsInsuranceExpiryDate: 'Group Insurance Expiry Date',
    wcInsurance: 'WC Insurance',
    groupInsuranceCopy: 'Group Insurance Copy',
    photo: 'Employee Photo'
  };
  
  return fieldNameMap[field] || field;
} 