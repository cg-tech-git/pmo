import { ManpowerSubmission, Employee, CrossHiredManpower } from '@/types';

export interface TemplateData {
  submission: ManpowerSubmission;
  generatedDate: string;
}

export function generateHTMLTemplate(data: TemplateData): string {
  const { submission, generatedDate } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Al Laith Projects Services - Manpower Allocation</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm 20mm 10mm 20mm;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
          font-size: 8pt;
          line-height: 1.3;
          color: #000;
          background: white;
        }
        
        .page-container {
          position: relative;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          padding-bottom: 40mm;
        }
        
        .header {
          color: #1a3158;
          padding: 10px 30px 20px 30px;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .header-left {
          display: flex;
          flex-direction: column;
        }
        
        .header h1 {
          font-size: 20pt;
          font-weight: bold;
          margin: 0;
          letter-spacing: 0.5px;
          color: #1a3158;
        }
        
        .header h2 {
          font-size: 14pt;
          font-weight: normal;
          margin: 4px 0 0 0;
          letter-spacing: 0.3px;
          color: #1a3158;
        }
        
        .header .logo {
          height: 54px;
          width: auto;
          margin-left: auto;
        }
        
        .content {
          padding: 25px 30px;
          flex: 1;
          margin-bottom: 20px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 14pt;
          font-weight: bold;
          margin-bottom: 15px;
          color: #000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        /* Project Information Grid */
        .info-grid {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr;
          column-gap: 20px;
          row-gap: 8px;
          margin-bottom: 20px;
        }
        
        .info-label {
          font-weight: 600;
          color: #000;
          font-size: 8pt;
          min-width: 120px;
        }
        
        .info-value {
          color: #000;
          font-size: 8pt;
        }
        
        /* Table styles - borderless design */
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          font-size: 8pt;
        }
        
        .table th {
          padding: 8px 0;
          font-weight: bold;
          text-align: left;
          font-size: 8pt;
          border: none;
          background: none;
        }
        
        .table td {
          padding: 6px 0;
          text-align: left;
          font-size: 8pt;
          border: none;
        }
        
        /* Add subtle spacing between columns */
        .table th:not(:last-child),
        .table td:not(:last-child) {
          padding-right: 30px;
        }
        
        /* Table specific layouts */
        .employee-table {
          width: 100%;
        }
        
        .employee-table th:nth-child(1),
        .employee-table td:nth-child(1) {
          width: 33.33%;
        }
        
        .employee-table th:nth-child(2),
        .employee-table td:nth-child(2) {
          width: 33.33%;
        }
        
        .employee-table th:nth-child(3),
        .employee-table td:nth-child(3) {
          width: 33.33%;
        }
        
        .manpower-table {
          width: 100%;
        }
        
        .manpower-table th:nth-child(1),
        .manpower-table td:nth-child(1) {
          width: 33.33%;
        }
        
        .manpower-table th:nth-child(2),
        .manpower-table td:nth-child(2) {
          width: 33.33%;
        }
        
        .manpower-table th:nth-child(3),
        .manpower-table td:nth-child(3) {
          width: 33.33%;
        }
        
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 30px 0 30px;
          display: flex;
          justify-content: space-between;
          font-size: 9pt;
          color: #333;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <div class="header">
          <div class="header-left">
            <h1>Al Laith Projects Services</h1>
            <h2>Manpower Allocation</h2>
          </div>
          <img src="/images/logo.svg" alt="Al Laith Logo" class="logo" />
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Project Information</div>
            <div class="info-grid">
              <div class="info-label">Date:</div>
              <div class="info-value">${submission.data.date}</div>
              <div class="info-label">Time:</div>
              <div class="info-value">${submission.data.time}</div>
              
              <div class="info-label">Job Number:</div>
              <div class="info-value">${submission.data.jobNumber}</div>
              <div class="info-label">Country:</div>
              <div class="info-value">${submission.data.country}</div>
              
              <div class="info-label">Division:</div>
              <div class="info-value">${submission.data.division}</div>
              <div class="info-label">Camp:</div>
              <div class="info-value">${submission.data.camp}</div>
              
              <div class="info-label">Customer:</div>
              <div class="info-value">${submission.data.customer}</div>
              <div class="info-label">Customer Contact:</div>
              <div class="info-value">${submission.data.customerContact}</div>
              
              <div class="info-label">Project Name:</div>
              <div class="info-value">${submission.data.projectName}</div>
              <div class="info-label">Project Manager:</div>
              <div class="info-value">${submission.data.projectManager}</div>
              
              <div class="info-label">PM Contact:</div>
              <div class="info-value">${submission.data.projectManagerContact}</div>
              <div class="info-label">PM Email:</div>
              <div class="info-value">${submission.data.projectManagerEmail}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Employee Allocation</div>
            <table class="table employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                ${submission.data.employees.map((employee: Employee) => `
                <tr>
                  <td>${employee.employeeId}</td>
                  <td>${employee.employeeName}</td>
                  <td>${employee.employeeGrade}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">Cross Hired Manpower</div>
            <table class="table manpower-table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Contact Number</th>
                  <th>Manpower Total</th>
                </tr>
              </thead>
              <tbody>
                ${submission.data.crossHiredManpower.map((supplier: CrossHiredManpower) => `
                <tr>
                  <td>${supplier.supplierName}</td>
                  <td>${supplier.contactNumber}</td>
                  <td>${supplier.manpowerTotal}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="footer">
          <div>ALPS PMO - Project Management Office</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </body>
    </html>
  `;
} 