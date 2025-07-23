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

interface TenderTemplate {
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
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      viewLink: 'https://docs.google.com/document/d/18nuKwld5HiL6IjHBwotw_95SvYSYowXEXscMDakWYtM/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/18nuKwld5HiL6IjHBwotw_95SvYSYowXEXscMDakWYtM/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs02',
      title: 'CS02 - Site Visit',
      description: 'Site visit documentation form for recording site conditions and assessment findings',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      viewLink: 'https://docs.google.com/document/d/18atPgHue122eIPwNd15l9Ztzs8Wbii2m07uBj5pQT-Q/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/18atPgHue122eIPwNd15l9Ztzs8Wbii2m07uBj5pQT-Q/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs03',
      title: 'CS03 - Board Resolution',
      description: 'Board resolution template authorizing tender submission and contract execution authority',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-25',
      viewLink: 'https://docs.google.com/document/d/1Aiun3B9Qr63hazNPeoEZBbGH37VngAv_m34_AgTHiBQ/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1Aiun3B9Qr63hazNPeoEZBbGH37VngAv_m34_AgTHiBQ/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs04',
      title: 'CS04 - Insurances',
      description: 'Insurance certification documentation including liability, workers compensation and professional indemnity',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1RTdl5h7T4ADB-TTg6CqNuVV0x3Vu2YYncCPZWls26eY/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1RTdl5h7T4ADB-TTg6CqNuVV0x3Vu2YYncCPZWls26eY/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs05',
      title: 'CS05 - Sustainability',
      description: 'Sustainability policy and environmental management system documentation',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1hHao-Bqn1Zb0lHys0G02KqfV83CLWqpgy7_3kJntPWs/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1hHao-Bqn1Zb0lHys0G02KqfV83CLWqpgy7_3kJntPWs/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs06',
      title: 'CS06 - Tax / VAT Clearance',
      description: 'Tax compliance certificates and VAT clearance documentation from relevant authorities',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1VJ9fj9TE19VyAqfPh-5chaXx831myaJbzwKKw3U4fqQ/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1VJ9fj9TE19VyAqfPh-5chaXx831myaJbzwKKw3U4fqQ/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs07',
      title: 'CS07 - Shareholding / Sponsor',
      description: 'Shareholding structure and sponsor information documentation for tender proposals',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-23',
      viewLink: 'https://docs.google.com/document/d/104ZaSVA2QgROXTt8eZIfeKuCXYk0kMZf2rGBW4K24gY/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/104ZaSVA2QgROXTt8eZIfeKuCXYk0kMZf2rGBW4K24gY/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs08',
      title: 'CS08 - Company Registrations',
      description: 'Official company registration certificates and incorporation documents',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-23',
      viewLink: 'https://docs.google.com/document/d/1CBhixzWI8cYLYDVntNtBLDuS4-X-8nBaW0PP2x_KTsQ/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1CBhixzWI8cYLYDVntNtBLDuS4-X-8nBaW0PP2x_KTsQ/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs09',
      title: 'CS09 - Safety Certificates',
      description: 'Health and safety certifications including OHSAS, safety training and incident records',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/1RAFQGM5ADh1bl_-WX1QzDT6ElAsziEuXEgICxyAeRe4/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1RAFQGM5ADh1bl_-WX1QzDT6ElAsziEuXEgICxyAeRe4/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs10',
      title: 'CS10 - Corporate Social Responsibility (CSR)',
      description: 'CSR policies, community engagement initiatives and social impact documentation',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/1SgHbNADR--kRDLCZhqwbcBeqouqu_b6JVYLJLcLv4Sw/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1SgHbNADR--kRDLCZhqwbcBeqouqu_b6JVYLJLcLv4Sw/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs11',
      title: 'CS11 - ISO / Other Certifications',
      description: 'ISO certification documentation including quality, environmental and safety management systems',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-21',
      viewLink: 'https://docs.google.com/document/d/1ddzxZRJ0q5d6odxqf9_I3xuLp6w0DA4u6IB7GkXHq-Y/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1ddzxZRJ0q5d6odxqf9_I3xuLp6w0DA4u6IB7GkXHq-Y/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs12',
      title: 'CS12 - Who We Are',
      description: 'Company profile including history, capabilities, organizational structure and key personnel',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-21',
      viewLink: 'https://docs.google.com/document/d/1E4p-5rBO6zsaCNCKts1R2hYEOvy1jqPd8DYuJMofD2I/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1E4p-5rBO6zsaCNCKts1R2hYEOvy1jqPd8DYuJMofD2I/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs13',
      title: 'CS13 - Company Policies',
      description: 'Corporate policies including quality, safety, environmental and business conduct guidelines',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-20',
      viewLink: 'https://docs.google.com/document/d/1r1lS9S8WfSYBZ1d2lmZNVs-yqal2Xwmq3Ms-zYdCeWw/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1r1lS9S8WfSYBZ1d2lmZNVs-yqal2Xwmq3Ms-zYdCeWw/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs14',
      title: 'CS14 - Banking Information',
      description: 'Banking details, financial institution references and credit facility information',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-20',
      viewLink: 'https://docs.google.com/document/d/1S0OiM0SyKx_2eYfjZgYja6nJAx19bQHfr4YIP5t3aZg/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1S0OiM0SyKx_2eYfjZgYja6nJAx19bQHfr4YIP5t3aZg/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs15',
      title: 'CS15 - Brochure, Newsletter, Media',
      description: 'Marketing materials, company brochures, newsletters and media coverage documentation',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-19',
      viewLink: 'https://docs.google.com/document/d/1iAAOaeFR1fCiSMPtgBUaZ4zdGrirnaZpiBxD01hC-gY/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1iAAOaeFR1fCiSMPtgBUaZ4zdGrirnaZpiBxD01hC-gY/copy',
      isGoogleTemplate: true
    },
    {
      id: 'cs16',
      title: 'CS16 - Declaration & Code of Conduct',
      description: 'Formal declaration of compliance and code of conduct for tender proposals',
      fileType: 'google-docs',
      category: 'Contractors',
      lastUpdated: '2024-01-19',
      viewLink: 'https://docs.google.com/document/d/1hPdZriRlXgGUjcQcZzXIfk2ET_Y5I-M0L8q8NZYY4tU/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1hPdZriRlXgGUjcQcZzXIfk2ET_Y5I-M0L8q8NZYY4tU/copy',
      isGoogleTemplate: true
    },

    // Technical Category - 13 documents
    {
      id: 'ts01',
      title: 'TS01 - Project Execution Strategy',
      description: 'Comprehensive project execution strategy including methodology, approach and delivery framework',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-25',
      viewLink: 'https://docs.google.com/document/d/1Ca9j1IJJzcKTVwRh2u3rOZPlCr7Q_RjTCpmxPa4pDAI/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1Ca9j1IJJzcKTVwRh2u3rOZPlCr7Q_RjTCpmxPa4pDAI/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts02',
      title: 'TS02 - Proposed Project Team & CV\'s',
      description: 'Project team structure with detailed CVs showing roles, responsibilities and qualifications',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1bkAewlBq0zdFbbZJOrCimPLuPAMZ1zEoOoFHwc9u00E/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1bkAewlBq0zdFbbZJOrCimPLuPAMZ1zEoOoFHwc9u00E/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts03',
      title: 'TS03 - Job Descriptions',
      description: 'Detailed job descriptions for key project positions including qualifications and experience requirements',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1v6NUrKdkVytC3kCltLbfOwy6g8gdyswAZ4r_ZVPzc9Y/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1v6NUrKdkVytC3kCltLbfOwy6g8gdyswAZ4r_ZVPzc9Y/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts04',
      title: 'TS04 - Project Plan',
      description: 'Comprehensive project schedule with milestones, critical path and resource allocation timeline',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-23',
      viewLink: 'https://docs.google.com/document/d/1YbDHeRJcwOkyyVBukzXkpIVb1XhQR9Un0u3VjrEOEFw/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1YbDHeRJcwOkyyVBukzXkpIVb1XhQR9Un0u3VjrEOEFw/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts05',
      title: 'TS05 - Project Method Statements',
      description: 'Detailed method statements for key work activities including procedures and safety measures',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-23',
      viewLink: 'https://docs.google.com/document/d/1CZWKbgymvgZnmVvyfJ7nBJk2ntpd8lgkQntD31aTqAo/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1CZWKbgymvgZnmVvyfJ7nBJk2ntpd8lgkQntD31aTqAo/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts06',
      title: 'TS06 - Project Drawings / Renders',
      description: 'Technical drawings, schematics, renders and design documentation for project deliverables',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/1YCoh4eerp9ZPpwtWQwfhWOjbgAWjKPsh5kKIk_PpiDs/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1YCoh4eerp9ZPpwtWQwfhWOjbgAWjKPsh5kKIk_PpiDs/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts07',
      title: 'TS07 - Quality Assurance Plan & Checksheets',
      description: 'Quality assurance procedures, inspection protocols and quality control checksheets',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/1GtneT_GdJqlu6LT0aOyWl77DvXlVzSHjnKIj5w2ycZk/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1GtneT_GdJqlu6LT0aOyWl77DvXlVzSHjnKIj5w2ycZk/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts08',
      title: 'TS08 - HSE Plan & Baseline Risk Assessment',
      description: 'Health, safety and environmental management plan including baseline risk assessments',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-21',
      viewLink: 'https://docs.google.com/document/d/1o0EiHGjwY6fcwK3Ol4bhkXgy2G43-sprIVr6tmM4liE/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1o0EiHGjwY6fcwK3Ol4bhkXgy2G43-sprIVr6tmM4liE/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts09',
      title: 'TS09 - Subcontractor Strategy',
      description: 'Subcontractor management strategy including selection criteria and oversight procedures',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-21',
      viewLink: 'https://docs.google.com/document/d/1TY8eSVLauQO8MxfUStjEu5jumvJZTxJqY4XXgrrSj6E/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1TY8eSVLauQO8MxfUStjEu5jumvJZTxJqY4XXgrrSj6E/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts10',
      title: 'TS10 - Current Work Commitments',
      description: 'Current project portfolio and resource commitments demonstrating capacity and availability',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-20',
      viewLink: 'https://docs.google.com/document/d/1hPZ-Rufn_u2TJTmq4j35cQ1bvL3XrNC3q4fSBi0jRn4/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1hPZ-Rufn_u2TJTmq4j35cQ1bvL3XrNC3q4fSBi0jRn4/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts11',
      title: 'TS11 - Relevant Experience',
      description: 'Case studies and profiles of relevant projects demonstrating experience and capability',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-20',
      viewLink: 'https://docs.google.com/document/d/1smGOoA0ZnnqrvpbdzIFSpQyBz_AZQbyUCkU6j2DvjpI/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1smGOoA0ZnnqrvpbdzIFSpQyBz_AZQbyUCkU6j2DvjpI/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts12',
      title: 'TS12 - Recognitions / Awards',
      description: 'Industry awards, recognitions and achievements demonstrating excellence and competence',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-19',
      viewLink: 'https://docs.google.com/document/d/1aEa1kdozKf3OYyz9n5j9F0jK4iM2Dep_hB679blXac8/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1aEa1kdozKf3OYyz9n5j9F0jK4iM2Dep_hB679blXac8/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ts13',
      title: 'TS13 - Any Other Technical Information',
      description: 'Additional supporting technical information and documentation relevant to project capability',
      fileType: 'google-docs',
      category: 'Technical',
      lastUpdated: '2024-01-19',
      viewLink: 'https://docs.google.com/document/d/1PWCcTSqMkmusGVcYgHw7ZvaGMssk9_i4UIk8sgZVEqM/edit?tab=t.0#heading=h.gjdgxs',
      copyLink: 'https://docs.google.com/document/d/1PWCcTSqMkmusGVcYgHw7ZvaGMssk9_i4UIk8sgZVEqM/copy',
      isGoogleTemplate: true
    },

    // Pricing Category - 4 documents
    {
      id: 'ps01',
      title: 'PS01 - Rates & Pricing',
      description: 'Detailed pricing schedule including unit rates, labor costs and equipment charges',
      fileType: 'google-docs',
      category: 'Pricing',
      lastUpdated: '2024-01-25',
      viewLink: 'https://docs.google.com/document/d/1VSKBoy8FtdsxqMs0sRw7z6-ni9OXF-MY7eFdb8h8Ub4/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1VSKBoy8FtdsxqMs0sRw7z6-ni9OXF-MY7eFdb8h8Ub4/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ps02',
      title: 'PS02 - Finance & Cash flow',
      description: 'Financial projections, cash flow analysis and payment schedule proposals',
      fileType: 'google-docs',
      category: 'Pricing',
      lastUpdated: '2024-01-24',
      viewLink: 'https://docs.google.com/document/d/1sRxVR_k6mj0GsEqHqdfD5-v8OUJ7E5TzJmJShxdgTEo/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1sRxVR_k6mj0GsEqHqdfD5-v8OUJ7E5TzJmJShxdgTEo/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ps03',
      title: 'PS03 - Commercial Alternatives',
      description: 'Alternative commercial proposals and value engineering options for cost optimization',
      fileType: 'google-docs',
      category: 'Pricing',
      lastUpdated: '2024-01-23',
      viewLink: 'https://docs.google.com/document/d/1yfv6HmiYCKqoz6QZSGx_oOi8K8lnR4EQbrYpEmybbj0/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/1yfv6HmiYCKqoz6QZSGx_oOi8K8lnR4EQbrYpEmybbj0/copy',
      isGoogleTemplate: true
    },
    {
      id: 'ps04',
      title: 'PS04 - Commercial Clarifications',
      description: 'Commercial clarifications, assumptions and exclusions supporting the pricing submission',
      fileType: 'google-docs',
      category: 'Pricing',
      lastUpdated: '2024-01-22',
      viewLink: 'https://docs.google.com/document/d/12suJcWQ0UhqN9PI8kzOmi6klvVo7cNWeN_Bc9Vitdac/edit?tab=t.0',
      copyLink: 'https://docs.google.com/document/d/12suJcWQ0UhqN9PI8kzOmi6klvVo7cNWeN_Bc9Vitdac/copy',
      isGoogleTemplate: true
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
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{template.category}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => {
                                if ((template.isGoogleTemplate || template.fileType === 'smartsheet') && template.viewLink) {
                                  window.open(template.viewLink, '_blank')
                                } else {
                                  // Handle regular file preview
                                  console.log('Preview regular file:', template.id)
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