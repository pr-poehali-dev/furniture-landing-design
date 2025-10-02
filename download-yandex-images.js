#!/usr/bin/env node
/**
 * Yandex Disk Public Folder Image Downloader
 * Downloads all images from "На ТВ проекты" folder to public/img/
 * 
 * Usage: node download-yandex-images.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  publicKey: 'https://disk.yandex.ru/d/vWmmIN00mV7SoQ',
  outputDir: path.join(__dirname, 'public', 'img'),
  folders: {
    'Ванные комнаты': { prefix: 'bathroom', expected: 4 },
    'Гардеробные': { prefix: 'wardrobe', expected: 3 },
    'Гостиная': { prefix: 'living-room', expected: 4 },
    'Декор': { prefix: 'decor', expected: 4 },
    'Детские': { prefix: 'children-room', expected: 3 },
    'Кухня': { prefix: 'kitchen', expected: 6 },
    'Мягкие панели': { prefix: 'soft-panel', expected: 2 },
    'Офис': { prefix: 'office', expected: 2 },
    'Прихожая': { prefix: 'hallway', expected: 5 },
    'Спальня': { prefix: 'bedroom', expected: 6 },
    'Торговое оборудование': { prefix: 'trade-equipment', expected: 3 }
  }
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

/**
 * Make HTTPS GET request
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download file from URL
 */
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Get folder contents from Yandex API
 */
async function getFolderContents(folderPath = '') {
  const params = new URLSearchParams({
    public_key: CONFIG.publicKey,
    limit: 1000
  });
  
  if (folderPath) {
    params.append('path', folderPath);
  }
  
  const url = `https://cloud-api.yandex.net/v1/disk/public/resources?${params}`;
  const data = await httpsGet(url);
  return JSON.parse(data);
}

/**
 * Get download URL for a file
 */
async function getDownloadURL(filePath) {
  const params = new URLSearchParams({
    public_key: CONFIG.publicKey,
    path: filePath
  });
  
  const url = `https://cloud-api.yandex.net/v1/disk/public/resources/download?${params}`;
  const data = await httpsGet(url);
  const json = JSON.parse(data);
  return json.href;
}

/**
 * Sleep helper
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Main download function
 */
async function downloadAllImages() {
  const startTime = Date.now();
  
  console.log('\n' + '═'.repeat(70));
  console.log('  YANDEX DISK IMAGE DOWNLOADER');
  console.log('  "На ТВ проекты" → public/img/');
  console.log('═'.repeat(70));
  console.log(`\n📦 Source: ${CONFIG.publicKey}`);
  console.log(`📂 Target: ${CONFIG.outputDir}\n`);
  
  const results = {};
  const errors = [];
  let totalDownloaded = 0;
  const totalExpected = Object.values(CONFIG.folders).reduce((sum, f) => sum + f.expected, 0);
  
  console.log(`📊 Expected: ${totalExpected} images across ${Object.keys(CONFIG.folders).length} categories\n`);
  console.log('═'.repeat(70));
  
  // Process each folder
  for (const [folderName, { prefix, expected }] of Object.entries(CONFIG.folders)) {
    console.log(`\n📁 ${folderName}`);
    console.log(`   Prefix: "${prefix}" | Expected: ${expected} files`);
    
    results[folderName] = [];
    
    try {
      // Get folder contents
      const contents = await getFolderContents(`/${folderName}`);
      
      if (!contents._embedded?.items) {
        const msg = `No items found in folder`;
        console.log(`   ⚠️  ${msg}`);
        errors.push(`${folderName}: ${msg}`);
        continue;
      }
      
      // Filter image files
      const images = contents._embedded.items.filter(item =>
        item.type === 'file' && 
        (item.mime_type?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(item.name))
      );
      
      console.log(`   📷 Found: ${images.length} images`);
      
      if (images.length !== expected) {
        console.log(`   ⚠️  Expected ${expected} but found ${images.length} images`);
      }
      
      // Download each image
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const num = i + 1;
        const ext = path.extname(img.name);
        const filename = `${prefix}-${num}${ext}`;
        const filepath = path.join(CONFIG.outputDir, filename);
        
        process.stdout.write(`   [${num}/${images.length}] ${filename} ... `);
        
        try {
          // Get download URL
          const downloadURL = await getDownloadURL(`/${folderName}/${img.name}`);
          
          // Download file
          await downloadFile(downloadURL, filepath);
          
          // Verify file was created
          if (fs.existsSync(filepath)) {
            const stats = fs.statSync(filepath);
            if (stats.size > 0) {
              results[folderName].push(filename);
              totalDownloaded++;
              console.log(`✓ (${(stats.size / 1024).toFixed(1)} KB)`);
            } else {
              console.log(`✗ (empty file)`);
              errors.push(`${folderName}/${filename}: Empty file`);
            }
          } else {
            console.log(`✗ (not saved)`);
            errors.push(`${folderName}/${filename}: File not saved`);
          }
          
          // Rate limiting
          await sleep(300);
          
        } catch (err) {
          console.log(`✗ (${err.message})`);
          errors.push(`${folderName}/${filename}: ${err.message}`);
        }
      }
      
      const status = results[folderName].length === expected ? '✅' : '⚠️';
      console.log(`   ${status} Completed: ${results[folderName].length}/${expected} files`);
      
    } catch (err) {
      console.log(`   ❌ Error accessing folder: ${err.message}`);
      errors.push(`${folderName}: ${err.message}`);
    }
    
    // Delay between folders
    await sleep(500);
  }
  
  // Print complete file list
  console.log('\n' + '═'.repeat(70));
  console.log('  DOWNLOADED FILES');
  console.log('═'.repeat(70) + '\n');
  
  for (const [category, files] of Object.entries(results)) {
    if (files.length > 0) {
      console.log(`Category: ${category}`);
      files.forEach(file => console.log(`  - ${file}`));
      console.log('');
    }
  }
  
  // Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('═'.repeat(70));
  console.log(`📊 Total: ${totalDownloaded} / ${totalExpected} images downloaded`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log('═'.repeat(70));
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors (${errors.length}):`);
    errors.slice(0, 10).forEach(err => console.log(`  - ${err}`));
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`);
    }
  }
  
  // Save JSON summary
  const summary = {
    downloadDate: new Date().toISOString(),
    duration: `${duration}s`,
    totalExpected,
    totalDownloaded,
    success: totalDownloaded === totalExpected,
    categories: results,
    errors: errors.length > 0 ? errors : undefined
  };
  
  const summaryPath = path.join(__dirname, 'download-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log(`\n📄 Summary saved to: ${summaryPath}`);
  
  // Final status
  if (totalDownloaded === totalExpected) {
    console.log('\n🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!\n');
    return 0;
  } else {
    console.log(`\n⚠️  Downloaded ${totalDownloaded}/${totalExpected} images (${((totalDownloaded/totalExpected)*100).toFixed(1)}%)\n`);
    return 1;
  }
}

// Run the downloader
console.log('\nStarting download...');
downloadAllImages()
  .then(exitCode => process.exit(exitCode))
  .catch(err => {
    console.error('\n❌ Fatal error:', err);
    console.error(err.stack);
    process.exit(1);
  });
