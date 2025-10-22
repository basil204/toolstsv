const fs = require('fs');
const path = require('path');

/**
 * Auto-rename images in data_img folder from 1 to end
 * This script will rename all images in the data_img folder to a sequential numbering system
 */

const DATA_IMG_DIR = path.join(__dirname, '..', 'data_img');
const BACKUP_DIR = path.join(__dirname, '..', 'data_img_backup');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

function createBackup() {
  console.log('📁 Creating backup of original images...');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const files = fs.readdirSync(DATA_IMG_DIR);
  files.forEach(file => {
    const sourcePath = path.join(DATA_IMG_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, backupPath);
    }
  });
  
  console.log('✅ Backup created successfully!');
}

function getImageFiles() {
  const files = fs.readdirSync(DATA_IMG_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  }).sort((a, b) => {
    // Sort by creation time to maintain some order
    const statA = fs.statSync(path.join(DATA_IMG_DIR, a));
    const statB = fs.statSync(path.join(DATA_IMG_DIR, b));
    return statA.birthtime - statB.birthtime;
  });
}

function renameImages() {
  console.log('🔄 Starting automatic image renaming...');
  
  // Create backup first
  createBackup();
  
  const imageFiles = getImageFiles();
  console.log(`📊 Found ${imageFiles.length} image files to rename`);
  
  const renameMap = new Map();
  
  imageFiles.forEach((file, index) => {
    const oldPath = path.join(DATA_IMG_DIR, file);
    const ext = path.extname(file);
    const newName = `ai-face-${String(index + 1).padStart(3, '0')}${ext}`;
    const newPath = path.join(DATA_IMG_DIR, newName);
    
    // Store mapping for reference
    renameMap.set(file, newName);
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${file} → ${newName}`);
    } catch (error) {
      console.error(`❌ Failed to rename ${file}:`, error.message);
    }
  });
  
  // Save rename mapping for reference
  const mappingFile = path.join(DATA_IMG_DIR, 'rename-mapping.json');
  const mappingData = Object.fromEntries(renameMap);
  fs.writeFileSync(mappingFile, JSON.stringify(mappingData, null, 2));
  
  console.log(`🎉 Successfully renamed ${imageFiles.length} images!`);
  console.log(`📝 Rename mapping saved to: ${mappingFile}`);
  console.log(`💾 Original files backed up to: ${BACKUP_DIR}`);
  
  return imageFiles.length;
}

function restoreFromBackup() {
  console.log('🔄 Restoring images from backup...');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('❌ No backup found!');
    return;
  }
  
  const backupFiles = fs.readdirSync(BACKUP_DIR);
  
  backupFiles.forEach(file => {
    const backupPath = path.join(BACKUP_DIR, file);
    const restorePath = path.join(DATA_IMG_DIR, file);
    
    try {
      fs.copyFileSync(backupPath, restorePath);
      console.log(`✅ Restored: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to restore ${file}:`, error.message);
    }
  });
  
  console.log('🎉 Images restored from backup!');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'rename':
      renameImages();
      break;
    case 'restore':
      restoreFromBackup();
      break;
    case 'list':
      const files = getImageFiles();
      console.log('📋 Current image files:');
      files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
      break;
    default:
      console.log(`
🖼️  AI Image Renaming Tool

Usage:
  node rename-images.js rename    - Rename all images to sequential numbers
  node rename-images.js restore   - Restore original names from backup
  node rename-images.js list      - List current image files

Examples:
  node rename-images.js rename
  node rename-images.js restore
  node rename-images.js list
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  renameImages,
  restoreFromBackup,
  getImageFiles,
  createBackup
};
