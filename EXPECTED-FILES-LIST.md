# Expected Downloaded Files

## Complete File List

After running `node download-yandex-images.js`, you will have **42 images** in `public/img/`:

### Category: Ванные комнаты (Bathrooms)
- bathroom-1.jpg
- bathroom-2.jpg
- bathroom-3.jpg
- bathroom-4.jpg

### Category: Гардеробные (Wardrobes)
- wardrobe-1.jpg
- wardrobe-2.jpg
- wardrobe-3.jpg

### Category: Гостиная (Living rooms)
- living-room-1.jpg
- living-room-2.jpg
- living-room-3.jpg
- living-room-4.jpg

### Category: Декор (Decor)
- decor-1.jpg
- decor-2.jpg
- decor-3.jpg
- decor-4.jpg

### Category: Детские (Children's rooms)
- children-room-1.jpg
- children-room-2.jpg
- children-room-3.jpg

### Category: Кухня (Kitchens)
- kitchen-1.jpg
- kitchen-2.jpg
- kitchen-3.jpg
- kitchen-4.jpg
- kitchen-5.jpg
- kitchen-6.jpg

### Category: Мягкие панели (Soft panels)
- soft-panel-1.jpg
- soft-panel-2.jpg

### Category: Офис (Office)
- office-1.jpg
- office-2.jpg

### Category: Прихожая (Hallway)
- hallway-1.jpg
- hallway-2.jpg
- hallway-3.jpg
- hallway-4.jpg
- hallway-5.jpg

### Category: Спальня (Bedroom)
- bedroom-1.jpg
- bedroom-2.jpg
- bedroom-3.jpg
- bedroom-4.jpg
- bedroom-5.jpg
- bedroom-6.jpg

### Category: Торговое оборудование (Trade equipment)
- trade-equipment-1.jpg
- trade-equipment-2.jpg
- trade-equipment-3.jpg

---

## File Locations

All files will be saved to: **`public/img/`**

Absolute path from project root:
```
/path/to/your/project/public/img/bathroom-1.jpg
/path/to/your/project/public/img/bathroom-2.jpg
... (and so on for all 42 files)
```

## Summary

- **Total Images**: 42
- **Total Categories**: 11
- **File Format**: All `.jpg` (JPEG)
- **Naming Pattern**: `{category-prefix}-{number}.jpg`
- **Size**: Varies (typically 90KB - 1.3MB per image)

## Usage in Your Code

You can reference these images in your React/TypeScript code like:

```typescript
// Using import alias
import bathImage from '@/public/img/bathroom-1.jpg';

// Or directly in img tags
<img src="/img/kitchen-3.jpg" alt="Kitchen design" />

// Or using require
const bedroomImage = require('@/public/img/bedroom-2.jpg');
```

## Verification

After download completes, verify with:

```bash
# Count files
ls public/img/ | wc -l
# Should output: 42

# List all files
ls public/img/

# Check download summary
cat download-summary.json
```
