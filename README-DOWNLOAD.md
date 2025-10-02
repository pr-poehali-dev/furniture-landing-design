# Yandex Disk Image Downloader - Documentation Index

## 🎯 Quick Action

**Want to download images right now?**

```bash
node download-yandex-images.js
```

That's it! The script will download **42 images** from Yandex Disk and save them to `public/img/`.

---

## 📚 Documentation Guide

Choose the document that fits your needs:

### 1. **QUICKSTART-DOWNLOAD.md** 
   **👉 Start here if you want to download immediately**
   - One command to run
   - Expected output preview
   - Complete file list
   - Quick troubleshooting
   - **Best for**: Getting started fast

### 2. **DOWNLOAD-SUMMARY-GUIDE.md**
   **👉 Complete reference guide**
   - Full technical details
   - Table of all categories
   - API documentation
   - Usage examples in React/TypeScript
   - Comprehensive troubleshooting
   - **Best for**: Understanding everything

### 3. **EXPECTED-FILES-LIST.md**
   **👉 File manifest**
   - Complete list of 42 files
   - Organized by category
   - Naming conventions
   - Usage examples
   - **Best for**: Knowing what you'll get

### 4. **DOWNLOAD-INSTRUCTIONS.md**
   **👉 Detailed instructions**
   - Step-by-step guide
   - Requirements
   - Technical specifications
   - Alternative scripts info
   - **Best for**: Learning the process

---

## 🗂️ Project Files

### Main Script
- **`download-yandex-images.js`** - The downloader script (run this!)

### Documentation
- **`README-DOWNLOAD.md`** - This file (navigation)
- **`QUICKSTART-DOWNLOAD.md`** - Quick start guide
- **`DOWNLOAD-SUMMARY-GUIDE.md`** - Complete reference
- **`EXPECTED-FILES-LIST.md`** - File manifest
- **`DOWNLOAD-INSTRUCTIONS.md`** - Detailed instructions

### Generated (after running script)
- **`download-summary.json`** - Metadata about downloaded files
- **`public/img/*.jpg`** - The 42 downloaded images

---

## 🚀 What's Being Downloaded

**Source:** Yandex Disk public folder "На ТВ проекты"  
**URL:** https://disk.yandex.ru/d/vWmmIN00mV7SoQ

**Contents:**
- 11 categories of interior design images
- 42 total JPEG files
- ~15-20 MB total size

**Categories:**
1. Bathrooms (4 images)
2. Wardrobes (3 images)
3. Living rooms (4 images)
4. Decor (4 images)
5. Children's rooms (3 images)
6. Kitchens (6 images)
7. Soft panels (2 images)
8. Office (2 images)
9. Hallway (5 images)
10. Bedroom (6 images)
11. Trade equipment (3 images)

---

## 📊 File Naming

Files are renamed from Russian folder structure to English-friendly names:

**Before (on Yandex):**
```
/Ванные комнаты/1.jpg
/Ванные комнаты/2.jpg
/Кухня/1.jpg
```

**After (in your project):**
```
public/img/bathroom-1.jpg
public/img/bathroom-2.jpg
public/img/kitchen-1.jpg
```

**Pattern:** `{category-prefix}-{number}.jpg`

---

## ✅ Quick Checklist

Before running:
- [ ] Node.js v14+ installed (`node --version`)
- [ ] In project root directory
- [ ] Internet connection active
- [ ] `public/img/` directory exists (auto-created if not)

After running:
- [ ] Script completed with success message
- [ ] 42 `.jpg` files in `public/img/`
- [ ] `download-summary.json` created
- [ ] Images can be opened and viewed

---

## 🆘 Need Help?

### Common Issues

**"Command not found: node"**
- Install Node.js: https://nodejs.org/

**"Cannot find module"**
- Make sure you're in the project root directory
- Check file exists: `ls download-yandex-images.js`

**Downloads failing**
- Check internet connection
- Verify Yandex link is accessible
- Wait a minute and try again (rate limiting)

**Partial download**
- Re-run the script (it will overwrite failed downloads)
- Check `download-summary.json` for specific errors

### Still Stuck?

1. Read **DOWNLOAD-SUMMARY-GUIDE.md** for detailed troubleshooting
2. Check the console output for specific error messages
3. Verify the Yandex Disk link is still public: https://disk.yandex.ru/d/vWmmIN00mV7SoQ

---

## 🎯 TL;DR

1. Run: `node download-yandex-images.js`
2. Wait: ~30-60 seconds
3. Done: 42 images in `public/img/`

**Files will be named:**
- `bathroom-1.jpg` through `bathroom-4.jpg`
- `kitchen-1.jpg` through `kitchen-6.jpg`
- `bedroom-1.jpg` through `bedroom-6.jpg`
- And so on for all 11 categories

**Use them like:**
```typescript
<img src="/img/kitchen-3.jpg" alt="Kitchen design" />
```

---

## 📖 More Information

- See **QUICKSTART-DOWNLOAD.md** for immediate usage
- See **DOWNLOAD-SUMMARY-GUIDE.md** for complete documentation
- See **EXPECTED-FILES-LIST.md** for full file manifest

**Ready? Let's download!**

```bash
node download-yandex-images.js
```
