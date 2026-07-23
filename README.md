# jackbush.github.io

Personal site. A single page with a short intro and a projects/work toggle:
- **Projects** lists side projects, it's light and warm.
- **Work** shows the CV, it's dark and cool.

## Commands

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Structure

- `src/pages/index.astro` — the only page: intro, toggle, both panels
- `src/data/projects.ts` — the projects
- `src/data/cv.ts` — experience entries
- `src/components/` — `Layout.astro`, `ProjectItem.astro`, `CVItem.astro`

The toggle updates `?mode=work` in the URL, so work mode is shareable (`/?mode=work`).

## Deployment

Pushing to the `source` branch triggers a GitHub Actions build and deploy to GitHub Pages.
