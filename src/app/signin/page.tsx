'use client'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    
    // Check if Firebase is configured
    if (!auth) {
      setError('Authentication is not configured. Please set up Firebase credentials.')
      setIsLoading(false)
      return
    }
    
    try {
      const provider = new GoogleAuthProvider()
      
      const result = await signInWithPopup(auth, provider)
      
      // Verify the user is from allowed organizations
      const email = result.user.email?.toLowerCase() || ''
      const allowedDomains = [
        '@cg-tech.co',
        '@allaith.com', 
        '@prommac.com',
        '@newage-eng.com',
        '@seriousinternational.co.uk',
        '@lxss.co.uk',
        '@thevirtulab.com'
      ]
      
      const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain))
      
      if (!isAllowedDomain) {
        await auth.signOut()
        setError('Access restricted to authorized organization members only.')
        return
      }
      
      // Redirect to dashboard on successful sign-in
      router.push('/')
    } catch (error: any) {
      console.error('Sign-in error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled.')
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked. Please allow pop-ups and try again.')
      } else {
        setError('An error occurred during sign-in. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/logo.png"
                alt="Al Laith Projects Services Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#183057' }}>Welcome to PMO</h1>
            <p className="text-lg text-gray-600">
              Sign in to access your AI-powered Project Management platform
            </p>
          </div>
          
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </div>
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 