# Yandex Disk Image Download - Complete Guide

## 🎯 Objective

Download **42 images** from Yandex Disk public folder **"На ТВ проекты"** and save them to `/public/img/` with organized, English-friendly filenames.

**Source URL:** https://disk.yandex.ru/d/vWmmIN00mV7SoQ

---

## 📦 What You're Getting

### 11 Categories, 42 Total Images

| Category (Russian) | Category (English) | File Prefix | Count | Files |
|---|---|---|---|---|
| Ванные комнаты | Bathrooms | `bathroom` | 4 | bathroom-1.jpg to bathroom-4.jpg |
| Гардеробные | Wardrobes | `wardrobe` | 3 | wardrobe-1.jpg to wardrobe-3.jpg |
| Гостиная | Living rooms | `living-room` | 4 | living-room-1.jpg to living-room-4.jpg |
| Декор | Decor | `decor` | 4 | decor-1.jpg to decor-4.jpg |
| Детские | Children's rooms | `children-room` | 3 | children-room-1.jpg to children-room-3.jpg |
| Кухня | Kitchens | `kitchen` | 6 | kitchen-1.jpg to kitchen-6.jpg |
| Мягкие панели | Soft panels | `soft-panel` | 2 | soft-panel-1.jpg to soft-panel-2.jpg |
| Офис | Office | `office` | 2 | office-1.jpg to office-2.jpg |
| Прихожая | Hallway | `hallway` | 5 | hallway-1.jpg to hallway-5.jpg |
| Спальня | Bedroom | `bedroom` | 6 | bedroom-1.jpg to bedroom-6.jpg |
| Торговое оборудование | Trade equipment | `trade-equipment` | 3 | trade-equipment-1.jpg to trade-equipment-3.jpg |

---

## 🚀 Quick Start

### Step 1: Run the Download Script

```bash
node download-yandex-images.js
```

### Step 2: Wait for Completion

The script will:
- ✓ Connect to Yandex Disk API
- ✓ Fetch all 11 subfolder contents
- ✓ Download 42 images (with rate limiting)
- ✓ Save files to `public/img/`
- ✓ Generate `download-summary.json`

Expected time: ~30-60 seconds (depending on connection speed)

### Step 3: Verify

```bash
# Count downloaded files
ls public/img/*.jpg | grep -E "(bathroom|wardrobe|living-room|decor|children-room|kitchen|soft-panel|office|hallway|bedroom|trade-equipment)" | wc -l
# Should show: 42

# View summary
cat download-summary.json
```

---

## 📋 Complete File List

After successful download, `public/img/` will contain:

```
public/img/
├── bathroom-1.jpg
├── bathroom-2.jpg
├── bathroom-3.jpg
├── bathroom-4.jpg
├── wardrobe-1.jpg
├── wardrobe-2.jpg
├── wardrobe-3.jpg
├── living-room-1.jpg
├── living-room-2.jpg
├── living-room-3.jpg
├── living-room-4.jpg
├── decor-1.jpg
├── decor-2.jpg
├── decor-3.jpg
├── decor-4.jpg
├── children-room-1.jpg
├── children-room-2.jpg
├── children-room-3.jpg
├── kitchen-1.jpg
├── kitchen-2.jpg
├── kitchen-3.jpg
├── kitchen-4.jpg
├── kitchen-5.jpg
├── kitchen-6.jpg
├── soft-panel-1.jpg
├── soft-panel-2.jpg
├── office-1.jpg
├── office-2.jpg
├── hallway-1.jpg
├── hallway-2.jpg
├── hallway-3.jpg
├── hallway-4.jpg
├── hallway-5.jpg
├── bedroom-1.jpg
├── bedroom-2.jpg
├── bedroom-3.jpg
├── bedroom-4.jpg
├── bedroom-5.jpg
├── bedroom-6.jpg
├── trade-equipment-1.jpg
├── trade-equipment-2.jpg
└── trade-equipment-3.jpg
```

---

## 🔧 Technical Details

### How It Works

1. **API Connection**
   - Uses Yandex Disk Public API
   - No authentication required (public folder)
   - Endpoints:
     - List files: `https://cloud-api.yandex.net/v1/disk/public/resources`
     - Get download URL: `https://cloud-api.yandex.net/v1/disk/public/resources/download`

2. **Download Process**
   - For each subfolder:
     - Fetch folder contents via API
     - Filter image files (JPEG/PNG/GIF/WebP)
     - Get temporary download URL for each file
     - Download file via HTTPS
     - Verify file size > 0
   - Rate limiting: 300ms between files, 500ms between folders

3. **File Naming**
   - Pattern: `{english-prefix}-{sequential-number}.{extension}`
   - Example: `bathroom-1.jpg`, `kitchen-3.jpg`
   - Sequential numbering within each category (1, 2, 3, ...)

### Requirements

- **Node.js**: v14+ (uses ES modules)
- **Internet**: Active connection
- **Permissions**: Write access to `public/img/`
- **Disk Space**: ~15-20 MB for all images

### Output Files

1. **Images**: `public/img/*.jpg` (42 files)
2. **Summary**: `download-summary.json` (metadata)

---

## 📊 Expected Output

When you run the script, you'll see:

```
═══════════════════════════════════════════════════════════════════
  YANDEX DISK IMAGE DOWNLOADER
  "На ТВ проекты" → public/img/
═══════════════════════════════════════════════════════════════════

📦 Source: https://disk.yandex.ru/d/vWmmIN00mV7SoQ
📂 Target: /Users/you/project/public/img

📊 Expected: 42 images across 11 categories

═══════════════════════════════════════════════════════════════════

📁 Ванные комнаты
   Prefix: "bathroom" | Expected: 4 files
   📷 Found: 4 images
   [1/4] bathroom-1.jpg ... ✓ (252.6 KB)
   [2/4] bathroom-2.jpg ... ✓ (187.3 KB)
   [3/4] bathroom-3.jpg ... ✓ (199.8 KB)
   [4/4] bathroom-4.jpg ... ✓ (211.5 KB)
   ✅ Completed: 4/4 files

📁 Гардеробные
   Prefix: "wardrobe" | Expected: 3 files
   📷 Found: 3 images
   [1/3] wardrobe-1.jpg ... ✓ (1265.6 KB)
   [2/3] wardrobe-2.jpg ... ✓ (892.4 KB)
   [3/3] wardrobe-3.jpg ... ✓ (743.2 KB)
   ✅ Completed: 3/3 files

... (continues for all 11 categories) ...

═══════════════════════════════════════════════════════════════════
  DOWNLOADED FILES
═══════════════════════════════════════════════════════════════════

Category: Ванные комнаты
  - bathroom-1.jpg
  - bathroom-2.jpg
  - bathroom-3.jpg
  - bathroom-4.jpg

Category: Гардеробные
  - wardrobe-1.jpg
  - wardrobe-2.jpg
  - wardrobe-3.jpg

... (complete list) ...

═══════════════════════════════════════════════════════════════════
📊 Total: 42 / 42 images downloaded
⏱️  Duration: 45.3s
═══════════════════════════════════════════════════════════════════

📄 Summary saved to: /Users/you/project/download-summary.json

🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!
```

---

## 🐛 Troubleshooting

### Script Won't Run

**Error: `Cannot find module`**
```bash
# Check Node.js version
node --version  # Must be v14+

# If too old, update Node.js
```

**Error: `EACCES: permission denied`**
```bash
# Fix permissions
chmod +x download-yandex-images.js
```

### Downloads Fail

**HTTP 429 (Too Many Requests)**
- Wait 1-2 minutes
- Run script again
- Script includes rate limiting but API may still throttle

**HTTP 404 (Not Found)**
- Verify public link is still active
- Check: https://disk.yandex.ru/d/vWmmIN00mV7SoQ
- Link may have expired

**Network Errors**
- Check internet connection
- Try again in a few minutes
- Some downloads may timeout - re-run script

### Partial Download

If script stops mid-way:
1. Check `download-summary.json` for errors
2. Re-run the script - it will overwrite incomplete files
3. Verify with: `ls public/img/ | wc -l`

---

## 📖 Usage Examples

### In React Components

```typescript
// Direct reference
<img src="/img/kitchen-3.jpg" alt="Kitchen design" />

// With import
import kitchen1 from '@/public/img/kitchen-1.jpg';
<img src={kitchen1} alt="Kitchen" />

// Dynamic
const category = 'bedroom';
const number = 2;
<img src={`/img/${category}-${number}.jpg`} alt={`${category}`} />
```

### In TypeScript

```typescript
// Type-safe image list
type Category = 'bathroom' | 'wardrobe' | 'living-room' | 'decor' | 
                'children-room' | 'kitchen' | 'soft-panel' | 'office' |
                'hallway' | 'bedroom' | 'trade-equipment';

const getImage = (category: Category, number: number): string => {
  return `/img/${category}-${number}.jpg`;
};

// Usage
const img = getImage('kitchen', 3);
```

---

## 📁 Related Files

- **`download-yandex-images.js`** - Main download script
- **`DOWNLOAD-INSTRUCTIONS.md`** - Detailed documentation
- **`EXPECTED-FILES-LIST.md`** - Complete file manifest
- **`QUICKSTART-DOWNLOAD.md`** - Quick reference
- **`download-summary.json`** - Generated after download (contains metadata)

---

## ✅ Success Criteria

You'll know it worked when:

1. ✓ Script exits with: `🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!`
2. ✓ `public/img/` contains 42 new `.jpg` files
3. ✓ `download-summary.json` shows `"success": true`
4. ✓ File sizes are reasonable (not 0 bytes)
5. ✓ You can open images and verify they're interior design photos

---

## 🎉 You're Done!

After successful download:

1. Images are in: **`/absolute/path/to/project/public/img/`**
2. Use them in your project with: **`/img/category-number.jpg`**
3. All 42 images are organized and ready to use

**Happy coding!** 🚀
