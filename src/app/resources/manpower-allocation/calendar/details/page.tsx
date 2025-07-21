'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSubmissionsByDate, type ManpowerSubmission } from '@/lib/submissionStorage'
import MainLayout from '@/components/layout/MainLayout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ManpowerAllocationDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
  const [submissions, setSubmissions] = useState<ManpowerSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ManpowerSubmission[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter states
  const [filters, setFilters] = useState({
    customer: '',
    projectName: '',
    projectNumber: '',
    projectManager: ''
  })
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    customers: [] as string[],
    projectNames: [] as string[],
    projectNumbers: [] as string[],
    projectManagers: [] as string[]
  })

  useEffect(() => {
    if (date) {
      const daySubmissions = getSubmissionsByDate(date)
      
      // Add mock data for demonstration
      const mockSubmissions: ManpowerSubmission[] = [
        {
          id: 'mock-1',
          date: date,
          submissionDate: new Date(date).toISOString(),
          pdfUrl: '#',
          data: {
            date: date,
            time: '09:00',
            jobNumber: 'JOB-2024-001',
            country: 'UAE',
            division: 'Construction',
            camp: 'Camp A',
            customer: 'ABC Corporation',
            customerContact: 'John Smith',
            projectName: 'Tower Construction Phase 1',
            projectManager: 'Sarah Johnson',
            projectManagerContact: '+971 50 123 4567',
            projectManagerEmail: 'sarah.j@example.com',
            employees: [
              { id: '1', employeeId: 'EMP001', employeeName: 'Ahmed Ali', employeeGrade: 'Senior' },
              { id: '2', employeeId: 'EMP002', employeeName: 'Mohammed Hassan', employeeGrade: 'Junior' }
            ],
            crossHiredManpower: []
          }
        },
        {
          id: 'mock-2',
          date: date,
          submissionDate: new Date(date).toISOString(),
          pdfUrl: '#',
          data: {
            date: date,
            time: '10:30',
            jobNumber: 'JOB-2024-002',
            country: 'Saudi Arabia',
            division: 'Infrastructure',
            camp: 'Camp B',
            customer: 'XYZ Engineering',
            customerContact: 'David Brown',
            projectName: 'Highway Expansion Project',
            projectManager: 'Michael Chen',
            projectManagerContact: '+966 55 987 6543',
            projectManagerEmail: 'michael.c@example.com',
            employees: [
              { id: '3', employeeId: 'EMP003', employeeName: 'Ali Rahman', employeeGrade: 'Senior' },
              { id: '4', employeeId: 'EMP004', employeeName: 'Khalid Omar', employeeGrade: 'Mid' },
              { id: '5', employeeId: 'EMP005', employeeName: 'Hassan Ahmed', employeeGrade: 'Junior' }
            ],
            crossHiredManpower: [
              { id: '1', supplierName: 'Tech Manpower Co.', contactNumber: '+971 4 555 1234', manpowerTotal: '5' }
            ]
          }
        },
        {
          id: 'mock-3',
          date: date,
          submissionDate: new Date(date).toISOString(),
          pdfUrl: '#',
          data: {
            date: date,
            time: '14:15',
            jobNumber: 'JOB-2024-003',
            country: 'Qatar',
            division: 'Maintenance',
            camp: 'Camp C',
            customer: 'Global Services Ltd',
            customerContact: 'Emma Wilson',
            projectName: 'Facility Maintenance Contract',
            projectManager: 'Robert Davis',
            projectManagerContact: '+974 33 456 7890',
            projectManagerEmail: 'robert.d@example.com',
            employees: [
              { id: '6', employeeId: 'EMP006', employeeName: 'Ibrahim Khan', employeeGrade: 'Senior' }
            ],
            crossHiredManpower: []
          }
        }
      ]
      
      // Combine real and mock data
      const allSubmissions = [...daySubmissions, ...mockSubmissions]
      setSubmissions(allSubmissions)
      setFilteredSubmissions(allSubmissions)
      
      // Extract unique values for filter options
      const customers = Array.from(new Set(allSubmissions.map(s => s.data.customer || 'N/A'))).sort()
      const projectNames = Array.from(new Set(allSubmissions.map(s => s.data.projectName || s.data.project || 'N/A'))).sort()
      const projectNumbers = Array.from(new Set(allSubmissions.map(s => s.data.jobNumber || 'N/A'))).sort()
      const projectManagers = Array.from(new Set(allSubmissions.map(s => s.data.projectManager || 'N/A'))).sort()
      
      setFilterOptions({
        customers,
        projectNames,
        projectNumbers,
        projectManagers
      })
      
      setLoading(false)
    }
  }, [date])
  
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
          s.data.project,
          s.data.jobNumber,
          s.data.projectManager,
          s.data.division,
          s.data.camp,
          new Date(s.submissionDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '/'),
          ...(s.data.employees?.map(e => e.employeeName) || [])
        ].filter(Boolean).map(field => field!.toLowerCase())
        
        return searchableFields.some(field => field.includes(query))
      })
    }
    
    // Then apply filters
    if (filters.customer) {
      filtered = filtered.filter(s => (s.data.customer || 'N/A') === filters.customer)
    }
    
    if (filters.projectName) {
      filtered = filtered.filter(s => (s.data.projectName || s.data.project || 'N/A') === filters.projectName)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleViewPDF = (submission: ManpowerSubmission) => {
    window.open(submission.pdfUrl, '_blank')
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
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Calendar
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Manpower Allocation Submissions
            </h1>
            <p className="text-gray-600">
              {date ? formatDate(date) : 'Selected Date'} • {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} {(filters.customer || filters.projectName || filters.projectNumber || filters.projectManager || searchQuery) ? '(filtered)' : ''}
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
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
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
                <select
                  value={filters.customer}
                  onChange={(e) => handleFilterChange('customer', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Customers</option>
                  {filterOptions.customers.map(customer => (
                    <option key={customer} value={customer}>{customer}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Name</label>
                <select
                  value={filters.projectName}
                  onChange={(e) => handleFilterChange('projectName', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Projects</option>
                  {filterOptions.projectNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Number</label>
                <select
                  value={filters.projectNumber}
                  onChange={(e) => handleFilterChange('projectNumber', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Numbers</option>
                  {filterOptions.projectNumbers.map(number => (
                    <option key={number} value={number}>{number}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Manager</label>
                <select
                  value={filters.projectManager}
                  onChange={(e) => handleFilterChange('projectManager', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Managers</option>
                  {filterOptions.projectManagers.map(manager => (
                    <option key={manager} value={manager}>{manager}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Submission Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Number</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Manager</th>
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
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission, index) => (
                    <tr key={submission.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
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
                          {submission.data.projectName || submission.data.project || 'N/A'}
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
                          className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-200 hover:text-gray-600 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                            <path fill="currentColor" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M15,10c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-9H15z M14.7,14.7C14.7,14.7,14.7,14.7,14.7,14.7c-0.4,0.4-1,0.4-1.4,0l0,0L13,14.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.6l-0.3,0.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0l2,2C15.1,13.7,15.1,14.3,14.7,14.7z"></path>
                          </svg>
                          View PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No submissions found for this date.
                    </td>
                  </tr>
                )}
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