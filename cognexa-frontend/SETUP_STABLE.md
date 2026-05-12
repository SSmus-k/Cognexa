# CognexaAi Frontend - Stable Setup Guide

## What Changed
We've downgraded to **Tailwind CSS v3** which is more stable and compatible with your current setup.

## Quick Setup

### 1. Extract the ZIP file
```bash
cd cognexa-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

## If You Still Get Errors

### Option A: Clear cache and reinstall
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Start
npm run dev
```

### Option B: Use a different port
```bash
npm run dev -- --port 3000
```

### Option C: Clear browser cache
- Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
- Clear all cache
- Refresh the page

## Configuration Files

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### tailwind.config.js
Uses Tailwind CSS v3 with dark mode support and custom amber colors.

### src/index.css
Uses standard Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| `Missing field 'negated'` | Already fixed - using Tailwind v3 |
| Port already in use | Use `npm run dev -- --port 3000` |
| Module not found | Run `npm install` again |
| Styles not loading | Clear browser cache and hard refresh |

## Build for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment.

## Support

If you encounter any issues, try:
1. Clearing node_modules: `rm -rf node_modules`
2. Clearing npm cache: `npm cache clean --force`
3. Reinstalling: `npm install`
4. Restarting dev server: `npm run dev`

## Versions

- **React**: 19.2.6
- **Vite**: 8.0.12
- **Tailwind CSS**: 3.4.1 (Stable)
- **Node.js**: 16+ recommended

Enjoy! 🎉
