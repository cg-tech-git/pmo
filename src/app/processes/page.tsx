'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import PDFViewer from '@/components/process/PDFViewer'
import TemplateLibrary from '@/components/process/TemplateLibrary'
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
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>(['project-management'])
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)

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
    { id: 'templates', name: 'Document Templates', count: 45 }
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

  const carouselItems = [
    { id: 'project-templates', name: 'Project Templates' },
    { id: 'commercial-templates', name: 'Commercial Templates' },
    { id: 'contractor-docs', name: 'Contractor Documents' },
    { id: 'technical-docs', name: 'Technical Documents' },
    { id: 'pricing-docs', name: 'Pricing Documents' },
    { id: 'project-controls', name: 'Project Management Controls' },
    { id: 'commercial-controls', name: 'Commercial Process Controls' }
  ]

  const scrollToCarouselItem = (index: number) => {
    const carousel = document.querySelector('.carousel-container')
    if (carousel) {
      const itemWidth = 280 + 24 // card width + gap
      carousel.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      })
      setActiveCarouselIndex(index)
    }
  }

  const scrollCarouselLeft = () => {
    if (activeCarouselIndex > 0) {
      scrollToCarouselItem(activeCarouselIndex - 1)
    }
  }

  const scrollCarouselRight = () => {
    if (activeCarouselIndex < carouselItems.length - 1) {
      scrollToCarouselItem(activeCarouselIndex + 1)
    }
  }

  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative py-8">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[360px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 0.8fr' }}>
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center p-8 pb-12">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 tracking-tight mb-2">Project Templates</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Flowcharts & Documentation
              </h1>
              <p className="mt-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                Comprehensive process documentation, standardized templates and workflow resources. 
                Access project controls, commercial processes and tender documentation for consistent project delivery.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="mt-6 flex gap-4">
                <div className="bg-primary-600 text-white text-sm px-4 py-2 rounded-full font-medium">
                  Coming soon!
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-full overflow-hidden">
              <Image
                src="/images/dashboards.png"
                alt="PMO Process Templates"
                fill
                className="object-cover"
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
              <div className="mt-8 flex justify-center gap-4">
                <button 
                  onClick={() => scrollToCarouselItem(0)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z"></path>
                  </svg>
                  Project Flowchart
                </button>
                <button 
                  onClick={() => scrollToCarouselItem(1)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z"></path>
                  </svg>
                  Commercial Flowchart
                </button>
                <button 
                  onClick={() => scrollToCarouselItem(2)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Project Templates
                </button>
                <button 
                  onClick={() => scrollToCarouselItem(3)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Commercial Templates
                </button>
                <button 
                  onClick={() => scrollToCarouselItem(4)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M9,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H9c-0.6,0-1-0.4-1-1S8.4,8,9,8z M15,18H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,18,15,18z M15,14H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S15.6,14,15,14z"></path>
                  </svg>
                  Tender Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Section - Same width as hero */}
        <div className="py-8">
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollCarouselLeft}
              disabled={activeCarouselIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 ${
                activeCarouselIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 hover:shadow-lg'
              }`}
              aria-label="Previous carousel item"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollCarouselRight}
              disabled={activeCarouselIndex === carouselItems.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 ${
                activeCarouselIndex === carouselItems.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 hover:shadow-lg'
              }`}
              aria-label="Next carousel item"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>

            <div className="overflow-x-auto scrollbar-hide carousel-container">
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {/* Project Templates */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                      <DocumentTextIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Templates</h3>
                    <p className="text-sm text-gray-600 mb-3">Essential project management documents and forms</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      14 items
                    </span>
                  </div>
                </div>

                {/* Commercial Templates */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-success-100 transition-colors">
                      <ChartBarIcon className="w-6 h-6 text-success-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial Templates</h3>
                    <p className="text-sm text-gray-600 mb-3">Commercial operations and customer management forms</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      2 items
                    </span>
                  </div>
                </div>

                {/* Contractor Documents */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-warning-100 transition-colors">
                      <FolderIcon className="w-6 h-6 text-warning-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contractor Documents</h3>
                    <p className="text-sm text-gray-600 mb-3">Company credentials and compliance documentation</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      16 items
                    </span>
                  </div>
                </div>

                {/* Technical Documents */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                      <AdjustmentsHorizontalIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Documents</h3>
                    <p className="text-sm text-gray-600 mb-3">Technical execution plans and project methodology</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      13 items
                    </span>
                  </div>
                </div>

                {/* Pricing Documents */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                      <StarIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing Documents</h3>
                    <p className="text-sm text-gray-600 mb-3">Commercial pricing and financial proposals</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      4 items
                    </span>
                  </div>
                </div>

                {/* Project Management Controls */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0" onClick={() => setSelectedProcess('project-management')}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      <ChartBarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Management Controls</h3>
                    <p className="text-sm text-gray-600 mb-3">Comprehensive project management control flowchart</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      PDF Document
                    </span>
                  </div>
                </div>

                {/* Commercial Process Controls */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group w-[280px] flex-shrink-0" onClick={() => setSelectedProcess('commercial')}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                      <DocumentTextIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial Process Controls</h3>
                    <p className="text-sm text-gray-600 mb-3">Commercial process workflow and financial controls</p>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      PDF Document
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCarouselItem(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    activeCarouselIndex === index
                      ? 'bg-primary-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to carousel item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container py-12">
          {/* Template Library Section */}
          {selectedProcess === 'overview' ? (
            <div className="space-y-8">
              <div>
                <TemplateLibrary />
              </div>
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