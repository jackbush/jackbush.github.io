# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Architecture

Personal portfolio/consulting site built with Astro 6 (no JS framework). All content lives inline in page components — no CMS or Astro content collections.

**Routing:** File-based via `src/pages/`. Each `.astro` file is a route.

**Layout system:** `Layout.astro` wraps every page and accepts a `color` prop (`blue|purple|pink|yellow`). This drives per-page theming via CSS custom properties defined in `global.css`. Each color variant sets `--bg`, `--text`, `--accent`, `--border`, etc.

**Navigation:** `Nav.astro` is a fixed header with a full-page hamburger overlay. It includes keyboard a11y (ESC to close, focus trap, `inert` on main, ARIA). Active page is detected via `pathname.startsWith()`.

**Deployment:** Push to `source` branch triggers GitHub Actions build → GitHub Pages deploy automatically.

## Key Constraints

- **Accessibility is non-negotiable:** Skip link, ARIA labels, 44×44px minimum touch targets, contrast ≥5.7:1, focus rings visible.
- **CSS units:** Use `rem` consistently — do not mix `rem` and `px` for the same sizing concern (previously caused nav height bugs).
- **Viewport meta:** Always include `initial-scale=1` alongside `width=device-width`.
- **No framework:** Vanilla JS only for interactivity. Keep it minimal.
