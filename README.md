# jackbush.github.io

Personal site. A single page with a short intro and a play/work toggle: **play** lists side projects, **work** shows the CV (experience + education).

## Commands

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Structure

- `src/pages/index.astro` — the only page: intro, toggle, both panels
- `src/data/projects.ts` — the play list
- `src/data/cv.ts` — experience and education entries
- `src/components/` — `Layout.astro`, `ProjectItem.astro`, `CVItem.astro`

The toggle updates `?mode=work` in the URL, so work mode is shareable (`/?mode=work`). Play is light, work is dark.

## Deployment

Pushing to the `source` branch triggers a GitHub Actions build and deploy to GitHub Pages.
