import { NextRequest, NextResponse } from 'next/server';
import { getReportHistory } from '@/lib/reportHistoryStorage';

export async function GET(request: NextRequest) {
  try {
    console.log('API: Fetching report history...');
    const reports = await getReportHistory();
    console.log('API: Report history fetched, count:', reports.length);
    console.log('API: Report IDs:', reports.map(r => r.id));
    
    // Force no caching at all levels
    const response = NextResponse.json({
      success: true,
      reports,
      timestamp: new Date().toISOString(),
      count: reports.length
    });
    
    // Set aggressive no-cache headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    response.headers.set('X-Accel-Expires', '0');
    
    return response;
  } catch (error) {
    console.error('API: Error fetching report history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report history' },
      { status: 500 }
    );
  }
} 