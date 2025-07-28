import { Storage } from '@google-cloud/storage';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

// Initialize storage
const storage = process.env.GCP_KEY_FILE 
  ? new Storage({
      projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE,
    })
  : new Storage();

const bucketName = 'pmo-documents-hybrid-shine-466111-s0';
const folderName = 'manpower - accreditation';
const historyFileName = 'report-history.json';

export interface ReportHistoryEntry {
  id: string;
  userId: string;
  fileName: string;
  createdAt: string;
  employeeCount: number;
  fieldCount: number;
  fileSize?: number;
}

// Download report history from GCS
async function downloadReportHistory(): Promise<ReportHistoryEntry[]> {
  const tempFile = path.join(os.tmpdir(), `report-history-${Date.now()}.json`);
  const gcsPath = `gs://${bucketName}/${folderName}/${historyFileName}`;
  
  try {
    // Try gsutil first
    console.log('Downloading report history from GCS:', gcsPath);
    const { stdout, stderr } = await execAsync(`gsutil cp "${gcsPath}" "${tempFile}"`);
    if (stderr) console.log('gsutil download stderr:', stderr);
    
    const content = await fs.readFile(tempFile, 'utf-8');
    await fs.unlink(tempFile); // Clean up temp file
    
    const history = JSON.parse(content);
    console.log('Downloaded report history, entries:', history.length);
    return history;
  } catch (error: any) {
    console.log('Report history download error:', error.message);
    if (error.stderr) console.log('gsutil stderr:', error.stderr);
    console.log('Report history not found, returning empty array');
    return [];
  }
}

// Upload report history to GCS
async function uploadReportHistory(history: ReportHistoryEntry[]): Promise<void> {
  const tempFile = path.join(os.tmpdir(), `report-history-upload-${Date.now()}.json`);
  
  try {
    // Write to temp file
    await fs.writeFile(tempFile, JSON.stringify(history, null, 2));
    
    // Upload to GCS
    const gcsPath = `gs://${bucketName}/${folderName}/${historyFileName}`;
    const { stdout, stderr } = await execAsync(`gsutil cp "${tempFile}" "${gcsPath}"`);
    if (stdout) console.log('gsutil upload stdout:', stdout);
    if (stderr) console.log('gsutil upload stderr:', stderr);
    
    console.log('Report history uploaded successfully, entries:', history.length);
    
    // Clean up temp file
    await fs.unlink(tempFile);
  } catch (error: any) {
    console.error('Error uploading report history:', error.message);
    if (error.stderr) console.error('gsutil stderr:', error.stderr);
    // Clean up temp file on error
    try { await fs.unlink(tempFile); } catch (e) {}
    throw error;
  }
}

// Add a new report entry
export async function addReportToHistory(entry: Omit<ReportHistoryEntry, 'id' | 'createdAt'>): Promise<ReportHistoryEntry> {
  try {
    // Download current history
    const history = await downloadReportHistory();
    
    // Create new entry
    const newEntry: ReportHistoryEntry = {
      ...entry,
      id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    // Add to history (at the beginning for descending order)
    history.unshift(newEntry);
    
    // Keep only last 1000 entries to prevent file from growing too large
    if (history.length > 1000) {
      history.length = 1000;
    }
    
    // Upload updated history
    await uploadReportHistory(history);
    
    return newEntry;
  } catch (error) {
    console.error('Error adding report to history:', error);
    throw error;
  }
}

// Get report history
export async function getReportHistory(): Promise<ReportHistoryEntry[]> {
  try {
    const history = await downloadReportHistory();
    
    // Ensure descending order by date
    history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return history;
  } catch (error) {
    console.error('Error getting report history:', error);
    return [];
  }
} 