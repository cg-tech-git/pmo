import { NextRequest, NextResponse } from 'next/server';
import { getAccreditationSubmissions } from '@/lib/accreditationExcelStorage';

export async function GET(request: NextRequest) {
  try {
    const submissions = await getAccreditationSubmissions();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expiryAlerts: any[] = [];
    
    // Define the expiry fields and their corresponding attachment fields
    const expiryFields = [
      { dateField: 'molExpiryDate', type: 'MOL', numberField: 'molNumber', attachmentField: undefined },
      { dateField: 'emiratesIdExpiryDate', type: 'Emirates ID', numberField: 'emiratesIdNumber', attachmentField: 'emiratesIdCopy' },
      { dateField: 'passportExpiryDate', type: 'Passport', numberField: 'passportNumber', attachmentField: undefined },
      { dateField: 'visaExpiryDate', type: 'Visa', numberField: 'visaNumber', attachmentField: 'visaCopy' },
      { dateField: 'certificateExpiryDate', type: 'Certificate', numberField: 'certificateNumber', attachmentField: 'msra' },
      { dateField: 'groupInsuranceExpiryDate', type: 'Group Insurance', numberField: 'groupInsuranceNumber', attachmentField: 'groupInsuranceCopy' }
    ];
    
    // Process each submission
    submissions.forEach(submission => {
      expiryFields.forEach(field => {
        const expiryDateStr = (submission as any)[field.dateField];
        if (expiryDateStr) {
          const expiryDate = new Date(expiryDateStr);
          const timeDiff = expiryDate.getTime() - today.getTime();
          const daysUntilExpiry = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          
          let status: string;
          if (daysUntilExpiry < 0) {
            status = 'Expired';
          } else if (daysUntilExpiry <= 30) {
            status = 'Critical';
          } else if (daysUntilExpiry <= 60) {
            status = 'Warning';
          } else if (daysUntilExpiry <= 90) {
            status = 'Soon';
          } else {
            status = 'Valid';
          }
          
          // Only include alerts that are within 90 days or already expired
          if (daysUntilExpiry <= 90) {
            expiryAlerts.push({
              employeeId: submission.employeeId,
              documentType: field.type,
              documentNumber: (submission as any)[field.numberField] || 'N/A',
              expiryDate: expiryDateStr,
              daysUntilExpiry,
              status,
              attachmentFileName: field.attachmentField ? (submission as any)[field.attachmentField] : undefined
            });
          }
        }
      });
    });
    
    // Sort by days until expiry (expired first, then soonest to expire)
    expiryAlerts.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
    
    return NextResponse.json({
      success: true,
      alerts: expiryAlerts,
      totalExpired: expiryAlerts.filter(a => a.status === 'Expired').length
    });
  } catch (error) {
    console.error('Error fetching expiry alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expiry alerts' },
      { status: 500 }
    );
  }
} 