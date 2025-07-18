'use client'

import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import { 
  UsersIcon,
  CubeIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function Resources() {
  const router = useRouter()

  const features = [
    {
      id: 'manpower',
      name: 'Manpower Management',
      description: 'Track and manage workforce allocation, scheduling, and performance across all projects',
      status: 'Coming Soon!',
      icon: UsersIcon,
      color: 'primary',
      estimatedLaunch: 'Q2 2024'
    },
    {
      id: 'equipment',
      name: 'Asset Management',
      description: 'Monitor equipment & material usage, maintenance schedules and availability tracking',
      status: 'Coming Soon!',
      icon: CubeIcon,
      color: 'warning',
      estimatedLaunch: 'Q2 2024'
    },
    {
      id: 'accreditation',
      name: 'Manpower Accreditation',
      description: 'Manage employee credentials, certifications, and compliance documents with automated tracking',
      status: 'Available',
      icon: ShieldCheckIcon,
      color: 'success',
      features: ['8-Step Wizard', 'Document Upload', 'Compliance Tracking', 'Report Generation']
    },
    {
      id: 'pmv',
      name: 'PMV Accreditation',
      description: 'Manage pressure vessel certifications and compliance tracking for industrial equipment',
      status: 'Coming Soon!',
      icon: BeakerIcon,
      color: 'error',
      estimatedLaunch: 'Q3 2024'
    }
  ]



  const handleFeatureClick = (featureId: string) => {
    if (featureId === 'accreditation') {
      router.push('/resources/accreditation-tracker')
    }
  }

  return (
    <MainLayout>
      {/* Hero Section with shadow space */}
      <div className="relative py-8">
        {/* Unified hero container with shadow */}
        <div className="bg-white rounded-xl border border-gray-100 h-[360px] overflow-hidden shadow-md">
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 0.8fr' }}>
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center p-8 pb-12">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 tracking-tight mb-2">Project Resources</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Requirements & Allocation
              </h1>
              <p className="mt-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                Comprehensive resource management suite for workforce, assets, and compliance tracking. 
                Streamline manpower allocation, equipment management and accreditation processes.
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
                alt="PMO Resource Management"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-25">

        {/* Explore Section */}
        <div className="pt-6 pb-12">
          <div className="mx-auto max-w-7xl">
            {/* Explore section with centered text */}
            <div className="text-center mb-9 px-16 lg:px-32">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Everything you need to manage resources
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Optimize workforce allocation with intelligent resource planning and real-time availability tracking. 
                Transform your resource management with automated compliance monitoring and comprehensive performance analytics.
              </p>
              
              {/* Action Buttons */}
              <div className="mt-8 flex justify-center gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M19,10.5v-1c0-2.8-1.6-5.2-4-6.3v3.3c0,0.6-0.5,1-1,1s-1-0.4-1-1V2.6c-0.4-0.1-0.8-0.1-1.2-0.1c-0.3,0-0.5,0-0.8,0.1v3.9c0,0.6-0.5,1-1,1s-1-0.4-1-1V3.2C6.6,4.4,5,7,5,9.8v0.7c-0.5,0-1,0.2-1.4,0.6C3.2,11.5,3,12,3,12.5c0,1.1,0.9,2,2,2h0c0,3.9,3.2,7.1,7.2,7c3.7-0.1,6.6-3.3,6.8-7h0c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.6-0.9,0.6-1.4C21,11.4,20.1,10.5,19,10.5z M12.1,19.5c-2.8,0.1-5.2-2.2-5.2-5h10C16.9,17.2,14.8,19.4,12.1,19.5z"></path>
                  </svg>
                  Manpower Allocation
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M19.6,3.6c-0.2-0.2-0.5-0.3-0.8-0.2c-2.2,0.5-4.4,0-6.2-1.3c-0.3-0.2-0.8-0.2-1.1,0C9.6,3.4,7.4,3.9,5.2,3.4C4.7,3.3,4.1,3.7,4,4.2c0,0.1,0,0.1,0,0.2v7.5c0,2.9,1.4,5.6,3.8,7.3l3.7,2.6c0.3,0.2,0.8,0.2,1.2,0l3.7-2.6c2.4-1.7,3.8-4.4,3.8-7.3V4.4C20,4.1,19.9,3.8,19.6,3.6z M15,11C15,11,15,11,15,11l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0l-1.6-1.6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.9,0.9l2.7-2.7c0.4-0.4,1-0.4,1.4,0S15.4,10.6,15,11z"></path>
                  </svg>
                  Manpower Accreditation
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M22.9,12.4l-2.4-3.2C19.9,8.4,19,8,18.1,8h-2V6c0-1.7-1.3-3-3-3h-9c-1.7,0-3,1.3-3,3v12c0,0.6,0.4,1,1,1h1c0,1.7,1.3,3,3,3s3-1.3,3-3h6c0,1.7,1.3,3,3,3s3-1.3,3-3h1c0.6,0,1-0.4,1-1v-5C23.1,12.8,23,12.6,22.9,12.4z M6.1,20c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C7.1,19.6,6.6,20,6.1,20z M18.1,20c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1s1,0.4,1,1C19.1,19.6,18.6,20,18.1,20z M16.1,12v-2h2c0.3,0,0.6,0.1,0.8,0.4l1.2,1.6H16.1z"></path>
                  </svg>
                  PMV Accreditation
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M10,2H3C2.4,2,2,2.4,2,3v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1V3C11,2.4,10.6,2,10,2z M10,13H3c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C11,13.4,10.6,13,10,13z M21,2h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1V3C22,2.4,21.6,2,21,2z M21,13h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C22,13.4,21.6,13,21,13z"></path>
                  </svg>
                  Material Request
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="w-3 h-3">
                    <path fill="white" d="M21.7,15.7l-4.6-4.6c0.3-1.3,0.2-2.6-0.2-3.9c-1.3-4-5.6-6.2-9.6-4.9C7.2,2.4,7,2.5,6.9,2.6c-0.4,0.4-0.4,1,0,1.4l4.4,4.4l-2.8,2.8L4.1,6.9C4,6.7,3.8,6.7,3.7,6.6C3.2,6.4,2.6,6.7,2.4,7.2C2,8.5,1.9,9.9,2.2,11.2c0.8,4.1,4.9,6.8,9,6l4.6,4.6c0.4,0.4,1,0.4,1.4,0l4.6-4.6C22.1,16.7,22.1,16.1,21.7,15.7z"></path>
                  </svg>
                  Equipment Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">

          {/* Resource Modules */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Modules</h2>
            <p className="text-gray-600 mb-8">
              Comprehensive tools for managing every aspect of your project resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`card card-elevated group p-8 transition-all duration-200 animate-fade-in ${
                  feature.status === 'Available' 
                    ? 'cursor-pointer hover:scale-[1.02]' 
                    : ''
                }`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
                onClick={() => handleFeatureClick(feature.id)}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-xl ${
                    feature.color === 'success' ? 'bg-success-50' :
                    feature.color === 'warning' ? 'bg-warning-50' :
                    feature.color === 'error' ? 'bg-error-50' :
                    'bg-primary-50'
                  }`}>
                    <feature.icon className={`w-8 h-8 ${
                      feature.color === 'success' ? 'text-success-600' :
                      feature.color === 'warning' ? 'text-warning-600' :
                      feature.color === 'error' ? 'text-error-600' :
                      'text-primary-600'
                    }`} />
                  </div>
                  
                  <span className={`badge ${
                    feature.status === 'Available' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {feature.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features or Estimated Launch */}
                {feature.features ? (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-success-500" />
                          <span className="text-sm text-gray-600">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      Estimated Launch: {feature.estimatedLaunch}
                    </div>
                  </div>
                )}

                {/* Action */}
                {feature.status === 'Available' ? (
                  <button className="btn btn-primary w-full group-hover:bg-primary-700">
                    Access Module
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button className="btn btn-secondary w-full opacity-75 cursor-not-allowed" disabled>
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>


        </div>
      </div>
    </MainLayout>
  )
} 