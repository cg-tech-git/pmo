'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { 
  DocumentTextIcon,
  ArrowLeftIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface ProjectTemplate {
  id: string
  title: string
  description: string
  fileType: 'pdf' | 'docx' | 'xlsx'
  category: string
  thumbnail?: string
  fileUrl?: string
  lastUpdated: string
  downloads: number
}

type SortField = 'title' | 'fileType' | 'category' | 'lastUpdated' | 'downloads'
type SortDirection = 'asc' | 'desc'

export default function ProjectTemplatesPage() {
  const [sortField, setSortField] = useState<SortField>('title')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // 15 Project Template Documents
  const projectTemplates: ProjectTemplate[] = [
    {
      id: 'pt-001',
      title: 'Project Org. Chart',
      description: 'Project organizational structure and hierarchy template for team roles and reporting',
      fileType: 'docx',
      category: 'Initiate',
      lastUpdated: '2024-01-15',
      downloads: 234
    },
    {
      id: 'pt-002',
      title: 'Kickoff Checklist',
      description: 'Comprehensive project kickoff checklist ensuring all critical tasks are completed',
      fileType: 'docx',
      category: 'Initiate',
      lastUpdated: '2024-01-20',
      downloads: 189
    },
    {
      id: 'pt-003',
      title: 'Project Meeting Minutes',
      description: 'Standardized meeting minutes template for project meetings and discussions',
      fileType: 'docx',
      category: 'Execute',
      lastUpdated: '2024-01-18',
      downloads: 312
    },
    {
      id: 'pt-004',
      title: 'Manpower Schedule',
      description: 'Resource allocation and manpower scheduling template for project planning',
      fileType: 'xlsx',
      category: 'Plan',
      lastUpdated: '2024-01-22',
      downloads: 156
    },
    {
      id: 'pt-005',
      title: 'Site Plot Plan',
      description: 'Site layout and plot plan template for construction and field projects',
      fileType: 'pdf',
      category: 'Plan',
      lastUpdated: '2024-01-16',
      downloads: 198
    },
    {
      id: 'pt-006',
      title: 'HSE Plan',
      description: 'Health, Safety, and Environment plan template for project risk management',
      fileType: 'docx',
      category: 'Plan',
      lastUpdated: '2024-01-25',
      downloads: 267
    },
    {
      id: 'pt-007',
      title: 'Scaffolding Handover',
      description: 'Scaffolding inspection and handover documentation template',
      fileType: 'docx',
      category: 'Execute',
      lastUpdated: '2024-01-14',
      downloads: 445
    },
    {
      id: 'pt-008',
      title: 'Site Instructions',
      description: 'Formal site instruction documentation and communication template',
      fileType: 'docx',
      category: 'Execute',
      lastUpdated: '2024-01-19',
      downloads: 123
    },
    {
      id: 'pt-009',
      title: 'Daily Diary',
      description: 'Daily project diary template for tracking activities and progress',
      fileType: 'docx',
      category: 'Monitor',
      lastUpdated: '2024-01-21',
      downloads: 178
    },
    {
      id: 'pt-010',
      title: 'Early Warning Notifications',
      description: 'Early warning system template for identifying and escalating project risks',
      fileType: 'docx',
      category: 'Monitor',
      lastUpdated: '2024-01-17',
      downloads: 203
    },
    {
      id: 'pt-011',
      title: 'Certificate of Completion',
      description: 'Project completion certificate template for milestone and project closure',
      fileType: 'docx',
      category: 'Close',
      lastUpdated: '2024-01-23',
      downloads: 89
    },
    {
      id: 'pt-012',
      title: 'Close Out Report',
      description: 'Comprehensive project closeout report template with lessons learned',
      fileType: 'docx',
      category: 'Close',
      lastUpdated: '2024-01-13',
      downloads: 145
    },
    {
      id: 'pt-013',
      title: 'Customer Feedback Survey',
      description: 'Customer satisfaction and feedback survey template for project evaluation',
      fileType: 'docx',
      category: 'Close',
      lastUpdated: '2024-01-24',
      downloads: 167
    },
    {
      id: 'pt-014',
      title: 'Awards Nomination',
      description: 'Project awards nomination template for recognizing excellence and achievements',
      fileType: 'docx',
      category: 'Close',
      lastUpdated: '2024-01-12',
      downloads: 134
    },
    {
      id: 'pt-015',
      title: 'Project Profile',
      description: 'Comprehensive project profile template for documentation and presentation',
      fileType: 'docx',
      category: 'Close',
      lastUpdated: '2024-01-26',
      downloads: 98
    }
  ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const categoryOrder = ['Initiate', 'Plan', 'Execute', 'Monitor', 'Close']

  const sortedTemplates = [...projectTemplates].sort((a, b) => {
    // Primary sort by category order
    const aCategoryIndex = categoryOrder.indexOf(a.category)
    const bCategoryIndex = categoryOrder.indexOf(b.category)
    
    if (aCategoryIndex !== bCategoryIndex) {
      return aCategoryIndex - bCategoryIndex
    }

    // Secondary sort by selected field
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    // Convert dates to comparable format
    if (sortField === 'lastUpdated') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    // Convert to string for consistent comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUpIcon className="w-4 h-4 text-gray-400" />
    }
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="w-4 h-4 text-primary-600" /> : 
      <ChevronDownIcon className="w-4 h-4 text-primary-600" />
  }

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#e53935" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28	C42,40.209,40.209,42,38,42z"></path>
            <path fill="#fff" d="M34.841,26.799c-1.692-1.757-6.314-1.041-7.42-0.911c-1.627-1.562-2.734-3.45-3.124-4.101 c0.586-1.757,0.976-3.515,1.041-5.402c0-1.627-0.651-3.385-2.473-3.385c-0.651,0-1.237,0.391-1.562,0.911 c-0.781,1.367-0.456,4.101,0.781,6.899c-0.716,2.018-1.367,3.97-3.189,7.42c-1.888,0.781-5.858,2.604-6.183,4.556 c-0.13,0.586,0.065,1.172,0.521,1.627C13.688,34.805,14.273,35,14.859,35c2.408,0,4.751-3.32,6.379-6.118 c1.367-0.456,3.515-1.107,5.663-1.497c2.538,2.213,4.751,2.538,5.923,2.538c1.562,0,2.148-0.651,2.343-1.237 C35.492,28.036,35.297,27.32,34.841,26.799z M33.214,27.905c-0.065,0.456-0.651,0.911-1.692,0.651 c-1.237-0.325-2.343-0.911-3.32-1.692c0.846-0.13,2.734-0.325,4.101-0.065C32.824,26.929,33.344,27.254,33.214,27.905z M22.344,14.497c0.13-0.195,0.325-0.325,0.521-0.325c0.586,0,0.716,0.716,0.716,1.302c-0.065,1.367-0.325,2.734-0.781,4.036 C21.824,16.905,22.019,15.083,22.344,14.497z M22.214,27.124c0.521-1.041,1.237-2.864,1.497-3.645 c0.586,0.976,1.562,2.148,2.083,2.669C25.794,26.213,23.776,26.604,22.214,27.124z M18.374,29.728 c-1.497,2.473-3.059,4.036-3.905,4.036c-0.13,0-0.26-0.065-0.391-0.13c-0.195-0.13-0.26-0.325-0.195-0.586 C14.078,32.136,15.77,30.899,18.374,29.728z"></path>
          </svg>
        )
      case 'docx':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
            <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
            <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
            <path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
          </svg>
        )
      case 'xlsx':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <linearGradient id="PTsiEfj2THKtO9xz06mlla_qrAVeBIrsjod_gr1" x1="24" x2="24" y1="5" y2="43" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#21ad64"></stop>
              <stop offset="1" stopColor="#088242"></stop>
            </linearGradient>
            <path fill="url(#PTsiEfj2THKtO9xz06mlla_qrAVeBIrsjod_gr1)" d="M39,16v25c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h17L39,16z"></path>
            <path fill="#61e3a7" d="M28,5v9c0,1.105,0.895,2,2,2h9L28,5z"></path>
            <path fill="#107c42" d="M39,16h-9c-0.473,0-0.917-0.168-1.257-0.444L39,27V16z"></path>
            <path fill="#fff" d="M32,23H16c-0.553,0-1,0.448-1,1v12c0,0.552,0.447,1,1,1h16c0.553,0,1-0.448,1-1V24	C33,23.448,32.553,23,32,23z M17,29h4v2h-4V29z M23,29h8v2h-8V29z M31,27h-8v-2h8V27z M21,25v2h-4v-2H21z M17,33h4v2h-4V33z M23,35	v-2h8v2H23z"></path>
            <path d="M32,22.5c0.827,0,1.5,0.673,1.5,1.5v12c0,0.827-0.673,1.5-1.5,1.5H16c-0.827,0-1.5-0.673-1.5-1.5V24 c0-0.827,0.673-1.5,1.5-1.5H32 M32,22H16c-1.103,0-2,0.897-2,2v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V24 C34,22.897,33.103,22,32,22L32,22z" opacity=".05"></path>
            <path d="M32,23c0.553,0,1,0.448,1,1v12c0,0.552-0.447,1-1,1H16c-0.553,0-1-0.448-1-1V24c0-0.552,0.447-1,1-1	H32 M32,22.5H16c-0.827,0-1.5,0.673-1.5,1.5v12c0,0.827,0.673,1.5,1.5,1.5h16c0.827,0,1.5-0.673,1.5-1.5V24	C33.5,23.173,32.827,22.5,32,22.5L32,22.5z" opacity=".07"></path>
          </svg>
        )
      default:
        return (
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Document</span>
          </div>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <Link 
              href="/processes" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Templates
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Project Templates
            </h1>
            <p className="text-gray-600">
              Scroll through table below to preview and download document templates
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6">
                      <button 
                        onClick={() => handleSort('title')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        Template Name
                        {getSortIcon('title')}
                      </button>
                    </th>
                    <th className="text-left py-4 px-6">
                      <button 
                        onClick={() => handleSort('category')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        Category
                        {getSortIcon('category')}
                      </button>
                    </th>
                    <th className="text-left py-4 px-6">
                      <button 
                        onClick={() => handleSort('downloads')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        Downloads
                        {getSortIcon('downloads')}
                      </button>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
              
              {/* Scrollable table body container - shows ~5 rows then scrolls */}
                              <div className="max-h-[483px] overflow-y-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-1/2" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                  </colgroup>
                  <tbody className="divide-y divide-gray-200">
                    {sortedTemplates.map((template, index) => (
                      <tr key={template.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getFileTypeIcon(template.fileType)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900 mb-1 truncate">{template.title}</div>
                              <div className="text-sm text-gray-500 truncate">{template.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{template.category}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{template.downloads.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button className="bg-primary-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center gap-1 group cursor-pointer">
                              <EyeIcon className="w-4 h-4 group-hover:stroke-gray-600" />
                              Preview
                            </button>
                            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors flex items-center justify-center group cursor-pointer">
                              <ArrowDownTrayIcon className="w-4 h-4 group-hover:stroke-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>
      </div>
    </MainLayout>
  )
} 