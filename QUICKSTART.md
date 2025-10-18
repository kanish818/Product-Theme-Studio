# Quick Start Guide 🚀

## First Time Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Navigate to the URL shown in terminal (usually `http://localhost:5173`)

## Using the Editor

### Left Panel (Controls)
- Adjust typography, button styles, gallery settings, etc.
- All changes update in real-time on the right panel

### Right Panel (Preview)
- Live preview of a product customizer card
- Shows how your theme looks in action

### Switching Layouts
- **Vertical Layout**: Material types stacked vertically
- **Horizontal Layout**: Material types as tabs

### Saving Your Work
- Your theme is **automatically saved** to browser localStorage
- Refresh the page and your settings persist!

### Export/Import
- **Export**: Click "💾 Export" to download your theme as JSON
- **Import**: Click "📥 Import" and paste a previously exported JSON
- **Reset**: Click "🔄 Reset" to restore default settings

## Building for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## Tips

- Play with the sliders to see instant changes
- Try different font combinations
- Export your favorite themes for later use
- The color pickers support both hex and rgb values

## Troubleshooting

**Nothing shows up?**
- Make sure you ran `npm install` first
- Check the browser console for errors

**Changes not saving?**
- Check if localStorage is enabled in your browser
- Try a different browser

**Build fails?**
- Run `npm install` again
- Make sure you have Node.js 18+ installed

---

Enjoy customizing! 🎨
