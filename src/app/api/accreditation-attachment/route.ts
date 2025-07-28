import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

// GCS configuration
const bucketName = 'pmo-documents-hybrid-shine-466111-s0';
const folderName = 'manpower - accreditation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('file');
    const employeeId = searchParams.get('empId');
    
    console.log('Attachment request:', { filename, employeeId });
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    // Clean filename - remove any path components
    const cleanFilename = filename.split('/').pop() || filename;
    
    // Security check - prevent directory traversal
    if (cleanFilename.includes('..')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    
    // Download file from GCS using gsutil
    const tempFile = path.join(os.tmpdir(), `attachment-${Date.now()}-${cleanFilename}`);
    
    // Try multiple possible paths
    const possiblePaths = [];
    
    // Build the attachment path - files are in folders like 0001/, 0002/, etc.
    if (employeeId) {
      const attachmentPath = `gs://${bucketName}/${folderName}/attachments/${employeeId}/${cleanFilename}`;
      possiblePaths.push(attachmentPath);
      console.log('Looking for attachment at:', attachmentPath);
      
      // Also try alternate path structure (without space in folder name)
      const alternatePath = `gs://${bucketName}/manpower-accreditation/attachments/${employeeId}/${cleanFilename}`;
      possiblePaths.push(alternatePath);
      console.log('Also trying alternate path:', alternatePath);
    } else {
      // No employee ID provided - this shouldn't happen in normal usage
      return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 });
    }
    
    // Try to find the file in one of the possible paths
    let fileFound = false;
    let lastError: any;
    
    for (const gcsPath of possiblePaths) {
      try {
        console.log('Trying path:', gcsPath);
        // Try gcloud storage first
        try {
          const { stdout, stderr } = await execAsync(`gcloud storage cp "${gcsPath}" "${tempFile}"`);
          if (stderr) console.log('gcloud storage stderr:', stderr);
          fileFound = true;
          break; // File found, exit loop
        } catch (gcloudError: any) {
          console.log('gcloud storage failed, trying gsutil:', gcloudError.message);
          // Fallback to gsutil
          const { stdout, stderr } = await execAsync(`gsutil -q cp "${gcsPath}" "${tempFile}"`);
          if (stderr) console.log('gsutil stderr:', stderr);
          fileFound = true;
          break; // File found, exit loop
        }
      } catch (error: any) {
        lastError = error;
        console.log(`Failed to find file at ${gcsPath}:`, error.message);
        if (error.stderr) console.log('error stderr:', error.stderr);
        // Continue to next path
      }
    }
    
    if (!fileFound) {
      console.error('File not found in any path:', {
        filename: cleanFilename,
        employeeId,
        triedPaths: possiblePaths,
        lastError: lastError?.message
      });
      return NextResponse.json({ 
        error: 'File not found',
        details: `Tried paths: ${possiblePaths.join(', ')}`
      }, { status: 404 });
    }
    
    try {
      // Read the file
      const buffer = await fs.readFile(tempFile);
      
      // Clean up temp file
      await fs.unlink(tempFile);
      
      // Determine content type
      let contentType = 'application/octet-stream';
      if (filename.endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (filename.endsWith('.png')) {
        contentType = 'image/png';
      }
      
      // Return the file
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${cleanFilename}"`,
          'Cache-Control': 'private, max-age=3600'
        }
      });
    } catch (error) {
      console.error('Error reading file:', error);
      return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error serving attachment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 