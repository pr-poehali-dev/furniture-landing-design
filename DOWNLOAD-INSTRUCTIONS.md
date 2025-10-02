# Yandex Disk Image Downloader

## Overview

This script downloads all images from the Yandex Disk public folder "На ТВ проекты" and saves them to `public/img/` with organized naming.

**Source:** https://disk.yandex.ru/d/vWmmIN00mV7SoQ

## Expected Downloads

Total: **42 images** across **11 categories**

### Categories and File Naming

1. **Ванные комнаты** (Bathrooms) - 4 images
   - Files: `bathroom-1.jpg` to `bathroom-4.jpg`

2. **Гардеробные** (Wardrobes) - 3 images
   - Files: `wardrobe-1.jpg` to `wardrobe-3.jpg`

3. **Гостиная** (Living rooms) - 4 images
   - Files: `living-room-1.jpg` to `living-room-4.jpg`

4. **Декор** (Decor) - 4 images
   - Files: `decor-1.jpg` to `decor-4.jpg`

5. **Детские** (Children's rooms) - 3 images
   - Files: `children-room-1.jpg` to `children-room-3.jpg`

6. **Кухня** (Kitchens) - 6 images
   - Files: `kitchen-1.jpg` to `kitchen-6.jpg`

7. **Мягкие панели** (Soft panels) - 2 images
   - Files: `soft-panel-1.jpg` to `soft-panel-2.jpg`

8. **Офис** (Office) - 2 images
   - Files: `office-1.jpg` to `office-2.jpg`

9. **Прихожая** (Hallway) - 5 images
   - Files: `hallway-1.jpg` to `hallway-5.jpg`

10. **Спальня** (Bedroom) - 6 images
    - Files: `bedroom-1.jpg` to `bedroom-6.jpg`

11. **Торговое оборудование** (Trade equipment) - 3 images
    - Files: `trade-equipment-1.jpg` to `trade-equipment-3.jpg`

## Usage

### Running the Downloader

```bash
node download-yandex-images.js
```

### Requirements

- Node.js 14+ (uses ES modules)
- Internet connection
- Write access to `public/img/` directory

### What the Script Does

1. Creates `public/img/` directory if it doesn't exist
2. Fetches folder structure from Yandex Disk API
3. Downloads each image with rate limiting (300ms between files)
4. Renames files with category prefixes and sequential numbers
5. Verifies downloaded files
6. Generates summary report in `download-summary.json`

### Output

The script will:
- Show real-time progress for each download
- Display file sizes
- Report any errors
- Generate a complete file list at the end
- Save a JSON summary with metadata

## Files Created

### Images
All images saved to: `public/img/`

### Summary
`download-summary.json` - Contains:
- Download timestamp
- Total files expected vs downloaded
- Complete file list by category
- Any errors encountered

## Troubleshooting

### Script fails to run
- Ensure you have Node.js installed: `node --version`
- Check you're in the project root directory

### Downloads fail
- Check your internet connection
- Yandex API may have rate limits - the script includes delays
- The public link may have expired - verify the URL is accessible

### Partial downloads
- Check the console output for specific errors
- Review `download-summary.json` for error details
- Re-run the script - it will overwrite failed downloads

## Technical Details

### API Endpoints Used

1. **List folder contents:**
   ```
   GET https://cloud-api.yandex.net/v1/disk/public/resources
   ```

2. **Get download URL:**
   ```
   GET https://cloud-api.yandex.net/v1/disk/public/resources/download
   ```

### Rate Limiting
- 300ms delay between file downloads
- 500ms delay between folders
- Prevents API throttling

### File Naming Convention
```
{category-prefix}-{number}.{extension}
```

Example: `bathroom-1.jpg`, `kitchen-3.jpg`

## Alternative Scripts

### Other available scripts:
- `bulk-download.mjs` - Alternative implementation using fetch API
- `direct-download.mjs` - Direct download implementation
- `download-images.mjs` - Simplified version

All scripts achieve the same result. Use `download-yandex-images.js` as the primary script.

## License

This is a utility script for downloading publicly shared images from Yandex Disk.
