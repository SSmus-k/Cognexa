# Tailwind CSS v4 Fix

## Issue
If you get this error:
```
It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS 
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

## Solution

### Step 1: Install @tailwindcss/postcss
```bash
npm install @tailwindcss/postcss@next
```

### Step 2: Update postcss.config.js
Replace the content with:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Step 3: Update src/index.css
Replace the first three lines:
```css
@import "tailwindcss";
```

Instead of:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Simplify tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 5: Clear node_modules and reinstall (if needed)
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## What Changed in Tailwind CSS v4

- PostCSS plugin moved to `@tailwindcss/postcss`
- Simpler CSS import: `@import "tailwindcss";`
- Configuration is simpler and more streamlined
- Better performance and smaller bundle size

## More Information
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/upgrade-guide)
- [PostCSS Plugin Migration](https://tailwindcss.com/docs/installation/using-postcss)
