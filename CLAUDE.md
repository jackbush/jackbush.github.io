# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Architecture

Personal site built with Astro 6 (no JS framework). Single page (`src/pages/index.astro`) with a short intro and a projects/work toggle:

- **Projects** (default) lists side projects, light theme (warm-tinted).
- **Work** shows the CV experience, dark theme (cool-tinted).
- The toggle is an accessible tablist; switching updates the `?mode=` URL param (`projects`|`work`) via `history.replaceState`, so either mode is directly shareable. It also swaps the page `<title>` (`Jack Bush | Projects` / `| Work`) and the favicon (white circle / black circle). An inline script applies the correct theme before first paint on `?mode=work` loads.
- The toggle's two blocks are fixed (Projects always dark, Work always light); the surrounding page context optically switches which reads as active, so there is no separate selected-state style.

**Content** lives in `src/data/projects.ts` and `src/data/cv.ts` — edit those to update the lists. `CVEntry` supports an optional `listItems: string[]` rendered as a bullet list. No CMS or content collections.

**Theming:** `Layout.astro` sets `data-theme` (`projects|work`) on `<html>`; the raw surfaces (`--paper*`, `--ink*`) and the semantic `--color-*` vars are defined in `global.css`, with a `--transition-duration` (300ms) fade between themes. The toggle script swaps `data-theme` at runtime.

**Type styles:** the complete type set lives as one commented block in `global.css` (`h1`/`h2`/`h3`/`.text-body`/`.text-strong`) — edit a style there and it changes everywhere; components carry layout margins only.

**Components:** `Layout.astro` (head, skip link, 740px container), `ProjectItem.astro` (name, description, external link), `CVItem.astro` (organisation, role, dates, description, optional bullet list).

**Deployment:** Push to `source` branch triggers GitHub Actions build → GitHub Pages deploy automatically.

## Key Constraints

- **Accessibility is non-negotiable:** Skip link, ARIA tab semantics on the toggle, 44×44px minimum touch targets, contrast ≥5.7:1, focus rings visible.
- **CSS units:** Use `rem` consistently — do not mix `rem` and `px` for the same sizing concern.
- **Viewport meta:** Always include `initial-scale=1` alongside `width=device-width`.
- **No framework:** Vanilla JS only for interactivity. Keep it minimal.
