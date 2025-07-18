import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Debug environment variables
console.log('=== Firebase Environment Debug ===')
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
console.log('Storage Bucket:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
console.log('Messaging Sender ID:', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
console.log('App ID:', process.env.NEXT_PUBLIC_FIREBASE_APP_ID)
console.log('================================')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
}

console.log('Final Firebase Config:', firebaseConfig)

// Check if we have real Firebase configuration
const isConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-key' &&
                    process.env.NEXT_PUBLIC_FIREBASE_API_KEY.startsWith('AIza')

console.log('Is Firebase configured?', isConfigured)

let app: any = null
let auth: any = null

if (isConfigured) {
  try {
    // Initialize Firebase only if properly configured
    console.log('Initializing Firebase...')
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    console.log('Firebase initialized successfully')
  } catch (error) {
    console.error('Firebase initialization failed:', error)
  }
} else {
  console.warn('Firebase not configured properly - falling back to demo mode')
}

export { auth }
export default app 