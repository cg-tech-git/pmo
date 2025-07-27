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
    
    // For now, generate a sample Excel file with the report metadata
    // In a production system, you would store and retrieve the actual generated file
    const XLSX = require('xlsx');
    
    // Create sample data based on report metadata
    const data = [
      ['Accreditation Report'],
      [],
      [`Generated: ${new Date(report.createdAt).toLocaleString()}`],
      [`User: ${report.userId}`],
      [`Employees: ${report.employeeCount}`],
      [`Fields: ${report.fieldCount}`],
      [],
      ['Employee ID', 'Sample Field 1', 'Sample Field 2', 'Sample Field 3'],
      ['0001', 'Data 1', 'Data 2', 'Data 3'],
      ['0002', 'Data 4', 'Data 5', 'Data 6'],
      ['0003', 'Data 7', 'Data 8', 'Data 9']
    ];
    
    // Create workbook and worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Accreditation Report');
    
    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
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