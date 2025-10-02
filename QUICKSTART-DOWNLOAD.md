# Quick Start: Download Yandex Disk Images

## Run This Command

```bash
node download-yandex-images.js
```

## What Will Happen

1. The script will connect to Yandex Disk API
2. Download **42 images** from 11 categories
3. Save them to `public/img/` with organized names
4. Create a summary report in `download-summary.json`

## Expected Output

```
═══════════════════════════════════════════════════════════════════
  YANDEX DISK IMAGE DOWNLOADER
  "На ТВ проекты" → public/img/
═══════════════════════════════════════════════════════════════════

📦 Source: https://disk.yandex.ru/d/vWmmIN00mV7SoQ
📂 Target: /your/project/path/public/img

📊 Expected: 42 images across 11 categories

═══════════════════════════════════════════════════════════════════

📁 Ванные комнаты
   Prefix: "bathroom" | Expected: 4 files
   📷 Found: 4 images
   [1/4] bathroom-1.jpg ... ✓ (252.6 KB)
   [2/4] bathroom-2.jpg ... ✓ (...)
   ...
```

## After Download

Check your files:

```bash
ls -lh public/img/
```

View the summary:

```bash
cat download-summary.json
```

## Complete File List

After successful download, you'll have:

**Bathrooms (4):**
- bathroom-1.jpg
- bathroom-2.jpg
- bathroom-3.jpg
- bathroom-4.jpg

**Wardrobes (3):**
- wardrobe-1.jpg
- wardrobe-2.jpg
- wardrobe-3.jpg

**Living Rooms (4):**
- living-room-1.jpg
- living-room-2.jpg
- living-room-3.jpg
- living-room-4.jpg

**Decor (4):**
- decor-1.jpg
- decor-2.jpg
- decor-3.jpg
- decor-4.jpg

**Children's Rooms (3):**
- children-room-1.jpg
- children-room-2.jpg
- children-room-3.jpg

**Kitchens (6):**
- kitchen-1.jpg
- kitchen-2.jpg
- kitchen-3.jpg
- kitchen-4.jpg
- kitchen-5.jpg
- kitchen-6.jpg

**Soft Panels (2):**
- soft-panel-1.jpg
- soft-panel-2.jpg

**Office (2):**
- office-1.jpg
- office-2.jpg

**Hallway (5):**
- hallway-1.jpg
- hallway-2.jpg
- hallway-3.jpg
- hallway-4.jpg
- hallway-5.jpg

**Bedroom (6):**
- bedroom-1.jpg
- bedroom-2.jpg
- bedroom-3.jpg
- bedroom-4.jpg
- bedroom-5.jpg
- bedroom-6.jpg

**Trade Equipment (3):**
- trade-equipment-1.jpg
- trade-equipment-2.jpg
- trade-equipment-3.jpg

---

**Total: 42 images**

## Troubleshooting

**Script won't run?**
```bash
# Check Node.js is installed
node --version

# Should be v14 or higher
```

**Downloads failing?**
- Check internet connection
- Verify Yandex Disk link is accessible
- Wait a few seconds and try again (rate limiting)

**Need to re-download?**
Just run the script again - it will overwrite existing files.

## Done!

Once you see:
```
🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!
```

Your images are ready to use in `public/img/`!
