'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  HomeIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Resources', href: '/resources', icon: UsersIcon },
  { name: 'Commercial', href: '/commercial', icon: DocumentTextIcon },
  { name: 'Reports', href: '/reports', icon: ClipboardDocumentListIcon },
  { name: 'Process Library', href: '/processes', icon: ClipboardDocumentListIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
  mobile?: boolean
}

export default function Sidebar({ open = false, onClose, mobile = false }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PMO</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">Project Office</span>
        </div>
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
                    >
                      <item.icon
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
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
  )

  if (mobile) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose || (() => {})}>
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
                      onClick={onClose}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  return <SidebarContent />
} 