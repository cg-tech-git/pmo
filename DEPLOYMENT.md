# PMO Application - Cloud Run Deployment Guide

## Prerequisites

1. **Google Cloud Project**
   - Ensure you have a GCP project created
   - Enable the following APIs:
     - Cloud Run API
     - Cloud Build API
     - Container Registry API
     - Cloud Storage API

2. **Google Cloud SDK**
   - Install gcloud CLI: https://cloud.google.com/sdk/docs/install
   - Authenticate: `gcloud auth login`
   - Set project: `gcloud config set project YOUR_PROJECT_ID`

3. **Docker**
   - Install Docker Desktop
   - Ensure Docker is running

4. **Environment Variables**
   - Create a `.env.production` file with all required variables
   - Ensure you have the service account JSON for GOOGLE_APPLICATION_CREDENTIALS_JSON

## Manual Deployment

### Option 1: Using the deploy script

1. Set environment variables:
   ```bash
   export NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   export NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   export NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   export NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   export GCP_PROJECT_ID="your-gcp-project-id"
   export GCS_BUCKET_NAME="your-gcs-bucket-name"
   export GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account",...}'
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

### Option 2: Manual steps

1. Build the Docker image:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/pmo-app:latest .
   ```

2. Configure Docker authentication:
   ```bash
   gcloud auth configure-docker
   ```

3. Push the image:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/pmo-app:latest
   ```

4. Deploy to Cloud Run:
   ```bash
   gcloud run deploy pmo-app \
     --image gcr.io/YOUR_PROJECT_ID/pmo-app:latest \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 8080 \
     --memory 2Gi \
     --cpu 2 \
     --max-instances 10 \
     --min-instances 1 \
     --set-env-vars "ENV_VARS_HERE"
   ```

## Automated Deployment with Cloud Build

1. Set up Cloud Build triggers in your GCP Console
2. Configure substitution variables for environment variables
3. Push to your repository to trigger the build

## Post-Deployment

1. **Configure Custom Domain** (optional):
   ```bash
   gcloud run domain-mappings create --service pmo-app --domain your-domain.com --region us-central1
   ```

2. **Set up Cloud Storage CORS**:
   Create a `cors.json` file:
   ```json
   [
     {
       "origin": ["https://your-cloud-run-url.run.app"],
       "method": ["GET", "POST", "PUT", "DELETE"],
       "responseHeader": ["Content-Type"],
       "maxAgeSeconds": 3600
     }
   ]
   ```
   
   Apply CORS configuration:
   ```bash
   gsutil cors set cors.json gs://your-bucket-name
   ```

3. **Monitor your application**:
   - View logs: `gcloud run services logs read pmo-app --region us-central1`
   - Check metrics in Cloud Console

## Troubleshooting

1. **Build failures**: Check Dockerfile syntax and ensure all dependencies are installed
2. **Runtime errors**: Check environment variables and service account permissions
3. **Storage access**: Ensure the Cloud Run service account has access to your GCS bucket
4. **Authentication issues**: Verify Firebase configuration and allowed domains

## Security Considerations

1. Use Secret Manager for sensitive environment variables
2. Implement proper IAM roles for service accounts
3. Enable Cloud Armor for DDoS protection
4. Set up Cloud CDN for static assets 