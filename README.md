# Homepage

About me, some projects and roles. There's a [live-editable version of the interactions here](https://jackbush.github.io/glimmers/homepage/#settings).

### Fav theme colours

```
[ ] #dce9c0 [pistachio | deep purple]
[ ] #f3decc [paper | slate]
[ ] #f6dcdb [dusty pink | forest green]
[•] #e6dcd6 [putty | dark teal]
```

## How it works

### Commands

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

### Structure

- `src/pages/index.astro` the only page: intro, toggle, both panels, and the switch between them
- `src/data/` content for intro, projects and roles
- `src/data/theme.ts` the page colours, text opacities, and how the switch moves
- `src/scripts/backdrop.ts` the canvas behind the page that draws each switch

The toggle updates `?mode=roles` in the URL, so roles mode is shareable (`/?mode=roles`).

### Deployment

Pushing to the `source` branch triggers a GitHub Actions build and deploy to GitHub Pages.
