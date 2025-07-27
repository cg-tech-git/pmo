// Client-side API utilities for manpower submissions

export interface ManpowerSubmission {
  id: string;
  date: string;
  submissionDate: string;
  data: any;
  pdfUrl: string;
}

// Save a submission
export async function saveSubmission(submission: ManpowerSubmission): Promise<void> {
  const response = await fetch('/api/manpower-submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission),
  });

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to save submission');
  }
}

// Get all submissions
export async function getSubmissions(): Promise<ManpowerSubmission[]> {
  const response = await fetch('/api/manpower-submissions');
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to get submissions');
  }
  
  return result.submissions;
}

// Get submissions by date
export async function getSubmissionsByDate(date: string): Promise<ManpowerSubmission[]> {
  const response = await fetch(`/api/manpower-submissions?date=${encodeURIComponent(date)}`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to get submissions');
  }
  
  return result.submissions;
} 