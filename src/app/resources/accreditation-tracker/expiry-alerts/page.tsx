'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface ExpiryAlert {
  id: string
  employeeId: string
  documentType: string
  documentNumber: string
  expiryDate: string
  daysUntilExpiry: number
  status: 'expired' | 'critical' | 'warning' | 'safe'
  attachmentFileName?: string
}

export default function ExpiryAlerts() {
  const router = useRouter()
  const [alerts, setAlerts] = useState<ExpiryAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredAlerts, setFilteredAlerts] = useState<ExpiryAlert[]>([])
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter states
  const [filters, setFilters] = useState({
    daysFilter: '',
    documentTypeFilter: '',
    statusFilter: '',
    employeeIdFilter: ''
  })
  
  // Dropdown states
  const [showDaysDropdown, setShowDaysDropdown] = useState(false)
  const [showDocumentTypeDropdown, setShowDocumentTypeDropdown] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false)
  
  // Dropdown refs
  const daysDropdownRef = useRef<HTMLDivElement>(null)
  const documentTypeDropdownRef = useRef<HTMLDivElement>(null)
  const statusDropdownRef = useRef<HTMLDivElement>(null)
  const employeeDropdownRef = useRef<HTMLDivElement>(null)
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    daysOptions: ['Expired', 'Next 30 days', 'Next 60 days', 'Next 90 days'],
    documentTypeOptions: ['MOL', 'Emirates ID', 'Passport', 'Visa', 'Certificate', 'Group Insurance'],
    statusOptions: ['Expired', 'Critical (< 30 days)', 'Warning (30-60 days)', 'Safe (> 60 days)'],
    employeeIds: [] as string[]
  })

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (daysDropdownRef.current && !daysDropdownRef.current.contains(event.target as Node)) {
        setShowDaysDropdown(false)
      }
      if (documentTypeDropdownRef.current && !documentTypeDropdownRef.current.contains(event.target as Node)) {
        setShowDocumentTypeDropdown(false)
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false)
      }
      if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target as Node)) {
        setShowEmployeeDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch alerts on mount
  useEffect(() => {
    fetchAlerts()
  }, [])

  // Filter alerts based on search and filters
  useEffect(() => {
    let filtered = [...alerts]
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(alert => 
        alert.employeeId.toLowerCase().includes(query) ||
        alert.documentType.toLowerCase().includes(query) ||
        alert.documentNumber.toLowerCase().includes(query) ||
        alert.expiryDate.toLowerCase().includes(query)
      )
    }
    
    // Apply days filter
    if (filters.daysFilter) {
      filtered = filtered.filter(alert => {
        const days = alert.daysUntilExpiry
        switch (filters.daysFilter) {
          case 'Expired':
            return days < 0
          case 'Next 30 days':
            return days >= 0 && days <= 30
          case 'Next 60 days':
            return days >= 0 && days <= 60
          case 'Next 90 days':
            return days >= 0 && days <= 90
          default:
            return true
        }
      })
    }
    
    // Apply document type filter
    if (filters.documentTypeFilter) {
      filtered = filtered.filter(alert => alert.documentType === filters.documentTypeFilter)
    }
    
    // Apply status filter
    if (filters.statusFilter) {
      const statusMap: { [key: string]: ExpiryAlert['status'] } = {
        'Expired': 'expired',
        'Critical (< 30 days)': 'critical',
        'Warning (30-60 days)': 'warning',
        'Safe (> 60 days)': 'safe'
      }
      filtered = filtered.filter(alert => alert.status === statusMap[filters.statusFilter])
    }
    
    // Apply employee ID filter
    if (filters.employeeIdFilter) {
      filtered = filtered.filter(alert => alert.employeeId === filters.employeeIdFilter)
    }
    
    setFilteredAlerts(filtered)
  }, [searchQuery, alerts, filters])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      
      // Fetch actual expiry data from API
      const response = await fetch('/api/accreditation-expiry')
      
      if (!response.ok) {
        throw new Error('Failed to fetch expiry alerts')
      }
      
      const data = await response.json()
      
      if (data.success && data.alerts) {
        const transformedAlerts: ExpiryAlert[] = data.alerts.map((alert: any, index: number) => ({
          id: `alert-${index + 1}`,
          employeeId: alert.employeeId,
          documentType: alert.documentType,
          documentNumber: alert.documentNumber,
          expiryDate: alert.expiryDate,
          daysUntilExpiry: alert.daysUntilExpiry,
          status: alert.status.toLowerCase() as ExpiryAlert['status'],
          attachmentFileName: alert.attachmentFileName
        }))
        
        setAlerts(transformedAlerts)
        setFilteredAlerts(transformedAlerts)
        return
      }
      

    } catch (error) {
      console.error('Error fetching alerts:', error)
      toast.error('Failed to load expiry alerts')
      setAlerts([])
      setFilteredAlerts([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }
  
  const clearFilters = () => {
    setFilters({
      daysFilter: '',
      documentTypeFilter: '',
      statusFilter: '',
      employeeIdFilter: ''
    })
    setSearchQuery('')
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

  const handleViewDocument = async (alert: ExpiryAlert) => {
    if (!alert.attachmentFileName) {
      toast.error('No document attachment found')
      return
    }

    try {
      // Construct the API URL with employee ID and filename
      const apiUrl = `/api/accreditation-attachment?file=${encodeURIComponent(alert.attachmentFileName)}&empId=${alert.employeeId}`
      
      // Open the document in a new tab
      window.open(apiUrl, '_blank')
    } catch (error) {
      console.error('Error viewing document:', error)
      toast.error('Failed to open document')
    }
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex)

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
              Expiry Alerts
            </h1>
            <p className="text-gray-600">
              Monitor upcoming expiry dates for employee documents and certifications.
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
                  placeholder="Search expiry alerts..."
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
            
            {(filters.daysFilter || filters.documentTypeFilter || filters.statusFilter || filters.employeeIdFilter || searchQuery) && (
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
              {/* Days Filter */}
              <div className="relative" ref={daysDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Period</label>
                <button
                  type="button"
                  onClick={() => setShowDaysDropdown(!showDaysDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.daysFilter ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.daysFilter || 'All periods'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDaysDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        handleFilterChange('daysFilter', '')
                        setShowDaysDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        !filters.daysFilter ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All periods
                    </button>
                    {filterOptions.daysOptions.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleFilterChange('daysFilter', option)
                          setShowDaysDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          filters.daysFilter === option ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Document Type Filter */}
              <div className="relative" ref={documentTypeDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Document Type</label>
                <button
                  type="button"
                  onClick={() => setShowDocumentTypeDropdown(!showDocumentTypeDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.documentTypeFilter ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.documentTypeFilter || 'All types'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDocumentTypeDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        handleFilterChange('documentTypeFilter', '')
                        setShowDocumentTypeDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        !filters.documentTypeFilter ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All types
                    </button>
                    {filterOptions.documentTypeOptions.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleFilterChange('documentTypeFilter', option)
                          setShowDocumentTypeDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          filters.documentTypeFilter === option ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Status Filter */}
              <div className="relative" ref={statusDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.statusFilter ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.statusFilter || 'All statuses'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        handleFilterChange('statusFilter', '')
                        setShowStatusDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        !filters.statusFilter ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All statuses
                    </button>
                    {filterOptions.statusOptions.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleFilterChange('statusFilter', option)
                          setShowStatusDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          filters.statusFilter === option ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Employee ID Filter */}
              <div className="relative" ref={employeeDropdownRef}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Employee ID</label>
                <button
                  type="button"
                  onClick={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-left flex items-center justify-between text-sm"
                >
                  <span className={filters.employeeIdFilter ? 'text-gray-900' : 'text-gray-500'}>
                    {filters.employeeIdFilter || 'All employees'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showEmployeeDropdown && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full max-h-48 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        handleFilterChange('employeeIdFilter', '')
                        setShowEmployeeDropdown(false)
                      }}
                      className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                        !filters.employeeIdFilter ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All employees
                    </button>
                    {filterOptions.employeeIds.map(empId => (
                      <button
                        key={empId}
                        type="button"
                        onClick={() => {
                          handleFilterChange('employeeIdFilter', empId)
                          setShowEmployeeDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-colors ${
                          filters.employeeIdFilter === empId ? 'bg-blue-100 text-primary-600' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {empId}
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
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Until Expiry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAlerts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        {searchQuery || filters.daysFilter || filters.documentTypeFilter || filters.statusFilter || filters.employeeIdFilter 
                          ? 'No alerts found matching your filters' 
                          : 'No expiry alerts available'}
                      </td>
                    </tr>
                  ) : (
                    paginatedAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {alert.employeeId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alert.documentType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alert.documentNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alert.expiryDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {alert.daysUntilExpiry < 0 
                              ? `Expired ${Math.abs(alert.daysUntilExpiry)} days ago`
                              : `${alert.daysUntilExpiry} days`
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            alert.status === 'expired' ? 'bg-red-100 text-red-800' :
                            alert.status === 'critical' ? 'bg-orange-100 text-orange-800' :
                            alert.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.status === 'expired' ? 'Expired' :
                             alert.status === 'critical' ? 'Critical' :
                             alert.status === 'warning' ? 'Warning' :
                             'Valid'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleViewDocument(alert)}
                            disabled={!alert.attachmentFileName}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                              alert.attachmentFileName 
                                ? 'text-primary-600 bg-blue-100 hover:bg-primary-600 hover:text-white cursor-pointer'
                                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                              <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                            </svg>
                            View Document
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
                Showing {filteredAlerts.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredAlerts.length)} of {filteredAlerts.length} results
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