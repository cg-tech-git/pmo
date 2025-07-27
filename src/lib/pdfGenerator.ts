import jsPDF from 'jspdf';
import { ManpowerSubmission } from '@/types';

export interface ManpowerAllocationData {
  date: string
  time: string
  jobNumber: string
  country: string
  division: string
  camp: string
  customer: string
  customerContact: string
  projectName: string
  projectManager: string
  projectManagerContact: string
  projectManagerEmail: string
  // Backward compatibility for old stored data
  project?: string
  employees: Array<{
    id: string
    employeeId: string
    employeeName: string
    employeeGrade: string
  }>
  crossHiredManpower: Array<{
    id: string
    supplierName: string
    contactNumber: string
    manpowerTotal: string
  }>
}

// Convert old format to new ManpowerSubmission format
function convertToSubmission(data: ManpowerAllocationData): ManpowerSubmission {
  return {
    id: Date.now().toString(),
    date: data.date,
    submissionDate: new Date().toISOString(),
    data: {
      date: data.date,
      time: data.time,
      jobNumber: data.jobNumber,
      country: data.country,
      division: data.division,
      camp: data.camp,
      customer: data.customer,
      customerContact: data.customerContact,
      projectName: data.projectName || data.project || '',
      projectManager: data.projectManager,
      projectManagerContact: data.projectManagerContact,
      projectManagerEmail: data.projectManagerEmail,
      employees: data.employees,
      crossHiredManpower: data.crossHiredManpower
    }
  };
}

export async function generatePDF(submission: ManpowerSubmission): Promise<string> {
  try {
    // Call the server-side PDF generation API
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.statusText}`);
    }

    // Convert response to blob and create object URL
    const pdfBlob = await response.blob();
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    return blobUrl;
  } catch (error) {
    console.error('Error generating PDF via API:', error);
    throw error;
  }
}

// Legacy function for backward compatibility
export const generateManpowerAllocationPDF = async (data: ManpowerAllocationData): Promise<string> => {
  try {
    console.log('Starting API-based PDF generation with data:', data);
    
    // Convert old format to new submission format
    const submission = convertToSubmission(data);
    
    // Generate PDF using API
    const blobUrl = await generatePDF(submission);
    
    console.log('API-based PDF generation completed successfully');
    console.log('Blob URL created:', blobUrl);
    
    return blobUrl;
  } catch (error) {
    console.error('Error generating API-based PDF:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    throw error;
  }
} 