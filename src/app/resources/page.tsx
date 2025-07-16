'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function ResourcesPage() {
  return (
    <MainLayout>
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-gray-600">
            This section will contain resource management features including:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Manpower Management</h3>
              <p className="text-sm text-gray-600 mt-1">Track team allocation and utilization</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Equipment Tracking</h3>
              <p className="text-sm text-gray-600 mt-1">Monitor equipment allocation and status</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Accreditation Tracker</h3>
              <p className="text-sm text-gray-600 mt-1">Manage certifications and expiry dates</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 