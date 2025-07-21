'use client'

import { useState } from 'react'
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
      const pdfUrl = await generateManpowerAllocationPDF(formData)
      
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
            <p className="text-gray-600">Create a new manpower allocation for project requirements and workforce planning.</p>
            
            {/* View Calendar Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push('/resources/manpower-allocation/calendar')}
                className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center gap-1.5"
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
                      <path fill="#2E77CF" d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M13,16c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4c0-0.6,0.4-1,1-1s1,0.4,1,1V16z M12,9c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,9,12,9z"></path>
                    </svg>
                    Project Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Number</label>
                      <input
                        type="text"
                        value={formData.jobNumber}
                        onChange={(e) => setFormData({ ...formData, jobNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter job number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                      <input
                        type="text"
                        value={formData.division}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter division"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Camp</label>
                      <input
                        type="text"
                        value={formData.camp}
                        onChange={(e) => setFormData({ ...formData, camp: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter camp"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                      <input
                        type="text"
                        value={formData.customer}
                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Contact</label>
                      <input
                        type="text"
                        value={formData.customerContact}
                        onChange={(e) => setFormData({ ...formData, customerContact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter customer contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                      <input
                        type="text"
                        value={formData.projectManager}
                        onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter project manager name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager Contact</label>
                      <input
                        type="text"
                        value={formData.projectManagerContact}
                        onChange={(e) => setFormData({ ...formData, projectManagerContact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter PM contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager Email</label>
                      <input
                        type="email"
                        value={formData.projectManagerEmail}
                        onChange={(e) => setFormData({ ...formData, projectManagerEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        <path fill="#2E77CF" d="M8.5,11.5c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4S6.3,11.5,8.5,11.5z M13,10.6c1.7,1.4,4.2,1.1,5.6-0.6C20,8.3,19.7,5.8,18,4.4c-0.7-0.6-1.6-0.9-2.5-0.9c-0.9,0-1.8,0.3-2.5,0.9c1.7,1.4,2,3.8,0.6,5.6C13.5,10.2,13.2,10.4,13,10.6z M22.9,19.4c-0.6-3.7-3.7-6.4-7.4-6.4c-0.9,0-1.7,0.1-2.5,0.4c2.6,0.9,4.5,3.2,4.9,5.9c0.1,0.5-0.3,1.1-0.9,1.1c0,0-0.1,0-0.1,0h5c0.6,0,1-0.4,1-1C22.9,19.5,22.9,19.4,22.9,19.4z M8.5,13c-3.7,0-6.9,2.7-7.4,6.4c-0.1,0.5,0.3,1.1,0.9,1.1c0,0,0.1,0,0.1,0h12.8c0.6,0,1-0.4,1-1c0,0,0-0.1,0-0.1C15.4,15.7,12.2,13,8.5,13z"></path>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                          <input
                            type="text"
                            value={employee.employeeName}
                            onChange={(e) => updateEmployee(index, 'employeeName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employee Grade</label>
                          <input
                            type="text"
                            value={employee.employeeGrade}
                            onChange={(e) => updateEmployee(index, 'employeeGrade', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter employee grade"
                          />
                        </div>
                        <div className="flex items-end">
                          {formData.employees.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEmployee(index)}
                              className="w-full bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Employee Button Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                                            <button
                      type="button"
                      onClick={addEmployee}
                      className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,13h-3v3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S16.6,13,16,13z"></path>
                      </svg>
                      Add Employee
                    </button>
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>

                {/* Cross-Hired Manpower Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#2E77CF" d="M11.99988,11.50146a4,4,0,1,0-4-4A4,4,0,0,0,11.99988,11.50146Zm.00006,1.5a7.5018,7.5018,0,0,0-7.41449,6.36365,1.00175,1.00175,0,0,0,.99731,1.13635H18.41718a1.00171,1.00171,0,0,0,.99725-1.13635A7.5018,7.5018,0,0,0,11.99994,13.00146ZM23,10.501H22v-1a1,1,0,1,0-2,0v1H19a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Z"></path>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter supplier name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                          <input
                            type="text"
                            value={manpower.contactNumber}
                            onChange={(e) => updateCrossHiredManpower(index, 'contactNumber', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter contact number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Manpower Total</label>
                          <input
                            type="number"
                            value={manpower.manpowerTotal}
                            onChange={(e) => updateCrossHiredManpower(index, 'manpowerTotal', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter total count"
                          />
                        </div>
                        <div className="flex items-end">
                          {formData.crossHiredManpower.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCrossHiredManpower(index)}
                              className="w-full bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add Manpower Button Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <button
                          type="button"
                          onClick={addCrossHiredManpower}
                          className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                            <path fill="currentColor" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16,13h-3v3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3V8c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S16.6,13,16,13z"></path>
                          </svg>
                          Add Manpower
                        </button>
                      </div>
                      <div></div>
                      <div></div>
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
                    className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center gap-1.5"
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