// Download kitchen images from Yandex Disk to public/img/
import { writeFile } from 'fs/promises';
import { join } from 'path';

const PUBLIC_KEY = 'https://disk.yandex.ru/d/vWmmIN00mV7SoQ';

const images = [
  { name: 'kitchen-1.jpg', path: '/Кухня/1.jpg' },
  { name: 'kitchen-2.jpg', path: '/Кухня/2.jpg' },
  { name: 'kitchen-3.jpg', path: '/Кухня/3.jpg' },
  { name: 'kitchen-4.jpg', path: '/Кухня/4.jpg' },
  { name: 'kitchen-5.jpg', path: '/Кухня/5.jpg' },
  { name: 'kitchen-6.jpg', path: '/Кухня/6.jpg' }
];

async function getDownloadUrl(filePath: string): Promise<string> {
  const apiUrl = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(PUBLIC_KEY)}&path=${encodeURIComponent(filePath)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.href;
}

async function downloadImage(url: string, filename: string): Promise<boolean> {
  try {
    console.log(`Downloading ${filename}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const outputPath = join(process.cwd(), 'public', 'img', filename);
    await writeFile(outputPath, buffer);
    
    console.log(`✓ Downloaded ${filename} (${(buffer.length / 1024).toFixed(2)} KB)`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to download ${filename}:`, error);
    return false;
  }
}

async function main() {
  console.log('Starting download of 6 kitchen images from Yandex Disk...\n');
  
  let successCount = 0;
  for (const image of images) {
    try {
      // Get fresh download URL from Yandex API
      const downloadUrl = await getDownloadUrl(image.path);
      const success = await downloadImage(downloadUrl, image.name);
      if (success) successCount++;
    } catch (error) {
      console.error(`✗ Failed to process ${image.name}:`, error);
    }
  }
  
  console.log(`\n✓ Download complete! ${successCount}/${images.length} images saved to public/img/`);
}

main();