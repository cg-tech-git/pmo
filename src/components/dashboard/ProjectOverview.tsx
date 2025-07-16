'use client'

import { useState } from 'react'
import { 
  EyeIcon, 
  ChevronRightIcon,
  CalendarIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline'
import { HealthScore, ProjectStatus } from '@/types'

interface Project {
  id: string
  name: string
  status: ProjectStatus
  health: HealthScore
  progress: number
  budget: number
  spent: number
  dueDate: string
  team: number
  manager: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Digital Transformation Initiative',
    status: ProjectStatus.IN_PROGRESS,
    health: HealthScore.GREEN,
    progress: 75,
    budget: 850000,
    spent: 620000,
    dueDate: '2024-03-15',
    team: 8,
    manager: 'Sarah Johnson'
  },
  {
    id: '2',
    name: 'Infrastructure Modernization',
    status: ProjectStatus.IN_PROGRESS,
    health: HealthScore.AMBER,
    progress: 45,
    budget: 1200000,
    spent: 680000,
    dueDate: '2024-05-20',
    team: 12,
    manager: 'Mike Chen'
  },
  {
    id: '3',
    name: 'Security Enhancement Program',
    status: ProjectStatus.IN_PROGRESS,
    health: HealthScore.RED,
    progress: 30,
    budget: 400000,
    spent: 280000,
    dueDate: '2024-02-28',
    team: 6,
    manager: 'Emma Davis'
  },
  {
    id: '4',
    name: 'Customer Portal Redesign',
    status: ProjectStatus.PLANNING,
    health: HealthScore.GREEN,
    progress: 15,
    budget: 320000,
    spent: 45000,
    dueDate: '2024-06-30',
    team: 5,
    manager: 'Alex Rodriguez'
  }
]

function getHealthBadgeClass(health: HealthScore) {
  switch (health) {
    case HealthScore.GREEN:
      return 'status-badge status-green'
    case HealthScore.AMBER:
      return 'status-badge status-amber'
    case HealthScore.RED:
      return 'status-badge status-red'
    default:
      return 'status-badge'
  }
}

function getStatusBadgeClass(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.IN_PROGRESS:
      return 'status-badge bg-blue-100 text-blue-800'
    case ProjectStatus.PLANNING:
      return 'status-badge bg-gray-100 text-gray-800'
    case ProjectStatus.COMPLETED:
      return 'status-badge status-green'
    case ProjectStatus.ON_HOLD:
      return 'status-badge status-amber'
    default:
      return 'status-badge'
  }
}

export default function ProjectOverview() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Active Projects
          </h3>
          <button className="btn btn-secondary text-sm">
            View All Projects
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {project.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={getHealthBadgeClass(project.health)}>
                        {project.health.toUpperCase()}
                      </span>
                      <span className={getStatusBadgeClass(project.status)}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Due {formatDate(project.dueDate)}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {project.team} members
                      </div>
                    </div>
                    <div className="text-xs">
                      PM: {project.manager}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Budget Information */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>
                      Budget: {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                    </span>
                    <span className="flex items-center">
                      <EyeIcon className="h-3 w-3 mr-1" />
                      View Details
                      <ChevronRightIcon className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 