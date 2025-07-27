import { NextRequest, NextResponse } from 'next/server';
import { getReportHistory } from '@/lib/reportHistoryStorage';

export async function GET(request: NextRequest) {
  try {
    const reports = await getReportHistory();
    
    return NextResponse.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Error fetching report history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report history' },
      { status: 500 }
    );
  }
} 