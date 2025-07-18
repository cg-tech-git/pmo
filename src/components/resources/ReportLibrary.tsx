'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  DocumentArrowDownIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface Report {
  id: string
  name: string
  type: 'Employee Credentials' | 'Compliance Report' | 'Certification Status' | 'Document Audit'
  generatedDate: string
  generatedBy: string
  employeeCount: number
  fileSize: string
  format: 'CSV' | 'PDF' | 'XLSX'
  status: 'Available' | 'Processing' | 'Error'
}

export default function ReportLibrary() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [selectedFormat, setSelectedFormat] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data - in real app this would come from a database
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Q4 2024 Employee Credentials Report',
        type: 'Employee Credentials',
        generatedDate: '2024-01-15T10:30:00Z',
        generatedBy: 'John Smith',
        employeeCount: 45,
        fileSize: '2.3 MB',
        format: 'CSV',
        status: 'Available'
      },
      {
        id: '2',
        name: 'Certification Status Overview - January 2024',
        type: 'Certification Status',
        generatedDate: '2024-01-12T14:15:00Z',
        generatedBy: 'Sarah Wilson',
        employeeCount: 38,
        fileSize: '1.8 MB',
        format: 'PDF',
        status: 'Available'
      },
      {
        id: '3',
        name: 'Document Audit Report - December 2023',
        type: 'Document Audit',
        generatedDate: '2023-12-28T09:45:00Z',
        generatedBy: 'Mike Johnson',
        employeeCount: 42,
        fileSize: '3.1 MB',
        format: 'XLSX',
        status: 'Available'
      },
      {
        id: '4',
        name: 'Compliance Report - End of Year 2023',
        type: 'Compliance Report',
        generatedDate: '2023-12-20T16:20:00Z',
        generatedBy: 'Lisa Davis',
        employeeCount: 50,
        fileSize: '4.2 MB',
        format: 'PDF',
        status: 'Available'
      },
      {
        id: '5',
        name: 'Monthly Employee Update - December 2023',
        type: 'Employee Credentials',
        generatedDate: '2023-12-01T11:00:00Z',
        generatedBy: 'David Brown',
        employeeCount: 35,
        fileSize: '1.5 MB',
        format: 'CSV',
        status: 'Available'
      }
    ]
    setReports(mockReports)
  }, [])

  const reportTypes = ['All', 'Employee Credentials', 'Compliance Report', 'Certification Status', 'Document Audit']
  const formats = ['All', 'CSV', 'PDF', 'XLSX']

  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'All' || report.type === selectedType
      const matchesFormat = selectedFormat === 'All' || report.format === selectedFormat
      return matchesSearch && matchesType && matchesFormat
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.generatedDate).getTime() - new Date(b.generatedDate).getTime()
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
      }
      return sortOrder === 'desc' ? -comparison : comparison
    })

  const handleDownload = (report: Report) => {
    // In a real app, this would trigger a download from the server
    console.log('Downloading report:', report.name)
    // Simulate download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${report.name}.${report.format.toLowerCase()}`
    link.click()
  }

  const handlePreview = (report: Report) => {
    // In a real app, this would open a preview modal or new tab
    console.log('Previewing report:', report.name)
  }

  const handleDelete = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setReports(prev => prev.filter(r => r.id !== reportId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: Report['status']) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'Available':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'Processing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'Error':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getFormatIcon = (format: string) => {
    const baseClasses = "w-5 h-5"
    switch (format) {
      case 'PDF':
        return <DocumentTextIcon className={`${baseClasses} text-red-500`} />
      case 'CSV':
        return <DocumentTextIcon className={`${baseClasses} text-green-500`} />
      case 'XLSX':
        return <DocumentTextIcon className={`${baseClasses} text-blue-500`} />
      default:
        return <DocumentTextIcon className={`${baseClasses} text-gray-500`} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Library</h2>
        <p className="text-gray-600">
          Access and manage previously generated reports. Download, preview, or delete reports as needed.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Reports</p>
              <p className="text-2xl font-bold text-blue-900">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <CalendarIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">This Month</p>
              <p className="text-2xl font-bold text-green-900">
                {reports.filter(r => new Date(r.generatedDate).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <UserGroupIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Avg. Employees</p>
              <p className="text-2xl font-bold text-purple-900">
                {Math.round(reports.reduce((sum, r) => sum + r.employeeCount, 0) / reports.length) || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center">
            <DocumentArrowDownIcon className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">Total Size</p>
              <p className="text-2xl font-bold text-orange-900">
                {(reports.reduce((sum, r) => sum + parseFloat(r.fileSize), 0)).toFixed(1)} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Format Filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
          >
            {formats.map(format => (
              <option key={format} value={format}>{format === 'All' ? 'All Formats' : format}</option>
            ))}
          </select>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'type')}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFormatIcon(report.format)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.fileSize} • {report.format}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(report.generatedDate)}</div>
                    <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.employeeCount} employees</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(report.status)}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handlePreview(report)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Preview"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(report)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Download"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedType !== 'All' || selectedFormat !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'Generate your first report to see it here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 