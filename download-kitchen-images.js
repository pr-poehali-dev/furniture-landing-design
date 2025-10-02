#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs from Yandex Disk API
const images = [
  {
    name: 'kitchen-1.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/a7f2a06c79766d70784409bb8d58e1546be204be50eda10b61756cdce229e20c/68deea49/ql58dIBT9epgos7ZcNM27pjLuaEWx4s-fdizYTUM6QO2WH_4GG0avAr_lQDSuOOFXNJVP5OEL2f8YfeCLMcSXg%3D%3D?uid=0&filename=1.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/1.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=97567&hid=fd6b97764b71b9c848269b2d9054323c&media_type=image&tknv=v3'
  },
  {
    name: 'kitchen-2.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/1acd8cf40d306620236d717593adbd8b5552a2696bce7d8a56cd42b0f19396b7/68deea4a/ql58dIBT9epgos7ZcNM27ukpGspUkA537kKsPWhkJ3sxkKuNIlsVp91TzAoqiNVhsvtcQ-AutgY2BmARO4bkEA%3D%3D?uid=0&filename=2.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/2.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=269117&hid=3396007d780c2dc67e8fcb1d9b706165&media_type=image&tknv=v3'
  },
  {
    name: 'kitchen-3.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/30dd152b0a84b460895e5be84b44aff25080a692232e77fa5fe407c1f4f33ea4/68deea4b/ql58dIBT9epgos7ZcNM27h1FauBx_-aQzBjsc-s3TnENsdcFdglPaATQ_gdSo0q-ivWcG2FH-FBxFyMNt4OWZA%3D%3D?uid=0&filename=3.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/3.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=134254&hid=fd93d08f5a64df18ed058a9f03b08522&media_type=image&tknv=v3'
  },
  {
    name: 'kitchen-4.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/378674141bf89ccb1669667f2150a96dd06c5f973c201974ce1f0ff7b5b3e238/68deea4c/ql58dIBT9epgos7ZcNM27ppKR5W49ckyngyHxeiUqZptRSEIfJzlLiLRuhrB935hJ9k9fLeEnw9k2AdoUC_ibA%3D%3D?uid=0&filename=4.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/4.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=159559&hid=93cf2d610146ed447db4ab2ebcb60146&media_type=image&tknv=v3'
  },
  {
    name: 'kitchen-5.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/ecc6202c722899cd114817d541bd625996f7767b1d2fe2edc042544b11f25476/68deea4d/ql58dIBT9epgos7ZcNM27piTQjBD6jI4XgtnVq3EbWhPlpAIRaqAW6_6nGCq5PqCkD2rjKm0SXiE-D85nh1uVQ%3D%3D?uid=0&filename=5.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/5.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=103833&hid=360a20858257b8008d283516ab9c3029&media_type=image&tknv=v3'
  },
  {
    name: 'kitchen-6.jpg',
    url: 'https://downloader.disk.yandex.ru/disk/e7574dc3816ad9645970c382b3c697eb6a13975c82212af211892f1cdbae194f/68deea4d/ql58dIBT9epgos7ZcNM27svGM3Sc1gsnhbPTdoTgcJxrHSGWTjoBn5k8zY-TuX-uB-xVaw1pxZFIO3D9VgUB4g%3D%3D?uid=0&filename=6.jpg&disposition=attachment&hash=OwhQpinyIXV/8Naibo8OIJByaXskIC/8NYYZwKEBFV0pz8yBkHM4uR6MdrD/lf%2BTq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/%D0%9A%D1%83%D1%85%D0%BD%D1%8F/6.jpg&limit=0&content_type=image%2Fjpeg&owner_uid=918794027&fsize=99495&hid=a34d9a4ecdd5c1636f3f6aff296c92ad&media_type=image&tknv=v3'
  }
];

const outputDir = path.join(__dirname, 'public', 'img');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, filename);
    const file = fs.createWriteStream(outputPath);
    
    console.log(`Downloading ${filename}...`);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Downloaded ${filename}`);
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(outputPath, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${filename}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Starting download of 6 kitchen images...\n');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`✗ Failed to download ${image.name}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
