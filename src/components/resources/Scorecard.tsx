'use client'

import { UsersIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline'

interface FormData {
  employeeId: string
  dateOfBirth: string
  dateOfJoining: string
  language: string
  jobTitle: string
  department: string
  contactNo: string
  residenceLocation: string
  salary: string
  photo: File | null
  nationality: string
  gender: string
  molNumber: string
  molStartDate: string
  molExpiryDate: string
  emiratesUidNo: string
  emiratesIdNo: string
  emiratesIdIssueDate: string
  emiratesIdExpiryDate: string
  passportIssueCountry: string
  passportNo: string
  passportIssueDate: string
  passportExpiryDate: string
  passportHoldingConfirmation: string
  visaIssuePlace: string
  visaStartDate: string
  visaExpireDate: string
  employeeThirdPartyCertificateType: string
  certificateNo: string
  certificateStartDate: string
  certificateExpiryDate: string
  msra: File | null
  undertakingLetter: File | null
  groupsInsuranceType: string
  groupsInsuranceStartDate: string
  groupsInsuranceExpiryDate: string
  wcInsurance: string
  emiratesIdFile: File | null
  visaFile: File | null
  groupInsuranceFile: File | null
}

interface Draft {
  id: string
  employeeId: string
  formData: FormData
  lastSaved: string
  completionPercentage: number
}

interface ScorecardProps {
  completedEmployees: FormData[]
  drafts: Draft[]
}

export default function Scorecard({ completedEmployees, drafts }: ScorecardProps) {
  const totalEmployees = completedEmployees.length
  const totalDrafts = drafts.length
  const totalRecords = totalEmployees + totalDrafts

  // Calculate draft statistics
  const nearlyCompleteDrafts = drafts.filter(d => d.completionPercentage >= 80).length
  const inProgressDrafts = drafts.filter(d => d.completionPercentage >= 50 && d.completionPercentage < 80).length
  const justStartedDrafts = drafts.filter(d => d.completionPercentage < 50).length

  // Calculate recent activity (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const recentDrafts = drafts.filter(d => new Date(d.lastSaved) >= sevenDaysAgo).length

  // Calculate completion rate
  const completionRate = totalRecords > 0 ? (totalEmployees / totalRecords) * 100 : 0

  const stats = [
    {
      name: 'Total Employees',
      value: totalEmployees,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Fully completed records'
    },
    {
      name: 'Draft Employees', 
      value: totalDrafts,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Incomplete records'
    },
    {
      name: 'Nearly Complete',
      value: nearlyCompleteDrafts,
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Drafts >80% complete'
    },
    {
      name: 'Completion Rate',
      value: `${Math.round(completionRate)}%`,
      icon: UsersIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Overall completion'
    }
  ]

  const priorities = [
    {
      title: 'Needs Attention',
      count: justStartedDrafts,
      description: 'Drafts with <50% completion',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Ready to Complete',
      count: nearlyCompleteDrafts,
      description: 'Drafts >80% complete',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Recent Activity',
      count: recentDrafts,
      description: 'Drafts updated this week',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-indigo-900 mb-2">Employee Records Scorecard</h3>
        <p className="text-sm text-indigo-700">
          Track completion status and manage employee accreditation records efficiently.
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </dd>
                    <dd className="text-xs text-gray-500">
                      {stat.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Progress */}
      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Completion Overview</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Overall Progress</span>
              <span>{Math.round(completionRate)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
          
          {totalRecords > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalEmployees}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{inProgressDrafts}</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{justStartedDrafts}</div>
                <div className="text-sm text-gray-500">Just Started</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Priority Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {priorities.map((priority) => (
          <div key={priority.title} className={`${priority.bgColor} ${priority.borderColor} border rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-lg font-semibold ${priority.color}`}>
                  {priority.count}
                </h4>
                <p className="text-sm font-medium text-gray-900">
                  {priority.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {priority.description}
                </p>
              </div>
              <div className={`p-2 rounded-full ${priority.bgColor}`}>
                {priority.title === 'Needs Attention' && <ExclamationCircleIcon className={`h-6 w-6 ${priority.color}`} />}
                {priority.title === 'Ready to Complete' && <CheckCircleIcon className={`h-6 w-6 ${priority.color}`} />}
                {priority.title === 'Recent Activity' && <CalendarIcon className={`h-6 w-6 ${priority.color}`} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      {totalRecords > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Quick Insights</h4>
          <div className="space-y-3 text-sm">
            {totalEmployees === 0 && totalDrafts > 0 && (
              <div className="flex items-center p-3 bg-yellow-50 rounded-md">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-yellow-800">
                  You have {totalDrafts} draft{totalDrafts !== 1 ? 's' : ''} but no completed employees yet. 
                  Focus on completing the highest progress drafts first.
                </span>
              </div>
            )}
            
            {nearlyCompleteDrafts > 0 && (
              <div className="flex items-center p-3 bg-green-50 rounded-md">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                <span className="text-green-800">
                  {nearlyCompleteDrafts} draft{nearlyCompleteDrafts !== 1 ? 's are' : ' is'} nearly complete (80%+). 
                  These can be finished quickly to boost your completion rate.
                </span>
              </div>
            )}
            
            {justStartedDrafts > 3 && (
              <div className="flex items-center p-3 bg-blue-50 rounded-md">
                <ChartBarIcon className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-blue-800">
                  Consider focusing on fewer drafts at once. You have {justStartedDrafts} barely started records 
                  that might benefit from consolidation.
                </span>
              </div>
            )}
            
            {recentDrafts === 0 && totalDrafts > 0 && (
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-800">
                  No recent activity on drafts this week. Consider scheduling time to continue incomplete records.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalRecords === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employee records yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start adding employees to see your completion statistics and progress tracking.
          </p>
        </div>
      )}
    </div>
  )
} 