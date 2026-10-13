# Harsh Chaudhari — AI Engineer for Businesses

Personal brand site, rebuilt from the Emergent version (backup in `../Website_backup`). Same design and animations; React + Vite + Tailwind CSS, with framer-motion and Lenis for the scroll effects.

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Netlify, free)

`netlify.toml` already sets the build command (`npm run build`) and output folder (`dist`).
The contact form uses Netlify Forms: after the first deploy, open Netlify → Forms → enable form detection and add an email notification to dcharshchaudhari@gmail.com, then redeploy.

## Updating projects

All project cards live in `src/components/Projects.jsx` (`PROJECTS`). Cards marked `temporary: true` show the current version:

- **CuraDiet:** add the Render URL to `link` to show the "View the live app" button.
- **TripMind AI:** when the upgrade ships, move the `note` into `arch`, remove `status`, and add a link if it goes public.
- **Wandr:** replace `img` (`public/images/wandr.jpg`) and update the write-up after the redesign.

Cards without `img` use a terminal-style cover (`cover` lines). Add a real screenshot to `public/images/` and set `img` to replace it.
