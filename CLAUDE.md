# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start development server (localhost:8000)
npm run build      # Production build (outputs to /public)
npm run serve      # Serve the built site locally
npm run deploy     # Build and deploy to GitHub Pages (main branch)
npm run format     # Format code with Prettier
npm run clean      # Clear Gatsby cache (useful if dev server acts up)
```

## Architecture

This is a Gatsby 5 static site / personal portfolio deployed to GitHub Pages. Source code lives on the `source` branch; `npm run deploy` builds and pushes the output to `main`.

**Routing**: File-based via `src/pages/` — each file becomes a route automatically.

**Styling**: All styles are inline CSS objects (no stylesheets). Components import from `src/tokens/` to get design values:
- `src/tokens/index.js` — color palette and semantic color mappings (dark theme: `HI_TEC_DARK`)
- `src/tokens/typography.js` — text style objects
- `src/tokens/space.js` — spacing array (multiples of 4)

**Layout**: `src/components/layout.js` wraps all pages with the top-right nav and a fixed full-screen container. Pages pass a `sketch` prop to render a p5.js canvas behind the content.

**Sketches**: `src/sketches/` contains p5.js creative backgrounds. `blob.js` is the active homepage background. Sketches are instantiated in pages by passing the sketch function as a prop to `<Layout>`.

**Content data**: `src/content/projects.js` is a static JS array — add new projects here.

**GraphQL**: Used only for querying `siteMetadata` from `gatsby-config.js` (title, menu links). No external data sources.
