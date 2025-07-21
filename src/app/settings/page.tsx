'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'

export default function SettingsPage() {
  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative pt-8 pb-[33px]">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[280px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '0.65fr 0.35fr' }}>
            {/* Left Column - Text Content (65%) */}
            <div className="flex flex-col justify-center p-6">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 tracking-tight mb-1">System Settings</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                Configuration & Preferences
              </h1>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Comprehensive system configuration, user preferences and access control management. 
                Customize your PMO experience with personalized settings and security controls.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="mt-4 flex gap-4">
                <div className="bg-primary-600 text-white text-sm px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-gray-200 hover:text-gray-600 transition-colors">
                  Learn more
                </div>
              </div>
            </div>

            {/* Right Column - Image (35%) */}
            <div className="relative h-full bg-white">
              <Image
                src="/images/puzzle.png"
                alt="System Settings"
                fill
                className="object-cover scale-90 -translate-y-[2%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-25">
        <div className="pt-6 pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-9 px-16 lg:px-32">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Everything you need to configure your PMO
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Customize your experience with comprehensive settings management and security controls.
                Configure user preferences, system parameters and access permissions.
              </p>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Preferences</h3>
              <p className="text-sm text-gray-600">Personal settings and dashboard customization</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Configuration</h3>
              <p className="text-sm text-gray-600">Application-wide settings and configurations</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Control</h3>
              <p className="text-sm text-gray-600">User roles and permission management</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 