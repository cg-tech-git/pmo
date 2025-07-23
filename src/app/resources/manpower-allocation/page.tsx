'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { generateManpowerAllocationPDF } from '@/lib/pdfGenerator'
import { saveSubmission, generateSubmissionId } from '@/lib/submissionStorage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Employee {
  id: string
  employeeId: string
  employeeName: string
  employeeGrade: string
}

interface CrossHiredManpower {
  id: string
  supplierName: string
  contactNumber: string
  manpowerTotal: string
}

interface ManpowerAllocationForm {
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
  employees: Employee[]
  crossHiredManpower: CrossHiredManpower[]
}

export default function ManpowerAllocation() {
  const router = useRouter()
  
  // Define initial form state
  const initialFormState: ManpowerAllocationForm = {
    date: '',
    time: '',
    jobNumber: '',
    country: '',
    division: '',
    camp: '',
    customer: '',
    customerContact: '',
    projectName: '',
    projectManager: '',
    projectManagerContact: '',
    projectManagerEmail: '',
    employees: [{ id: '1', employeeId: '', employeeName: '', employeeGrade: '' }],
    crossHiredManpower: [{ id: '1', supplierName: '', contactNumber: '', manpowerTotal: '' }]
  }

  const [formData, setFormData] = useState<ManpowerAllocationForm>(initialFormState)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [showDivisionPicker, setShowDivisionPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showCampPicker, setShowCampPicker] = useState(false)
  const timePickerRef = useRef<HTMLDivElement>(null)
  const countryPickerRef = useRef<HTMLDivElement>(null)
  const divisionPickerRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const campPickerRef = useRef<HTMLDivElement>(null)
  
  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false)
      }
      if (countryPickerRef.current && !countryPickerRef.current.contains(event.target as Node)) {
        setShowCountryPicker(false)
      }
      if (divisionPickerRef.current && !divisionPickerRef.current.contains(event.target as Node)) {
        setShowDivisionPicker(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
      if (campPickerRef.current && !campPickerRef.current.contains(event.target as Node)) {
        setShowCampPicker(false)
      }
    }
    
    if (showTimePicker || showCountryPicker || showDivisionPicker || showDatePicker || showCampPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTimePicker, showCountryPicker, showDivisionPicker, showDatePicker, showCampPicker])

  // Date picker helpers
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
  
  const [viewDate, setViewDate] = useState(() => parseDate(formData.date))
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const updateEmployee = (index: number, field: keyof Employee, value: string) => {
    const newEmployees = [...formData.employees]
    newEmployees[index] = { ...newEmployees[index], [field]: value }
    setFormData({ ...formData, employees: newEmployees })
  }

  const addEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      employeeId: '',
      employeeName: '',
      employeeGrade: ''
    }
    setFormData({ ...formData, employees: [...formData.employees, newEmployee] })
  }

  const removeEmployee = (index: number) => {
    if (formData.employees.length > 1) {
      const newEmployees = formData.employees.filter((_, i) => i !== index)
      setFormData({ ...formData, employees: newEmployees })
    }
  }

  const updateCrossHiredManpower = (index: number, field: keyof CrossHiredManpower, value: string) => {
    const newManpower = [...formData.crossHiredManpower]
    newManpower[index] = { ...newManpower[index], [field]: value }
    setFormData({ ...formData, crossHiredManpower: newManpower })
  }

  const addCrossHiredManpower = () => {
    const newManpower: CrossHiredManpower = {
      id: Date.now().toString(),
      supplierName: '',
      contactNumber: '',
      manpowerTotal: ''
    }
    setFormData({ ...formData, crossHiredManpower: [...formData.crossHiredManpower, newManpower] })
  }

  const removeCrossHiredManpower = (index: number) => {
    if (formData.crossHiredManpower.length > 1) {
      const newManpower = formData.crossHiredManpower.filter((_, i) => i !== index)
      setFormData({ ...formData, crossHiredManpower: newManpower })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Generate PDF
      const pdfUrl = generateManpowerAllocationPDF(formData)
      
      // Create submission object
      const submission = {
        id: generateSubmissionId(),
        date: formData.date,
        submissionDate: new Date().toISOString(),
        data: formData,
        pdfUrl: pdfUrl
      }
      
      // Save submission to localStorage
      saveSubmission(submission)
      
      // Open PDF in new tab
      window.open(pdfUrl, '_blank')
      
      // Show success message
      alert('Manpower allocation submitted successfully! PDF report has been generated.')
      
      // Reset form to initial state
      setFormData(initialFormState)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF report. Please try again.')
    }
  }

  return (
    <MainLayout>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Manpower Allocation</h1>
            <p className="text-gray-600">Create manpower allocation reports for project requirements and workforce planning.</p>
            
            {/* View Calendar Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push('/resources/manpower-allocation/calendar')}
                className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                  <path fill="currentColor" d="M19,2.9h-1v-1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H8v-1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H5c-1.7,0-3,1.3-3,3v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-14C22,4.3,20.7,2.9,19,2.9z M7,18.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C8,18.5,7.6,18.9,7,18.9z M7,14.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C8,14.5,7.6,14.9,7,14.9z M12,18.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C13,18.5,12.6,18.9,12,18.9z M12,14.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C13,14.5,12.6,14.9,12,14.9z M17,18.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C18,18.5,17.6,18.9,17,18.9z M17,14.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C18,14.5,17.6,14.9,17,14.9z M20,8.9H4v-3c0-0.6,0.4-1,1-1h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h8v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h1c0.6,0,1,0.4,1,1V8.9z"></path>
                </svg>
                View Calendar
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Information Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#2e77cf" d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M13,16c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4c0-0.6,0.4-1,1-1s1,0.4,1,1V16z M12,9c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,9,12,9z"></path>
                    </svg>
                    Project Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative" ref={datePickerRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <button
                        type="button"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.date ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Select date'}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      
                      {showDatePicker && (
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
                              const isSelected = formData.date === dateString
                              const isToday = dateString === formatDate(new Date())
                              
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, date: dateString })
                                    setShowDatePicker(false)
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
                                setFormData({ ...formData, date: today })
                                setViewDate(new Date())
                                setShowDatePicker(false)
                              }}
                              className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                              Today
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative" ref={timePickerRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <button
                        type="button"
                        onClick={() => setShowTimePicker(!showTimePicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.time ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.time || 'Select time'}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      
                      {showTimePicker && (
                        <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-full">
                          <div className="flex gap-2">
                            {/* Hours */}
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-600 mb-2 text-center">Hour</label>
                              <div className="h-40 overflow-y-auto rounded-lg bg-gray-50 p-1">
                                {Array.from({ length: 24 }, (_, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      const hour = i.toString().padStart(2, '0')
                                      const [, minutes] = (formData.time || '00:00').split(':')
                                      setFormData({ ...formData, time: `${hour}:${minutes}` })
                                    }}
                                    className={`w-full py-2 px-3 text-sm rounded-md transition-colors ${
                                      formData.time?.split(':')[0] === i.toString().padStart(2, '0')
                                        ? 'bg-blue-100 text-primary-600'
                                        : 'hover:bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {i.toString().padStart(2, '0')}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            {/* Minutes */}
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-600 mb-2 text-center">Minute</label>
                              <div className="h-40 overflow-y-auto rounded-lg bg-gray-50 p-1">
                                {Array.from({ length: 60 }, (_, i) => i % 5 === 0 ? i : null).filter(Boolean).map((i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      const minute = i!.toString().padStart(2, '0')
                                      const [hours] = (formData.time || '00:00').split(':')
                                      setFormData({ ...formData, time: `${hours}:${minute}` })
                                    }}
                                    className={`w-full py-2 px-3 text-sm rounded-md transition-colors ${
                                      formData.time?.split(':')[1] === i!.toString().padStart(2, '0')
                                        ? 'bg-blue-100 text-primary-600'
                                        : 'hover:bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {i!.toString().padStart(2, '0')}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setShowTimePicker(false)}
                              className="px-4 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Number</label>
                      <input
                        type="text"
                        value={formData.jobNumber}
                        onChange={(e) => setFormData({ ...formData, jobNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter job number"
                      />
                    </div>

                    <div className="relative" ref={countryPickerRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <button
                        type="button"
                        onClick={() => setShowCountryPicker(!showCountryPicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.country ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.country || 'Select country'}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showCountryPicker && (
                        <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                          <div className="max-h-60 overflow-y-auto">
                            {[
                              'United Arab Emirates',
                              'Saudi Arabia',
                              'Oman',
                              'Bahrain',
                              'Qatar',
                              'Uzbekistan'
                            ].map((country) => (
                              <button
                                key={country}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, country })
                                  setShowCountryPicker(false)
                                }}
                                className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                                  formData.country === country
                                    ? 'bg-blue-100 text-primary-600'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                {country}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative" ref={divisionPickerRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                      <button
                        type="button"
                        onClick={() => setShowDivisionPicker(!showDivisionPicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.division ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.division || 'Select division'}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showDivisionPicker && (
                        <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                          <div className="max-h-60 overflow-y-auto">
                            {[
                              'Events',
                              'Construction',
                              'Mast Climbers',
                              'Site Service',
                              'Powered Access',
                              'Oil & Gas'
                            ].map((division) => (
                              <button
                                key={division}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, division })
                                  setShowDivisionPicker(false)
                                }}
                                className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                                  formData.division === division
                                    ? 'bg-blue-100 text-primary-600'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                {division}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative" ref={campPickerRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Camp</label>
                      <button
                        type="button"
                        onClick={() => setShowCampPicker(!showCampPicker)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between"
                      >
                        <span className={formData.camp ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.camp || 'Select camp'}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {showCampPicker && (
                        <div className="absolute top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                          <div className="max-h-60 overflow-y-auto">
                            {[
                              'DIC',
                              'Sonapur',
                              'Abu Dhabi',
                              'Ras Al Khaimah',
                              'Fujairah',
                              'N/A'
                            ].map((camp) => (
                              <button
                                key={camp}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, camp })
                                  setShowCampPicker(false)
                                }}
                                className={`w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors ${
                                  formData.camp === camp
                                    ? 'bg-blue-100 text-primary-600'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                {camp}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                      <input
                        type="text"
                        value={formData.customer}
                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Contact</label>
                      <input
                        type="text"
                        value={formData.customerContact}
                        onChange={(e) => setFormData({ ...formData, customerContact: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter customer contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                      <input
                        type="text"
                        value={formData.projectManager}
                        onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter project manager name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager Contact</label>
                      <input
                        type="text"
                        value={formData.projectManagerContact}
                        onChange={(e) => setFormData({ ...formData, projectManagerContact: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter PM contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager Email</label>
                      <input
                        type="email"
                        value={formData.projectManagerEmail}
                        onChange={(e) => setFormData({ ...formData, projectManagerEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter PM email"
                      />
                    </div>
                  </div>
                </div>

                {/* Employee Selection Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#2e77cf" d="M8.5,11.5c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4S6.3,11.5,8.5,11.5z M13,10.6c1.7,1.4,4.2,1.1,5.6-0.6C20,8.3,19.7,5.8,18,4.4c-0.7-0.6-1.6-0.9-2.5-0.9c-0.9,0-1.8,0.3-2.5,0.9c1.7,1.4,2,3.8,0.6,5.6C13.5,10.2,13.2,10.4,13,10.6z M22.9,19.4c-0.6-3.7-3.7-6.4-7.4-6.4c-0.9,0-1.7,0.1-2.5,0.4c2.6,0.9,4.5,3.2,4.9,5.9c0.1,0.5-0.3,1.1-0.9,1.1c0,0-0.1,0-0.1,0h5c0.6,0,1-0.4,1-1C22.9,19.5,22.9,19.4,22.9,19.4z M8.5,13c-3.7,0-6.9,2.7-7.4,6.4c-0.1,0.5,0.3,1.1,0.9,1.1c0,0,0.1,0,0.1,0h12.8c0.6,0,1-0.4,1-1c0,0,0-0.1,0-0.1C15.4,15.7,12.2,13,8.5,13z"></path>
                      </svg>
                      Employee Selection
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {formData.employees.map((employee, index) => (
                      <div key={employee.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                          <input
                            type="text"
                            value={employee.employeeId}
                            onChange={(e) => updateEmployee(index, 'employeeId', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                          <input
                            type="text"
                            value={employee.employeeName}
                            onChange={(e) => updateEmployee(index, 'employeeName', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee name"
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Grade</label>
                          <input
                            type="text"
                            value={employee.employeeGrade}
                            onChange={(e) => updateEmployee(index, 'employeeGrade', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee grade"
                          />
                          {formData.employees.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEmployee(index)}
                              className="absolute top-7 right-0 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full transition-colors flex items-center justify-center shadow-sm transform translate-x-1/2 -translate-y-1/2"
                              title="Remove employee"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                                <path fill="white" d="M20,6h-4V5c0-1.7-1.3-3-3-3h-2C9.3,2,8,3.3,8,5v1H4C3.4,6,3,6.4,3,7s0.4,1,1,1h1v11c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3V8h1c0.6,0,1-0.4,1-1S20.6,6,20,6z M10,5c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1h-4V5z M11,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M15,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z"></path>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Employee Button Row */}
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={addEmployee}
                        className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                          <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,13h-3v3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S16.6,13,16,13z"></path>
                        </svg>
                        Add Employee
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cross-Hired Manpower Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#2e77cf" d="M11.99988,11.50146a4,4,0,1,0-4-4A4,4,0,0,0,11.99988,11.50146Zm.00006,1.5a7.5018,7.5018,0,0,0-7.41449,6.36365,1.00175,1.00175,0,0,0,.99731,1.13635H18.41718a1.00171,1.00171,0,0,0,.99725-1.13635A7.5018,7.5018,0,0,0,11.99994,13.00146ZM23,10.501H22v-1a1,1,0,1,0-2,0v1H19a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Z"></path>
                      </svg>
                      Cross-Hired Manpower
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {formData.crossHiredManpower.map((manpower, index) => (
                      <div key={manpower.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
                          <input
                            type="text"
                            value={manpower.supplierName}
                            onChange={(e) => updateCrossHiredManpower(index, 'supplierName', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter supplier name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                          <input
                            type="text"
                            value={manpower.contactNumber}
                            onChange={(e) => updateCrossHiredManpower(index, 'contactNumber', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter contact number"
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Manpower Total</label>
                          <input
                            type="number"
                            value={manpower.manpowerTotal}
                            onChange={(e) => updateCrossHiredManpower(index, 'manpowerTotal', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter total count"
                          />
                          {formData.crossHiredManpower.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCrossHiredManpower(index)}
                              className="absolute top-7 right-0 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full transition-colors flex items-center justify-center shadow-sm transform translate-x-1/2 -translate-y-1/2"
                              title="Remove manpower"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                                <path fill="white" d="M20,6h-4V5c0-1.7-1.3-3-3-3h-2C9.3,2,8,3.3,8,5v1H4C3.4,6,3,6.4,3,7s0.4,1,1,1h1v11c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3V8h1c0.6,0,1-0.4,1-1S20.6,6,20,6z M10,5c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1h-4V5z M11,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M15,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z"></path>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Manpower Button Row */}
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={addCrossHiredManpower}
                        className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                          <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,13h-3v3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S16.6,13,16,13z"></path>
                        </svg>
                        Add Manpower
                      </button>
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
                    Submit Allocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}