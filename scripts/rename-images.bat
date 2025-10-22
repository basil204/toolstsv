@echo off
REM Auto-rename images in data_img folder
REM This batch script provides easy access to the image renaming functionality

setlocal enabledelayedexpansion

echo.
echo ========================================
echo    AI Image Renaming Tool
echo ========================================
echo.

if "%1"=="" (
    echo Usage:
    echo   rename-images.bat rename    - Rename all images to sequential numbers
    echo   rename-images.bat restore   - Restore original names from backup
    echo   rename-images.bat list      - List current image files
    echo   rename-images.bat stats     - Show image collection statistics
    echo.
    echo Examples:
    echo   rename-images.bat rename
    echo   rename-images.bat restore
    echo   rename-images.bat list
    echo   rename-images.bat stats
    goto :end
)

if "%1"=="rename" (
    echo 🔄 Starting automatic image renaming...
    python scripts/rename_images.py rename --prefix ai-face --start 1
    goto :end
)

if "%1"=="restore" (
    echo 🔄 Restoring images from backup...
    python scripts/rename_images.py restore
    goto :end
)

if "%1"=="list" (
    echo 📋 Listing current image files...
    python scripts/rename_images.py list
    goto :end
)

if "%1"=="stats" (
    echo 📊 Showing image collection statistics...
    python scripts/rename_images.py stats
    goto :end
)

echo ❌ Unknown command: %1
echo Use 'rename-images.bat' without arguments to see usage.

:end
echo.
pause
