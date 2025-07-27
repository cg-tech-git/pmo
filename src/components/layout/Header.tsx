'use client'

import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  XMarkIcon,
  CogIcon,
} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Templates', href: '/processes' },
  { name: 'Projects', href: '/projects' },
  { name: 'Commercial', href: '/commercial' },
  { name: 'Resources', href: '/resources' },
  { name: 'Reports', href: '/reports' },
]

interface HeaderProps {
  mobileMenuOpen?: boolean
  onMenuClick?: () => void
  onCloseMobileMenu?: () => void
}

export default function Header({ mobileMenuOpen = false, onMenuClick, onCloseMobileMenu }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut, loading } = useAuth()
  const [avatarError, setAvatarError] = useState(false)
  const [dropdownAvatarError, setDropdownAvatarError] = useState(false)
  const [expiredCount, setExpiredCount] = useState(0)
  const [loadingExpiredCount, setLoadingExpiredCount] = useState(true)
  
  // Debug in useEffect to ensure it runs on client side
  useEffect(() => {
    console.log('=== Header Component Debug (Client Side) ===')
    console.log('Component mounted on client')
    console.log('Loading state:', loading)
    console.log('User object:', user)
    console.log('User exists:', !!user)
    console.log('User photoURL:', user?.photoURL)
    console.log('User displayName:', user?.displayName)
    console.log('User email:', user?.email)
    console.log('PhotoURL type:', typeof user?.photoURL)
    console.log('PhotoURL length:', user?.photoURL?.length)
    console.log('=======================================')
    
    // Reset avatar error states when user changes
    setAvatarError(false)
    setDropdownAvatarError(false)
  }, [user, loading])

  // Fetch expired count for notifications - same logic as AccreditationTracker
  useEffect(() => {
    const fetchExpiredCount = async () => {
      try {
        const response = await fetch('/api/accreditation-submissions')
        const data = await response.json()
        
        if (data.submissions) {
          const today = new Date()
          let expiredTotal = 0
          
          // Same expiry fields as AccreditationTracker
          const expiryFields = [
            { field: 'molExpiryDate', type: 'MOL' },
            { field: 'emiratesIdExpiryDate', type: 'Emirates ID' },
            { field: 'passportExpiryDate', type: 'Passport' },
            { field: 'visaExpireDate', type: 'Visa' },
            { field: 'certificateExpiryDate', type: 'Certificate' },
            { field: 'groupsInsuranceExpiryDate', type: 'Group Insurance' }
          ]
          
          data.submissions.forEach((submission: any) => {
            expiryFields.forEach(({ field }) => {
              if (submission[field]) {
                const expiryDate = new Date(submission[field])
                if (today > expiryDate) {
                  expiredTotal++
                }
              }
            })
          })
          
          setExpiredCount(expiredTotal)
        }
      } catch (error) {
        console.error('Failed to fetch expired count:', error)
      } finally {
        setLoadingExpiredCount(false)
      }
    }

    fetchExpiredCount()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchExpiredCount, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Mobile Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onCloseMobileMenu || (() => {})}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={onCloseMobileMenu}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                {/* Mobile Menu Content - Enhanced Design */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center border-b border-gray-200">
                    <span className="text-2xl font-bold text-primary-600">PMO</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-2">
                      <li>
                        <ul role="list" className="space-y-1">
                          {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                      ? 'text-primary-600'
                                      : 'text-gray-700 hover:text-gray-900'
                                  }`}
                                  onClick={onCloseMobileMenu}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Header - Enhanced with Better Design */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        {/* PMO Title - Hard Left Edge */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-4">
          <span className="text-xl font-bold text-gray-900">PMO</span>
        </div>
        
        {/* User Menu - Hard Right Edge */}
        <div className="absolute right-0 top-0 h-16 flex items-center pr-4">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Enhanced Notifications */}
            <button
              type="button"
              onClick={() => router.push('/resources/accreditation-tracker/expiry-alerts')}
              className="relative -m-2.5 p-2.5 text-gray-300 hover:text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="sr-only">View notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fill="currentColor" d="M18,13.2V10c0-2.9-2.1-5.4-5-5.9V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1.1c-2.9,0.5-5,3-5,5.9v3.2c-1.2,0.4-2,1.5-2,2.8v2c0,0.6,0.4,1,1,1h3.1c0.5,2.1,2.7,3.4,4.8,2.9c1.4-0.4,2.5-1.5,2.9-2.9H19c0.6,0,1-0.4,1-1v-2C20,14.7,19.2,13.6,18,13.2z M12,20c-0.7,0-1.4-0.4-1.7-1h3.5C13.4,19.6,12.7,20,12,20z"></path>
              </svg>
              {/* Notification Indicator - Red Dot */}
              {!loadingExpiredCount && expiredCount > 0 && (
                <div className="absolute top-[9px] right-[11px] h-[8px] w-[8px] bg-red-500 rounded-full ring-1 ring-white z-10" />
              )}
            </button>

            {/* Settings */}
            <button
              type="button"
              className="relative -m-2.5 p-2.5 text-gray-300 hover:text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="sr-only">Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fill="currentColor" d="M20.3,12.7c-0.3-0.4-0.3-0.9,0-1.3l1.3-1.4c0.3-0.3,0.3-0.8,0.1-1.2l-2-3.5c-0.2-0.4-0.6-0.6-1.1-0.5l-1.9,0.4c-0.5,0.1-1-0.2-1.1-0.7l-0.6-1.8C14.8,2.3,14.4,2,14,2h-4C9.6,2,9.2,2.3,9.1,2.7L8.4,4.5C8.3,5,7.8,5.3,7.3,5.2L5.4,4.8C5,4.7,4.6,4.9,4.3,5.3l-2,3.5C2.1,9.1,2.2,9.6,2.5,9.9l1.3,1.4c0.3,0.4,0.3,0.9,0,1.3l-1.3,1.4c-0.3,0.3-0.3,0.8-0.1,1.2l2,3.5c0.2,0.4,0.6,0.6,1.1,0.5l1.9-0.4c0.5-0.1,1,0.2,1.1,0.7l0.6,1.8C9.2,21.7,9.6,22,10,22h4c0.4,0,0.8-0.3,0.9-0.7l0.6-1.8c0.2-0.5,0.7-0.8,1.1-0.7l1.9,0.4c0.4,0.1,0.9-0.1,1.1-0.5l2-3.5c0.2-0.4,0.2-0.8-0.1-1.2L20.3,12.7z M12,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,15,12,15z"></path>
              </svg>
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="relative flex max-w-xs items-center rounded-lg bg-white text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-1">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {!loading && user && user.photoURL && !dropdownAvatarError ? (
                  <Image
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200"
                    src={user.photoURL}
                    alt={user.displayName || user.email || 'User'}
                    width={32}
                    height={32}
                    onError={() => {
                      console.log('Dropdown avatar failed to load')
                      setDropdownAvatarError(true)
                    }}
                    onLoad={() => {
                      console.log('Dropdown avatar loaded successfully')
                    }}
                    priority={false}
                    unoptimized={true}
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-200 focus:outline-none">
                  {/* User Info Section */}
                  {!loading && user && (
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {user.photoURL && !avatarError ? (
                          <Image
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                            src={user.photoURL}
                            alt={user.displayName || user.email || 'User'}
                            width={40}
                            height={40}
                            onError={() => {
                              console.log('Menu avatar failed to load')
                              setAvatarError(true)
                            }}
                            priority={false}
                            unoptimized={true}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <UserCircleIcon className="h-8 w-8 text-primary-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signOut}
                          className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl w-full">
          <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button - Positioned with margin to avoid PMO */}
            <div className="flex items-center ml-12 lg:hidden">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-primary-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onMenuClick}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop Navigation - Left Aligned */}
            <nav className="hidden lg:flex lg:space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
} 