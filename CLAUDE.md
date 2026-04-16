# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (production mode)
npm run build      # Production build
npm run build:staging  # Staging build
npm run fmt        # Format with Prettier (*.js, style.css, index.html)
```

No test suite exists. Prettier is the only code quality tool.

## Architecture

This is a static IoT learning portal — a single-page app built with vanilla JS and Vite. No framework.

**Module responsibilities:**
- `main.js` — entry point, calls `initApp()`
- `app.js` — application lifecycle: reads localStorage, wires event listeners, orchestrates everything
- `data.js` — registry of external learning platform links (OJ, code runners, books, etc.)
- `render.js` — generates HTML for site cards and pins from `data.js` entries
- `i18n.js` — translation system with a `t()` function; supports 11 language variants (Chinese variants, EN, JA, KO, plus joke languages: wenyan, mars, garbled, binary, meow, emoji)
- `theme.js` — manages 4 design themes (Fluent, Material You, Terminal, Cyberpunk) and dark/light toggle

**Data flow:** `app.js` → reads prefs from `localStorage` → calls `render.js` to build the card grid from `data.js` → applies theme via `theme.js` → uses `i18n.js` for all UI strings.

**State persistence:** language, design theme, and dark/light preference are all stored in `localStorage`.

**Site URLs** are injected at build time via `import.meta.env.VITE_*` environment variables.

**Themes:** Terminal and Cyberpunk force dark mode; the light/dark toggle is disabled for those themes.
