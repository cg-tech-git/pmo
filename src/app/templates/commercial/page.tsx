'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { 
  DocumentTextIcon,
  ArrowLeftIcon,
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface CommercialTemplate {
  id: string
  title: string
  description: string
  fileType: 'pdf' | 'docx' | 'xlsx' | 'google-sheets' | 'google-docs' | 'google-slides' | 'smartsheet'
  category: string
  thumbnail?: string
  fileUrl?: string
  lastUpdated: string

  viewLink?: string
  copyLink?: string
  isGoogleTemplate?: boolean
}

type SortField = 'title' | 'category'
type SortDirection = 'asc' | 'desc'

export default function CommercialTemplatesPage() {
  const [sortField, setSortField] = useState<SortField>('title')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // 6 Commercial Template Documents
  const commercialTemplates: CommercialTemplate[] = [
    {
      id: 'ct-001',
      title: 'New Customer Application',
      description: 'Comprehensive new customer onboarding and application template',
      fileType: 'google-docs',
      category: 'Customer Management',
      lastUpdated: '2024-01-15',
      viewLink: 'https://docs.google.com/document/d/1uce7rn6B7QXxE1Zxdf1wOV6MFrlaialQ72XFhpPHCJk/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1uce7rn6B7QXxE1Zxdf1wOV6MFrlaialQ72XFhpPHCJk/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ct-002',
      title: 'Terms & Conditions',
      description: 'Standard terms and conditions template for commercial agreements and contracts',
      fileType: 'google-docs',
      category: 'Legal',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/1RGU5rwuh3h2UMwVYwMdPurxVemBmIEiO6fvSrrCjgkc/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1RGU5rwuh3h2UMwVYwMdPurxVemBmIEiO6fvSrrCjgkc/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ct-005',
      title: 'Contract Review Checklist',
      description: 'Comprehensive checklist for reviewing and approving commercial contracts',
      fileType: 'xlsx',
      category: 'Legal',
      lastUpdated: '2024-01-25',
    },
    {
      id: 'ct-006',
      title: 'Vendor Assessment',
      description: 'Vendor evaluation and assessment template for supplier selection',
      fileType: 'xlsx',
      category: 'Procurement',
      lastUpdated: '2024-01-20',
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

  const categoryOrder = ['Customer Management', 'Finance', 'Legal', 'Procurement']

  const sortedTemplates = [...commercialTemplates].sort((a, b) => {
    // Primary sort by category order
    const aCategoryIndex = categoryOrder.indexOf(a.category)
    const bCategoryIndex = categoryOrder.indexOf(b.category)
    
    if (aCategoryIndex !== -1 && bCategoryIndex !== -1) {
      return aCategoryIndex - bCategoryIndex
    }
    if (aCategoryIndex !== -1) return -1
    if (bCategoryIndex !== -1) return 1

    // If neither category is in the order array, sort alphabetically by category
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }

    // Secondary sort by selected field
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]



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
      case 'google-sheets':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#43a047" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
            <path fill="#c8e6c9" d="M40 13L30 13 30 3z"></path>
            <path fill="#2e7d32" d="M30 13L40 23 40 13z"></path>
            <path fill="#e8f5e8" d="M31 23H17c-0.552 0-1 0.448-1 1v16c0 0.552 0.448 1 1 1h14c0.552 0 1-0.448 1-1V24C32 23.448 31.552 23 31 23zM20 26h3v3h-3V26zM20 30h3v3h-3V30zM20 34h3v3h-3V34zM26 26h3v3h-3V26zM26 30h3v3h-3V30zM26 34h3v3h-3V34z"></path>
          </svg>
        )
      case 'google-docs':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
            <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
            <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
            <path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
          </svg>
        )
      case 'google-slides':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#ff5722" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
            <path fill="#ffab91" d="M40 13L30 13 30 3z"></path>
            <path fill="#d84315" d="M30 13L40 23 40 13z"></path>
            <path fill="#fff3e0" d="M15 19H33V21H15zM15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15z"></path>
            <rect fill="#ff5722" x="20" y="35" width="8" height="2" rx="1"></rect>
            <circle fill="#ff5722" cx="24" cy="21" r="1.5"></circle>
          </svg>
        )
      case 'smartsheet':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
            <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
            <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
            <path fill="#e3f2fd" d="M15 19H33V21H15zM15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
            <circle fill="#2196f3" cx="18" cy="20" r="1"></circle>
            <circle fill="#2196f3" cx="18" cy="24" r="1"></circle>
            <circle fill="#2196f3" cx="18" cy="28" r="1"></circle>
            <circle fill="#2196f3" cx="18" cy="32" r="1"></circle>
            <circle fill="#2196f3" cx="18" cy="36" r="1"></circle>
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
              Commercial Templates
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
                  <col style={{ width: '70%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                  </tr>
                </thead>
              </table>
              
              {/* Scrollable table body container - shows ~5 rows then scrolls */}
              <div className="max-h-[483px] overflow-y-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
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
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => {
                                if (template.viewLink) {
                                  window.open(template.viewLink, '_blank')
                                }
                              }}
                              className="bg-blue-100 text-primary-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
                            >
                              <EyeIcon className="w-4 h-4 stroke-current group-hover:stroke-white" />
                              Preview
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