'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'

export default function DashboardPage() {
  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative pt-8 pb-[33px]">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[280px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '0.65fr 0.35fr' }}>
            {/* Left Column - Text Content (65%) */}
            <div className="flex flex-col justify-center p-6">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 tracking-tight mb-1">Project Dashboard</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                Analytics & Insights
              </h1>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                              Real-time project monitoring, performance analytics and comprehensive reporting dashboard. 
              Get instant insights into project health, resource utilization and key performance indicators.
            </p>
            
            {/* Learn More Button */}
            <div className="mt-4 flex gap-4">
              <div className="bg-primary-600 text-white text-sm px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-gray-200 hover:text-gray-600 transition-colors">
                Learn more
              </div>
            </div>
            </div>

            {/* Right Column - Image (35%) */}
            <div className="relative h-full bg-white p-4">
              <Image
                src="/images/dash4banner.png"
                alt="Dashboard Analytics"
                fill
                className="object-cover scale-75 translate-y-[3%] translate-x-[7%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 