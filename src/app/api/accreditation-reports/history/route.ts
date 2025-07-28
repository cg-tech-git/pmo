import { NextRequest, NextResponse } from 'next/server';
import { getReportHistory } from '@/lib/reportHistoryStorage';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching report history...');
    const reports = await getReportHistory();
    console.log('Report history fetched, count:', reports.length);
    console.log('Reports:', JSON.stringify(reports, null, 2));
    
    return NextResponse.json({
      success: true,
      reports
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching report history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report history' },
      { status: 500 }
    );
  }
} 