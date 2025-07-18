'use client'

import { useState } from 'react'
import { 
  PhotoIcon, 
  DocumentIcon, 
  CheckCircleIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ExclamationTriangleIcon,
  UserIcon,
  ClockIcon,
  DocumentTextIcon,
  IdentificationIcon,
  CameraIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface FormField {
  key: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'number'
  required: boolean
  options?: string[]
  placeholder?: string
  description?: string
}

interface FormData {
  // Personal Information
  employeeId: string
  dateOfBirth: string
  dateOfJoining: string
  language: string
  jobTitle: string
  department: string
  contactNo: string
  residenceLocation: string
  salary: string
  photo: File | null
  nationality: string
  gender: string

  // MOL Information
  molNumber: string
  molStartDate: string
  molExpiryDate: string

  // Emirates ID Information
  emiratesUidNo: string
  emiratesIdNo: string
  emiratesIdIssueDate: string
  emiratesIdExpiryDate: string

  // Passport Information
  passportIssueCountry: string
  passportNo: string
  passportIssueDate: string
  passportExpiryDate: string
  passportHoldingConfirmation: string

  // Visa Information
  visaIssuePlace: string
  visaStartDate: string
  visaExpireDate: string

  // Certifications
  employeeThirdPartyCertificateType: string
  certificateNo: string
  certificateStartDate: string
  certificateExpiryDate: string
  msra: File | null

  // Insurance & Legal
  undertakingLetter: File | null
  groupsInsuranceType: string
  groupsInsuranceStartDate: string
  groupsInsuranceExpiryDate: string
  wcInsurance: string

  // Document files
  emiratesIdFile: File | null
  visaFile: File | null
  groupInsuranceFile: File | null
}

interface AddEmployeeFormProps {
  onDraftSaved: (draft: any) => void
  onEmployeeAdded: (employee: any) => void
}

export default function AddEmployeeForm({ onDraftSaved, onEmployeeAdded }: AddEmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    employeeId: '',
    dateOfBirth: '',
    dateOfJoining: '',
    language: '',
    jobTitle: '',
    department: '',
    contactNo: '',
    residenceLocation: '',
    salary: '',
    photo: null,
    nationality: '',
    gender: '',
    molNumber: '',
    molStartDate: '',
    molExpiryDate: '',
    emiratesUidNo: '',
    emiratesIdNo: '',
    emiratesIdIssueDate: '',
    emiratesIdExpiryDate: '',
    passportIssueCountry: '',
    passportNo: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportHoldingConfirmation: '',
    visaIssuePlace: '',
    visaStartDate: '',
    visaExpireDate: '',
    employeeThirdPartyCertificateType: '',
    certificateNo: '',
    certificateStartDate: '',
    certificateExpiryDate: '',
    msra: null,
    undertakingLetter: null,
    groupsInsuranceType: '',
    groupsInsuranceStartDate: '',
    groupsInsuranceExpiryDate: '',
    wcInsurance: '',
    emiratesIdFile: null,
    visaFile: null,
    groupInsuranceFile: null
  })

  const [stepValidation, setStepValidation] = useState<{ [key: number]: string[] }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic employee details and contact information',
      icon: UserIcon,
      fields: [
        { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true, placeholder: 'EMP001' },
        { key: 'jobTitle', label: 'Job Title', type: 'text' as const, required: true, placeholder: 'Project Manager' },
        { key: 'department', label: 'Department', type: 'select' as const, required: true, options: ['Engineering', 'Finance', 'HR', 'Operations', 'Quality', 'Safety'] },
        { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' as const, required: true },
        { key: 'dateOfJoining', label: 'Date of Joining', type: 'date' as const, required: true },
        { key: 'contactNo', label: 'Contact Number', type: 'tel' as const, required: true, placeholder: '+971 50 123 4567' },
        { key: 'residenceLocation', label: 'Residence Location', type: 'text' as const, required: true, placeholder: 'Dubai Marina' },
        { key: 'salary', label: 'Monthly Salary (AED)', type: 'number' as const, required: true, placeholder: '15000' },
        { key: 'nationality', label: 'Nationality', type: 'text' as const, required: true, placeholder: 'United Arab Emirates' },
        { key: 'gender', label: 'Gender', type: 'select' as const, required: true, options: ['Male', 'Female', 'Other'] },
        { key: 'language', label: 'Primary Language', type: 'select' as const, required: true, options: ['English', 'Arabic', 'Hindi', 'Urdu', 'Filipino', 'Other'] }
      ],
      files: [
        { key: 'photo', label: 'Employee Photo', required: true }
      ]
    },
    {
      id: 'mol',
      title: 'MOL Information',
      description: 'Ministry of Labour registration details',
      icon: IdentificationIcon,
      fields: [
        { key: 'molNumber', label: 'MOL Number', type: 'text' as const, required: true, placeholder: 'MOL-123456789' },
        { key: 'molStartDate', label: 'MOL Start Date', type: 'date' as const, required: true },
        { key: 'molExpiryDate', label: 'MOL Expiry Date', type: 'date' as const, required: true }
      ]
    },
    {
      id: 'emirates-id',
      title: 'Emirates ID',
      description: 'Emirates ID card information',
      icon: IdentificationIcon,
      fields: [
        { key: 'emiratesUidNo', label: 'Emirates UID Number', type: 'text' as const, required: true, placeholder: '784-XXXX-XXXXXXX-X' },
        { key: 'emiratesIdNo', label: 'Emirates ID Number', type: 'text' as const, required: true, placeholder: '784XXXXXXXXXXXXXXX' },
        { key: 'emiratesIdIssueDate', label: 'Issue Date', type: 'date' as const, required: true },
        { key: 'emiratesIdExpiryDate', label: 'Expiry Date', type: 'date' as const, required: true }
      ],
      files: [
        { key: 'emiratesIdFile', label: 'Emirates ID Copy', required: true }
      ]
    },
    {
      id: 'passport',
      title: 'Passport Information',
      description: 'Passport and travel document details',
      icon: DocumentTextIcon,
      fields: [
        { key: 'passportIssueCountry', label: 'Passport Issue Country', type: 'text' as const, required: true, placeholder: 'United Arab Emirates' },
        { key: 'passportNo', label: 'Passport Number', type: 'text' as const, required: true, placeholder: 'A1234567' },
        { key: 'passportIssueDate', label: 'Issue Date', type: 'date' as const, required: true },
        { key: 'passportExpiryDate', label: 'Expiry Date', type: 'date' as const, required: true },
        { key: 'passportHoldingConfirmation', label: 'Passport Holding Confirmation', type: 'select' as const, required: true, options: ['Confirmed', 'Pending', 'Not Applicable'] }
      ]
    },
    {
      id: 'visa',
      title: 'Visa Information',
      description: 'UAE visa and residency permit details',
      icon: DocumentTextIcon,
      fields: [
        { key: 'visaIssuePlace', label: 'Visa Issue Place', type: 'text' as const, required: true, placeholder: 'Dubai' },
        { key: 'visaStartDate', label: 'Visa Start Date', type: 'date' as const, required: true },
        { key: 'visaExpireDate', label: 'Visa Expiry Date', type: 'date' as const, required: true }
      ],
      files: [
        { key: 'visaFile', label: 'Visa Copy', required: true }
      ]
    },
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Professional certificates and qualifications',
      icon: ShieldCheckIcon,
      fields: [
        { key: 'employeeThirdPartyCertificateType', label: 'Certificate Type', type: 'select' as const, required: true, options: ['Safety Certification', 'Technical Certification', 'Professional License', 'Training Certificate', 'Other'] },
        { key: 'certificateNo', label: 'Certificate Number', type: 'text' as const, required: true, placeholder: 'CERT-123456' },
        { key: 'certificateStartDate', label: 'Issue Date', type: 'date' as const, required: true },
        { key: 'certificateExpiryDate', label: 'Expiry Date', type: 'date' as const, required: true }
      ],
      files: [
        { key: 'msra', label: 'MSRA Certificate', required: true }
      ]
    },
    {
      id: 'insurance',
      title: 'Insurance & Legal',
      description: 'Insurance coverage and legal documentation',
      icon: ShieldCheckIcon,
      fields: [
        { key: 'groupsInsuranceType', label: 'Group Insurance Type', type: 'select' as const, required: true, options: ['Health Insurance', 'Life Insurance', 'Comprehensive', 'Basic Coverage'] },
        { key: 'groupsInsuranceStartDate', label: 'Insurance Start Date', type: 'date' as const, required: true },
        { key: 'groupsInsuranceExpiryDate', label: 'Insurance Expiry Date', type: 'date' as const, required: true },
        { key: 'wcInsurance', label: 'WC Insurance', type: 'select' as const, required: true, options: ['Active', 'Pending', 'Not Applicable'] }
      ],
      files: [
        { key: 'undertakingLetter', label: 'Undertaking Letter', required: true },
        { key: 'groupInsuranceFile', label: 'Group Insurance Certificate', required: true }
      ]
    }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear validation errors for this field
    const currentErrors = stepValidation[currentStep] || []
    const fieldLabel = steps[currentStep].fields?.find(f => f.key === field)?.label
    if (fieldLabel) {
      const filteredErrors = currentErrors.filter(error => !error.includes(fieldLabel))
      setStepValidation(prev => ({ ...prev, [currentStep]: filteredErrors }))
    }
  }

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    
    // Clear validation errors for this field
    const currentErrors = stepValidation[currentStep] || []
    const fieldLabel = steps[currentStep].files?.find(f => f.key === field)?.label
    if (fieldLabel) {
      const filteredErrors = currentErrors.filter(error => !error.includes(fieldLabel))
      setStepValidation(prev => ({ ...prev, [currentStep]: filteredErrors }))
    }
  }

  const validateCurrentStep = () => {
    const errors: string[] = []
    const step = steps[currentStep]
    
    // Validate form fields
    step.fields?.forEach((field) => {
      const value = formData[field.key as keyof FormData] as string
      if (field.required && (!value || value.trim() === '')) {
        errors.push(`${field.label} is required`)
      }
    })
    
    // Validate file uploads
    step.files?.forEach((file) => {
      const fileValue = formData[file.key as keyof FormData] as File | null
      if (file.required && !fileValue) {
        errors.push(`${file.label} is required`)
      }
    })
    
    setStepValidation(prev => ({ ...prev, [currentStep]: errors }))
    return errors.length === 0
  }

  const calculateCompletionPercentage = (data: FormData) => {
    const totalFields = 34 // Total number of text fields
    const totalFiles = 6  // Total number of file fields
    const totalItems = totalFields + totalFiles
    
    let completedItems = 0
    
    // Count completed text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'photo' && key !== 'emiratesIdFile' && key !== 'visaFile' && 
          key !== 'msra' && key !== 'undertakingLetter' && key !== 'groupInsuranceFile') {
        if (value && value.toString().trim() !== '') {
          completedItems++
        }
      }
    })
    
    // Count completed file fields
    if (data.photo) completedItems++
    if (data.emiratesIdFile) completedItems++
    if (data.visaFile) completedItems++
    if (data.msra) completedItems++
    if (data.undertakingLetter) completedItems++
    if (data.groupInsuranceFile) completedItems++
    
    return Math.round((completedItems / totalItems) * 100)
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    
    // Simulate API call
    setTimeout(() => {
      const draft = {
        id: `draft-${Date.now()}`,
        employeeId: formData.employeeId || 'New Employee',
        formData,
        completionPercentage: calculateCompletionPercentage(formData),
        lastSaved: new Date(),
        currentStep
      }
      
      onDraftSaved(draft)
      setIsSavingDraft(false)
    }, 1500)
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newEmployee = {
        id: `emp-${Date.now()}`,
        ...formData,
        status: 'Active',
        dateAdded: new Date()
      }
      
      onEmployeeAdded(newEmployee)
      setIsSubmitting(false)
      
      // Reset form
      setFormData({
        employeeId: '',
        dateOfBirth: '',
        dateOfJoining: '',
        language: '',
        jobTitle: '',
        department: '',
        contactNo: '',
        residenceLocation: '',
        salary: '',
        photo: null,
        nationality: '',
        gender: '',
        molNumber: '',
        molStartDate: '',
        molExpiryDate: '',
        emiratesUidNo: '',
        emiratesIdNo: '',
        emiratesIdIssueDate: '',
        emiratesIdExpiryDate: '',
        passportIssueCountry: '',
        passportNo: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportHoldingConfirmation: '',
        visaIssuePlace: '',
        visaStartDate: '',
        visaExpireDate: '',
        employeeThirdPartyCertificateType: '',
        certificateNo: '',
        certificateStartDate: '',
        certificateExpiryDate: '',
        msra: null,
        undertakingLetter: null,
        groupsInsuranceType: '',
        groupsInsuranceStartDate: '',
        groupsInsuranceExpiryDate: '',
        wcInsurance: '',
        emiratesIdFile: null,
        visaFile: null,
        groupInsuranceFile: null
      })
      setCurrentStep(0)
      setStepValidation({})
    }, 2000)
  }

  const renderFileUpload = (field: keyof FormData, label: string, required: boolean = true) => {
    const file = formData[field] as File | null
    const hasError = stepValidation[currentStep]?.some(error => error.includes(label))

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
        <div className={`group relative border-2 border-dashed rounded-xl p-6 transition-all hover:border-primary-400 ${
          hasError ? 'border-error-300 bg-error-50' : 
          file ? 'border-success-300 bg-success-50' : 'border-gray-300 bg-gray-50'
        }`}>
          <div className="text-center">
            {file ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="p-3 bg-success-100 rounded-full">
                    <DocumentIcon className="h-8 w-8 text-success-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileChange(field, null)}
                  className="text-xs text-error-600 hover:text-error-700 font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className={`p-3 rounded-full ${
                    hasError ? 'bg-error-100' : 'bg-gray-100 group-hover:bg-primary-100'
                  }`}>
                    <CameraIcon className={`h-8 w-8 ${
                      hasError ? 'text-error-400' : 'text-gray-400 group-hover:text-primary-500'
                    }`} />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={field}
                    className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Choose file
                    <input
                      id={field}
                      type="file"
                      className="sr-only"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                    />
                  </label>
                  <span className="text-sm text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
            )}
          </div>
        </div>
        {hasError && (
          <p className="text-sm text-error-600 flex items-center gap-1">
            <ExclamationTriangleIcon className="h-4 w-4" />
            {label} is required
          </p>
        )}
      </div>
    )
  }

  const completionPercentage = calculateCompletionPercentage(formData)
  const currentStepData = steps[currentStep]
  const currentStepErrors = stepValidation[currentStep] || []

  return (
    <div className="space-y-8">
      {/* Enhanced Progress Header */}
      <div className="card card-elevated p-6 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add New Team Member</h3>
            <p className="text-gray-600">Complete the 8-step process to onboard a new team member</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-primary-600">{completionPercentage}%</p>
            </div>
            <div className="w-24 h-2 bg-primary-200 rounded-full">
              <div 
                className="h-2 bg-primary-600 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Step Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    index < currentStep ? 'bg-success-500 border-success-500 text-white scale-110' :
                    index === currentStep ? 'bg-primary-600 border-primary-600 text-white scale-110' :
                    'bg-gray-200 border-gray-300 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-0.5 ml-2 ${
                      index < currentStep ? 'bg-success-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                <div className="mt-2 text-center max-w-20">
                  <p className={`text-xs font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="card card-elevated p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <currentStepData.icon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h3>
              <p className="text-gray-600">{currentStepData.description}</p>
            </div>
          </div>
          
          {currentStepErrors.length > 0 && (
            <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
              <div className="flex items-center gap-2 text-error-700 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span className="font-medium">Please fix the following errors:</span>
              </div>
              <ul className="text-sm text-error-600 space-y-1">
                {currentStepErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Form Fields */}
        {currentStepData.fields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentStepData.fields.map((field) => {
              const hasError = currentStepErrors.some(error => error.includes(field.label))
              return (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    {field.label}
                    {field.required && <span className="text-error-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.key}
                      value={formData[field.key as keyof FormData] as string}
                      onChange={(e) => handleInputChange(field.key as keyof FormData, e.target.value)}
                      className={`form-input ${hasError ? 'border-error-300 bg-error-50' : ''}`}
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof FormData] as string}
                      onChange={(e) => handleInputChange(field.key as keyof FormData, e.target.value)}
                      className={`form-input ${hasError ? 'border-error-300 bg-error-50' : ''}`}
                      required={field.required}
                    />
                  )}
                  {hasError && (
                    <p className="text-sm text-error-600 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      {field.label} is required
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* File Uploads */}
        {currentStepData.files && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStepData.files.map((file) => (
              <div key={file.key}>
                {renderFileUpload(file.key as keyof FormData, file.label, file.required)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-50 rounded-lg">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="btn btn-secondary w-full sm:w-auto order-2 sm:order-1"
        >
          {isSavingDraft ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              Saving Draft...
            </>
          ) : (
            <>
              <ClockIcon className="w-4 h-4 mr-2" />
              Save as Draft
            </>
          )}
        </button>

        <div className="flex gap-3 order-1 sm:order-2">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="btn btn-secondary"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next Step
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Adding Employee...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Complete Registration
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 