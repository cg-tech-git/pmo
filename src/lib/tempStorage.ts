import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface ManpowerSubmission {
  id: string;
  date: string;
  submissionDate: string;
  data: any;
  pdfUrl: string;
}

const STORAGE_FILE = join(process.cwd(), 'data', 'manpower-submissions.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const { mkdirSync } = require('fs');
  const dataDir = join(process.cwd(), 'data');
  
  try {
    mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Save submission to local JSON file
export async function saveSubmission(submission: ManpowerSubmission): Promise<void> {
  try {
    console.log('Saving submission to local storage...');
    ensureDataDirectory();
    
    let submissions: ManpowerSubmission[] = [];
    
    // Read existing submissions
    if (existsSync(STORAGE_FILE)) {
      try {
        const data = readFileSync(STORAGE_FILE, 'utf8');
        submissions = JSON.parse(data);
      } catch (error) {
        console.warn('Error reading existing data, starting fresh:', error);
        submissions = [];
      }
    }
    
    // Add new submission
    submissions.push(submission);
    
    // Write updated data
    writeFileSync(STORAGE_FILE, JSON.stringify(submissions, null, 2));
    
    console.log('Submission saved successfully to local storage');
  } catch (error) {
    console.error('Error saving submission to local storage:', error);
    throw error;
  }
}

// Get all submissions
export async function getSubmissions(): Promise<ManpowerSubmission[]> {
  try {
    console.log('Reading submissions from local storage...');
    
    if (!existsSync(STORAGE_FILE)) {
      console.log('No submissions file found, returning empty array');
      return [];
    }
    
    const data = readFileSync(STORAGE_FILE, 'utf8');
    const submissions = JSON.parse(data);
    
    console.log('Found submissions:', submissions.length);
    return submissions;
  } catch (error) {
    console.error('Error reading submissions from local storage:', error);
    return [];
  }
}

// Get submissions by date
export async function getSubmissionsByDate(date: string): Promise<ManpowerSubmission[]> {
  try {
    const allSubmissions = await getSubmissions();
    const filteredSubmissions = allSubmissions.filter(submission => submission.date === date);
    
    console.log(`Found ${filteredSubmissions.length} submissions for date ${date}`);
    return filteredSubmissions;
  } catch (error) {
    console.error('Error filtering submissions by date:', error);
    return [];
  }
} 