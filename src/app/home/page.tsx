'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import { 
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  CogIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const features = [
    {
      name: 'Project Management',
      description: 'Comprehensive project tracking, milestone management and progress monitoring.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M8,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-4c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1V7c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M18,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z"></path>
        </svg>
      ),
    },
    {
      name: 'Process Templates',
      description: 'Standardized templates for project workflows, commercial processes and tender documentation.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M15,8h4.4L14,2.6V7C14,7.6,14.4,8,15,8z M21,18h-1v-1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h1c0.6,0,1-0.4,1-1S21.6,18,21,18z M14.5,19c0-1.2,0.9-2.2,2-2.5c0.2-1.2,1.3-2,2.5-2c0.3,0,0.7,0.1,1,0.2V10h-5c-1.7,0-3-1.3-3-3V2H7C5.3,2,4,3.3,4,5v14c0,1.7,1.3,3,3,3h9.7c-0.1-0.2-0.1-0.4-0.2-0.5C15.4,21.2,14.5,20.2,14.5,19z M8,8h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H8c-0.6,0-1-0.4-1-1S7.4,8,8,8z M11,18H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.6,0,1,0.4,1,1S11.6,18,11,18z M8,14c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1s-0.4,1-1,1H8z"></path>
        </svg>
      ),
    },
    {
      name: 'Resource Management',
      description: 'Staff accreditation tracking, resource allocation and capacity planning.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M2,3v8h9V2H3C2.4,2,2,2.4,2,3z M21,2h-8v9h9V3C22,2.4,21.6,2,21,2z M13,22h8c0.6,0,1-0.4,1-1v-8h-9V22z M2,21c0,0.6,0.4,1,1,1h8v-9H2V21z"></path>
        </svg>
      ),
    },
    {
      name: 'System Configuration',
      description: 'Customizable settings, user management and system administration tools.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M6,6.2V3c0-0.6-0.4-1-1-1S4,2.4,4,3v3.2C2.4,6.7,1.6,8.4,2.2,10c0.3,0.9,1,1.5,1.8,1.8V21c0,0.6,0.4,1,1,1s1-0.4,1-1v-9.2C7.6,11.3,8.4,9.6,7.8,8C7.5,7.2,6.9,6.5,6,6.2z M21.8,10c-0.3-0.9-1-1.5-1.8-1.8V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5.2c-1.6,0.5-2.4,2.2-1.8,3.8c0.3,0.9,1,1.5,1.8,1.8V21c0,0.6,0.4,1,1,1s1-0.4,1-1v-7.2C21.6,13.3,22.4,11.6,21.8,10z M13,14.2V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v11.2c-1.6,0.5-2.4,2.2-1.8,3.8c0.3,0.9,1,1.5,1.8,1.8V21c0,0.6,0.4,1,1,1s1-0.4,1-1v-1.2c1.6-0.5,2.4-2.2,1.8-3.8C14.5,15.2,13.9,14.5,13,14.2z"></path>
        </svg>
      ),
    },
    {
      name: 'Performance Analytics',
      description: 'Real-time reporting, KPI tracking and comprehensive dashboard views.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M10.7 13.3c-.4-.4-1-.4-1.4 0l-2.8 2.8-2.8-2.8c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2.8 2.8-2.8 2.8c-.4.4-.4 1 0 1.4s1 .4 1.4 0l2.8-2.8 2.8 2.8c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-2.8-2.8 2.8-2.8c.4-.4.4-1 0-1.4zm2.9-2.4c.1.1.2.1.4.1h7c.6 0 1-.4 1-1 0-.2 0-.3-.1-.4l-3.5-7c-.3-.5-.9-.7-1.4-.4-.1.1-.3.2-.4.4l-3.5 7c-.2.4 0 1 .5 1.3zM6.5 2C4 2 2 4 2 6.5S4 11 6.5 11 11 9 11 6.5 9 2 6.5 2zM21 13h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1z"></path>
        </svg>
      ),
    },
    {
      name: 'Quality Assurance',
      description: 'Process validation, compliance monitoring and quality control frameworks.',
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#2563EB" d="M19.6,3.6c-0.2-0.2-0.5-0.3-0.8-0.2c-2.2,0.5-4.4,0-6.2-1.3c-0.3-0.2-0.8-0.2-1.1,0C9.6,3.4,7.4,3.9,5.2,3.4C4.7,3.3,4.1,3.7,4,4.2c0,0.1,0,0.1,0,0.2v7.5c0,2.9,1.4,5.6,3.8,7.3l3.7,2.6c0.3,0.2,0.8,0.2,1.2,0l3.7-2.6c2.4-1.7,3.8-4.4,3.8-7.3V4.4C20,4.1,19.9,3.8,19.6,3.6z M15,11C15,11,15,11,15,11l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0l-1.6-1.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.9,0.9l2.7-2.7c0.4-0.4,1-0.4,1.4,0S15.4,10.6,15,11z"></path>
        </svg>
      ),
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative py-8">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[360px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 0.8fr' }}>
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center p-8 pb-12">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 tracking-tight mb-2">PMO</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Project Management Office
              </h1>
              <p className="mt-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                Comprehensive PMO solution for project tracking, process management and organizational excellence. 
                Streamline workflows, standardize processes and drive successful project outcomes.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors">
                  Sign Up
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-full overflow-hidden">
              <Image
                src="/images/dashboards.png"
                alt="PMO Dashboard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="pt-5 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Tagline section with dot pattern background */}
          <div className="text-center mb-9 px-16 lg:px-32">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Everything you need to manage projects
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Streamline your workflow with intelligent automation and real-time collaboration capabilities. 
              Transform your organization's project delivery with data-driven insights and proven methodologies.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {/* Header with Title */}
                <div className="px-6 h-12 flex items-center bg-white pt-4">
                  <div className="mr-3">
                    <feature.icon />
                  </div>
                  <h3 className="text-lg font-semibold text-black m-0">{feature.name}</h3>
                </div>
                
                {/* Content */}
                <div className="px-6 pt-4 pb-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 