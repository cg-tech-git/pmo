#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}PMO Application - Local Docker Build${NC}"
echo -e "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker Desktop first.${NC}"
    exit 1
fi

# Configuration
PROJECT_ID="hybrid-shine-466111-s0"
IMAGE_NAME="gcr.io/${PROJECT_ID}/pmo-app"
TAG="latest"

echo -e "\n${YELLOW}Build Configuration:${NC}"
echo -e "Project ID: ${PROJECT_ID}"
echo -e "Image: ${IMAGE_NAME}:${TAG}"

# Build the Docker image
echo -e "\n${YELLOW}Building Docker image...${NC}"
echo -e "This may take several minutes on first build...\n"

docker build -t ${IMAGE_NAME}:${TAG} .

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ Build successful!${NC}"
    echo -e "\nImage built: ${IMAGE_NAME}:${TAG}"
    echo -e "\nNext steps:"
    echo -e "1. Push to Container Registry: ${YELLOW}docker push ${IMAGE_NAME}:${TAG}${NC}"
    echo -e "2. Or test locally: ${YELLOW}docker run -p 8080:8080 ${IMAGE_NAME}:${TAG}${NC}"
else
    echo -e "\n${RED}✗ Build failed!${NC}"
    echo -e "Please check the error messages above."
    exit 1
fi 