'use client'

import {
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

interface Activity {
  id: string
  type: 'update' | 'milestone' | 'alert' | 'completion'
  title: string
  description: string
  timestamp: string
  user: string
  project: string
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Budget Alert',
    description: 'Infrastructure Modernization project exceeded 80% budget threshold',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'System',
    project: 'Infrastructure Modernization'
  },
  {
    id: '2',
    type: 'milestone',
    title: 'Milestone Completed',
    description: 'Phase 2 development completed for Digital Transformation Initiative',
    timestamp: '2024-01-15T09:15:00Z',
    user: 'Sarah Johnson',
    project: 'Digital Transformation Initiative'
  },
  {
    id: '3',
    type: 'update',
    title: 'Status Update',
    description: 'Weekly progress report submitted',
    timestamp: '2024-01-14T16:45:00Z',
    user: 'Mike Chen',
    project: 'Infrastructure Modernization'
  },
  {
    id: '4',
    type: 'completion',
    title: 'Task Completed',
    description: 'Security audit documentation finalized',
    timestamp: '2024-01-14T14:20:00Z',
    user: 'Emma Davis',
    project: 'Security Enhancement Program'
  },
  {
    id: '5',
    type: 'update',
    title: 'Resource Allocation',
    description: 'New team member assigned to frontend development',
    timestamp: '2024-01-14T11:00:00Z',
    user: 'Alex Rodriguez',
    project: 'Customer Portal Redesign'
  }
]

function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'alert':
      return <ExclamationTriangleIcon className="h-5 w-5 text-status-red" />
    case 'milestone':
      return <CheckCircleIcon className="h-5 w-5 text-status-green" />
    case 'completion':
      return <CheckCircleIcon className="h-5 w-5 text-primary-600" />
    case 'update':
    default:
      return <DocumentTextIcon className="h-5 w-5 text-gray-400" />
  }
}

function getActivityBorderColor(type: Activity['type']) {
  switch (type) {
    case 'alert':
      return 'border-l-status-red'
    case 'milestone':
      return 'border-l-status-green'
    case 'completion':
      return 'border-l-primary-600'
    case 'update':
    default:
      return 'border-l-gray-300'
  }
}

export default function RecentActivity() {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
          <button className="btn btn-secondary text-sm">
            View All
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {mockActivities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== mockActivities.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 ring-2 ring-white">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className={`min-w-0 flex-1 border-l-4 pl-4 ${getActivityBorderColor(activity.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            {activity.description}
                          </div>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <UserIcon className="h-3 w-3 mr-1" />
                            <span className="mr-3">{activity.user}</span>
                            <span className="text-gray-300">•</span>
                            <span className="ml-3">{activity.project}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 