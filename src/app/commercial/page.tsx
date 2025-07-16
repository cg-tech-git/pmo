'use client'

import MainLayout from '@/components/layout/MainLayout'

export default function CommercialPage() {
  return (
    <MainLayout>
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Commercial Management</h1>
          <p className="text-gray-600">
            This section will contain financial and commercial management features including:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">EVM Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Earned Value Management calculations and reporting</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Budget Tracking</h3>
              <p className="text-sm text-gray-600 mt-1">Monitor project budgets and spending</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Cost Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed cost breakdown and variance analysis</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 