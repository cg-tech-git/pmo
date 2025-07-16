'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function ReportsPage() {
  return (
    <MainLayout>
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
          <p className="text-gray-600">
            This section will contain comprehensive reporting features including:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Custom Reports</h3>
              <p className="text-sm text-gray-600 mt-1">Create and schedule custom reports</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Executive Dashboards</h3>
              <p className="text-sm text-gray-600 mt-1">High-level executive reporting and insights</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Export Tools</h3>
              <p className="text-sm text-gray-600 mt-1">Export reports in multiple formats</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 