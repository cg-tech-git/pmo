'use client'

import { useState } from 'react'
import Header from './Header'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-full">
        {/* Header with Navigation */}
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          onMenuClick={() => setMobileMenuOpen(true)}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        {/* Main content */}
        <main className="bg-gray-25">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 