# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Architecture

Personal site built with Astro 6 (no JS framework). Single page (`src/pages/index.astro`) with a short intro and a projects/roles toggle:

- **Projects** (default) lists side projects, light theme (warm-tinted).
- **Roles** shows past roles, dark theme (cool-tinted).
- The toggle is an accessible tablist; switching updates the `?mode=` URL param (`projects`|`roles`) via `history.replaceState`, so either mode is directly shareable. It also swaps the page `<title>` (`Jack Bush | Projects` / `| Roles`) and the favicon (white circle / black circle). An inline script applies the correct theme before first paint on `?mode=roles` loads.
- The active tab is filled with the page's text colour, its label in the page colour; the inactive tab is the page with a text-colour label; the frame is the text colour. Nothing uses the other page's colours. Styles key off `data-theme`, so the pre-paint script gets it right.
- **The switch:** clicking a tab (or the arrow keys, from the tab's centre) spreads the new page colour out from the click on a canvas, with a wobbling outline; the intro stays and changes colour as it passes, the old list fades, and the new list appears inside the spreading shape. The browser's own bars take one flat colour (`theme-color`, and Safari's tint from `html`'s background), so they follow the page along the top edge (`topEdge` in `backdrop.ts`), changing once a switch covers it; `viewport-fit=cover` lets the canvas itself reach under Safari's bars where it allows. With `prefers-reduced-motion`, or without WebGL2, the switch is instant/plain CSS.

**Content** lives in `src/data/projects.ts` and `src/data/roles.ts` — edit those to update the lists. `Role` supports an optional `listItems: string[]` rendered as a bullet list. No CMS or content collections.

**Theme and switch settings** all live in `src/data/theme.ts`: the two page colours, text opacities, and the switch's motion and outline (tuned live in the `homepage` sketch in the glimmers repo, whose pane uses the same names). Text colours are never picked: each page's text is its inverse, at full strength for headings and strong text and at lower opacities for body text and rules. `theme.ts` fails the build if main or minor text drops below 5.7:1.

**Theming:** `Layout.astro` sets `data-theme` (`projects|roles`) on `<html>` and writes the colours from `theme.ts` as CSS vars (`--projects-bg`, `--projects-main|minor|rule`, the same for roles, and the backdrop's `--ink-*` greys); `global.css` maps them to the semantic `--color-*` vars, with a `--transition-duration` (300ms) fade between themes for the plain-CSS fallback. The page colour is on `html`, not `body`, so the canvas can sit between them.

**Backdrop** (`src/scripts/backdrop.ts`, wired up in `index.astro`'s script, styles at the end of `global.css`): a WebGL2 canvas behind the page draws the page colour and each switch, only when something changes. Once it has drawn, `html.backdrop-on` is set and the page is drawn four times in one grid cell (`.page`): the real `<main>`, with its text transparent but still there for focus, selection, links and screen readers, and three `aria-hidden`, `inert` copies (`.ink`) that only draw, in blend layers (multiply, difference, plus-lighter) whose greys turn whatever page colour is under each glyph into that page's text colour. That's why text flips pixel by pixel as a switch passes. The page itself is never a stacking context between the copies and the canvas, or the blends stop reaching it. The new list's reveal is an SVG polygon clip set each frame from the switch's outline (`radiusAt`), so it matches the canvas edge; link hover is mirrored onto the copies.

**Type styles:** the complete type set lives as one commented block in `global.css` (`h1`/`h2`/`h3`/`.text-body`/`.text-strong`) — edit a style there and it changes everywhere; components carry layout margins only.

**Components:** `Layout.astro` (head, the backdrop canvas, skip link, 740px container), `ProjectItem.astro` (name, description, external link), `RoleItem.astro` (organisation, role, dates, description, optional bullet list).

**Deployment:** Push to `source` branch triggers GitHub Actions build → GitHub Pages deploy automatically.

## Key Constraints

- **Accessibility is non-negotiable:** Skip link, ARIA tab semantics on the toggle, 44×44px minimum touch targets, contrast ≥5.7:1, focus rings visible.
- **CSS units:** Use `rem` consistently — do not mix `rem` and `px` for the same sizing concern.
- **Viewport meta:** Always include `initial-scale=1` alongside `width=device-width`.
- **No framework:** Vanilla JS only for interactivity. Keep it minimal.
