# jackbush.github.io
A single page with a short intro and a projects/roles toggle.

## Commands

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Structure

- `src/pages/index.astro` — the only page: intro, toggle, both panels
- `src/data/projects.ts` — the projects
- `src/data/roles.ts` — past roles
- `src/components/` — `Layout.astro`, `ProjectItem.astro`, `RoleItem.astro`

The toggle updates `?mode=roles` in the URL, so roles mode is shareable (`/?mode=roles`).

## Deployment

Pushing to the `source` branch triggers a GitHub Actions build and deploy to GitHub Pages.
