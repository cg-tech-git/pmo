'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function SettingsPage() {
  return (
    <MainLayout>
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-gray-600">
            This section will contain application configuration and user settings including:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">User Preferences</h3>
              <p className="text-sm text-gray-600 mt-1">Personal settings and dashboard customization</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">System Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Application-wide settings and configurations</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Access Control</h3>
              <p className="text-sm text-gray-600 mt-1">User roles and permission management</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 