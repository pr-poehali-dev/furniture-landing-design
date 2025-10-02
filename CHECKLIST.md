# Download Checklist

## Pre-Download

- [ ] Node.js v14+ installed
  ```bash
  node --version
  ```

- [ ] In project root directory
  ```bash
  ls download-yandex-images.js
  ```

- [ ] Internet connection active

## Run Download

- [ ] Execute script
  ```bash
  node download-yandex-images.js
  ```

- [ ] Wait for completion (~30-60 seconds)

- [ ] Look for success message
  ```
  🎉 ALL IMAGES DOWNLOADED SUCCESSFULLY!
  ```

## Verify Download

- [ ] Count files (should be 42)
  ```bash
  ls public/img/*.jpg | grep -E "(bathroom|wardrobe|living-room|decor|children-room|kitchen|soft-panel|office|hallway|bedroom|trade-equipment)" | wc -l
  ```

- [ ] Check bathrooms (4 files)
  ```bash
  ls public/img/bathroom-*.jpg
  ```

- [ ] Check kitchens (6 files)
  ```bash
  ls public/img/kitchen-*.jpg
  ```

- [ ] Check bedrooms (6 files)
  ```bash
  ls public/img/bedroom-*.jpg
  ```

- [ ] View summary file
  ```bash
  cat download-summary.json
  ```

- [ ] Open a few images to verify quality
  ```bash
  open public/img/kitchen-1.jpg
  ```

## Post-Download

- [ ] Confirm `success: true` in `download-summary.json`

- [ ] No errors in console output

- [ ] All file sizes > 0 bytes

- [ ] Images can be opened and viewed

## Complete File List

Verify these 42 files exist:

### Bathrooms (4)
- [ ] bathroom-1.jpg
- [ ] bathroom-2.jpg
- [ ] bathroom-3.jpg
- [ ] bathroom-4.jpg

### Wardrobes (3)
- [ ] wardrobe-1.jpg
- [ ] wardrobe-2.jpg
- [ ] wardrobe-3.jpg

### Living Rooms (4)
- [ ] living-room-1.jpg
- [ ] living-room-2.jpg
- [ ] living-room-3.jpg
- [ ] living-room-4.jpg

### Decor (4)
- [ ] decor-1.jpg
- [ ] decor-2.jpg
- [ ] decor-3.jpg
- [ ] decor-4.jpg

### Children's Rooms (3)
- [ ] children-room-1.jpg
- [ ] children-room-2.jpg
- [ ] children-room-3.jpg

### Kitchens (6)
- [ ] kitchen-1.jpg
- [ ] kitchen-2.jpg
- [ ] kitchen-3.jpg
- [ ] kitchen-4.jpg
- [ ] kitchen-5.jpg
- [ ] kitchen-6.jpg

### Soft Panels (2)
- [ ] soft-panel-1.jpg
- [ ] soft-panel-2.jpg

### Office (2)
- [ ] office-1.jpg
- [ ] office-2.jpg

### Hallway (5)
- [ ] hallway-1.jpg
- [ ] hallway-2.jpg
- [ ] hallway-3.jpg
- [ ] hallway-4.jpg
- [ ] hallway-5.jpg

### Bedroom (6)
- [ ] bedroom-1.jpg
- [ ] bedroom-2.jpg
- [ ] bedroom-3.jpg
- [ ] bedroom-4.jpg
- [ ] bedroom-5.jpg
- [ ] bedroom-6.jpg

### Trade Equipment (3)
- [ ] trade-equipment-1.jpg
- [ ] trade-equipment-2.jpg
- [ ] trade-equipment-3.jpg

## Test in Your App

- [ ] Reference image in component
  ```tsx
  <img src="/img/kitchen-1.jpg" alt="Kitchen" />
  ```

- [ ] Image loads correctly

- [ ] Image displays properly

## Done!

- [ ] All 42 images downloaded
- [ ] All files verified
- [ ] Images work in application
- [ ] `download-summary.json` created

**Status:** ✅ Complete

---

## If Something Failed

### Re-run Script
```bash
node download-yandex-images.js
```

### Check Specific Category
If a category failed, check `download-summary.json` for errors.

### Verify Link Still Works
https://disk.yandex.ru/d/vWmmIN00mV7SoQ

### Need Help?
See: `DOWNLOAD-SUMMARY-GUIDE.md` → Troubleshooting section
