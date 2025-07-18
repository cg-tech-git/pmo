'use client'

import { useState } from 'react'
import { TrashIcon, PencilIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

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

interface Draft {
  id: string
  employeeId: string
  formData: FormData
  lastSaved: string
  completionPercentage: number
}

interface DraftsManagerProps {
  drafts: Draft[]
  onEditDraft: (draft: Draft) => void
  onDeleteDraft: (draftId: string) => void
}

export default function DraftsManager({ drafts, onEditDraft, onDeleteDraft }: DraftsManagerProps) {
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100'
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const toggleDraftSelection = (draftId: string) => {
    setSelectedDrafts(prev => 
      prev.includes(draftId)
        ? prev.filter(id => id !== draftId)
        : [...prev, draftId]
    )
  }

  const selectAllDrafts = () => {
    if (selectedDrafts.length === drafts.length) {
      setSelectedDrafts([])
    } else {
      setSelectedDrafts(drafts.map(d => d.id))
    }
  }

  const deleteSelectedDrafts = () => {
    if (selectedDrafts.length === 0) return
    
    const confirmed = confirm(`Are you sure you want to delete ${selectedDrafts.length} draft(s)?`)
    if (confirmed) {
      selectedDrafts.forEach(draftId => onDeleteDraft(draftId))
      setSelectedDrafts([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-yellow-900 mb-2">Manage Draft Employees</h3>
        <p className="text-sm text-yellow-700">
          Continue working on incomplete employee records. Drafts are automatically saved and can be resumed at any time.
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No drafts</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't saved any draft employee records yet.
          </p>
        </div>
      ) : (
        <>
          {/* Bulk Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDrafts.length === drafts.length && drafts.length > 0}
                  onChange={selectAllDrafts}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Select all ({drafts.length})
                </span>
              </label>
              {selectedDrafts.length > 0 && (
                <button
                  onClick={deleteSelectedDrafts}
                  className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete {selectedDrafts.length}
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {drafts.length} draft{drafts.length !== 1 ? 's' : ''} total
            </div>
          </div>

          {/* Drafts List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {drafts.map((draft) => (
                <li key={draft.id}>
                  <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDrafts.includes(draft.id)}
                        onChange={() => toggleDraftSelection(draft.id)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {draft.employeeId || `Draft-${draft.id}`}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-sm text-gray-500 flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                Last saved: {formatDate(draft.lastSaved)}
                              </p>
                              {draft.formData?.jobTitle && (
                                <p className="text-sm text-gray-500">
                                  {draft.formData.jobTitle}
                                </p>
                              )}
                              {draft.formData?.department && (
                                <p className="text-sm text-gray-500">
                                  {draft.formData.department}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Progress:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                draft.completionPercentage >= 80 ? 'bg-green-500' :
                                draft.completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${draft.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${getCompletionColor(draft.completionPercentage)}`}>
                            {draft.completionPercentage}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditDraft(draft)}
                          className="inline-flex items-center px-3 py-1 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Continue
                        </button>
                        <button
                          onClick={() => onDeleteDraft(draft.id)}
                          className="inline-flex items-center p-1 border border-red-300 text-sm font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {drafts.filter(d => d.completionPercentage >= 80).length}
                </p>
                <p className="text-sm text-green-600">Nearly Complete (80%+)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {drafts.filter(d => d.completionPercentage >= 50 && d.completionPercentage < 80).length}
                </p>
                <p className="text-sm text-yellow-600">In Progress (50-79%)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {drafts.filter(d => d.completionPercentage < 50).length}
                </p>
                <p className="text-sm text-red-600">Just Started (&lt;50%)</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 