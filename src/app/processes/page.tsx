'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import PDFViewer from '@/components/process/PDFViewer'
import Image from 'next/image'
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  FolderIcon,
  StarIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  BookmarkIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

type ProcessType = 'overview' | 'project-management' | 'commercial'

export default function ProcessesPage() {
  const router = useRouter()
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>(['project-management'])

  const processes = [
    {
      id: 'project-management' as ProcessType,
      title: 'Project Management Controls',
      description: 'Comprehensive project management control flowchart with gate reviews, milestones, and approval processes.',
      file: 'https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/010.%20AL-OFF.FLOW-COMMERCIAL_%20Project%20Management%20Control%20R2%20(1)%20(1).pdf',
      category: 'Project Management',
      lastUpdated: '2024-01-15',
      downloads: 245,
      views: 1200,
      tags: ['flowchart', 'controls', 'management'],
      fileSize: '2.4 MB'
    },
    {
      id: 'commercial' as ProcessType,
      title: 'Commercial Process Controls', 
      description: 'Commercial process workflow including contract management, approvals, and financial controls.',
      file: 'https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/011.%20AL.OFF-FLOW_%20Commercial%20Process%20R2%20(1).pdf',
      category: 'Commercial',
      lastUpdated: '2024-01-20',
      downloads: 189,
      views: 850,
      tags: ['commercial', 'workflow', 'contracts'],
      fileSize: '1.8 MB'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Templates', count: processes.length },
    { id: 'project-management', name: 'Project Management', count: 1 },
    { id: 'commercial', name: 'Commercial', count: 1 },
    { id: 'templates', name: 'Document Templates', count: 49 }
  ]

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || 
                           process.category.toLowerCase().replace(' ', '-') === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (processId: string) => {
    setFavorites(prev => 
      prev.includes(processId)
        ? prev.filter(id => id !== processId)
        : [...prev, processId]
    )
  }

  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative pt-8 pb-[33px]">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[280px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '0.65fr 0.35fr' }}>
            {/* Left Column - Text Content (65%) */}
            <div className="flex flex-col justify-center p-6">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 tracking-tight mb-1">Project Templates</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                Flowcharts & Documentation
              </h1>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Comprehensive process documentation, standardized templates and workflow resources. 
                Access project controls, commercial processes and tender documentation for consistent project delivery.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="mt-4 flex gap-4">
                <div className="bg-primary-600 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-gray-200 hover:text-gray-600 transition-colors cursor-pointer">
                  Learn more
                </div>
              </div>
            </div>

            {/* Right Column - Image (35%) */}
            <div className="relative h-full bg-white">
              <Image
                src="/images/templatesbanner.png"
                alt="Process Templates"
                fill
                className="object-cover scale-90 -translate-y-[2%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-25">

        {/* Explore Section */}
        <div className="pt-6 pb-12">
          <div className="mx-auto max-w-7xl">
            {/* Explore section with centered text */}
            <div className="text-center mb-9 px-16 lg:px-32">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Everything you need for process excellence
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Standardize your workflows with comprehensive documentation, proven templates and structured processes. 
                Accelerate project delivery with battle-tested frameworks and ensure consistent quality across all initiatives.
              </p>
              
              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <button 
                  onClick={() => window.open('https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/010.%20AL-OFF.FLOW-COMMERCIAL_%20Project%20Management%20Control%20R2%20(1)%20(1).pdf', '_blank')}
                  className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" className="group-hover:fill-gray-600" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z"></path>
                  </svg>
                  Project Flowchart
                </button>
                <button 
                  onClick={() => window.open('https://storage.googleapis.com/pmo-documents-hybrid-shine-466111-s0/011.%20AL.OFF-FLOW_%20Commercial%20Process%20R2%20(1).pdf', '_blank')}
                  className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" className="group-hover:fill-gray-600" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z"></path>
                  </svg>
                  Commercial Flowchart
                </button>
                <button 
                  onClick={() => router.push('/templates/project')}
                  className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" className="group-hover:fill-gray-600" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Project Templates
                </button>
                <button 
                  onClick={() => router.push('/templates/commercial')}
                  className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" className="group-hover:fill-gray-600" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Commercial Templates
                </button>
                <button 
                  onClick={() => router.push('/templates/tender')}
                  className="bg-primary-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-gray-200 hover:text-gray-600 transition-colors group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" className="group-hover:fill-gray-600" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Tender Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {/* Template Library Section - REMOVED CAROUSEL AND ACCORDION AS REQUESTED */}
          {selectedProcess === 'overview' ? (
            <div className="space-y-8">
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedProcess('overview')}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Templates
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {processes.find(p => p.id === selectedProcess)?.title}
                  </h1>
                  <p className="text-gray-600">
                    {processes.find(p => p.id === selectedProcess)?.description}
                  </p>
                </div>
              </div>
              
              <PDFViewer 
                file={processes.find(p => p.id === selectedProcess)?.file || ''}
                title={processes.find(p => p.id === selectedProcess)?.title || 'Document'}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 