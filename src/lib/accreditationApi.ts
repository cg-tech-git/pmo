import { AccreditationSubmission } from './accreditationExcelStorage';

export async function saveAccreditationData(formData: FormData): Promise<void> {
  const response = await fetch('/api/accreditation-submissions', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save accreditation data');
  }

  return response.json();
}

export async function getAccreditationSubmissions(): Promise<AccreditationSubmission[]> {
  const response = await fetch('/api/accreditation-submissions');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch accreditation submissions');
  }

  const data = await response.json();
  return data.submissions;
}

export async function getAccreditationSubmissionById(employeeId: string): Promise<AccreditationSubmission | null> {
  const submissions = await getAccreditationSubmissions();
  return submissions.find(sub => sub.employeeId === employeeId) || null;
} 