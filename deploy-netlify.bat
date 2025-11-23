@echo off
REM NEURA AI - Quick Netlify Deploy Script for Windows
REM This script automates the Netlify deployment process

echo ========================================
echo 🚀 NEURA AI - Netlify Deployment Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo 📦 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - NEURA AI v1.0"
    echo ✅ Git initialized
) else (
    echo ✅ Git already initialized
)

REM Check if Netlify CLI is installed
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📥 Installing Netlify CLI...
    npm install -g netlify-cli
    echo ✅ Netlify CLI installed
) else (
    echo ✅ Netlify CLI already installed
)

REM Navigate to frontend
cd frontend

REM Install dependencies
echo.
echo 📦 Installing frontend dependencies...
call npm install

REM Build the project
echo.
echo 🔨 Building frontend...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

REM Deploy to Netlify
echo.
echo 🚀 Deploying to Netlify...
echo.
echo Choose deployment method:
echo 1. Deploy to production (requires Netlify login)
echo 2. Deploy as draft
echo 3. Open Netlify dashboard to drag and drop
echo.
set /p choice="Enter choice (1, 2, or 3): "

if "%choice%"=="1" (
    echo Deploying to production...
    netlify deploy --prod --dir=dist
) else if "%choice%"=="2" (
    echo Deploying as draft...
    netlify deploy --dir=dist
) else if "%choice%"=="3" (
    echo Opening Netlify dashboard...
    start https://app.netlify.com/drop
    echo.
    echo 📁 Drag and drop the 'dist' folder to deploy
    echo Location: %CD%\dist
    explorer dist
    pause
    exit /b 0
) else (
    echo Invalid choice. Exiting.
    pause
    exit /b 1
)

echo.
echo ✅ Deployment complete!
echo.
echo 📋 Next steps:
echo 1. Update backend CORS with your Netlify URL
echo 2. Test your deployment
echo 3. Configure custom domain (optional)
echo.
echo 🎉 NEURA AI is live!
echo.
pause
