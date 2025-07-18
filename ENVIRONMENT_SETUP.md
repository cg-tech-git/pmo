# Environment Configuration for PMO Application

## 🚀 Quick Setup

Your PMO application is now configured to allow access to users from these domains:

✅ **@cg-tech.co**  
✅ **@allaith.com**  
✅ **@prommac.com**  
✅ **@newage-eng.com**  
✅ **@seriousinternational.co.uk**  
✅ **@lxss.co.uk**  
✅ **@thevirtulab.com**  

## 📋 Environment Variables Required

Create a `.env.local` file in your project root with these variables:

```bash
# Firebase Configuration (get these from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:your-app-id

# Existing GCP Configuration (keep these as they are)
GCP_PROJECT_ID=pmo-documents-hybrid-shine-466111-s0
GCS_BUCKET_NAME=pmo-documents-hybrid-shine-466111-s0
```

## 🔧 Firebase Console Setup Steps

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Create/Select Project**: Use existing or create new Firebase project
3. **Enable Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Google" provider
   - No need to specify domains (handled in code)

4. **Get Configuration**:
   - Go to Project Settings → General
   - Find "Your apps" section
   - Add web app if not exists
   - Copy configuration values to `.env.local`

5. **Configure OAuth**:
   - In Google Cloud Console for same project
   - Set OAuth consent screen to "Internal" for workspace users
   - Add authorized redirect URIs:
     ```
     http://localhost:3000
     https://your-production-domain.com
     ```

## 🧪 Testing the Setup

1. **Start server**: `npm run dev`
2. **Visit**: `http://localhost:3000`
3. **Should redirect to**: `/signin` page
4. **Test sign-in with any email from allowed domains**
5. **Test rejection of non-allowed domains**

## 🛡️ Security Features Active

- ✅ **Multi-domain restriction** hardcoded in application
- ✅ **Automatic sign-out** for unauthorized users  
- ✅ **Protected routes** for all main sections
- ✅ **Real user profiles** in header
- ✅ **Secure session management**

## 🚀 What's Working Now

- **Sign-in page** with Google OAuth
- **Domain validation** for your 7 specified domains
- **Protected navigation** to all PMO sections
- **User profile display** with real names/emails
- **Sign-out functionality**
- **Professional error handling**

## 📱 Ready for Production

The authentication system is production-ready. Just:
1. Set up Firebase project with real credentials
2. Add production domain to OAuth settings
3. Deploy with environment variables configured

**Your PMO application is secure and ready to use! 🎉** 