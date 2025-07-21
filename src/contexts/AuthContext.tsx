'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if Firebase is configured
    if (!auth) {
      console.log('Firebase not configured, setting loading to false')
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user')
      if (user) {
        // Verify user domain - support multiple allowed domains
        const allowedDomains = [
          '@cg-tech.co',
          '@allaith.com', 
          '@prommac.com',
          '@newage-eng.com',
          '@seriousinternational.co.uk',
          '@lxss.co.uk',
          '@thevirtulab.com'
        ]
        
        const userEmail = user.email?.toLowerCase() || ''
        const isAllowedDomain = allowedDomains.some(domain => userEmail.endsWith(domain))
        
        if (!isAllowedDomain) {
          console.log('User domain not allowed:', userEmail)
          signOut(auth)
          router.push('/signin')
          return
        }
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Fallback timeout to ensure loading doesn't get stuck
    const fallbackTimer = setTimeout(() => {
      console.log('Auth state fallback timeout - setting loading to false')
      setLoading(false)
    }, 3000)

    return () => {
      unsubscribe()
      clearTimeout(fallbackTimer)
    }
  }, [router])

  const handleSignOut = async () => {
    if (!auth) return
    
    try {
      await signOut(auth)
      router.push('/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = {
    user,
    loading,
    signOut: handleSignOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 