#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
SERVICE_NAME="pmo-app"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo -e "${YELLOW}Starting deployment to Google Cloud Run...${NC}"
echo -e "Project ID: ${PROJECT_ID}"
echo -e "Region: ${REGION}"
echo -e "Service: ${SERVICE_NAME}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    exit 1
fi

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Build the Docker image
echo -e "\n${YELLOW}Building Docker image...${NC}"
docker build -t ${IMAGE_NAME}:latest .
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Docker build failed${NC}"
    exit 1
fi

# Configure Docker to use gcloud as a credential helper
echo -e "\n${YELLOW}Configuring Docker authentication...${NC}"
gcloud auth configure-docker

# Push the image to Google Container Registry
echo -e "\n${YELLOW}Pushing image to Container Registry...${NC}"
docker push ${IMAGE_NAME}:latest
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to push image to registry${NC}"
    exit 1
fi

# Deploy to Cloud Run
echo -e "\n${YELLOW}Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME}:latest \
    --region ${REGION} \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 2Gi \
    --cpu 2 \
    --max-instances 10 \
    --min-instances 1 \
    --set-env-vars "\
NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY},\
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN},\
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID},\
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET},\
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID},\
NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID},\
GCP_PROJECT_ID=${GCP_PROJECT_ID},\
GCS_BUCKET_NAME=${GCS_BUCKET_NAME},\
GOOGLE_APPLICATION_CREDENTIALS_JSON=${GOOGLE_APPLICATION_CREDENTIALS_JSON}"

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Deployment successful!${NC}"
    SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)')
    echo -e "Your application is now running at: ${GREEN}${SERVICE_URL}${NC}"
else
    echo -e "${RED}Error: Deployment failed${NC}"
    exit 1
fi 