# PMO Application - Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your PMO application, restricting access to your organization's Google Workspace users only.

## 🚀 Quick Overview

Your PMO application now includes:
- ✅ **Sign-in page** similar to EnterpriseIQ design
- ✅ **Google OAuth integration** with Firebase Auth
- ✅ **Organization domain restriction** (only your company users)
- ✅ **Protected routes** - redirects to sign-in if not authenticated
- ✅ **User profile display** in header with sign-out functionality
- ✅ **Loading states** and error handling

## 📋 Prerequisites

1. **Google Cloud Project** with Firebase enabled
2. **Google Workspace domain** (e.g., yourcompany.com)
3. **Admin access** to configure OAuth consent screen

## 🔧 Setup Instructions

### Step 1: Firebase Project Setup

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com](https://console.firebase.google.com)
   - Create a new project or select existing one

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable "Google" provider
   - Add your domain to authorized domains

3. **Configure Web App**
   - Go to Project Settings → General
   - Add a web app if not already added
   - Copy the Firebase config object

### Step 2: Google Cloud Console Setup

1. **Configure OAuth Consent Screen**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - APIs & Services → OAuth consent screen
   - Set User Type to "Internal" (for workspace users only)
   - Fill in application information

2. **Set up OAuth 2.0 Credentials**
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID for web application
   - Add authorized redirect URIs:
     ```
     http://localhost:3000
     https://your-domain.com
     https://your-project-id.firebaseapp.com/__/auth/handler
     ```

### Step 3: Environment Variables

Create a `.env.local` file in your project root:

```bash
# Firebase Configuration (get these from Firebase Console → Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123...

# Your authorized domains are now hardcoded in the application:
# @cg-tech.co, @allaith.com, @prommac.com, @newage-eng.com
# @seriousinternational.co.uk, @lxss.co.uk, @thevirtulab.com

# Existing GCP Configuration
GCP_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=your-gcs-bucket-name
```

### Step 4: Domain Verification

1. **Verify your domain** in Google Cloud Console
2. **Add domain to Firebase** authorized domains
3. **Update OAuth settings** to include your production domain

## 🛡️ Security Features

### Organization-Only Access
- Users must have email ending with your domain (e.g., @yourcompany.com)
- Non-organization users are automatically signed out
- Clear error messages for unauthorized access attempts

### Route Protection
- All main routes are protected (Dashboard, Projects, etc.)
- Automatic redirect to sign-in page for unauthenticated users
- Loading states while checking authentication

### Session Management
- Persistent authentication across browser sessions
- Automatic sign-out on domain mismatch
- Secure token handling via Firebase

## 🎨 User Experience

### Sign-in Page Features
- **Clean, professional design** matching your PMO branding
- **Google OAuth button** with official Google styling
- **Loading states** during authentication
- **Error handling** with user-friendly messages
- **Responsive design** for mobile and desktop

### Header Integration
- **Real user information** (name from Google profile)
- **User dropdown menu** with profile info and sign-out
- **Seamless navigation** between protected routes

## 🚀 Testing the Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Visit any protected route**: `http://localhost:3000`
   - Should redirect to `/signin` if not authenticated

3. **Test sign-in process**:
   - Click "Continue with Google"
   - Should open Google OAuth popup
   - After successful auth, redirects to dashboard

4. **Test domain restriction**:
   - Try signing in with non-organization Google account
   - Should show error and prevent access

## 🔧 Customization Options

### Styling
- Modify colors in `tailwind.config.js`
- Update logo/branding in sign-in page
- Customize loading animations

### Domain Configuration
- Change `NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN` for different organizations
- Support multiple domains by modifying auth logic

### Additional Providers
- Add more OAuth providers in Firebase Console
- Update sign-in page to include additional buttons

## 🐛 Troubleshooting

### Common Issues

1. **"Pop-up blocked" error**
   - Enable pop-ups for your domain
   - Check browser settings

2. **"Unauthorized domain" error**
   - Add domain to Firebase authorized domains
   - Update OAuth consent screen settings

3. **Environment variables not loading**
   - Ensure `.env.local` is in project root
   - Restart development server after changes
   - Verify variable names start with `NEXT_PUBLIC_`

4. **Authentication not persisting**
   - Check Firebase configuration
   - Verify auth domain settings

### Debug Mode
Enable debug logging by adding to your `.env.local`:
```bash
NEXT_PUBLIC_DEBUG_AUTH=true
```

## 📱 Mobile Considerations

The authentication system works seamlessly on mobile devices:
- Responsive sign-in page design
- Mobile-optimized OAuth flow
- Touch-friendly UI elements

## 🔒 Production Deployment

Before deploying to production:

1. **Update authorized domains** in Firebase and Google Cloud
2. **Set production environment variables**
3. **Test OAuth flow** on production domain
4. **Monitor authentication metrics** in Firebase Console

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify environment variables are correct
3. Test with organization email address
4. Review Google Cloud Console OAuth settings

---

**Your PMO application is now secure and ready for your organization! 🎉**

All routes are protected, only your company's Google Workspace users can access the application, and the user experience is professional and seamless. 