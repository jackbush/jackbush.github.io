# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Architecture

This is a personal/portfolio site for Jack Bush (fractional CPO) built with **Astro 6** and deployed to GitHub Pages at `jackbush.github.io`.

**Pages** (`src/pages/`) are file-based routes — each `.astro` file is a page. Current pages: `index`, `about`, `work`, `process`, `projects`, `contact`.

**Content data** lives in `src/content/` as plain JS exports (e.g. `projects.js` exports a `projects` array). Pages import this data directly — there is no CMS or Astro content collections in use.

**`content.md`** (repo root) is a copywriting draft for all pages — the source of truth for page copy before it's built into the `.astro` files. When updating page text, check this file for the intended wording.

**`old-guts/`** contains the previous Gatsby site — kept for reference, not used.

Pages currently don't share a layout component; each `.astro` file includes its own full HTML shell. There are no components yet.
