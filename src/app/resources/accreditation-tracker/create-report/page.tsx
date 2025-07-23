'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function CreateAccreditationReport() {
  const router = useRouter()
  
  // Sample employee IDs (in real implementation, this would come from database)
  const allEmployeeIds = [
    'EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP005',
    'EMP006', 'EMP007', 'EMP008', 'EMP009', 'EMP010',
    'EMP011', 'EMP012', 'EMP013', 'EMP014', 'EMP015'
  ]
  
  // State for employee IDs (comma-separated)
  const [employeeIds, setEmployeeIds] = useState('')
  
  // State for selected fields
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({
    // Personal Information
    employeeId: false,
    dateOfBirth: false,
    dateOfJoining: false,
    language: false,
    jobTitle: false,
    department: false,
    contactNo: false,
    residenceLocation: false,
    salary: false,
    nationality: false,
    gender: false,
    
    // MOL Information
    molNumber: false,
    molStartDate: false,
    molExpiryDate: false,
    
    // Emirates ID Information
    emiratesIdNumber: false,
    emiratesIdIssueDate: false,
    emiratesIdExpiryDate: false,
    
    // Passport Information
    passportIssueCountry: false,
    passportNumber: false,
    passportIssueDate: false,
    passportExpiryDate: false,
    passportHoldingConfirmation: false,
    
    // Visa Information
    visaIssuePlace: false,
    visaNumber: false,
    visaStartDate: false,
    visaExpireDate: false,
    
    // Certificate Information
    certificateType: false,
    certificateNumber: false,
    certificateStartDate: false,
    certificateExpiryDate: false,
    
    // Insurance Information
    insuranceType: false,
    insuranceNumber: false,
    insuranceStartDate: false,
    insuranceExpiryDate: false
  })
  
  // State for report format
  const [reportFormat, setReportFormat] = useState<'pdf' | 'sheets'>('pdf')
  
  // Field categories for organization
  const fieldCategories = {
    'Personal Information': [
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'dateOfBirth', label: 'Date of Birth' },
      { key: 'dateOfJoining', label: 'Date of Joining' },
      { key: 'language', label: 'Language' },
      { key: 'jobTitle', label: 'Job Title' },
      { key: 'department', label: 'Department' },
      { key: 'contactNo', label: 'Contact Number' },
      { key: 'residenceLocation', label: 'Residence Location' },
      { key: 'salary', label: 'Salary' },
      { key: 'nationality', label: 'Nationality' },
      { key: 'gender', label: 'Gender' }
    ],
    'MOL Information': [
      { key: 'molNumber', label: 'MOL Number' },
      { key: 'molStartDate', label: 'MOL Start Date' },
      { key: 'molExpiryDate', label: 'MOL Expiry Date' }
    ],
    'Emirates ID Information': [
      { key: 'emiratesIdNumber', label: 'Emirates ID Number' },
      { key: 'emiratesIdIssueDate', label: 'Emirates ID Issue Date' },
      { key: 'emiratesIdExpiryDate', label: 'Emirates ID Expiry Date' }
    ],
    'Passport Information': [
      { key: 'passportIssueCountry', label: 'Passport Issue Country' },
      { key: 'passportNumber', label: 'Passport Number' },
      { key: 'passportIssueDate', label: 'Passport Issue Date' },
      { key: 'passportExpiryDate', label: 'Passport Expiry Date' },
      { key: 'passportHoldingConfirmation', label: 'Passport Holding Confirmation' }
    ],
    'Visa Information': [
      { key: 'visaIssuePlace', label: 'Visa Issue Place' },
      { key: 'visaNumber', label: 'Visa Number' },
      { key: 'visaStartDate', label: 'Visa Start Date' },
      { key: 'visaExpireDate', label: 'Visa Expire Date' }
    ],
    'Certificate Information': [
      { key: 'certificateType', label: 'Certificate Type' },
      { key: 'certificateNumber', label: 'Certificate Number' },
      { key: 'certificateStartDate', label: 'Certificate Start Date' },
      { key: 'certificateExpiryDate', label: 'Certificate Expiry Date' }
    ],
    'Insurance Information': [
      { key: 'insuranceType', label: 'Insurance Type' },
      { key: 'insuranceNumber', label: 'Insurance Number' },
      { key: 'insuranceStartDate', label: 'Insurance Start Date' },
      { key: 'insuranceExpiryDate', label: 'Insurance Expiry Date' }
    ]
  }

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }))
  }

  const handleSelectAllInCategory = (categoryFields: Array<{key: string, label: string}>) => {
    const updates: Record<string, boolean> = {}
    categoryFields.forEach(field => {
      updates[field.key] = true
    })
    setSelectedFields(prev => ({ ...prev, ...updates }))
  }

  const handleDeselectAllInCategory = (categoryFields: Array<{key: string, label: string}>) => {
    const updates: Record<string, boolean> = {}
    categoryFields.forEach(field => {
      updates[field.key] = false
    })
    setSelectedFields(prev => ({ ...prev, ...updates }))
  }

  const getSelectedFieldsCount = () => {
    return Object.values(selectedFields).filter(Boolean).length
  }

  const handleSelectAllEmployees = () => {
    setEmployeeIds(allEmployeeIds.join(', '))
  }

  const handleClearEmployees = () => {
    setEmployeeIds('')
  }

  const handleGenerateReport = () => {
    const selectedFieldsList = Object.entries(selectedFields)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key)
    
    const employeeIdsList = employeeIds.split(',').map(id => id.trim()).filter(id => id)
    
    console.log('Generating report with:', {
      employeeIds: employeeIdsList,
      fields: selectedFieldsList,
      format: reportFormat
    })
    
    // TODO: Implement actual report generation logic
    alert(`Report generation request:\nEmployee IDs: ${employeeIdsList.join(', ')}\nFields: ${selectedFieldsList.length}\nFormat: ${reportFormat}`)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Manpower Accreditation
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Custom Report</h1>
            <p className="text-gray-600">
              Generate custom reports based on employee accreditation data. Select employee IDs and choose the fields to include in your report.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-8">
              {/* Employee IDs Input */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M12,12c2.8,0,5-2.2,5-5s-2.2-5-5-5S7,4.2,7,7S9.2,12,12,12z M21.3,20.8c-1.3-5.1-6.5-8.3-11.6-7c-3.4,0.9-6.1,3.5-7,7c-0.1,0.5,0.2,1.1,0.8,1.2c0.1,0,0.2,0,0.2,0h16.6c0.6,0,1-0.4,1-1C21.3,20.9,21.3,20.8,21.3,20.8z"></path>
                  </svg>
                  Employee Selection
                </h2>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Employee IDs</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSelectAllEmployees}
                        className="text-xs hover:opacity-80"
                        style={{ color: '#2e77cf' }}
                      >
                        Select All ({allEmployeeIds.length})
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={handleClearEmployees}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={employeeIds}
                    onChange={(e) => setEmployeeIds(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={3}
                    placeholder="Enter employee IDs separated by commas (e.g., EMP001, EMP002, EMP003)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple employee IDs with commas. Leave blank to include all employees.
                  </p>
                </div>
              </div>

              {/* Field Selection */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M16,1.4H4c-0.6,0-1,0.4-1,1v18c0,0.6,0.4,1,1,1h12c1.7,0,3-1.3,3-3v-14C19,2.8,17.7,1.4,16,1.4z M15,10.4c0,0.6-0.4,1-1,1H8c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1V10.4z"></path>
                  </svg>
                  Field Selection ({getSelectedFieldsCount()} selected)
                </h2>

                <div className="space-y-6">
                  {Object.entries(fieldCategories).map(([categoryName, fields]) => (
                    <div key={categoryName} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{categoryName}</h3>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectAllInCategory(fields)}
                            className="text-xs hover:opacity-80"
                            style={{ color: '#2e77cf' }}
                          >
                            Select All
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => handleDeselectAllInCategory(fields)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Deselect All
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {fields.map((field) => (
                          <label key={field.key} className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedFields[field.key]}
                                onChange={() => handleFieldToggle(field.key)}
                                className="sr-only"
                              />
                              <div
                                onClick={() => handleFieldToggle(field.key)}
                                className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center transition-all duration-200"
                                style={{
                                  backgroundColor: selectedFields[field.key] ? '#2e77cf' : 'white',
                                  borderColor: selectedFields[field.key] ? '#2e77cf' : '#d1d5db'
                                }}
                              >
                                {selectedFields[field.key] && (
                                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                      fill="white"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-700">{field.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Format */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                  </svg>
                  Export Format
                </h2>
                <style jsx>{`
                  .custom-radio {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #d1d5db;
                    border-radius: 50%;
                    background-color: white;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                  }
                  .custom-radio:checked {
                    border-color: #2e77cf;
                    background-color: #2e77cf;
                  }
                  .custom-radio:checked::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: white;
                  }
                  .custom-radio:focus {
                    outline: 2px solid #93c5fd;
                    outline-offset: 2px;
                  }

                `}</style>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={reportFormat === 'pdf'}
                      onChange={(e) => setReportFormat(e.target.value as 'pdf')}
                      className="custom-radio"
                    />
                    <span className="text-sm text-gray-700">PDF Document</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="sheets"
                      checked={reportFormat === 'sheets'}
                      onChange={(e) => setReportFormat(e.target.value as 'sheets')}
                      className="custom-radio"
                    />
                    <span className="text-sm text-gray-700">Google Sheets</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  {getSelectedFieldsCount() === 0 && (
                    <p className="text-sm text-red-600">Please select at least one field to generate a report.</p>
                  )}
                  {getSelectedFieldsCount() > 0 && <div></div>}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path>
                      </svg>
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateReport}
                      disabled={getSelectedFieldsCount() === 0}
                      className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                      </svg>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 