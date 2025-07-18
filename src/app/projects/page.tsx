'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'

export default function ProjectsPage() {
  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative py-8">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[360px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 0.8fr' }}>
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center p-8 pb-12">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 tracking-tight mb-2">Project Portfolio</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Planning & Scheduling
              </h1>
              <p className="mt-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                Comprehensive project tracking, milestone management and team collaboration platform. 
                Monitor project progress, manage resources and deliver successful outcomes with data-driven insights.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="mt-6 flex gap-4">
                <div className="bg-primary-600 text-white text-sm px-4 py-2 rounded-full font-medium">
                  Coming soon!
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-full overflow-hidden">
              <Image
                src="/images/dashboards.png"
                alt="PMO Project Management"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 