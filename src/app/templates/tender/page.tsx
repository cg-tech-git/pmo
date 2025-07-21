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

interface TenderTemplate {
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

export default function TenderTemplatesPage() {
  const [sortField, setSortField] = useState<SortField>('title')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // 33 Tender Template Documents
  const tenderTemplates: TenderTemplate[] = [
    // Contractors Category - 16 documents
    {
      id: 'cs01',
      title: 'CS01 - Cover Letter',
      description: 'Professional cover letter template for tender proposal introductions and company presentation',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      downloads: 312
    },
    {
      id: 'cs02',
      title: 'CS02 - Site Visit',
      description: 'Site visit documentation form for recording site conditions and assessment findings',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      downloads: 287
    },
    {
      id: 'cs03',
      title: 'CS03 - Board Resolution',
      description: 'Board resolution template authorizing tender submission and contract execution authority',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      downloads: 298
    },
    {
      id: 'cs04',
      title: 'CS04 - Insurances',
      description: 'Insurance certification documentation including liability, workers compensation and professional indemnity',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      downloads: 245
    },
    {
      id: 'cs05',
      title: 'CS05 - Sustainability',
      description: 'Sustainability policy and environmental management system documentation',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      downloads: 267
    },
    {
      id: 'cs06',
      title: 'CS06 - Tax / VAT Clearance',
      description: 'Tax compliance certificates and VAT clearance documentation from relevant authorities',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      downloads: 201
    },
    {
      id: 'cs07',
      title: 'CS07 - Shareholding / Sponsor',
      description: 'Shareholding structure and sponsor information documentation for tender proposals',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-23',
      downloads: 289
    },
    {
      id: 'cs08',
      title: 'CS08 - Company Registrations',
      description: 'Official company registration certificates and incorporation documents',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-23',
      downloads: 234
    },
    {
      id: 'cs09',
      title: 'CS09 - Safety Certificates',
      description: 'Health and safety certifications including OHSAS, safety training and incident records',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-22',
      downloads: 198
    },
    {
      id: 'cs10',
      title: 'CS10 - Corporate Social Responsibility (CSR)',
      description: 'CSR policies, community engagement initiatives and social impact documentation',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-22',
      downloads: 156
    },
    {
      id: 'cs11',
      title: 'CS11 - ISO / Other Certifications',
      description: 'ISO certification documentation including quality, environmental and safety management systems',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-21',
      downloads: 178
    },
    {
      id: 'cs12',
      title: 'CS12 - Who We Are',
      description: 'Company profile including history, capabilities, organizational structure and key personnel',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-21',
      downloads: 223
    },
    {
      id: 'cs13',
      title: 'CS13 - Company Policies',
      description: 'Corporate policies including quality, safety, environmental and business conduct guidelines',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-20',
      downloads: 145
    },
    {
      id: 'cs14',
      title: 'CS14 - Banking Information',
      description: 'Banking details, financial institution references and credit facility information',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-20',
      downloads: 167
    },
    {
      id: 'cs15',
      title: 'CS15 - Brochure, Newsletter, Media',
      description: 'Marketing materials, company brochures, newsletters and media coverage documentation',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-19',
      downloads: 189
    },
    {
      id: 'cs16',
      title: 'CS16 - Declaration & Code of Conduct',
      description: 'Formal declaration of compliance and code of conduct for tender proposals',
      fileType: 'pdf',
      category: 'Contractors',
      lastUpdated: '2024-01-19',
      downloads: 134
    },

    // Technical Category - 13 documents
    {
      id: 'ts01',
      title: 'TS01 - Project Execution Strategy',
      description: 'Comprehensive project execution strategy including methodology, approach and delivery framework',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-25',
      downloads: 345
    },
    {
      id: 'ts02',
      title: 'TS02 - Proposed Project Team & CV\'s',
      description: 'Project team structure with detailed CVs showing roles, responsibilities and qualifications',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-24',
      downloads: 289
    },
    {
      id: 'ts03',
      title: 'TS03 - Job Descriptions',
      description: 'Detailed job descriptions for key project positions including qualifications and experience requirements',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-24',
      downloads: 234
    },
    {
      id: 'ts04',
      title: 'TS04 - Project Plan',
      description: 'Comprehensive project schedule with milestones, critical path and resource allocation timeline',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-23',
      downloads: 398
    },
    {
      id: 'ts05',
      title: 'TS05 - Project Method Statements',
      description: 'Detailed method statements for key work activities including procedures and safety measures',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-23',
      downloads: 267
    },
    {
      id: 'ts06',
      title: 'TS06 - Project Drawings / Renders',
      description: 'Technical drawings, schematics, renders and design documentation for project deliverables',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-22',
      downloads: 201
    },
    {
      id: 'ts07',
      title: 'TS07 - Quality Assurance Plan & Checksheets',
      description: 'Quality assurance procedures, inspection protocols and quality control checksheets',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-22',
      downloads: 189
    },
    {
      id: 'ts08',
      title: 'TS08 - HSE Plan & Baseline Risk Assessment',
      description: 'Health, safety and environmental management plan including baseline risk assessments',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-21',
      downloads: 223
    },
    {
      id: 'ts09',
      title: 'TS09 - Subcontractor Strategy',
      description: 'Subcontractor management strategy including selection criteria and oversight procedures',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-21',
      downloads: 312
    },
    {
      id: 'ts10',
      title: 'TS10 - Current Work Commitments',
      description: 'Current project portfolio and resource commitments demonstrating capacity and availability',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-20',
      downloads: 156
    },
    {
      id: 'ts11',
      title: 'TS11 - Relevant Experience',
      description: 'Case studies and profiles of relevant projects demonstrating experience and capability',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-20',
      downloads: 278
    },
    {
      id: 'ts12',
      title: 'TS12 - Recognitions / Awards',
      description: 'Industry awards, recognitions and achievements demonstrating excellence and competence',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-19',
      downloads: 145
    },
    {
      id: 'ts13',
      title: 'TS13 - Any Other Technical Information',
      description: 'Additional supporting technical information and documentation relevant to project capability',
      fileType: 'pdf',
      category: 'Technical',
      lastUpdated: '2024-01-19',
      downloads: 167
    },

    // Pricing Category - 4 documents
    {
      id: 'ps01',
      title: 'PS01 - Rates & Pricing',
      description: 'Detailed pricing schedule including unit rates, labor costs and equipment charges',
      fileType: 'pdf',
      category: 'Pricing',
      lastUpdated: '2024-01-25',
      downloads: 423
    },
    {
      id: 'ps02',
      title: 'PS02 - Finance & Cash flow',
      description: 'Financial projections, cash flow analysis and payment schedule proposals',
      fileType: 'pdf',
      category: 'Pricing',
      lastUpdated: '2024-01-24',
      downloads: 356
    },
    {
      id: 'ps03',
      title: 'PS03 - Commercial Alternatives',
      description: 'Alternative commercial proposals and value engineering options for cost optimization',
      fileType: 'pdf',
      category: 'Pricing',
      lastUpdated: '2024-01-23',
      downloads: 234
    },
    {
      id: 'ps04',
      title: 'PS04 - Commercial Clarifications',
      description: 'Commercial clarifications, assumptions and exclusions supporting the pricing submission',
      fileType: 'pdf',
      category: 'Pricing',
      lastUpdated: '2024-01-22',
      downloads: 189
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

  const categoryOrder = ['Contractors', 'Technical', 'Pricing']

  const sortedTemplates = [...tenderTemplates].sort((a, b) => {
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
              Tender Templates
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