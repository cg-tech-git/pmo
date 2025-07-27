import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { generateHTMLTemplate } from '@/lib/pdfTemplateGenerator';
import { ManpowerSubmission } from '@/types';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const submission: ManpowerSubmission = await request.json();
    
    // Generate current date in DD/MM/YYYY format
    const generatedDate = new Date().toLocaleDateString('en-GB');
    
    // Read and convert logo to base64
    let logoBase64 = '';
    try {
      const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.svg');
      const logoContent = await fs.readFile(logoPath, 'utf-8');
      // For SVG, we encode the entire content as base64
      logoBase64 = `data:image/svg+xml;base64,${Buffer.from(logoContent).toString('base64')}`;
    } catch (error) {
      console.warn('Could not load logo:', error);
      // Continue without logo if it fails
    }
    
    // Generate HTML from template
    let htmlContent = generateHTMLTemplate({
      submission,
      generatedDate
    });
    
    // Replace the logo src with base64
    if (logoBase64) {
      htmlContent = htmlContent.replace('/images/logo.svg', logoBase64);
    }
    
    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set content and wait for any dynamic content to load
      await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0' 
      });
      
      // Generate PDF with proper formatting
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm'
        }
      });
      
      // Return PDF as response
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="manpower-allocation-${submission.data.jobNumber || 'report'}.pdf"`
        }
      });
      
    } finally {
      await browser.close();
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 