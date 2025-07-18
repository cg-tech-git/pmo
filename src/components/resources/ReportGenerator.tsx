'use client'

import { useState } from 'react'
import { DocumentArrowDownIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface ReportGeneratorProps {
  employees: any[]
}

export default function ReportGenerator({ employees }: ReportGeneratorProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [reportFields, setReportFields] = useState<string[]>([])

  const availableFields = [
    'Employee ID',
    'Name',
    'Department',
    'Job Title',
    'Contact Information',
    'Emirates ID',
    'Passport Details',
    'Visa Information',
    'Certifications',
    'Insurance Details'
  ]

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleFieldToggle = (field: string) => {
    setReportFields(prev => 
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  const handleGenerateReport = () => {
    // Mock CSV generation
    console.log('Generating report for employees:', selectedEmployees)
    console.log('Including fields:', reportFields)
    alert('Report generated successfully! (This is a demo)')
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Generate Custom Reports</h2>
        <p className="text-blue-700">
          Select employees and data fields to generate comprehensive reports in CSV format.
        </p>
      </div>

      {/* Employee Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5" />
          Select Employees ({employees.length} available)
        </h3>
        
        <div className="space-y-2">
          <button
            onClick={() => setSelectedEmployees(employees.map(emp => emp.id))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Select All
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {employees.map((employee) => (
              <label key={employee.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleEmployeeToggle(employee.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {employee.name} ({employee.employeeId})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Field Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Data Fields</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {availableFields.map((field) => (
            <label key={field} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reportFields.includes(field)}
                onChange={() => handleFieldToggle(field)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{field}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end">
        <button
          onClick={handleGenerateReport}
          disabled={selectedEmployees.length === 0 || reportFields.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Generate CSV Report
        </button>
      </div>
    </div>
  )
} 