#!/bin/bash

# TrackIT Frontend - Automated Netlify Deployment Script

set -e

echo "🚀 Starting TrackIT Frontend Deployment to Netlify..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
fi

echo -e "${BLUE}✓ Netlify CLI found${NC}"

# Navigate to frontend directory
cd "$(dirname "$0")"

echo -e "${BLUE}✓ Building production bundle...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${YELLOW}✗ Build failed${NC}"
    exit 1
fi

# Check if user is logged in to Netlify
netlify status > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${BLUE}🔐 Authenticating with Netlify...${NC}"
    netlify login
fi

echo -e "${BLUE}📤 Deploying to Netlify...${NC}"
netlify deploy --prod --dir=build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=================================================="
    echo "✅ Deployment successful!"
    echo "=================================================="
    echo -e "${BLUE}Your site is now live!${NC}"
    echo ""
    netlify status
else
    echo -e "${YELLOW}✗ Deployment failed${NC}"
    exit 1
fi
