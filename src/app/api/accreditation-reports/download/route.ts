import { NextRequest, NextResponse } from 'next/server';
import { getReportHistory } from '@/lib/reportHistoryStorage';

export async function POST(request: NextRequest) {
  try {
    const { reportId } = await request.json();
    
    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }
    
    // Get report metadata from history
    const reports = await getReportHistory();
    const report = reports.find(r => r.id === reportId);
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    // Download the actual file from GCS
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const fs = require('fs').promises;
    const path = require('path');
    const os = require('os');
    
    const execAsync = promisify(exec);
    const tempFile = path.join(os.tmpdir(), report.fileName);
    const gcsPath = `gs://pmo-documents-hybrid-shine-466111-s0/reports/${report.id}/${report.fileName}`;
    
    let buffer: Buffer;
    try {
      // Download file from GCS
      console.log('Downloading report from GCS:', gcsPath);
      const { stdout, stderr } = await execAsync(`gsutil cp "${gcsPath}" "${tempFile}"`);
      if (stderr) console.log('gsutil download stderr:', stderr);
      
      // Read the file
      buffer = await fs.readFile(tempFile);
      
      // Clean up temp file
      await fs.unlink(tempFile);
      
      console.log('Report downloaded successfully, size:', buffer.length);
    } catch (downloadError: any) {
      console.error('Failed to download report from GCS:', downloadError);
      console.error('gsutil error:', downloadError.stderr);
      
      // If download fails, generate a placeholder
      return NextResponse.json(
        { error: 'Report file not found in storage' },
        { status: 404 }
      );
    }
    
    // Return the Excel file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${report.fileName}"`,
      },
    });
    
  } catch (error) {
    console.error('Error downloading report:', error);
    return NextResponse.json(
      { error: 'Failed to download report' },
      { status: 500 }
    );
  }
} 