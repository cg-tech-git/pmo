import { NextRequest, NextResponse } from 'next/server';
import { saveAccreditationSubmission, getAccreditationSubmissions, uploadAccreditationAttachment } from '@/lib/accreditationExcelStorage';

export async function GET() {
  try {
    const submissions = await getAccreditationSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching accreditation submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accreditation submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract submission data
    const submission: any = {};
    const attachments: { field: string; file: File }[] = [];
    
    // Process form data
    formData.forEach((value, key) => {
      if (value instanceof File) {
        attachments.push({ field: key, file: value });
      } else {
        submission[key] = value;
      }
    });
    
    // Upload attachments if any
    for (const { field, file } of attachments) {
      if (file.size > 0) {
        const attachmentUrl = await uploadAccreditationAttachment(
          file,
          submission.employeeId || 'unknown',
          field
        );
        submission[field] = attachmentUrl;
      }
    }
    
    // Save submission to Excel
    await saveAccreditationSubmission(submission);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Accreditation submission saved successfully' 
    });
  } catch (error) {
    console.error('Error saving accreditation submission:', error);
    return NextResponse.json(
      { error: 'Failed to save accreditation submission' },
      { status: 500 }
    );
  }
} 