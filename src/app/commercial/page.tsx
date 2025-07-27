'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'

export default function CommercialPage() {
  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative pt-8 pb-[33px]">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[280px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '0.65fr 0.35fr' }}>
            {/* Left Column - Text Content (65%) */}
            <div className="flex flex-col justify-center p-6">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 tracking-tight mb-1">Project Commercials</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                Budget & Cost Analysis
              </h1>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Comprehensive commercial management with budget tracking, cost analysis and earned value management. 
                Monitor financial performance, control costs and optimize project profitability.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="mt-4 flex gap-4">
                <div className="bg-blue-100 text-primary-600 text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer hover:bg-primary-600 hover:text-white transition-colors">
                  Coming soon
                </div>
              </div>
            </div>

            {/* Right Column - Image (35%) */}
            <div className="relative h-full bg-white">
              <Image
                src="/images/commbanner.png"
                alt="Commercial Analytics"
                fill
                className="object-cover scale-90 -translate-y-[2%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 