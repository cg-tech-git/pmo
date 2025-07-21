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
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  
  // Header
  doc.setFillColor(59, 130, 246) // Primary blue
  doc.rect(0, 0, pageWidth, 30, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Manpower Allocation Report', 20, 20)
  
  // Reset text color
  doc.setTextColor(0, 0, 0)
  
  // Report Date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const reportDate = new Date().toLocaleDateString()
  doc.text(`Generated: ${reportDate}`, pageWidth - 60, 20)
  
  let yPosition = 50
  
  // Project Information Section
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Project Information', 20, yPosition)
  yPosition += 10
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  const projectInfo = [
    ['Date:', data.date],
    ['Time:', data.time],
    ['Job Number:', data.jobNumber],
    ['Country:', data.country],
    ['Division:', data.division],
    ['Camp:', data.camp],
    ['Customer:', data.customer],
    ['Customer Contact:', data.customerContact],
    ['Project Name:', data.projectName],
    ['Project Manager:', data.projectManager],
    ['PM Contact:', data.projectManagerContact],
    ['PM Email:', data.projectManagerEmail]
  ]
  
  projectInfo.forEach(([label, value]) => {
    doc.text(label, 25, yPosition)
    doc.text(value, 80, yPosition)
    yPosition += 8
  })
  
  yPosition += 10
  
  // Employee Allocation Section
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Employee Allocation', 20, yPosition)
  yPosition += 15
  
  // Employee table header
  doc.setFillColor(240, 240, 240)
  doc.rect(20, yPosition - 5, pageWidth - 40, 15, 'F')
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Employee ID', 25, yPosition + 5)
  doc.text('Employee Name', 70, yPosition + 5)
  doc.text('Grade', 140, yPosition + 5)
  yPosition += 20
  
  // Employee data
  doc.setFont('helvetica', 'normal')
  data.employees.forEach((employee) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage()
      yPosition = 30
    }
    
    doc.text(employee.employeeId, 25, yPosition)
    doc.text(employee.employeeName, 70, yPosition)
    doc.text(employee.employeeGrade, 140, yPosition)
    yPosition += 12
  })
  
  yPosition += 10
  
  // Cross Hired Manpower Section
  if (data.crossHiredManpower.length > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Cross Hired Manpower', 20, yPosition)
    yPosition += 15
    
    // Cross hired table header
    doc.setFillColor(240, 240, 240)
    doc.rect(20, yPosition - 5, pageWidth - 40, 15, 'F')
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Supplier Name', 25, yPosition + 5)
    doc.text('Contact Number', 90, yPosition + 5)
    doc.text('Manpower Total', 140, yPosition + 5)
    yPosition += 20
    
    // Cross hired data
    doc.setFont('helvetica', 'normal')
    data.crossHiredManpower.forEach((supplier) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage()
        yPosition = 30
      }
      
      doc.text(supplier.supplierName, 25, yPosition)
      doc.text(supplier.contactNumber, 90, yPosition)
      doc.text(supplier.manpowerTotal, 140, yPosition)
      yPosition += 12
    })
  }
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('PMO - Project Management Office', 20, pageHeight - 20)
  doc.text('Page 1 of 1', pageWidth - 40, pageHeight - 20)
  
  // Generate blob URL for new tab
  const pdfBlob = doc.output('blob')
  const blobUrl = URL.createObjectURL(pdfBlob)
  
  return blobUrl
} 