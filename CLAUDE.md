# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Architecture

Personal site built with Astro 6 (no JS framework). Single page (`src/pages/index.astro`) with a short intro and a play/work toggle:

- **Play** (default) lists side projects, themed pink.
- **Work** shows the CV (experience + education), themed blue.
- The toggle is an accessible tablist; switching updates the `?mode=work` URL param via `history.replaceState`, so work mode is directly shareable. An inline script applies the blue theme before first paint on `?mode=work` loads.

**Content** lives in `src/data/projects.ts` and `src/data/cv.ts` — edit those to update the lists. No CMS or content collections.

**Theming:** `Layout.astro` sets `data-color` (`pink|blue`) on `<html>`; each theme defines CSS custom properties (`--color-bg`, `--color-text-primary`, `--color-text-secondary`, `--color-border`) in `global.css`. The toggle script swaps `data-color` at runtime.

**Components:** `Layout.astro` (head, skip link, 740px container), `ProjectItem.astro` (name, description, external link), `CVItem.astro` (organisation, role/degree, dates, description).

**Deployment:** Push to `source` branch triggers GitHub Actions build → GitHub Pages deploy automatically.

## Key Constraints

- **Accessibility is non-negotiable:** Skip link, ARIA tab semantics on the toggle, 44×44px minimum touch targets, contrast ≥5.7:1, focus rings visible.
- **CSS units:** Use `rem` consistently — do not mix `rem` and `px` for the same sizing concern.
- **Viewport meta:** Always include `initial-scale=1` alongside `width=device-width`.
- **No framework:** Vanilla JS only for interactivity. Keep it minimal.
