const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { url: 'https://cdn.poehali.dev/files/d53724be-faa3-4dd7-a760-c63d1260820c.jpg', name: '1.jpg' },
  { url: 'https://cdn.poehali.dev/files/ecd5f3ce-e721-44c5-bcea-fea06a5b74a0.jpg', name: '2.jpg' },
  { url: 'https://cdn.poehali.dev/files/21e11ccf-17d4-489c-86f3-a31ef60dc17e.jpg', name: '3.jpg' },
  { url: 'https://cdn.poehali.dev/files/759647d1-cc37-434e-94f3-b82a62ac36ed.jpg', name: '4.jpg' }
];

const outputDir = 'public/img/vannaya';

// Создать папку
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Загружаю фотографии ванных комнат...\n');
  
  for (const img of images) {
    const filepath = path.join(outputDir, img.name);
    console.log(`⬇️  Загружаю ${img.name}...`);
    try {
      await downloadImage(img.url, filepath);
      console.log(`✅ ${img.name} сохранена\n`);
    } catch (err) {
      console.log(`❌ Ошибка загрузки ${img.name}: ${err.message}\n`);
    }
  }
  
  console.log('🎉 Готово! Все фотографии в папке public/img/vannaya/');
}

main();
