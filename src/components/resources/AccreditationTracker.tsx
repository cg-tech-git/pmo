'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { UserPlusIcon, DocumentArrowDownIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import AddEmployeeForm from './AddEmployeeForm'
import ReportGenerator from './ReportGenerator'
import DraftsManager from './DraftsManager'
import ReportLibrary from './ReportLibrary'

export default function AccreditationTracker() {
  const [activeTab, setActiveTab] = useState('add')
  const [employees, setEmployees] = useState<any[]>([])
  const [drafts, setDrafts] = useState<any[]>([])

  // Mock data - in real app this would come from a database
  useEffect(() => {
    // Simulate some existing completed employees
    const mockEmployees = [
      { id: '1', name: 'Ahmed Al-Rashid', employeeId: 'EMP001', department: 'Engineering', completionPercentage: 100, completedAt: new Date('2024-01-15') },
      { id: '2', name: 'Sara Hassan', employeeId: 'EMP002', department: 'Project Management', completionPercentage: 100, completedAt: new Date('2024-01-20') },
      { id: '3', name: 'Omar Khalil', employeeId: 'EMP003', department: 'Construction', completionPercentage: 100, completedAt: new Date('2024-01-25') }
    ]

    // Simulate some draft employees with proper structure
    const mockDrafts = [
      { 
        id: '4', 
        employeeId: 'EMP004', 
        formData: {
          employeeId: 'EMP004',
          jobTitle: 'Safety Coordinator',
          department: 'Safety',
          dateOfBirth: '',
          dateOfJoining: '',
          language: '',
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
        },
        completionPercentage: 75, 
        lastSaved: '2024-01-30T10:30:00Z'
      },
      { 
        id: '5', 
        employeeId: 'EMP005', 
        formData: {
          employeeId: 'EMP005',
          jobTitle: 'Quality Inspector',
          department: 'Quality Control',
          dateOfBirth: '',
          dateOfJoining: '',
          language: '',
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
        },
        completionPercentage: 45, 
        lastSaved: '2024-01-28T14:15:00Z'
      },
      { 
        id: '6', 
        employeeId: 'EMP006', 
        formData: {
          employeeId: 'EMP006',
          jobTitle: 'Administrative Assistant',
          department: 'Administration',
          dateOfBirth: '',
          dateOfJoining: '',
          language: '',
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
        },
        completionPercentage: 30, 
        lastSaved: '2024-01-26T09:45:00Z'
      }
    ]

    setEmployees(mockEmployees)
    setDrafts(mockDrafts)
  }, [])

  const handleEmployeeAdded = (employee: any) => {
    setEmployees(prev => [...prev, employee])
  }

  const handleDraftSaved = (draft: any) => {
    setDrafts(prev => [...prev, draft])
  }

  const handleEditDraft = (draft: any) => {
    // For now, just log the draft being edited
    console.log('Editing draft:', draft)
    // In a real app, this would open an edit form
  }

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId))
  }

  const tabs = [
    { 
      id: 'add', 
      name: 'Add Employee', 
      icon: UserPlusIcon,
      count: null 
    },
    { 
      id: 'drafts', 
      name: 'Manage Drafts', 
      icon: DocumentArrowDownIcon,
      count: drafts.length 
    },
    { 
      id: 'reports', 
      name: 'Generate Report', 
      icon: DocumentArrowDownIcon,
      count: null 
    },
    { 
      id: 'library', 
      name: 'Report Library', 
      icon: ArchiveBoxIcon,
      count: null 
    }
  ]

  const totalRecords = employees.length + drafts.length
  const completionRate = totalRecords > 0 ? Math.round((employees.length / totalRecords) * 100) : 0

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Staff Accreditation Tracker</h1>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{totalRecords}</div>
            <div className="text-sm text-blue-600">Total Records</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{employees.length}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{drafts.length}</div>
            <div className="text-sm text-yellow-600">Drafts</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
            <div className="text-sm text-purple-600">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Tab.Group>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-6 pt-6">
            <Tab.List className="flex space-x-8">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    `flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                      selected
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`
                  }
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                  {tab.count !== null && tab.count > 0 && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          {/* Tab Content */}
          <Tab.Panels className="min-h-0">
            <Tab.Panel className="h-full">
              <div className="h-full overflow-y-auto p-6">
                <AddEmployeeForm 
                  onDraftSaved={handleDraftSaved}
                  onEmployeeAdded={handleEmployeeAdded}
                />
              </div>
            </Tab.Panel>

            <Tab.Panel className="h-full">
              <div className="h-full overflow-y-auto p-6">
                <DraftsManager 
                  drafts={drafts}
                  onEditDraft={handleEditDraft}
                  onDeleteDraft={handleDeleteDraft}
                />
              </div>
            </Tab.Panel>

            <Tab.Panel className="h-full">
              <div className="h-full overflow-y-auto p-6">
                <ReportGenerator employees={employees} />
              </div>
            </Tab.Panel>

            <Tab.Panel className="h-full">
              <div className="h-full overflow-y-auto p-6">
                <ReportLibrary />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
} 