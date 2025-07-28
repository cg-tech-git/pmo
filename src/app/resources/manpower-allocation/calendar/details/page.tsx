'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getSubmissions, type ManpowerSubmission } from '@/lib/manpowerApi'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function ManpowerAllocationDetails() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ManpowerSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ManpowerSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [pdfLoading, setPdfLoading] = useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter states
  const [filters, setFilters] = useState({
    customer: '',
    projectName: '',
    projectNumber: '',
    projectManager: ''
  })
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // Dropdown states
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [showProjectNameDropdown, setShowProjectNameDropdown] = useState(false)
  const [showProjectNumberDropdown, setShowProjectNumberDropdown] = useState(false)
  const [showProjectManagerDropdown, setShowProjectManagerDropdown] = useState(false)
  
  // Dropdown refs
  const customerDropdownRef = useRef<HTMLDivElement>(null)
  const projectNameDropdownRef = useRef<HTMLDivElement>(null)
  const projectNumberDropdownRef = useRef<HTMLDivElement>(null)
  const projectManagerDropdownRef = useRef<HTMLDivElement>(null)
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    customers: [] as string[],
    projectNames: [] as string[],
    projectNumbers: [] as string[],
    projectManagers: [] as string[]
  })

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customerDropdownRef.current && !customerDropdownRef.current.contains(event.target as Node)) {
        setShowCustomerDropdown(false)
      }
      if (projectNameDropdownRef.current && !projectNameDropdownRef.current.contains(event.target as Node)) {
        setShowProjectNameDropdown(false)
      }
      if (projectNumberDropdownRef.current && !projectNumberDropdownRef.current.contains(event.target as Node)) {
        setShowProjectNumberDropdown(false)
      }
      if (projectManagerDropdownRef.current && !projectManagerDropdownRef.current.contains(event.target as Node)) {
        setShowProjectManagerDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        setLoading(true)
        console.log('Loading all submissions')
        
        const fetchedSubmissions = await getSubmissions()
        
        // Add mock data for demonstration
        const mockSubmissions: ManpowerSubmission[] = []
        
        // Combine real and mock data  
        const allSubmissions = [...fetchedSubmissions, ...mockSubmissions]
        
        // Sort by submission date in descending order (most recent first)
        const sortedSubmissions = allSubmissions.sort((a, b) => {
          const dateA = new Date(a.submissionDate || a.date);
          const dateB = new Date(b.submissionDate || b.date);
          return dateB.getTime() - dateA.getTime();
        });
        
        setSubmissions(sortedSubmissions)
        setFilteredSubmissions(sortedSubmissions)
        
        // Extract unique values for filter options
        const customers = Array.from(new Set(allSubmissions.map(s => s.data.customer || 'N/A'))).sort()
        const projectNames = Array.from(new Set(allSubmissions.map(s => s.data.projectName || 'N/A'))).sort()
        const projectNumbers = Array.from(new Set(allSubmissions.map(s => s.data.jobNumber || 'N/A'))).sort()
        const projectManagers = Array.from(new Set(allSubmissions.map(s => s.data.projectManager || 'N/A'))).sort()
        
        setFilterOptions({
          customers,
          projectNames,
          projectNumbers,
          projectManagers
        })
      } catch (error) {
        console.error('Error loading submissions:', error)
        toast.error('Failed to load submissions')
      } finally {
        setLoading(false)
      }
    }
    
    // Load submissions immediately without checking for date
    loadSubmissions()
  }, [])
  
  // Apply filters and search whenever they change
  useEffect(() => {
    let filtered = [...submissions]
    
    // Apply search query first
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(s => {
        const searchableFields = [
          s.data.customer,
          s.data.projectName,
          s.data.jobNumber,
          s.data.projectManager,
          s.data.division,
          s.data.camp,
          new Date(s.submissionDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '/'),
          ...(s.data.employees?.map((e: any) => e.employeeName) || [])
        ].filter(Boolean).map(field => field!.toLowerCase())
        
        return searchableFields.some(field => field.includes(query))
      })
    }
    
    // Then apply filters
    if (filters.customer) {
      filtered = filtered.filter(s => (s.data.customer || 'N/A') === filters.customer)
    }
    
    if (filters.projectName) {
      filtered = filtered.filter(s => (s.data.projectName || 'N/A') === filters.projectName)
    }
    
    if (filters.projectNumber) {
      filtered = filtered.filter(s => (s.data.jobNumber || 'N/A') === filters.projectNumber)
    }
    
    if (filters.projectManager) {
      filtered = filtered.filter(s => (s.data.projectManager || 'N/A') === filters.projectManager)
    }
    
    setFilteredSubmissions(filtered)
  }, [filters, searchQuery, submissions])
  
  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }
  
  const clearFilters = () => {
    setFilters({
      customer: '',
      projectName: '',
      projectNumber: '',
      projectManager: ''
    })
    setSearchQuery('')
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top of table
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleViewPDF = async (submission: ManpowerSubmission) => {
    try {
      setPdfLoading(submission.id)
      console.log('=== PDF Generation Debug ===')
      console.log('Generating PDF for submission:', submission.id)
      console.log('Submission data:', submission)
      
      // Call the PDF generation API directly
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission)
      });

      console.log('API Response status:', response.status)
      console.log('API Response headers:', Object.fromEntries(response.headers))

      if (!response.ok) {
        throw new Error(`PDF generation failed: ${response.statusText}`);
      }

      // Create blob URL and open in new tab
      const pdfBlob = await response.blob();
      console.log('PDF Blob size:', pdfBlob.size, 'bytes')
      console.log('PDF Blob type:', pdfBlob.type)
      
      const blobUrl = URL.createObjectURL(pdfBlob);
      console.log('Created blob URL:', blobUrl)
      
      // Try to open in new tab
      const newWindow = window.open(blobUrl, '_blank');
      console.log('window.open result:', newWindow)
      
      if (!newWindow) {
        console.warn('Popup blocked! Trying alternative method...')
        // Alternative: create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `manpower-allocation-${submission.data.jobNumber || 'report'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Clean up blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        console.log('Cleaned up blob URL');
      }, 5000);
      
      console.log('PDF generation completed successfully')
      toast.success('PDF generated successfully!', {
        duration: 3000,
      })
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF. Please try again.', {
        duration: 4000,
      })
    } finally {
      setPdfLoading(null)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/resources/manpower-allocation')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Manpower Allocation
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Manpower Allocation Records
            </h1>
            <p className="text-gray-600">
              Database records of all manpower allocation submissions with PDF reports.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer, project, manager, date..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {(filters.customer || filters.projectName || filters.projectNumber || filters.projectManager || searchQuery) && (
              <div className="flex items-center justify-end mb-3">
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative" ref={customerDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
                <button
                  type="button"
                  onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.customer ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.customer || 'All Customers'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCustomerDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <div className="max-h-40 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleFilterChange('customer', '')
                          setShowCustomerDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          !filters.customer
                            ? 'bg-blue-100 text-primary-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        All Customers
                      </button>
                      {filterOptions.customers.map(customer => (
                        <button
                          key={customer}
                          type="button"
                          onClick={() => {
                            handleFilterChange('customer', customer)
                            setShowCustomerDropdown(false)
                          }}
                          className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                            filters.customer === customer
                              ? 'bg-blue-100 text-primary-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {customer}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={projectNameDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Name</label>
                <button
                  type="button"
                  onClick={() => setShowProjectNameDropdown(!showProjectNameDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.projectName ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.projectName || 'All Projects'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProjectNameDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <div className="max-h-40 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleFilterChange('projectName', '')
                          setShowProjectNameDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          !filters.projectName
                            ? 'bg-blue-100 text-primary-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        All Projects
                      </button>
                      {filterOptions.projectNames.map(name => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            handleFilterChange('projectName', name)
                            setShowProjectNameDropdown(false)
                          }}
                          className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                            filters.projectName === name
                              ? 'bg-blue-100 text-primary-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={projectNumberDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Number</label>
                <button
                  type="button"
                  onClick={() => setShowProjectNumberDropdown(!showProjectNumberDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.projectNumber ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.projectNumber || 'All Numbers'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProjectNumberDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <div className="max-h-40 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleFilterChange('projectNumber', '')
                          setShowProjectNumberDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          !filters.projectNumber
                            ? 'bg-blue-100 text-primary-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        All Numbers
                      </button>
                      {filterOptions.projectNumbers.map(number => (
                        <button
                          key={number}
                          type="button"
                          onClick={() => {
                            handleFilterChange('projectNumber', number)
                            setShowProjectNumberDropdown(false)
                          }}
                          className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                            filters.projectNumber === number
                              ? 'bg-blue-100 text-primary-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={projectManagerDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Manager</label>
                <button
                  type="button"
                  onClick={() => setShowProjectManagerDropdown(!showProjectManagerDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.projectManager ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.projectManager || 'All Managers'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProjectManagerDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <div className="max-h-40 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleFilterChange('projectManager', '')
                          setShowProjectManagerDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          !filters.projectManager
                            ? 'bg-blue-100 text-primary-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        All Managers
                      </button>
                      {filterOptions.projectManagers.map(manager => (
                        <button
                          key={manager}
                          type="button"
                          onClick={() => {
                            handleFilterChange('projectManager', manager)
                            setShowProjectManagerDropdown(false)
                          }}
                          className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                            filters.projectManager === manager
                              ? 'bg-blue-100 text-primary-600'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {manager}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[12%]" />
                  <col className="w-[15%]" />
                  <col className="w-[20%]" />
                  <col className="w-[12%]" />
                  <col className="w-[15%]" />
                  <col className="w-[13%]" />
                  <col className="w-[13%]" />
                </colgroup>
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Project</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">PM</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Employees</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
              </table>
              
              {/* Scrollable table body container - shows ~5 rows then scrolls */}
              <div className="max-h-[483px] overflow-y-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[12%]" />
                    <col className="w-[15%]" />
                    <col className="w-[20%]" />
                    <col className="w-[12%]" />
                    <col className="w-[15%]" />
                    <col className="w-[13%]" />
                    <col className="w-[13%]" />
                  </colgroup>
                  <tbody className="divide-y divide-gray-200">
                {paginatedSubmissions.length > 0 ? (
                  paginatedSubmissions.map((submission, index) => (
                    <tr key={submission.id} className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">
                          {new Date(submission.submissionDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).replace(/\//g, '/')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">
                          {submission.data.customer || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">
                          {submission.data.projectName || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">
                          {submission.data.jobNumber || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">
                          {submission.data.projectManager || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">
                          {submission.data.employees?.length || 0} employees
                          {(submission.data.crossHiredManpower?.length || 0) > 0 && (
                            <div className="text-xs text-gray-500">
                              +{submission.data.crossHiredManpower.length} cross-hired
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleViewPDF(submission)}
                          disabled={pdfLoading === submission.id}
                          className={`px-3 py-1.5 rounded-full text-xs transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
                            pdfLoading === submission.id 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-100 text-primary-600 hover:bg-primary-600 hover:text-white'
                          }`}
                        >
                          {pdfLoading === submission.id ? (
                            <>
                              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                                <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                              </svg>
                              View PDF
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      {searchQuery || filters.projectName || filters.projectNumber || filters.projectManager || filters.customer
                        ? 'No submissions found matching your filters'
                        : 'No submissions available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
                         {/* Pagination Controls */}
             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
               <div className="text-sm text-gray-700">
                 Showing {filteredSubmissions.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredSubmissions.length)} of {filteredSubmissions.length} results
               </div>
               <div className="flex items-center gap-2">
                 <button
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1 || totalPages === 0}
                   className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                     currentPage === 1 || totalPages === 0
                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                       : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                   }`}
                 >
                   Previous
                 </button>
                 
                 {/* Page numbers */}
                 <div className="flex items-center gap-1">
                   {totalPages === 0 ? (
                     <button
                       disabled
                       className="w-8 h-8 text-sm font-medium rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                     >
                       1
                     </button>
                   ) : (
                     Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                       // Show first page, last page, current page, and pages around current
                       if (
                         page === 1 ||
                         page === totalPages ||
                         (page >= currentPage - 1 && page <= currentPage + 1)
                       ) {
                         return (
                           <button
                             key={page}
                             onClick={() => handlePageChange(page)}
                             className={`w-8 h-8 text-sm font-medium rounded-lg ${
                               page === currentPage
                                 ? 'bg-primary-600 text-white'
                                 : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                             }`}
                           >
                             {page}
                           </button>
                         )
                       } else if (
                         page === currentPage - 2 ||
                         page === currentPage + 2
                       ) {
                         return (
                           <span key={page} className="px-1 text-gray-400">
                             ...
                           </span>
                         )
                       }
                       return null
                     })
                   )}
                 </div>
                 
                 <button
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages || totalPages === 0}
                   className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                     currentPage === totalPages || totalPages === 0
                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                       : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                   }`}
                 >
                   Next
                 </button>
               </div>
             </div>
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  )
} 