# Product Theme Studio 🎨

A visual theme editor I built to customize product UI components in real-time. Think of it as a playground for tweaking buttons, colors, typography, and layouts without touching code.

# Product Theme Studio 🎨

[![Deploy](https://github.com/kanish818/Product-Theme-Studio/actions/workflows/deploy.yml/badge.svg)](https://github.com/kanish818/Product-Theme-Studio/actions/workflows/deploy.yml)

A visual theme editor to customize a product card UI in real-time. The left panel edits the theme; the right panel shows an instant preview.

Live Demo:
- https://kanish818.github.io/Product-Theme-Studio/

Repository:
- https://github.com/kanish818/Product-Theme-Studio

---

## Deliverables checklist

- ✅ Fully functional React UI implementing core features
- ✅ Editor interface for dynamic customization
- ✅ Demo page showing component + editor
- ✅ Deployed link (GitHub Pages)
- ✅ Repository with structured commits
- ✅ README explaining API, editor, and design decisions

---

## How to run

```bash
npm install
npm run dev
```

Build & preview:

```bash
npm run build
npm run preview
```

---

## Tech stack

- React 18 + TypeScript
- Vite bundler
- Context API for state
- localStorage persistence

---

## Features

- Live theme editing: typography, button styles, gallery, borders, layout
- Layout switching: Vertical / Horizontal
- Presets dropdown for quick themes
- Export/Import configuration as JSON
- Export current theme as CSS variables
- Accessible controls (aria-labels, focus-visible)
- Responsive layout (breakpoints)

---

## Component API and configurable props

Core type (simplified):

```ts
type EditorConfig = {
  typography: { family: string; weight: number; size: number };
  button: { radius: number; shadow: 'none'|'sm'|'md'|'lg'; align: 'left'|'center'|'right'; bgColor: string; textColor: string };
  gallery: { align: 'grid-left'|'grid-center'|'grid-right'; spacing: number; radius: number };
  layout: { cardRadius: number; padding: number; sectionBg: string };
  stroke: { color: string; weight: number };
  activeLayout: 'layout-a'|'layout-b';
};
```

Key components:
- `ConfigProvider` – provides and persists `EditorConfig`
- `EditorPanel` – writes updates; handles import/export; presets & CSS export
- `ProductCustomizer` – reads config and renders the preview UI

---

## How the editor works

- `ConfigContext` stores `EditorConfig` in a reducer and persists to `localStorage`.
- The left panel updates the config via controlled inputs.
- The preview re-renders with the same config for instant feedback.
- Export options:
  - JSON – full config snapshot
  - CSS – variables derived from current config

Example config:

```ts
{
  typography: { family: 'Poppins', weight: 500, size: 15 },
  button: { radius: 8, shadow: 'sm', align: 'center', bgColor: '#58a6ff', textColor: '#ffffff' },
  gallery: { align: 'grid-center', spacing: 12, radius: 10 },
  layout: { cardRadius: 14, padding: 20, sectionBg: '#161b22' },
  stroke: { color: '#30363d', weight: 1 },
  activeLayout: 'layout-a'
}
```

---

## Deployment (GitHub Pages)

This repo includes a workflow that deploys on push to `main`.

1. Settings → Pages → Source: GitHub Actions
2. Push to `main`
3. Live URL: `https://<your-username>.github.io/Product-Theme-Studio/`

Note: `vite.config.ts` sets `base: '/Product-Theme-Studio/'` for correct asset paths.

---

## Design decisions and UX improvements

- Dark, high-contrast aesthetic with subtle depth and animations
- Accessibility: keyboard focus outlines; swatches are real buttons with aria labels
- Responsive: layout collapses gracefully under narrower widths
- Presets: demonstrate flexibility and speed theme exploration
- Export CSS: integrate theme tokens in other apps

---

## Project structure

```
src/
├── App.tsx
├── types.ts
├── utils.ts
├── components/
│   ├── EditorPanel.tsx
│   ├── ProductCustomizer.tsx
│   └── Gallery.tsx
├── config/
│   └── defaultConfig.ts
└── context/
    └── ConfigContext.tsx
```

---

## License

MIT

---

