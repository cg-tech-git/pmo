'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, DocumentIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  description?: string
  type: 'pdf' | 'doc' | 'xls'
  url?: string
}

interface TemplateCategory {
  id: string
  name: string
  description: string
  templates: Template[]
  subcategories?: { [key: string]: Template[] }
}

export default function TemplateLibrary() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [activeTenderTab, setActiveTenderTab] = useState('contractors')

  const templateCategories: TemplateCategory[] = [
    {
      id: 'project',
      name: 'Project Templates',
      description: 'Essential project management documents and forms',
      templates: [
        { id: 'kickoff', name: 'Project Kickoff Checklist', type: 'pdf' },
        { id: 'manpower', name: 'Manpower Schedule', type: 'xls' },
        { id: 'survey', name: 'Site Survey', type: 'pdf' },
        { id: 'plotplan', name: 'Site Plotplan', type: 'pdf' },
        { id: 'minutes', name: 'Project Minutes', type: 'doc' },
        { id: 'hse', name: 'HSE Plan', type: 'pdf' },
        { id: 'scaffold', name: 'Scaffold Handover', type: 'pdf' },
        { id: 'instructions', name: 'Site Instructions', type: 'doc' },
        { id: 'diary', name: 'Daily Diary', type: 'doc' },
        { id: 'warnings', name: 'Early Warning Notifications', type: 'pdf' },
        { id: 'completion', name: 'Certificate of Completion', type: 'pdf' },
        { id: 'closeout', name: 'Close Out Report', type: 'pdf' },
        { id: 'feedback', name: 'Customer Feedback Survey', type: 'pdf' },
        { id: 'profile', name: 'Project Profile', type: 'doc' }
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial Templates',
      description: 'Commercial operations and customer management forms',
      templates: [
        { id: 'account', name: 'New Customer Account Opening Form', type: 'pdf' },
        { id: 'terms', name: 'Terms & Conditions', type: 'pdf' }
      ]
    },
    {
      id: 'tender',
      name: 'Tender Documentation',
      description: 'Comprehensive tender submission documents and forms',
      templates: [],
      subcategories: {
        contractors: [
          { id: 'cs01', name: 'CS01 - Introductory Letter', type: 'pdf' },
          { id: 'cs02', name: 'CS02 - Site Visit', type: 'pdf' },
          { id: 'cs03', name: 'CS03 - Board Resolution', type: 'pdf' },
          { id: 'cs04', name: 'CS04 - Insurance Certificates', type: 'pdf' },
          { id: 'cs05', name: 'CS05 - Sustainability', type: 'pdf' },
          { id: 'cs06', name: 'CS06 - Tax Certificates', type: 'pdf' },
          { id: 'cs07', name: 'CS07 - Sponsors & Stakeholders', type: 'pdf' },
          { id: 'cs08', name: 'CS08 - Company Registration Documents', type: 'pdf' },
          { id: 'cs09', name: 'CS09 - Safety Certificates', type: 'pdf' },
          { id: 'cs10', name: 'CS10 - Corporate Social Responsibility', type: 'pdf' },
          { id: 'cs11', name: 'CS11 - ISO Certificates', type: 'pdf' },
          { id: 'cs12', name: 'CS12 - Who We Are', type: 'pdf' },
          { id: 'cs13', name: 'CS13 - Company Policies', type: 'pdf' },
          { id: 'cs14', name: 'CS14 - Banking Information', type: 'pdf' },
          { id: 'cs15', name: 'CS15 - Brochures & Media', type: 'pdf' },
          { id: 'cs16', name: 'CS16 - Declaration', type: 'pdf' }
        ],
        technical: [
          { id: 'ts01', name: 'TS01 - Execution Strategy', type: 'pdf' },
          { id: 'ts02', name: 'TS02 - Organisation Chart', type: 'pdf' },
          { id: 'ts03', name: 'TS03 - Job Descriptions', type: 'pdf' },
          { id: 'ts04', name: 'TS04 - Project Plan', type: 'pdf' },
          { id: 'ts05', name: 'TS05 - Project Method Statements', type: 'pdf' },
          { id: 'ts06', name: 'TS06 - Project Drawings', type: 'pdf' },
          { id: 'ts07', name: 'TS07 - QC Documentation', type: 'pdf' },
          { id: 'ts08', name: 'TS08 - HSE Plan', type: 'pdf' },
          { id: 'ts09', name: 'TS09 - Subcontractor Strategy', type: 'pdf' },
          { id: 'ts10', name: 'TS10 - Current Work Commitments', type: 'pdf' },
          { id: 'ts11', name: 'TS11 - Project Profiles', type: 'pdf' },
          { id: 'ts12', name: 'TS12 - Awards & Recognitions', type: 'pdf' },
          { id: 'ts13', name: 'TS13 - Other Information', type: 'pdf' }
        ],
        pricing: [
          { id: 'ps01', name: 'PS01 - Rates & Pricing', type: 'pdf' },
          { id: 'ps02', name: 'PS02 - Finance & Cash Flow', type: 'pdf' },
          { id: 'ps03', name: 'PS03 - Commercial Alternatives', type: 'pdf' },
          { id: 'ps04', name: 'PS04 - Commercial Clarifications', type: 'pdf' }
        ]
      }
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const getFilteredTemplates = (templates: Template[]) => {
    return templates
  }

  const getFileTypeIcon = (type: string) => {
    const baseClasses = "w-5 h-5"
    switch (type) {
      case 'pdf': return <DocumentIcon className={`${baseClasses} text-red-500`} />
      case 'doc': return <DocumentIcon className={`${baseClasses} text-blue-500`} />
      case 'xls': return <DocumentIcon className={`${baseClasses} text-green-500`} />
      default: return <DocumentIcon className={`${baseClasses} text-gray-500`} />
    }
  }

  const getTotalItemCount = (category: TemplateCategory) => {
    if (category.subcategories) {
      return Object.values(category.subcategories).reduce((total, templates) => total + templates.length, 0)
    }
    return category.templates.length
  }

  const renderTemplateGrid = (templates: Template[], columns = 4) => {
    const gridCols = columns === 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-4'
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4`}>
        {templates.map((template) => (
          <div key={template.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md hover:bg-white transition-all duration-200 group">
            <div className="flex items-start gap-3">
              {getFileTypeIcon(template.type)}
              <div className="flex-1 min-w-0">
                {template.name.includes(' - ') ? (
                  <>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {template.name.split(' - ')[0]}
                    </h4>
                    <p className="text-xs text-gray-700 mt-1 leading-tight">
                      {template.name.split(' - ')[1]}
                    </p>
                  </>
                ) : (
                  <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h4>
                )}
                <p className="text-xs text-gray-500 uppercase mt-2 font-medium">
                  {template.type.toUpperCase()}
                </p>
              </div>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50">
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderTenderSubcategory = (subcategoryKey: string, templates: Template[]) => {
    const filteredTemplates = getFilteredTemplates(templates)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h4 className="text-lg font-semibold text-gray-900 capitalize">
              {subcategoryKey.replace(/([A-Z])/g, ' $1').trim()} Documents
            </h4>
            <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
              {templates.length} items
            </span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download All
          </button>
        </div>
        {renderTemplateGrid(filteredTemplates, 6)}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {templateCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.id)
        const totalItems = getTotalItemCount(category)

        return (
          <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
            <div 
              className="p-6 cursor-pointer bg-white transition-colors"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUpIcon className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>
              <p className="text-gray-600 mt-2 leading-relaxed">{category.description}</p>
            </div>

            {isExpanded && (
              <div className="p-6 border-t border-gray-300 bg-white">

                {category.id === 'tender' && category.subcategories ? (
                  <div className="space-y-8">
                    <div className="border-b border-gray-200">
                      <nav className="flex space-x-8">
                        {Object.keys(category.subcategories).map((subcategoryKey) => (
                          <button
                            key={subcategoryKey}
                            onClick={() => setActiveTenderTab(subcategoryKey)}
                            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                              activeTenderTab === subcategoryKey
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {subcategoryKey.charAt(0).toUpperCase() + subcategoryKey.slice(1)}
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              activeTenderTab === subcategoryKey 
                                ? 'bg-blue-100 text-primary-600' 
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {category.subcategories?.[subcategoryKey]?.length || 0}
                            </span>
                          </button>
                        ))}
                      </nav>
                    </div>

                    {category.subcategories?.[activeTenderTab] && 
                      renderTenderSubcategory(activeTenderTab, category.subcategories[activeTenderTab])}
                  </div>
                ) : (
                  renderTemplateGrid(getFilteredTemplates(category.templates))
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
} 