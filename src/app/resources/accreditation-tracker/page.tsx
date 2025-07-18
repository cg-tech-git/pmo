'use client'

import MainLayout from '@/components/layout/MainLayout'
import AccreditationTracker from '@/components/resources/AccreditationTracker'

export default function AccreditationTrackerPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <AccreditationTracker />
      </div>
    </MainLayout>
  )
} 