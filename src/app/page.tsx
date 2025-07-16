'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function DashboardPage() {
  return (
    <MainLayout>
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600">
            This section will contain comprehensive dashboard features including:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">KPI Overview</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time key performance indicators</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Project Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Visual charts and performance metrics</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-600 mt-1">Timeline of project updates and alerts</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Resource Utilization</h3>
              <p className="text-sm text-gray-600 mt-1">Team capacity and workload insights</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Budget Tracking</h3>
              <p className="text-sm text-gray-600 mt-1">Financial performance and forecasts</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
              <p className="text-sm text-gray-600 mt-1">Intelligent recommendations and alerts</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 