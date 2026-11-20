# Clinical Reviewed

Marketing site for Clinical Reviewed, a service that provides clinically reviewed content for dental practices: blogs, social posts, patient emails, service pages, FAQs, video scripts, review responses and local SEO content, each verified by a board-certified dentist.

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) for dev server and builds
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Font Awesome](https://fontawesome.com) (free solid icons) and Nunito / Nunito Sans via Fontsource
- [Oxlint](https://oxc.rs) for linting

## Getting started

```bash
npm install
npm run dev
```

The dev server listens on all network interfaces and allows `*.ts.net` hosts, so you can open it from another device over Tailscale.

## Scripts

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR                  |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/`          |
| `npm run preview` | Serve the production build locally                  |
| `npm run lint`    | Run Oxlint                                          |

## Project structure

```
src/
  App.tsx          Page composition and tiny router
  layout/          Page sections (topbar, nav, header, hero, about, services,
                   testimonials, plans, contact)
  components/      Reusable UI (button, badge, accordion, table, cards)
  data/            Content for services, plans, testimonials and poster cards
  styleguide/      Component reference page
  assets/          SVG illustrations and icons
  theme.css        Design tokens
  index.css        Global styles
public/            Favicons, web app manifest and icons
```

## Editing content

Page copy for the services grid, plans, testimonials and poster cards lives in `src/data/`. Edit, add, remove or reorder entries in those arrays and the sections render whatever is there. Section layout lives in `src/layout/`.

## Style guide

Visit `/styleguide` (or `/#/styleguide`) in the running app to see a reference of the reusable components.

## Deployment

`npm run build` outputs a static site to `dist/`. Deploy that folder to any static host (Hostinger, Vercel, etc.). `dist/` is git-ignored and regenerated on every build.
