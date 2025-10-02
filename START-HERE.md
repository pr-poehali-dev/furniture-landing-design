# 🎯 START HERE: Download Yandex Disk Images

## What This Does

Downloads **42 interior design images** from Yandex Disk and saves them to `public/img/` with organized English names.

---

## ⚡ Quick Start (30 seconds)

### 1. Run this command:

```bash
node download-yandex-images.js
```

### 2. Wait for this message:

```
🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!
```

### 3. Done!

Your images are now in **`public/img/`**

---

## 📦 What You'll Get

**42 images** organized like this:

```
public/img/
├── bathroom-1.jpg through bathroom-4.jpg        (4 images)
├── wardrobe-1.jpg through wardrobe-3.jpg        (3 images)
├── living-room-1.jpg through living-room-4.jpg  (4 images)
├── decor-1.jpg through decor-4.jpg              (4 images)
├── children-room-1.jpg through children-room-3.jpg  (3 images)
├── kitchen-1.jpg through kitchen-6.jpg          (6 images)
├── soft-panel-1.jpg through soft-panel-2.jpg    (2 images)
├── office-1.jpg through office-2.jpg            (2 images)
├── hallway-1.jpg through hallway-5.jpg          (5 images)
├── bedroom-1.jpg through bedroom-6.jpg          (6 images)
└── trade-equipment-1.jpg through trade-equipment-3.jpg  (3 images)
```

---

## 🎨 How to Use in Your App

```tsx
// Simple
<img src="/img/kitchen-3.jpg" alt="Kitchen design" />

// Dynamic
const category = 'bedroom';
const num = 2;
<img src={`/img/${category}-${num}.jpg`} alt={category} />
```

---

## ✅ Verify It Worked

```bash
# Count files (should be 42 or more)
ls public/img/*.jpg | wc -l

# View summary
cat download-summary.json
```

Look for: `"success": true` and `"totalDownloaded": 42`

---

## 📚 Need More Info?

| If you want to... | Read this file |
|-------------------|----------------|
| See all file names | [EXPECTED-FILES-LIST.md](./EXPECTED-FILES-LIST.md) |
| Understand everything | [DOWNLOAD-SUMMARY-GUIDE.md](./DOWNLOAD-SUMMARY-GUIDE.md) |
| Get quick reference | [QUICKSTART-DOWNLOAD.md](./QUICKSTART-DOWNLOAD.md) |
| Verify download | [CHECKLIST.md](./CHECKLIST.md) |
| Navigate all docs | [INDEX.md](./INDEX.md) |

---

## 🆘 Troubleshooting

**"Command not found: node"**
- Install Node.js from https://nodejs.org/ (need v14+)

**Script fails**
- Check internet connection
- Verify you're in project root: `ls download-yandex-images.js`
- Try again: `node download-yandex-images.js`

**Partial download**
- Just run the script again - it will retry failed files

**Still stuck?**
- Read detailed troubleshooting: [DOWNLOAD-SUMMARY-GUIDE.md](./DOWNLOAD-SUMMARY-GUIDE.md#troubleshooting)

---

## 🎉 That's It!

**Run this:**
```bash
node download-yandex-images.js
```

**Get:** 42 images in `public/img/`

**Use:** `<img src="/img/kitchen-1.jpg" />`

---

## 📁 Project Files

Created for you:

- **`download-yandex-images.js`** - The download script (run this!)
- **`START-HERE.md`** - This file
- **8 other docs** - Detailed guides (see [INDEX.md](./INDEX.md))

Generated after download:

- **`download-summary.json`** - Metadata and file list
- **`public/img/*.jpg`** - Your 42 images

---

**Ready? Let's go!** 🚀

```bash
node download-yandex-images.js
```
