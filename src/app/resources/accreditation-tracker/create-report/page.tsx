'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'


export default function CreateAccreditationReport() {
  const router = useRouter()
  const { user } = useAuth()
  
  // State for all employee IDs from Excel
  const [allEmployeeIds, setAllEmployeeIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
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
    photo: false,
    
    // MOL Information
    molNumber: false,
    molStartDate: false,
    molExpiryDate: false,
    
    // Emirates ID Information
    emiratesUidNo: false,
    emiratesIdNo: false,
    emiratesIdIssueDate: false,
    emiratesIdExpiryDate: false,
    emiratesIdCopy: false,
    
    // Passport Information
    passportIssueCountry: false,
    passportNo: false,
    passportIssueDate: false,
    passportExpiryDate: false,
    passportHoldingConfirmation: false,
    
    // Visa Information
    visaIssuePlace: false,
    visaStartDate: false,
    visaExpireDate: false,
    visaCopy: false,
    
    // Certificate Information
    employeeThirdPartyCertificateType: false,
    certificateNo: false,
    certificateStartDate: false,
    certificateExpiryDate: false,
    msra: false,
    undertakingLetter: false,
    
    // Insurance Information
    groupsInsuranceType: false,
    groupsInsuranceStartDate: false,
    groupsInsuranceExpiryDate: false,
    wcInsurance: false,
    groupInsuranceCopy: false
  })
  
  // State for report format
  const [reportFormat, setReportFormat] = useState<'pdf' | 'sheets'>('sheets')
  
  // Fetch employee IDs from Excel on component mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Add a timestamp to force refresh the API call
        const response = await fetch(`/api/accreditation-submissions?t=${Date.now()}`)
        const data = await response.json()
        console.log('API Response:', data)
        
        if (data.submissions) {
          const employeeIds = data.submissions.map((sub: any) => sub.employeeId).filter((id: any) => id)
          console.log('Employee IDs found:', employeeIds.length, employeeIds.slice(0, 5))
          setAllEmployeeIds(employeeIds)
        }
      } catch (error) {
        console.error('Error fetching employee data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEmployeeData()
  }, [])
  
  // Icon mappings for each category
  const categoryIcons: Record<string, JSX.Element> = {
    'Personal Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M12,12c2.8,0,5-2.2,5-5s-2.2-5-5-5S7,4.2,7,7S9.2,12,12,12z M21.3,20.8c-1.3-5.1-6.5-8.3-11.6-7c-3.4,0.9-6.1,3.5-7,7c-0.1,0.5,0.2,1.1,0.8,1.2c0.1,0,0.2,0,0.2,0h16.6c0.6,0,1-0.4,1-1C21.3,20.9,21.3,20.8,21.3,20.8z"></path>
      </svg>
    ),
    'MOL Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M21.7,10.3l-9-8c-0.4-0.3-0.9-0.3-1.3,0l-9,8c-0.4,0.4-0.5,1-0.1,1.4s1,0.5,1.4,0.1L4,11.4V21c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-9.6l0.3,0.3c0.4,0.4,1,0.3,1.4-0.1C22.1,11.3,22.1,10.6,21.7,10.3z M12,11c1.5,0,2.7,1.2,2.7,2.7c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7S10.5,11,12,11z M7,20c0-0.1,0-0.1,0.1-0.2c2.2-2.7,6.2-3.2,8.9-1c0.4,0.3,0.7,0.6,1,1c0,0,0,0.1,0.1,0.2H7z"></path>
      </svg>
    ),
    'Emirates ID Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
      </svg>
    ),
    'Passport Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
      </svg>
    ),
    'Visa Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
      </svg>
    ),
    'Certificate Information': (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M22.6,13.9c-0.2-0.2-0.5-0.3-0.8-0.2c-0.8,0.2-1.6,0-2.2-0.5c-0.4-0.3-0.8-0.3-1.2,0c-0.6,0.5-1.4,0.6-2.2,0.5c-0.5-0.1-1.1,0.2-1.2,0.8c0,0.1,0,0.1,0,0.2v2.3c0,1.5,0.7,2.8,1.8,3.7l1.6,1.2c0.4,0.3,0.8,0.3,1.2,0l1.6-1.2c1.2-0.9,1.8-2.2,1.8-3.7v-2.3C23,14.3,22.9,14,22.6,13.9z M13.5,16.9v-2.3c0-1.4,1.1-2.5,2.5-2.5c0.2,0,0.4,0,0.5,0.1c0.4,0.1,0.7,0,1-0.2c0.7-0.5,1.7-0.6,2.5-0.3V10h-5c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h9.2L16,21.8C14.4,20.7,13.5,18.9,13.5,16.9z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.5,8,9,8z M10.5,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.5c0.6,0,1,0.4,1,1S11.1,18,10.5,18z M11.5,14L9,14c-0.6,0-1-0.4-1-1s0.4-1,1-1l2.5,0c0.6,0,1,0.4,1,1S12.1,14,11.5,14z"></path>
      </svg>
    ),
    'Insurance Information': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#2e77cf" d="M14.9 8h4.5L14 2.6V7c0 .5.4 1 .9 1zm.1 2c-1.6 0-3-1.3-3-2.9V2H7C5.4 2 4 3.3 4 4.9V19c0 1.6 1.3 3 2.9 3H17c1.6 0 3-1.3 3-2.9V10h-5zM9 8h1c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1zm6 10h-.9c-.5 0-.9-.3-1-.8-.2.1-.3.2-.5.3-.2.3-.6.5-1 .5-.2 0-.4 0-.5-.1-.5-.4-.7-1.1-.5-1.7-.1 0-.2.1-.3.1-.2.1-.3.4-.3.7 0 .5-.4 1-1 1-.5 0-1-.4-1-.9 0-1 .5-2 1.4-2.5.9-.6 2.1-.5 3 .2.1.2.2.3.3.5.2-.1.4-.2.6-.2.6-.2 1.2 0 1.6.5.1.1.2.3.3.5.5.1.9.6.9 1.1-.2.4-.6.8-1.1.8z"/>
      </svg>
    )
  }

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
      { key: 'gender', label: 'Gender' },
      { key: 'photo', label: 'Photo' }
    ],
    'MOL Information': [
      { key: 'molNumber', label: 'MOL Number' },
      { key: 'molStartDate', label: 'MOL Start Date' },
      { key: 'molExpiryDate', label: 'MOL Expiry Date' }
    ],
    'Emirates ID Information': [
      { key: 'emiratesUidNo', label: 'Emirates UID No.' },
      { key: 'emiratesIdNo', label: 'Emirates ID No.' },
      { key: 'emiratesIdIssueDate', label: 'Emirates ID Issue Date' },
      { key: 'emiratesIdExpiryDate', label: 'Emirates ID Expiry Date' },
      { key: 'emiratesIdCopy', label: 'Emirates ID Copy' }
    ],
    'Passport Information': [
      { key: 'passportIssueCountry', label: 'Passport Issue Country' },
      { key: 'passportNo', label: 'Passport No.' },
      { key: 'passportIssueDate', label: 'Passport Issue Date' },
      { key: 'passportExpiryDate', label: 'Passport Expiry Date' },
      { key: 'passportHoldingConfirmation', label: 'Passport Holding Confirmation' }
    ],
    'Visa Information': [
      { key: 'visaIssuePlace', label: 'Visa Issue Place' },
      { key: 'visaStartDate', label: 'Visa Start Date' },
      { key: 'visaExpireDate', label: 'Visa Expiry Date' },
      { key: 'visaCopy', label: 'Visa Copy' }
    ],
    'Certificate Information': [
      { key: 'employeeThirdPartyCertificateType', label: 'Employee Third Party Certificate Type' },
      { key: 'certificateNo', label: 'Certificate No.' },
      { key: 'certificateStartDate', label: 'Certificate Start Date' },
      { key: 'certificateExpiryDate', label: 'Certificate Expiry Date' },
      { key: 'msra', label: 'MSRA' },
      { key: 'undertakingLetter', label: 'Undertaking Letter' }
    ],
    'Insurance Information': [
      { key: 'groupsInsuranceType', label: 'Group Insurance Type' },
      { key: 'groupsInsuranceStartDate', label: 'Group Insurance Start Date' },
      { key: 'groupsInsuranceExpiryDate', label: 'Group Insurance Expiry Date' },
      { key: 'wcInsurance', label: 'WC Insurance' },
      { key: 'groupInsuranceCopy', label: 'Group Insurance Copy' }
    ]
  }

  // List of attachment fields
  const attachmentFields = ['photo', 'emiratesIdCopy', 'visaCopy', 'msra', 'undertakingLetter', 'wcInsurance', 'groupInsuranceCopy']

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

  const handleGenerateReport = async () => {
    const selectedFieldsList = Object.entries(selectedFields)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key)
    
    const employeeIdsList = employeeIds.split(',').map(id => id.trim()).filter(id => id)
    
    console.log('Generating report with:', {
      employeeIds: employeeIdsList,
      employeeIdsRaw: employeeIds,
      fields: selectedFieldsList,
      format: reportFormat
    })
    
    if (selectedFieldsList.length === 0) {
      toast.error('Please select at least one field to include in the report');
      return;
    }
    
    try {
      const loadingToast = toast.loading(`Generating ${reportFormat === 'sheets' ? 'Excel' : 'PDF'} report...`);
      
      // Get the Google access token if using Google Sheets
      let accessToken = null;
      if (reportFormat === 'sheets') {
        accessToken = sessionStorage.getItem('google_access_token');
        console.log('Access token from session:', accessToken ? 'Found' : 'Not found');
        
        // If no token, fall back to Excel download
        if (!accessToken) {
          console.log('No access token found, falling back to Excel download');
          // Continue without token - API will handle Excel generation
        }
      }
      
      const response = await fetch('/api/accreditation-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.email || 'anonymous'
        },
        body: JSON.stringify({
          employeeIds: employeeIdsList,
          selectedFields: selectedFieldsList,
          format: reportFormat === 'sheets' ? 'excel' : reportFormat,
          accessToken: null // Skip Google Sheets API for now
        })
      });

      if (!response.ok) {
        let errorMessage = `Failed to generate report: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('Report generation failed:', errorData);
          if (errorData.error) {
            errorMessage = errorData.error;
            if (errorData.details) {
              errorMessage += `: ${errorData.details}`;
            }
          }
        } catch (e) {
          // If response is not JSON, try text
          const errorText = await response.text();
          console.error('Report generation failed (text):', errorText);
        }
        throw new Error(errorMessage);
      }

      if (reportFormat === 'sheets') {
        // Handle Excel download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `accreditation-report-${timestamp}.xlsx`;
        
        // Create a temporary download link
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        toast.dismiss(loadingToast);
        toast.success('Excel report downloaded successfully! You can open it in Google Sheets.');
        
        // Navigate to reports page after successful generation
        setTimeout(() => {
          router.push('/resources/accreditation-tracker/reports');
        }, 1500);
      } else {
        // TODO: Handle PDF format
        toast.dismiss(loadingToast);
        toast.error('PDF format not yet implemented');
      }
          } catch (error) {
        console.error('Error generating report:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to generate report';
        toast.error(errorMessage);
      }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 py-6">
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

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-8">
              {/* Employee IDs Input */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M12,12c2.8,0,5-2.2,5-5s-2.2-5-5-5S7,4.2,7,7S9.2,12,12,12z M21.3,20.8c-1.3-5.1-6.5-8.3-11.6-7c-3.4,0.9-6.1,3.5-7,7c-0.1,0.5,0.2,1.1,0.8,1.2c0.1,0,0.2,0,0.2,0h16.6c0.6,0,1-0.4,1-1C21.3,20.9,21.3,20.8,21.3,20.8z"></path>
                  </svg>
                  Employee Selection
                </h2>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSelectAllEmployees}
                        className="text-xs hover:opacity-80"
                        style={{ color: '#2e77cf' }}
                        disabled={loading}
                      >
                        Select All {loading ? '(Loading...)' : `(${allEmployeeIds.length})`}
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
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={3}
                    placeholder="Enter employee ID separated by commas (0001, 0002, 0003)"
                  />
                </div>
              </div>

              {/* Field Selection */}
              <div className="mt-6">
                <div className="space-y-6">
                  {Object.entries(fieldCategories).map(([categoryName, fields]) => (
                    <div key={categoryName} className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                        {categoryIcons[categoryName]}
                        {categoryName}
                      </h2>
                      <div className="w-full bg-white border border-gray-300 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
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
                            <span className="text-sm text-gray-700 flex items-center gap-1">
                              {field.label}
                              {attachmentFields.includes(field.key) && (
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



              {/* Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-4">
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
                        <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M22.6,13.9c-0.2-0.2-0.5-0.3-0.8-0.2c-0.8,0.2-1.6,0-2.2-0.5c-0.4-0.3-0.8-0.3-1.2,0c-0.6,0.5-1.4,0.6-2.2,0.5c-0.5-0.1-1.1,0.2-1.2,0.8c0,0.1,0,0.1,0,0.2v2.3c0,1.5,0.7,2.8,1.8,3.7l1.6,1.2c0.4,0.3,0.8,0.3,1.2,0l1.6-1.2c1.2-0.9,1.8-2.2,1.8-3.7v-2.3C23,14.3,22.9,14,22.6,13.9z M13.5,16.9v-2.3c0-1.4,1.1-2.5,2.5-2.5c0.2,0,0.4,0,0.5,0.1c0.4,0.1,0.7,0,1-0.2c0.7-0.5,1.7-0.6,2.5-0.3V10h-5c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h9.2L16,21.8C14.4,20.7,13.5,18.9,13.5,16.9z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.5,8,9,8z M10.5,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.5c0.6,0,1,0.4,1,1S11.1,18,10.5,18z M11.5,14L9,14c-0.6,0-1-0.4-1-1s0.4-1,1-1l2.5,0c0.6,0,1,0.4,1,1S12.1,14,11.5,14z"></path>
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
      </div>
    </MainLayout>
  )
} 