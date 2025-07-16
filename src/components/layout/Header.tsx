'use client'

import { Fragment } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Process Library', href: '/processes' },
  { name: 'Projects', href: '/projects' },
  { name: 'Commercial', href: '/commercial' },
  { name: 'Resources', href: '/resources' },
  { name: 'Reports', href: '/reports' },
  { name: 'Admin', href: '/settings' },
]

interface HeaderProps {
  mobileMenuOpen?: boolean
  onMenuClick?: () => void
  onCloseMobileMenu?: () => void
}

export default function Header({ mobileMenuOpen = false, onMenuClick, onCloseMobileMenu }: HeaderProps) {
  const pathname = usePathname()

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
                
                {/* Mobile Menu Content */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <span className="text-lg font-semibold text-gray-900">PMO</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`nav-link ${
                                    isActive ? 'nav-link-active' : 'nav-link-inactive'
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

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="relative flex h-16 items-center">
          {/* PMO Title - Far Left Edge */}
          <div className="absolute left-0 flex items-center px-4 sm:px-6 lg:px-8 z-10">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden mr-4"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* PMO Title */}
            <span className="text-xl font-semibold text-gray-900">PMO</span>
          </div>

          {/* Navigation Container - Aligned with content cards */}
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:space-x-8 lg:ml-0">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* User Menu - Absolute Right Edge with Same Padding */}
          <div className="absolute right-0 flex items-center px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      John Doe
                    </span>
                  </span>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-3 py-1 text-sm leading-6 text-gray-900 ${
                            active ? 'bg-gray-50' : ''
                          }`}
                        >
                          Your profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-3 py-1 text-sm leading-6 text-gray-900 ${
                            active ? 'bg-gray-50' : ''
                          }`}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-3 py-1 text-sm leading-6 text-gray-900 ${
                            active ? 'bg-gray-50' : ''
                          }`}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 