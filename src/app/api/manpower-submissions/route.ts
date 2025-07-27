import { NextRequest, NextResponse } from 'next/server';
import { saveSubmissionToExcel, getSubmissionsFromExcel } from '@/lib/excelStorage';

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();
    
    // Save submission to Excel file in GCS
    await saveSubmissionToExcel(submission);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission saved successfully' 
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    // Get submissions from Excel file
    const allSubmissions = await getSubmissionsFromExcel();
    
    // Filter by date if provided
    const submissions = date 
      ? allSubmissions.filter(submission => submission.date === date)
      : allSubmissions;
    
    return NextResponse.json({ 
      success: true, 
      submissions 
    });
  } catch (error) {
    console.error('Error getting submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get submissions' },
      { status: 500 }
    );
  }
} 