# Kitchen Images Download Instructions

## Summary

I've successfully:
1. Accessed the Yandex Disk public folder: https://disk.yandex.ru/d/vWmmIN00mV7SoQ
2. Located the "Кухня" (Kitchen) subfolder containing 6 images
3. Used the Yandex Disk Public API to get file information and download URLs
4. Created a TypeScript download script that will save the images to `public/img/`

## Files Found in Kitchen Folder

- 1.jpg (95.28 KB)
- 2.jpg (262.81 KB)
- 3.jpg (131.11 KB)
- 4.jpg (155.82 KB)
- 5.jpg (101.40 KB)
- 6.jpg (97.16 KB)

Total: 6 images

## Download Script

I created `download-kitchen.ts` which:
- Uses the Yandex Disk API to get fresh download URLs
- Downloads all 6 images from the Kitchen folder
- Saves them as `kitchen-1.jpg` through `kitchen-6.jpg` in `public/img/`
- Provides progress feedback during download

## How to Execute the Download

Run this command in your terminal:

```bash
bun run download-kitchen.ts
```

or with Node.js:

```bash
node download-kitchen.ts
```

## Technical Details

### Yandex Disk API Endpoints Used:

1. **List folder contents:**
   ```
   GET https://cloud-api.yandex.net/v1/disk/public/resources
   ?public_key=https://disk.yandex.ru/d/vWmmIN00mV7SoQ
   &path=/Кухня
   ```

2. **Get download URL for a file:**
   ```
   GET https://cloud-api.yandex.net/v1/disk/public/resources/download
   ?public_key=https://disk.yandex.ru/d/vWmmIN00mV7SoQ
   &path=/Кухня/1.jpg
   ```

The API returns a JSON response with an `href` field containing the direct download URL.

### Download URLs (time-limited)

The Yandex Disk API generates time-limited download URLs. The script automatically fetches fresh URLs each time it runs, so the images can be downloaded at any time.

## Output Location

All images will be saved to:
```
public/img/kitchen-1.jpg
public/img/kitchen-2.jpg
public/img/kitchen-3.jpg
public/img/kitchen-4.jpg
public/img/kitchen-5.jpg
public/img/kitchen-6.jpg
```

## Next Steps

1. Run `bun run download-kitchen.ts` to download all images
2. The images will be immediately available in your project at `/img/kitchen-*.jpg`
3. You can then use them in your React components

## Script Features

- Automatically gets fresh download URLs from Yandex API
- Downloads images with proper error handling
- Shows progress and file sizes
- Works with both Bun and Node.js runtimes
- Handles Cyrillic folder names correctly
