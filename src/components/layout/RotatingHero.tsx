'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface HeroSlide {
  id: string
  subtitle: string
  title: string
  description: string
  image: string
  alt: string
  imageStyles: string
  containerStyles?: string
  buttonText: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 'home',
    subtitle: 'PMO',
    title: 'Project Management Office',
    description: 'Comprehensive PMO solution for project tracking, process management and organizational excellence. Streamline workflows, standardize processes and drive successful project outcomes.',
    image: '/images/puzzle.png',
    alt: 'PMO Management',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Sign Up'
  },
  {
    id: 'dashboard',
    subtitle: 'Project Dashboard',
    title: 'Analytics & Insights',
    description: 'Real-time project monitoring, performance analytics and comprehensive reporting dashboard. Get instant insights into project health, resource utilization and key performance indicators.',
    image: '/images/dash4banner.png',
    alt: 'Dashboard Analytics',
    imageStyles: 'object-cover scale-75 translate-y-[3%] translate-x-[7%]',
    containerStyles: 'p-4',
    buttonText: 'Learn more'
  },
  {
    id: 'templates',
    subtitle: 'Project Templates',
    title: 'Flowcharts & Documentation',
    description: 'Comprehensive process documentation, standardized templates and workflow resources. Access project controls, commercial processes and tender documentation for consistent project delivery.',
    image: '/images/templatesbanner.png',
    alt: 'Process Templates',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Learn more'
  },
  {
    id: 'projects',
    subtitle: 'Project Portfolio',
    title: 'Planning & Scheduling',
    description: 'Comprehensive project tracking, milestone management and team collaboration platform. Monitor project progress, manage resources and deliver successful outcomes with data-driven insights.',
    image: '/images/puzzle.png',
    alt: 'Project Management',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Learn more'
  },
  {
    id: 'commercial',
    subtitle: 'Project Commercials',
    title: 'Budget & Cost Analysis',
    description: 'Comprehensive commercial management with budget tracking, cost analysis and earned value management. Monitor financial performance, control costs and optimize project profitability.',
    image: '/images/commbanner.png',
    alt: 'Commercial Analytics',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Learn more'
  },
  {
    id: 'resources',
    subtitle: 'Project Resources',
    title: 'Requirements & Allocation',
    description: 'Comprehensive resource management suite for workforce, assets, and compliance tracking. Streamline manpower allocation, equipment management and accreditation processes.',
    image: '/images/resourcesbanner.png',
    alt: 'Resource Management',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Learn more'
  },
  {
    id: 'reports',
    subtitle: 'Project Reports',
    title: 'Artificial & Business Intelligence',
    description: 'Comprehensive reporting and analytics platform with custom dashboards, automated reporting and data visualization. Generate insights, track performance metrics and make data-driven decisions.',
    image: '/images/repobanner.png',
    alt: 'Reports Analytics',
    imageStyles: 'object-cover scale-90 -translate-y-[2%]',
    buttonText: 'Learn more'
  }
]

export default function RotatingHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        console.log('Starting transition to next slide')
        setIsTransitioning(true)
        
        setTimeout(() => {
          setCurrentSlide((prev) => {
            const nextSlide = (prev + 1) % heroSlides.length
            console.log(`Transitioning from slide ${prev} to slide ${nextSlide}`)
            return nextSlide
          })
          setTimeout(() => {
            setIsTransitioning(false)
            console.log('Transition completed')
          }, 50) // Small delay to ensure state change
        }, 300) // Half of transition duration for smooth effect
        
      }, 8000) // 8 seconds per slide

      return () => clearInterval(interval)
    }
  }, [isHovered])

  const currentHero = heroSlides[currentSlide]

  const goToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  const goToPrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  return (
    <div 
      className="relative pt-8 pb-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-100 h-[280px] overflow-hidden shadow-md">
        <div className="grid h-full" style={{ gridTemplateColumns: '0.65fr 0.35fr' }}>
          {/* Left Column - Text Content (65%) */}
          <div className={`flex flex-col justify-center p-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 tracking-tight mb-1">
              {currentHero.subtitle}
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              {currentHero.title}
            </h1>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {currentHero.description}
            </p>
            
            {/* CTA Button */}
            <div className="mt-4 flex gap-4">
              <div className="bg-blue-100 text-primary-600 text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer hover:bg-primary-600 hover:text-white transition-colors">
                {currentHero.buttonText}
              </div>
            </div>
          </div>

          {/* Right Column - Image (35%) */}
          <div className={`relative h-full bg-white ${currentHero.containerStyles || ''} transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={currentHero.image}
              alt={currentHero.alt}
              fill
              className={currentHero.imageStyles}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        {/* Left Chevron */}
        <button
          onClick={goToPrevious}
          className="bg-transparent rounded-full p-2"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentSlide(index)
                  setTimeout(() => {
                    setIsTransitioning(false)
                  }, 50)
                }, 300)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Right Chevron */}
        <button
          onClick={goToNext}
          className="bg-transparent rounded-full p-2"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  )
} 