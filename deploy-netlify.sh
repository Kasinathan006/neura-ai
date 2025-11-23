#!/bin/bash

# NEURA AI - Quick Netlify Deploy Script
# This script automates the Netlify deployment process

echo "🚀 NEURA AI - Netlify Deployment Script"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - NEURA AI v1.0"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📥 Installing Netlify CLI..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI installed"
else
    echo "✅ Netlify CLI already installed"
fi

# Navigate to frontend
cd frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the project
echo "🔨 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Deploy to Netlify
echo ""
echo "🚀 Deploying to Netlify..."
echo ""
echo "Choose deployment method:"
echo "1. Deploy to production (requires Netlify login)"
echo "2. Deploy as draft"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "Deploying to production..."
        netlify deploy --prod --dir=dist
        ;;
    2)
        echo "Deploying as draft..."
        netlify deploy --dir=dist
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend CORS with your Netlify URL"
echo "2. Test your deployment"
echo "3. Configure custom domain (optional)"
echo ""
echo "🎉 NEURA AI is live!"
