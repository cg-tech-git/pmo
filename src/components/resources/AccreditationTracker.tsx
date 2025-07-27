'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AccreditationTracker() {
  const router = useRouter()

  // Date picker helper functions - moved before useState to avoid ReferenceError
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  const parseDate = (dateString: string) => {
    if (!dateString) return new Date()
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // State for form data
  const [formData, setFormData] = useState({
    // Personal Information
    employeeId: '',
    dateOfBirth: '',
    dateOfJoining: '',
    language: '',
    jobTitle: '',
    department: '',
    contactNo: '',
    residenceLocation: '',
    salary: '',
    nationality: '',
    gender: '',
    
    // MOL Information
    molNumber: '',
    molStartDate: '',
    molExpiryDate: '',
    
    // Emirates ID Information
    emiratesUidNo: '',
    emiratesIdNo: '',
    emiratesIdIssueDate: '',
    emiratesIdExpiryDate: '',
    
    // Passport Information
    passportIssueCountry: '',
    passportNo: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportHoldingConfirmation: '',
    
    // Visa Information
    visaIssuePlace: '',
    visaStartDate: '',
    visaExpireDate: '',
    
    // Certificate Information
    employeeThirdPartyCertificateType: '',
    certificateNo: '',
    certificateStartDate: '',
    certificateExpiryDate: '',
    
    // Insurance Information
    groupsInsuranceType: '',
    groupsInsuranceStartDate: '',
    groupsInsuranceExpiryDate: '',
    wcInsurance: ''
  })

  // State for date pickers
  const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false)
  const [showDateOfJoiningPicker, setShowDateOfJoiningPicker] = useState(false)
  const [showMolStartDatePicker, setShowMolStartDatePicker] = useState(false)
  const [showMolExpiryDatePicker, setShowMolExpiryDatePicker] = useState(false)
  const [showEmiratesIdIssueDatePicker, setShowEmiratesIdIssueDatePicker] = useState(false)
  const [showEmiratesIdExpiryDatePicker, setShowEmiratesIdExpiryDatePicker] = useState(false)
  const [showPassportIssueDatePicker, setShowPassportIssueDatePicker] = useState(false)
  const [showPassportExpiryDatePicker, setShowPassportExpiryDatePicker] = useState(false)
  const [showVisaStartDatePicker, setShowVisaStartDatePicker] = useState(false)
  const [showVisaExpireDatePicker, setShowVisaExpireDatePicker] = useState(false)
  const [showCertificateStartDatePicker, setShowCertificateStartDatePicker] = useState(false)
  const [showCertificateExpiryDatePicker, setShowCertificateExpiryDatePicker] = useState(false)
  const [showGroupsInsuranceStartDatePicker, setShowGroupsInsuranceStartDatePicker] = useState(false)
  const [showGroupsInsuranceExpiryDatePicker, setShowGroupsInsuranceExpiryDatePicker] = useState(false)
  
  // Dropdown states
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const [showPassportConfirmationDropdown, setShowPassportConfirmationDropdown] = useState(false)

  // Refs for date pickers
  const dateOfBirthPickerRef = useRef<HTMLDivElement>(null)
  const dateOfJoiningPickerRef = useRef<HTMLDivElement>(null)
  const molStartDatePickerRef = useRef<HTMLDivElement>(null)
  const molExpiryDatePickerRef = useRef<HTMLDivElement>(null)
  const emiratesIdIssueDatePickerRef = useRef<HTMLDivElement>(null)
  const emiratesIdExpiryDatePickerRef = useRef<HTMLDivElement>(null)
  const passportIssueDatePickerRef = useRef<HTMLDivElement>(null)
  const passportExpiryDatePickerRef = useRef<HTMLDivElement>(null)
  const visaStartDatePickerRef = useRef<HTMLDivElement>(null)
  const visaExpireDatePickerRef = useRef<HTMLDivElement>(null)
  const certificateStartDatePickerRef = useRef<HTMLDivElement>(null)
  const certificateExpiryDatePickerRef = useRef<HTMLDivElement>(null)
  const groupsInsuranceStartDatePickerRef = useRef<HTMLDivElement>(null)
  const groupsInsuranceExpiryDatePickerRef = useRef<HTMLDivElement>(null)
  
  // Dropdown refs
  const genderDropdownRef = useRef<HTMLDivElement>(null)
  const passportConfirmationDropdownRef = useRef<HTMLDivElement>(null)

  // View dates for each picker
  const [dateOfBirthViewDate, setDateOfBirthViewDate] = useState(() => parseDate(formData.dateOfBirth))
  const [dateOfJoiningViewDate, setDateOfJoiningViewDate] = useState(() => parseDate(formData.dateOfJoining))
  const [molStartDateViewDate, setMolStartDateViewDate] = useState(() => parseDate(formData.molStartDate))
  const [molExpiryDateViewDate, setMolExpiryDateViewDate] = useState(() => parseDate(formData.molExpiryDate))
  const [emiratesIdIssueDateViewDate, setEmiratesIdIssueDateViewDate] = useState(() => parseDate(formData.emiratesIdIssueDate))
  const [emiratesIdExpiryDateViewDate, setEmiratesIdExpiryDateViewDate] = useState(() => parseDate(formData.emiratesIdExpiryDate))
  const [passportIssueDateViewDate, setPassportIssueDateViewDate] = useState(() => parseDate(formData.passportIssueDate))
  const [passportExpiryDateViewDate, setPassportExpiryDateViewDate] = useState(() => parseDate(formData.passportExpiryDate))
  const [visaStartDateViewDate, setVisaStartDateViewDate] = useState(() => parseDate(formData.visaStartDate))
  const [visaExpireDateViewDate, setVisaExpireDateViewDate] = useState(() => parseDate(formData.visaExpireDate))
  const [certificateStartDateViewDate, setCertificateStartDateViewDate] = useState(() => parseDate(formData.certificateStartDate))
  const [certificateExpiryDateViewDate, setCertificateExpiryDateViewDate] = useState(() => parseDate(formData.certificateExpiryDate))
  const [groupsInsuranceStartDateViewDate, setGroupsInsuranceStartDateViewDate] = useState(() => parseDate(formData.groupsInsuranceStartDate))
  const [groupsInsuranceExpiryDateViewDate, setGroupsInsuranceExpiryDateViewDate] = useState(() => parseDate(formData.groupsInsuranceExpiryDate))

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateOfBirthPickerRef.current && !dateOfBirthPickerRef.current.contains(event.target as Node)) {
        setShowDateOfBirthPicker(false)
      }
      if (dateOfJoiningPickerRef.current && !dateOfJoiningPickerRef.current.contains(event.target as Node)) {
        setShowDateOfJoiningPicker(false)
      }
      if (molStartDatePickerRef.current && !molStartDatePickerRef.current.contains(event.target as Node)) {
        setShowMolStartDatePicker(false)
      }
      if (molExpiryDatePickerRef.current && !molExpiryDatePickerRef.current.contains(event.target as Node)) {
        setShowMolExpiryDatePicker(false)
      }
      if (emiratesIdIssueDatePickerRef.current && !emiratesIdIssueDatePickerRef.current.contains(event.target as Node)) {
        setShowEmiratesIdIssueDatePicker(false)
      }
      if (emiratesIdExpiryDatePickerRef.current && !emiratesIdExpiryDatePickerRef.current.contains(event.target as Node)) {
        setShowEmiratesIdExpiryDatePicker(false)
      }
      if (passportIssueDatePickerRef.current && !passportIssueDatePickerRef.current.contains(event.target as Node)) {
        setShowPassportIssueDatePicker(false)
      }
      if (passportExpiryDatePickerRef.current && !passportExpiryDatePickerRef.current.contains(event.target as Node)) {
        setShowPassportExpiryDatePicker(false)
      }
      if (visaStartDatePickerRef.current && !visaStartDatePickerRef.current.contains(event.target as Node)) {
        setShowVisaStartDatePicker(false)
      }
      if (visaExpireDatePickerRef.current && !visaExpireDatePickerRef.current.contains(event.target as Node)) {
        setShowVisaExpireDatePicker(false)
      }
      if (certificateStartDatePickerRef.current && !certificateStartDatePickerRef.current.contains(event.target as Node)) {
        setShowCertificateStartDatePicker(false)
      }
      if (certificateExpiryDatePickerRef.current && !certificateExpiryDatePickerRef.current.contains(event.target as Node)) {
        setShowCertificateExpiryDatePicker(false)
      }
      if (groupsInsuranceStartDatePickerRef.current && !groupsInsuranceStartDatePickerRef.current.contains(event.target as Node)) {
        setShowGroupsInsuranceStartDatePicker(false)
      }
      if (groupsInsuranceExpiryDatePickerRef.current && !groupsInsuranceExpiryDatePickerRef.current.contains(event.target as Node)) {
        setShowGroupsInsuranceExpiryDatePicker(false)
      }
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target as Node)) {
        setShowGenderDropdown(false)
      }
      if (passportConfirmationDropdownRef.current && !passportConfirmationDropdownRef.current.contains(event.target as Node)) {
        setShowPassportConfirmationDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Calendar component
  const DatePickerModal = ({ 
    isOpen, 
    onClose, 
    value, 
    onChange, 
    viewDate, 
    setViewDate 
  }: {
    isOpen: boolean
    onClose: () => void
    value: string
    onChange: (date: string) => void
    viewDate: Date
    setViewDate: (date: Date) => void
  }) => {
    if (!isOpen) return null

    return (
      <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80">
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-sm font-semibold text-gray-900">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h3>
          
          <button
            type="button"
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-xs font-medium text-gray-500 text-center py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: getFirstDayOfMonth(viewDate) }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {/* Days of the month */}
          {Array.from({ length: getDaysInMonth(viewDate) }, (_, i) => {
            const day = i + 1
            const dateString = formatDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
            const isSelected = value === dateString
            const isToday = dateString === formatDate(new Date())
            
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  onChange(dateString)
                  onClose()
                }}
                className={`
                  p-2 text-sm rounded-lg transition-colors
                  ${isSelected ? 'bg-blue-100 text-primary-600 font-medium' : 
                    isToday ? 'bg-gray-100 text-gray-900 font-medium' :
                    'hover:bg-gray-100 text-gray-700'}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
        
        {/* Today button */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              const today = formatDate(new Date())
              onChange(today)
              setViewDate(new Date())
              onClose()
            }}
            className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Today
          </button>
        </div>
      </div>
    )
  }

  // Mock data - in real app this would come from a database
  useEffect(() => {
    // Initialize any necessary data here
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="mb-2">
            <button
              onClick={() => router.push('/resources')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Resources
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manpower Accreditation</h1>
          <p className="text-gray-600">Manage employee accreditation records, generate reports and track certification progress for compliance and workforce planning.</p>
          
          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">

            <button
              type="button"
              onClick={() => router.push('/resources/accreditation-tracker/create-report')}
              className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,13h-3v3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S16.6,13,16,13z"></path>
              </svg>
              Create Report
            </button>
            <button
              type="button"
              className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                <path fill="currentColor" d="M16,1.4H4c-0.6,0-1,0.4-1,1v18c0,0.6,0.4,1,1,1h12c1.7,0,3-1.3,3-3v-14C19,2.8,17.7,1.4,16,1.4z M15,10.4c0,0.6-0.4,1-1,1H8c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1V10.4z"></path>
              </svg>
              View Reports
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M12,12c2.8,0,5-2.2,5-5s-2.2-5-5-5S7,4.2,7,7S9.2,12,12,12z M21.3,20.8c-1.3-5.1-6.5-8.3-11.6-7c-3.4,0.9-6.1,3.5-7,7c-0.1,0.5,0.2,1.1,0.8,1.2c0.1,0,0.2,0,0.2,0h16.6c0.6,0,1-0.4,1-1C21.3,20.9,21.3,20.8,21.3,20.8z"></path>
                  </svg>
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter employee ID"
                    />
                  </div>
                  <div className="relative" ref={dateOfBirthPickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <button
                      type="button"
                      onClick={() => setShowDateOfBirthPicker(!showDateOfBirthPicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.dateOfBirth ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.dateOfBirth ? new Date(formData.dateOfBirth + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select date of birth'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showDateOfBirthPicker}
                      onClose={() => setShowDateOfBirthPicker(false)}
                      value={formData.dateOfBirth}
                      onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                      viewDate={dateOfBirthViewDate}
                      setViewDate={setDateOfBirthViewDate}
                    />
                  </div>
                  <div className="relative" ref={dateOfJoiningPickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining</label>
                    <button
                      type="button"
                      onClick={() => setShowDateOfJoiningPicker(!showDateOfJoiningPicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.dateOfJoining ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.dateOfJoining ? new Date(formData.dateOfJoining + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select date of joining'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showDateOfJoiningPicker}
                      onClose={() => setShowDateOfJoiningPicker(false)}
                      value={formData.dateOfJoining}
                      onChange={(date) => setFormData({ ...formData, dateOfJoining: date })}
                      viewDate={dateOfJoiningViewDate}
                      setViewDate={setDateOfJoiningViewDate}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter language"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter job title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter department"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact No.</label>
                    <input
                      type="tel"
                      value={formData.contactNo}
                      onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Residence Location</label>
                    <input
                      type="text"
                      value={formData.residenceLocation}
                      onChange={(e) => setFormData({ ...formData, residenceLocation: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter residence location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                    <input
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter salary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter nationality"
                    />
                  </div>
                  <div className="relative" ref={genderDropdownRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <button
                      type="button"
                      onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.gender ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.gender === 'male' ? 'Male' : formData.gender === 'female' ? 'Female' : 'Select gender'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showGenderDropdown && (
                      <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                        <div className="max-h-60 overflow-y-auto">
                          {[
                            { value: '', label: 'Select gender' },
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, gender: option.value })
                                setShowGenderDropdown(false)
                              }}
                              className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                                formData.gender === option.value
                                  ? 'bg-blue-100 text-primary-600'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'photo-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('photo-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOL Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M21.7,10.3l-9-8c-0.4-0.3-0.9-0.3-1.3,0l-9,8c-0.4,0.4-0.5,1-0.1,1.4s1,0.5,1.4,0.1L4,11.4V21c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-9.6l0.3,0.3c0.4,0.4,1,0.3,1.4-0.1C22.1,11.3,22.1,10.6,21.7,10.3z M12,11c1.5,0,2.7,1.2,2.7,2.7c0,1.5-1.2,2.7-2.7,2.7c-1.5,0-2.7-1.2-2.7-2.7S10.5,11,12,11z M7,20c0-0.1,0-0.1,0.1-0.2c2.2-2.7,6.2-3.2,8.9-1c0.4,0.3,0.7,0.6,1,1c0,0,0,0.1,0.1,0.2H7z"></path>
                  </svg>
                  MOL Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MOL Number</label>
                    <input
                      type="text"
                      value={formData.molNumber}
                      onChange={(e) => setFormData({ ...formData, molNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter MOL number"
                    />
                  </div>
                  <div className="relative" ref={molStartDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MOL Start Date</label>
                    <button
                      type="button"
                      onClick={() => setShowMolStartDatePicker(!showMolStartDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.molStartDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.molStartDate ? new Date(formData.molStartDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select MOL start date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showMolStartDatePicker}
                      onClose={() => setShowMolStartDatePicker(false)}
                      value={formData.molStartDate}
                      onChange={(date) => setFormData({ ...formData, molStartDate: date })}
                      viewDate={molStartDateViewDate}
                      setViewDate={setMolStartDateViewDate}
                    />
                  </div>
                  <div className="relative" ref={molExpiryDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MOL Expiry Date</label>
                    <button
                      type="button"
                      onClick={() => setShowMolExpiryDatePicker(!showMolExpiryDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.molExpiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.molExpiryDate ? new Date(formData.molExpiryDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select MOL expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showMolExpiryDatePicker}
                      onClose={() => setShowMolExpiryDatePicker(false)}
                      value={formData.molExpiryDate}
                      onChange={(date) => setFormData({ ...formData, molExpiryDate: date })}
                      viewDate={molExpiryDateViewDate}
                      setViewDate={setMolExpiryDateViewDate}
                    />
                  </div>
                </div>
              </div>

              {/* Emirates ID Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
                  </svg>
                  Emirates ID Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates UID No.</label>
                    <input
                      type="text"
                      value={formData.emiratesUidNo}
                      onChange={(e) => setFormData({ ...formData, emiratesUidNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter Emirates UID number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID No.</label>
                    <input
                      type="text"
                      value={formData.emiratesIdNo}
                      onChange={(e) => setFormData({ ...formData, emiratesIdNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter Emirates ID number"
                    />
                  </div>
                  <div className="relative" ref={emiratesIdIssueDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID Issue Date</label>
                    <button
                      type="button"
                      onClick={() => setShowEmiratesIdIssueDatePicker(!showEmiratesIdIssueDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.emiratesIdIssueDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.emiratesIdIssueDate ? new Date(formData.emiratesIdIssueDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select Emirates ID issue date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showEmiratesIdIssueDatePicker}
                      onClose={() => setShowEmiratesIdIssueDatePicker(false)}
                      value={formData.emiratesIdIssueDate}
                      onChange={(date) => setFormData({ ...formData, emiratesIdIssueDate: date })}
                      viewDate={emiratesIdIssueDateViewDate}
                      setViewDate={setEmiratesIdIssueDateViewDate}
                    />
                  </div>

                  <div className="relative" ref={emiratesIdExpiryDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID Expiry Date</label>
                    <button
                      type="button"
                      onClick={() => setShowEmiratesIdExpiryDatePicker(!showEmiratesIdExpiryDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.emiratesIdExpiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.emiratesIdExpiryDate ? new Date(formData.emiratesIdExpiryDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select Emirates ID expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showEmiratesIdExpiryDatePicker}
                      onClose={() => setShowEmiratesIdExpiryDatePicker(false)}
                      value={formData.emiratesIdExpiryDate}
                      onChange={(date) => setFormData({ ...formData, emiratesIdExpiryDate: date })}
                      viewDate={emiratesIdExpiryDateViewDate}
                      setViewDate={setEmiratesIdExpiryDateViewDate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID Copy</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'emirates-id-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('emirates-id-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passport Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
                  </svg>
                  Passport Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Issue Country</label>
                    <input
                      type="text"
                      value={formData.passportIssueCountry}
                      onChange={(e) => setFormData({ ...formData, passportIssueCountry: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter passport issue country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport No.</label>
                    <input
                      type="text"
                      value={formData.passportNo}
                      onChange={(e) => setFormData({ ...formData, passportNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter passport number"
                    />
                  </div>
                  <div className="relative" ref={passportIssueDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Issue Date</label>
                    <button
                      type="button"
                      onClick={() => setShowPassportIssueDatePicker(!showPassportIssueDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.passportIssueDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.passportIssueDate ? new Date(formData.passportIssueDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select passport issue date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showPassportIssueDatePicker}
                      onClose={() => setShowPassportIssueDatePicker(false)}
                      value={formData.passportIssueDate}
                      onChange={(date) => setFormData({ ...formData, passportIssueDate: date })}
                      viewDate={passportIssueDateViewDate}
                      setViewDate={setPassportIssueDateViewDate}
                    />
                  </div>

                  <div className="relative" ref={passportExpiryDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Expiry Date</label>
                    <button
                      type="button"
                      onClick={() => setShowPassportExpiryDatePicker(!showPassportExpiryDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.passportExpiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.passportExpiryDate ? new Date(formData.passportExpiryDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select passport expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showPassportExpiryDatePicker}
                      onClose={() => setShowPassportExpiryDatePicker(false)}
                      value={formData.passportExpiryDate}
                      onChange={(date) => setFormData({ ...formData, passportExpiryDate: date })}
                      viewDate={passportExpiryDateViewDate}
                      setViewDate={setPassportExpiryDateViewDate}
                    />
                  </div>
                  <div className="relative" ref={passportConfirmationDropdownRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passport Holding Confirmation</label>
                    <button
                      type="button"
                      onClick={() => setShowPassportConfirmationDropdown(!showPassportConfirmationDropdown)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.passportHoldingConfirmation ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.passportHoldingConfirmation === 'yes' ? 'Yes' : formData.passportHoldingConfirmation === 'no' ? 'No' : 'Select confirmation'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showPassportConfirmationDropdown && (
                      <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                        <div className="max-h-60 overflow-y-auto">
                          {[
                            { value: '', label: 'Select confirmation' },
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, passportHoldingConfirmation: option.value })
                                setShowPassportConfirmationDropdown(false)
                              }}
                              className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                                formData.passportHoldingConfirmation === option.value
                                  ? 'bg-blue-100 text-primary-600'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visa Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M12,6C12,6,12,6,12,6c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8C9.2,7.2,10.5,6,12,6z M16.6,17.9c-0.1,0-0.2,0.1-0.4,0.1H7.7c-0.6,0-1-0.5-1-1c0-0.1,0-0.2,0.1-0.4c1.1-2.9,4.3-4.3,7.2-3.2c1.5,0.6,2.6,1.7,3.2,3.2C17.4,17.2,17.1,17.7,16.6,17.9z"></path>
                  </svg>
                  Visa Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Issue Place</label>
                    <input
                      type="text"
                      value={formData.visaIssuePlace}
                      onChange={(e) => setFormData({ ...formData, visaIssuePlace: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter visa issue place"
                    />
                  </div>
                  <div className="relative" ref={visaStartDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Start Date</label>
                    <button
                      type="button"
                      onClick={() => setShowVisaStartDatePicker(!showVisaStartDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.visaStartDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.visaStartDate ? new Date(formData.visaStartDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select visa start date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showVisaStartDatePicker}
                      onClose={() => setShowVisaStartDatePicker(false)}
                      value={formData.visaStartDate}
                      onChange={(date) => setFormData({ ...formData, visaStartDate: date })}
                      viewDate={visaStartDateViewDate}
                      setViewDate={setVisaStartDateViewDate}
                    />
                  </div>
                  <div className="relative" ref={visaExpireDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Expiry Date</label>
                                          <button
                        type="button"
                        onClick={() => setShowVisaExpireDatePicker(!showVisaExpireDatePicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.visaExpireDate ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.visaExpireDate ? new Date(formData.visaExpireDate + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Select visa expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showVisaExpireDatePicker}
                      onClose={() => setShowVisaExpireDatePicker(false)}
                      value={formData.visaExpireDate}
                      onChange={(date) => setFormData({ ...formData, visaExpireDate: date })}
                      viewDate={visaExpireDateViewDate}
                      setViewDate={setVisaExpireDateViewDate}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visa Copy</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'visa-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('visa-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M22.6,13.9c-0.2-0.2-0.5-0.3-0.8-0.2c-0.8,0.2-1.6,0-2.2-0.5c-0.4-0.3-0.8-0.3-1.2,0c-0.6,0.5-1.4,0.6-2.2,0.5c-0.5-0.1-1.1,0.2-1.2,0.8c0,0.1,0,0.1,0,0.2v2.3c0,1.5,0.7,2.8,1.8,3.7l1.6,1.2c0.4,0.3,0.8,0.3,1.2,0l1.6-1.2c1.2-0.9,1.8-2.2,1.8-3.7v-2.3C23,14.3,22.9,14,22.6,13.9z M13.5,16.9v-2.3c0-1.4,1.1-2.5,2.5-2.5c0.2,0,0.4,0,0.5,0.1c0.4,0.1,0.7,0,1-0.2c0.7-0.5,1.7-0.6,2.5-0.3V10h-5c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h9.2L16,21.8C14.4,20.7,13.5,18.9,13.5,16.9z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.5,8,9,8z M10.5,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.5c0.6,0,1,0.4,1,1S11.1,18,10.5,18z M11.5,14L9,14c-0.6,0-1-0.4-1-1s0.4-1,1-1l2.5,0c0.6,0,1,0.4,1,1S12.1,14,11.5,14z"></path>
                  </svg>
                  Certificate Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee Third Party Certificate Type</label>
                    <input
                      type="text"
                      value={formData.employeeThirdPartyCertificateType}
                      onChange={(e) => setFormData({ ...formData, employeeThirdPartyCertificateType: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter certificate type"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate No.</label>
                    <input
                      type="text"
                      value={formData.certificateNo}
                      onChange={(e) => setFormData({ ...formData, certificateNo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter certificate number"
                    />
                  </div>
                  <div className="relative" ref={certificateStartDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Start Date</label>
                    <button
                      type="button"
                      onClick={() => setShowCertificateStartDatePicker(!showCertificateStartDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.certificateStartDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.certificateStartDate ? new Date(formData.certificateStartDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select certificate start date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showCertificateStartDatePicker}
                      onClose={() => setShowCertificateStartDatePicker(false)}
                      value={formData.certificateStartDate}
                      onChange={(date) => setFormData({ ...formData, certificateStartDate: date })}
                      viewDate={certificateStartDateViewDate}
                      setViewDate={setCertificateStartDateViewDate}
                    />
                  </div>

                  <div className="relative" ref={certificateExpiryDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Expiry Date</label>
                    <button
                      type="button"
                      onClick={() => setShowCertificateExpiryDatePicker(!showCertificateExpiryDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.certificateExpiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.certificateExpiryDate ? new Date(formData.certificateExpiryDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select certificate expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showCertificateExpiryDatePicker}
                      onClose={() => setShowCertificateExpiryDatePicker(false)}
                      value={formData.certificateExpiryDate}
                      onChange={(date) => setFormData({ ...formData, certificateExpiryDate: date })}
                      viewDate={certificateExpiryDateViewDate}
                      setViewDate={setCertificateExpiryDateViewDate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MSRA</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'msra-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('msra-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Undertaking Letter</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'undertaking-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('undertaking-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#2e77cf" d="M14.9 8h4.5L14 2.6V7c0 .5.4 1 .9 1zm.1 2c-1.6 0-3-1.3-3-2.9V2H7C5.4 2 4 3.3 4 4.9V19c0 1.6 1.3 3 2.9 3H17c1.6 0 3-1.3 3-2.9V10h-5zM9 8h1c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1zm6 10h-.9c-.5 0-.9-.3-1-.8-.2.1-.3.2-.5.3-.2.3-.6.5-1 .5-.2 0-.4 0-.5-.1-.5-.4-.7-1.1-.5-1.7-.1 0-.2.1-.3.1-.2.1-.3.4-.3.7 0 .5-.4 1-1 1-.5 0-1-.4-1-.9 0-1 .5-2 1.4-2.5.9-.6 2.1-.5 3 .2.1.2.2.3.3.5.2-.1.4-.2.6-.2.6-.2 1.2 0 1.6.5.1.1.2.3.3.5.5.1.9.6.9 1.1-.2.4-.6.8-1.1.8z"/>
                  </svg>
                  Insurance Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Insurance Type</label>
                    <input
                      type="text"
                      value={formData.groupsInsuranceType}
                      onChange={(e) => setFormData({ ...formData, groupsInsuranceType: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter group insurance type"
                    />
                  </div>
                  <div className="relative" ref={groupsInsuranceStartDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Insurance Start Date</label>
                    <button
                      type="button"
                      onClick={() => setShowGroupsInsuranceStartDatePicker(!showGroupsInsuranceStartDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.groupsInsuranceStartDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.groupsInsuranceStartDate ? new Date(formData.groupsInsuranceStartDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select insurance start date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showGroupsInsuranceStartDatePicker}
                      onClose={() => setShowGroupsInsuranceStartDatePicker(false)}
                      value={formData.groupsInsuranceStartDate}
                      onChange={(date) => setFormData({ ...formData, groupsInsuranceStartDate: date })}
                      viewDate={groupsInsuranceStartDateViewDate}
                      setViewDate={setGroupsInsuranceStartDateViewDate}
                    />
                  </div>
                  <div className="relative" ref={groupsInsuranceExpiryDatePickerRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Insurance Expiry Date</label>
                    <button
                      type="button"
                      onClick={() => setShowGroupsInsuranceExpiryDatePicker(!showGroupsInsuranceExpiryDatePicker)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                    >
                      <span className={formData.groupsInsuranceExpiryDate ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.groupsInsuranceExpiryDate ? new Date(formData.groupsInsuranceExpiryDate + 'T00:00:00').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Select insurance expiry date'}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <DatePickerModal
                      isOpen={showGroupsInsuranceExpiryDatePicker}
                      onClose={() => setShowGroupsInsuranceExpiryDatePicker(false)}
                      value={formData.groupsInsuranceExpiryDate}
                      onChange={(date) => setFormData({ ...formData, groupsInsuranceExpiryDate: date })}
                      viewDate={groupsInsuranceExpiryDateViewDate}
                      setViewDate={setGroupsInsuranceExpiryDateViewDate}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WC Insurance</label>
                    <input
                      type="text"
                      value={formData.wcInsurance}
                      onChange={(e) => setFormData({ ...formData, wcInsurance: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter WC insurance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Insurance Copy</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select file"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        readOnly
                      />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        ref={(ref) => { if (ref) ref.id = 'insurance-file-input' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const textInput = e.target.parentElement?.querySelector('input[type="text"]') as HTMLInputElement
                            if (textInput) textInput.value = file.name
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => document.getElementById('insurance-file-input')?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                          <path fill="currentColor" d="M18.1,12.4l-6.2,6.2c-1.7,1.7-4.4,1.7-6,0c-1.7-1.7-1.7-4.4,0-6l8-8c1-0.9,2.5-0.9,3.5,0c1,1,1,2.6,0,3.5l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0c0,0,0,0,0,0c-0.3-0.3-0.3-0.8,0-1.1l5.1-5.1c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L8,12.6c-1.1,1.1-1.1,2.8,0,3.9c1.1,1,2.8,1,3.9,0l6.9-6.9c1.8-1.8,1.8-4.6,0-6.4c-1.8-1.8-4.6-1.8-6.4,0l-8,8c-1.2,1.2-1.8,2.8-1.8,4.4c0,3.5,2.8,6.2,6.3,6.2c1.7,0,3.2-0.7,4.4-1.8l6.2-6.2c0.4-0.4,0.4-1,0-1.4S18.5,12,18.1,12.4z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/resources')}
                  className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                                                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path>
                      </svg>
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.2,10.3l-4.8,4.8c-0.4,0.4-1,0.4-1.4,0l0,0l-2.2-2.2c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0c0,0,0,0,0,0l1.5,1.5l4.1-4.1c0.4-0.4,1-0.4,1.4,0C16.6,9.3,16.6,9.9,16.2,10.3z"></path>
                  </svg>
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 