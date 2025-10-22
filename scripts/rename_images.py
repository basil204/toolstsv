#!/usr/bin/env python3
"""
Auto-rename images in data_img folder from 1 to end
This script will rename all images in the data_img folder to a sequential numbering system
"""

import os
import shutil
import json
from pathlib import Path
from datetime import datetime
import argparse

# Configuration
DATA_IMG_DIR = Path(__file__).parent.parent / "data_img"
BACKUP_DIR = Path(__file__).parent.parent / "data_img_backup"
MAPPING_FILE = DATA_IMG_DIR / "rename-mapping.json"

# Supported image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'}

def create_backup():
    """Create backup of original images before renaming"""
    print("Creating backup of original images...")
    
    if not BACKUP_DIR.exists():
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    # Copy all files to backup directory
    for file_path in DATA_IMG_DIR.iterdir():
        if file_path.is_file():
            backup_path = BACKUP_DIR / file_path.name
            shutil.copy2(file_path, backup_path)
    
    print("Backup created successfully!")

def get_image_files():
    """Get all image files in the data_img directory"""
    image_files = []
    
    for file_path in DATA_IMG_DIR.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in IMAGE_EXTENSIONS:
            image_files.append(file_path)
    
    # Sort by creation time to maintain some order
    image_files.sort(key=lambda x: x.stat().st_ctime)
    
    return image_files

def rename_images(prefix="ai-face", start_number=1, dry_run=False):
    """Rename all images to sequential numbering"""
    print("Starting automatic image renaming...")
    print(f"Prefix: {prefix}, Start number: {start_number}")
    
    if not dry_run:
        # Create backup first
        create_backup()
    
    image_files = get_image_files()
    print(f"Found {len(image_files)} image files to rename")
    
    rename_map = {}
    
    for i, file_path in enumerate(image_files):
        old_name = file_path.name
        extension = file_path.suffix
        new_name = f"{prefix}-{str(i + start_number).zfill(3)}{extension}"
        new_path = file_path.parent / new_name
        
        # Store mapping for reference
        rename_map[old_name] = new_name
        
        if dry_run:
            print(f"Would rename: {old_name} -> {new_name}")
        else:
            try:
                file_path.rename(new_path)
                print(f"Renamed: {old_name} -> {new_name}")
            except Exception as error:
                print(f"Failed to rename {old_name}: {error}")
    
    if not dry_run:
        # Save rename mapping for reference
        with open(MAPPING_FILE, 'w', encoding='utf-8') as f:
            json.dump(rename_map, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully renamed {len(image_files)} images!")
        print(f"Rename mapping saved to: {MAPPING_FILE}")
        print(f"Original files backed up to: {BACKUP_DIR}")
    
    return len(image_files)

def restore_from_backup():
    """Restore original names from backup"""
    print("Restoring images from backup...")
    
    if not BACKUP_DIR.exists():
        print("No backup found!")
        return False
    
    restored_count = 0
    for backup_file in BACKUP_DIR.iterdir():
        if backup_file.is_file():
            restore_path = DATA_IMG_DIR / backup_file.name
            try:
                shutil.copy2(backup_file, restore_path)
                print(f"Restored: {backup_file.name}")
                restored_count += 1
            except Exception as error:
                print(f"Failed to restore {backup_file.name}: {error}")
    
    print(f"Restored {restored_count} images from backup!")
    return True

def list_images():
    """List current image files"""
    image_files = get_image_files()
    print("Current image files:")
    for i, file_path in enumerate(image_files, 1):
        size = file_path.stat().st_size
        size_mb = size / (1024 * 1024)
        print(f"{i:3d}. {file_path.name} ({size_mb:.2f} MB)")
    
    print(f"\nTotal: {len(image_files)} images")

def show_stats():
    """Show statistics about the image collection"""
    image_files = get_image_files()
    
    if not image_files:
        print("No images found!")
        return
    
    # Calculate total size
    total_size = sum(f.stat().st_size for f in image_files)
    total_size_mb = total_size / (1024 * 1024)
    
    # Count by extension
    extensions = {}
    for file_path in image_files:
        ext = file_path.suffix.lower()
        extensions[ext] = extensions.get(ext, 0) + 1
    
    print("Image Collection Statistics:")
    print(f"   Total images: {len(image_files)}")
    print(f"   Total size: {total_size_mb:.2f} MB")
    print(f"   Average size: {total_size_mb/len(image_files):.2f} MB per image")
    print("\nBy file type:")
    for ext, count in sorted(extensions.items()):
        print(f"   {ext}: {count} files")

def main():
    parser = argparse.ArgumentParser(description="Auto-rename images in data_img folder")
    parser.add_argument("command", choices=["rename", "restore", "list", "stats"], 
                       help="Command to execute")
    parser.add_argument("--prefix", default="ai-face", 
                       help="Prefix for renamed files (default: ai-face)")
    parser.add_argument("--start", type=int, default=1, 
                       help="Starting number (default: 1)")
    parser.add_argument("--dry-run", action="store_true", 
                       help="Show what would be renamed without actually doing it")
    
    args = parser.parse_args()
    
    if args.command == "rename":
        rename_images(args.prefix, args.start, args.dry_run)
    elif args.command == "restore":
        restore_from_backup()
    elif args.command == "list":
        list_images()
    elif args.command == "stats":
        show_stats()

if __name__ == "__main__":
    main()
