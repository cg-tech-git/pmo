'use client'

import { CalendarIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Project Management Dashboard
          </h1>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {currentDate}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">12</div>
            <div className="text-xs text-gray-500">Active Projects</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-amber">3</div>
            <div className="text-xs text-gray-500">At Risk</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-green">85%</div>
            <div className="text-xs text-gray-500">On Track</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              AI-Generated Insights
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Project Alpha shows a 15% budget variance due to increased equipment costs. 
              Consider resource reallocation to maintain schedule adherence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 