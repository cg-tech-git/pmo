import jsPDF from 'jspdf'

export interface ManpowerAllocationData {
  date: string
  time: string
  jobNumber: string
  country: string
  division: string
  camp: string
  customer: string
  customerContact: string
  projectName: string
  projectManager: string
  projectManagerContact: string
  projectManagerEmail: string
  // Backward compatibility for old stored data
  project?: string
  employees: Array<{
    id: string
    employeeId: string
    employeeName: string
    employeeGrade: string
  }>
  crossHiredManpower: Array<{
    id: string
    supplierName: string
    contactNumber: string
    manpowerTotal: string
  }>
}

export const generateManpowerAllocationPDF = (data: ManpowerAllocationData): string => {
  try {
    console.log('Starting PDF generation with data:', data)
    
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    
    // White background header
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, 35, 'F')
    
    // Add border line under header
    doc.setDrawColor(229, 231, 235) // gray-200
    doc.setLineWidth(0.5)
    doc.line(0, 35, pageWidth, 35)
    
    // Main Title
    doc.setTextColor(31, 41, 55) // gray-800
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold') // Note: Inter font would require font loading
    doc.text('Al Laith Projects Services: Manpower Allocation', 15, 20)
    
    // Sample doc text in red
    doc.setTextColor(220, 38, 38) // red-600
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal') // Note: Inter font would require font loading
    doc.text('Sample doc', 15, 30)
    
    // Date
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal') // Note: Would use Inter font
    doc.setTextColor(107, 114, 128) // gray-500
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    doc.text(currentDate, pageWidth - 15, 20, { align: 'right' })
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0)
    
    let yPosition = 50
    
    // Project Information - 3x4 Grid
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold') // Note: Would use Inter font
    doc.setTextColor(31, 41, 55)
    doc.text('Project Information', 15, yPosition)
    yPosition += 15
    
    // Grid setup
    const leftMargin = 15
    const tableWidth = pageWidth - 30
    const columnWidth = tableWidth / 3
    const rowHeight = 16
    
    doc.setFontSize(10)
    
    // 3x4 Grid data
    const projectInfoData = [
      [
        { label: 'Date', value: data.date || 'N/A' },
        { label: 'Time', value: data.time || 'N/A' },
        { label: 'Job Number', value: data.jobNumber || 'N/A' }
      ],
      [
        { label: 'Country', value: data.country || 'N/A' },
        { label: 'Division', value: data.division || 'N/A' },
        { label: 'Camp', value: data.camp || 'N/A' }
      ],
      [
        { label: 'Customer', value: data.customer || 'N/A' },
        { label: 'Customer Contact', value: data.customerContact || 'N/A' },
        { label: 'Project Name', value: data.projectName || data.project || 'N/A' }
      ],
      [
        { label: 'Project Manager', value: data.projectManager || 'N/A' },
        { label: 'PM Contact', value: data.projectManagerContact || 'N/A' },
        { label: 'PM Email', value: data.projectManagerEmail || 'N/A' }
      ]
    ]
    
    // Draw the 3x4 grid
    projectInfoData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const xPos = leftMargin + (colIndex * columnWidth)
        const yPos = yPosition + (rowIndex * rowHeight)
        
        // Draw cell border (transparent)
        doc.setDrawColor(255, 255, 255)
        doc.setLineWidth(0)
        doc.rect(xPos, yPos - 12, columnWidth, rowHeight, 'S')
        
        // Label (normal)
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(31, 41, 55)
        doc.text(cell.label + ':', xPos + 2, yPos - 6)
        
        // Value (normal)
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(0, 0, 0)
        doc.text(cell.value, xPos + 2, yPos + 2)
      })
    })
    
    yPosition += (projectInfoData.length * rowHeight) + 10
    
          // Employee Selection Section
      if (data.employees && data.employees.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold') // Note: Would use Inter font
        doc.setTextColor(31, 41, 55)
        doc.text('Employee Selection', leftMargin, yPosition)
        yPosition += 15
        
        // Table header
        doc.setFillColor(255, 255, 255)
        doc.setDrawColor(255, 255, 255)
        doc.setLineWidth(0)
        doc.rect(leftMargin, yPosition - 10, tableWidth, 12, 'S')
      
              doc.setFontSize(10)
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(31, 41, 55)
        
        doc.text('Employee ID', leftMargin + 2, yPosition - 2)
        doc.text('Employee Name', leftMargin + columnWidth + 2, yPosition - 2)
        doc.text('Employee Grade', leftMargin + (columnWidth * 2) + 2, yPosition - 2)
        
        yPosition += 8
        
        // Employee data
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(0, 0, 0)
              data.employees.forEach((employee, index) => {
          // Alternating row background
          if (index % 2 === 1) {
            doc.setFillColor(249, 250, 251)
            doc.rect(leftMargin, yPosition - 8, tableWidth, 12, 'F')
          }
          
          // Draw row border (transparent)
          doc.setDrawColor(255, 255, 255)
          doc.setLineWidth(0)
          doc.rect(leftMargin, yPosition - 8, tableWidth, 12, 'S')
        
        doc.text(employee.employeeId || 'N/A', leftMargin + 2, yPosition)
        doc.text(employee.employeeName || 'N/A', leftMargin + columnWidth + 2, yPosition)
        doc.text(employee.employeeGrade || 'N/A', leftMargin + (columnWidth * 2) + 2, yPosition)
        yPosition += 12
      })
      
      yPosition += 10
    }
    
          // Cross-Hired Manpower Section
      if (data.crossHiredManpower && data.crossHiredManpower.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold') // Note: Would use Inter font
        doc.setTextColor(31, 41, 55)
        doc.text('Cross-Hired Manpower', leftMargin, yPosition)
        yPosition += 15
        
        // Table header
        doc.setFillColor(255, 255, 255)
        doc.setDrawColor(255, 255, 255)
        doc.setLineWidth(0)
        doc.rect(leftMargin, yPosition - 10, tableWidth, 12, 'S')
      
              doc.setFontSize(10)
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(31, 41, 55)
        
        doc.text('Supplier Name', leftMargin + 2, yPosition - 2)
        doc.text('Contact Number', leftMargin + columnWidth + 2, yPosition - 2)
        doc.text('Manpower Total', leftMargin + (columnWidth * 2) + 2, yPosition - 2)
        
        yPosition += 8
        
        // Cross-hired data
        doc.setFont('helvetica', 'normal') // Note: Would use Inter font
        doc.setTextColor(0, 0, 0)
              data.crossHiredManpower.forEach((supplier, index) => {
          // Alternating row background
          if (index % 2 === 1) {
            doc.setFillColor(249, 250, 251)
            doc.rect(leftMargin, yPosition - 8, tableWidth, 12, 'F')
          }
          
          // Draw row border (transparent)
          doc.setDrawColor(255, 255, 255)
          doc.setLineWidth(0)
          doc.rect(leftMargin, yPosition - 8, tableWidth, 12, 'S')
        
        doc.text(supplier.supplierName || 'N/A', leftMargin + 2, yPosition)
        doc.text(supplier.contactNumber || 'N/A', leftMargin + columnWidth + 2, yPosition)
        doc.text(supplier.manpowerTotal || 'N/A', leftMargin + (columnWidth * 2) + 2, yPosition)
        yPosition += 12
      })
    }
    
    // Footer
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal') // Note: Would use Inter font
    doc.setTextColor(156, 163, 175) // gray-400
    doc.text('This is an automatically generated document', pageWidth / 2, pageHeight - 10, { align: 'center' })
    
    console.log('PDF generation completed successfully')
    
    // Create blob URL
    const pdfBlob = doc.output('blob')
    const blobUrl = URL.createObjectURL(pdfBlob)
    
    console.log('Blob URL created:', blobUrl)
    
    return blobUrl
  } catch (error) {
    console.error('Error generating PDF:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available')
    throw error
  }
} 