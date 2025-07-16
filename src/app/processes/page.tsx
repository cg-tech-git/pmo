'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import PDFViewer from '@/components/process/PDFViewer'

type ProcessType = 'overview' | 'project-management' | 'commercial'

export default function ProcessesPage() {
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>('overview')

  const processes = [
    {
      id: 'project-management' as ProcessType,
      title: 'Project Management Controls',
      description: 'Comprehensive project management control flowchart with gate reviews, milestones, and approval processes.',
      file: 'https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/010.%20AL-OFF.FLOW-COMMERCIAL_%20Project%20Management%20Control%20R2%20(1)%20(1).pdf',
      category: 'Project Management'
    },
    {
      id: 'commercial' as ProcessType,
      title: 'Commercial Process Controls', 
      description: 'Commercial process workflow including contract management, approvals, and financial controls.',
      file: 'https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/011.%20AL.OFF-FLOW_%20Commercial%20Process%20R2%20(1).pdf',
      category: 'Commercial'
    }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Process Library</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access standardized process documentation and interactive flowcharts for project management and commercial operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div key={process.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
                    {process.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {process.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedProcess(process.id)}
                    className="px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                  >
                    View Flowchart
                  </button>
                  <a
                    href={process.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Documents</h2>
        <p className="text-gray-600 mb-4">
          Access related template documents and forms used in these processes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900">Project Management Templates</h3>
            <p className="text-sm text-gray-600 mt-1">Project charters, risk assessments, milestone reviews</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900">Commercial Templates</h3>
            <p className="text-sm text-gray-600 mt-1">Contract reviews, budget approvals, vendor assessments</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProcessView = () => {
    const process = processes.find(p => p.id === selectedProcess)
    if (!process) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedProcess('overview')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Process Library
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
              {process.category}
            </span>
          </div>
        </div>

        <PDFViewer file={process.file} title={process.title} />
      </div>
    )
  }

  return (
    <MainLayout>
      <div>
        {selectedProcess === 'overview' ? renderOverview() : renderProcessView()}
      </div>
    </MainLayout>
  )
} 