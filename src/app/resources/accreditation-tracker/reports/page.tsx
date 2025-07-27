'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface AccreditationReport {
  id: string
  userId: string
  fileName: string
  createdAt: string
  employeeCount: number
  fieldCount: number
  fileSize?: number
}

export default function AccreditationReports() {
  const router = useRouter()
  const [reports, setReports] = useState<AccreditationReport[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredReports, setFilteredReports] = useState<AccreditationReport[]>([])
  
  // Filter states
  const [filters, setFilters] = useState({
    userId: '',
    dateRange: '',
    employeeRange: '',
    fieldRange: ''
  })
  
  // Dropdown states
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false)
  const [showFieldDropdown, setShowFieldDropdown] = useState(false)
  
  // Dropdown refs
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const dateDropdownRef = useRef<HTMLDivElement>(null)
  const employeeDropdownRef = useRef<HTMLDivElement>(null)
  const fieldDropdownRef = useRef<HTMLDivElement>(null)
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    users: [] as string[],
    dateRanges: ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'],
    employeeRanges: ['1-10', '11-50', '51-100', '100+'],
    fieldRanges: ['1-5', '6-10', '11-20', '20+']
  })

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false)
      }
      if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target as Node)) {
        setShowEmployeeDropdown(false)
      }
      if (fieldDropdownRef.current && !fieldDropdownRef.current.contains(event.target as Node)) {
        setShowFieldDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch reports on mount
  useEffect(() => {
    fetchReports()
  }, [])

  // Extract unique users when reports change
  useEffect(() => {
    const uniqueUsers = Array.from(new Set(reports.map(r => r.userId))).sort()
    setFilterOptions(prev => ({ ...prev, users: uniqueUsers }))
  }, [reports])

  // Filter reports based on search and filters
  useEffect(() => {
    let filtered = [...reports]
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(report => 
        report.userId.toLowerCase().includes(query) ||
        report.fileName.toLowerCase().includes(query) ||
        report.createdAt.toLowerCase().includes(query)
      )
    }
    
    // Apply user filter
    if (filters.userId) {
      filtered = filtered.filter(report => report.userId === filters.userId)
    }
    
    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'All time') {
      const now = new Date()
      const reportDate = (report: AccreditationReport) => new Date(report.createdAt)
      
      filtered = filtered.filter(report => {
        const date = reportDate(report)
        switch (filters.dateRange) {
          case 'Today':
            return date.toDateString() === now.toDateString()
          case 'Last 7 days':
            return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          case 'Last 30 days':
            return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          case 'Last 90 days':
            return date >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          default:
            return true
        }
      })
    }
    
    // Apply employee range filter
    if (filters.employeeRange) {
      filtered = filtered.filter(report => {
        const count = report.employeeCount
        switch (filters.employeeRange) {
          case '1-10':
            return count >= 1 && count <= 10
          case '11-50':
            return count >= 11 && count <= 50
          case '51-100':
            return count >= 51 && count <= 100
          case '100+':
            return count > 100
          default:
            return true
        }
      })
    }
    
    // Apply field range filter
    if (filters.fieldRange) {
      filtered = filtered.filter(report => {
        const count = report.fieldCount
        switch (filters.fieldRange) {
          case '1-5':
            return count >= 1 && count <= 5
          case '6-10':
            return count >= 6 && count <= 10
          case '11-20':
            return count >= 11 && count <= 20
          case '20+':
            return count > 20
          default:
            return true
        }
      })
    }
    
    setFilteredReports(filtered)
  }, [searchQuery, reports, filters])

  const fetchReports = async () => {
    try {
      setLoading(true)
      
      // Fetch report history from API
      const response = await fetch('/api/accreditation-reports/history')
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports')
      }
      
      const data = await response.json()
      
      if (data.success && data.reports) {
        // Reports are already sorted in descending order by the API
        setReports(data.reports)
        setFilteredReports(data.reports)
      } else {
        setReports([])
        setFilteredReports([])
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      toast.error('Failed to load reports')
      setReports([])
      setFilteredReports([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = async (report: AccreditationReport) => {
    try {
      setDownloadLoading(report.id)
      
      // TODO: Replace with actual API call to download report
      // For now, simulating download
      const response = await fetch('/api/accreditation-reports/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId: report.id })
      })
      
      if (!response.ok) {
        throw new Error('Failed to download report')
      }
      
      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = report.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      toast.success('Report downloaded successfully')
    } catch (error) {
      console.error('Error downloading report:', error)
      toast.error('Failed to download report')
    } finally {
      setDownloadLoading(null)
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }
  
  const clearFilters = () => {
    setFilters({
      userId: '',
      dateRange: '',
      employeeRange: '',
      fieldRange: ''
    })
    setSearchQuery('')
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReports = filteredReports.slice(startIndex, endIndex)

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

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/resources/accreditation-tracker')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Manpower Accreditation
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Accreditation Reports
            </h1>
            <p className="text-gray-600">
              View and download all generated accreditation reports.
            </p>
          </div>

        <div className="max-w-6xl mx-auto">
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
                placeholder="Search by user ID, filename, date..."
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
          
          {(filters.userId || filters.dateRange || filters.employeeRange || filters.fieldRange || searchQuery) && (
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
            {/* User ID Filter */}
            <div className="relative" ref={userDropdownRef}>
              <label className="block text-xs font-medium text-gray-700 mb-1">User ID</label>
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
              >
                <span className={filters.userId ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.userId || 'All Users'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserDropdown && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full max-h-48 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      handleFilterChange('userId', '')
                      setShowUserDropdown(false)
                    }}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                      !filters.userId ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    All Users
                  </button>
                  {filterOptions.users.map(user => (
                    <button
                      key={user}
                      type="button"
                      onClick={() => {
                        handleFilterChange('userId', user)
                        setShowUserDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        filters.userId === user ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Date Range Filter */}
            <div className="relative" ref={dateDropdownRef}>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
              <button
                type="button"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
              >
                <span className={filters.dateRange ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.dateRange || 'All time'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDateDropdown && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                  {filterOptions.dateRanges.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        handleFilterChange('dateRange', range)
                        setShowDateDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        filters.dateRange === range ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Employee Range Filter */}
            <div className="relative" ref={employeeDropdownRef}>
              <label className="block text-xs font-medium text-gray-700 mb-1">Employee Count</label>
              <button
                type="button"
                onClick={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
              >
                <span className={filters.employeeRange ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.employeeRange || 'All ranges'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showEmployeeDropdown && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      handleFilterChange('employeeRange', '')
                      setShowEmployeeDropdown(false)
                    }}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                      !filters.employeeRange ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    All ranges
                  </button>
                  {filterOptions.employeeRanges.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        handleFilterChange('employeeRange', range)
                        setShowEmployeeDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        filters.employeeRange === range ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Field Range Filter */}
            <div className="relative" ref={fieldDropdownRef}>
              <label className="block text-xs font-medium text-gray-700 mb-1">Field Count</label>
              <button
                type="button"
                onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
              >
                <span className={filters.fieldRange ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.fieldRange || 'All ranges'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFieldDropdown && (
                <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      handleFilterChange('fieldRange', '')
                      setShowFieldDropdown(false)
                    }}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                      !filters.fieldRange ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    All ranges
                  </button>
                  {filterOptions.fieldRanges.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        handleFilterChange('fieldRange', range)
                        setShowFieldDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        filters.fieldRange === range ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fields
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      {searchQuery || filters.userId || filters.dateRange || filters.employeeRange || filters.fieldRange 
                        ? 'No reports found matching your filters' 
                        : 'No reports available'}
                    </td>
                  </tr>
                ) : (
                  paginatedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(report.createdAt)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(report.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {report.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.employeeCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.fieldCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDownloadReport(report)}
                          disabled={downloadLoading === report.id}
                          className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-primary-600 bg-blue-100 rounded-full hover:bg-primary-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {downloadLoading === report.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                              </svg>
                              View .xlsx
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
                      {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredReports.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredReports.length)} of {filteredReports.length} results
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