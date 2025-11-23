@echo off
echo ========================================
echo Creating NEURA AI Directory Structure
echo ========================================
echo.

REM Backend directories
mkdir backend\app\api\routes 2>nul
mkdir backend\app\core 2>nul
mkdir backend\app\models 2>nul
mkdir backend\app\schemas 2>nul
mkdir backend\app\services 2>nul
mkdir backend\app\workers 2>nul
mkdir backend\alembic 2>nul

REM Frontend directories
mkdir frontend\src\components\Layout 2>nul
mkdir frontend\src\pages\Auth 2>nul
mkdir frontend\src\pages\Dashboard 2>nul
mkdir frontend\src\pages\Chat 2>nul
mkdir frontend\src\pages\Study 2>nul
mkdir frontend\src\pages\Voice 2>nul
mkdir frontend\src\pages\Reminders 2>nul
mkdir frontend\src\pages\Settings 2>nul
mkdir frontend\src\store 2>nul
mkdir frontend\src\lib 2>nul
mkdir frontend\public 2>nul

echo ✅ All directories created!
echo.
echo 📋 Next steps:
echo 1. Open QUICK_REFERENCE.md
echo 2. Follow the guide to copy files from conversation
echo 3. Build and deploy!
echo.
pause
