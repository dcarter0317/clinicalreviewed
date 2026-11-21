# Clinical Reviewed

Marketing site for Clinical Reviewed, a service that provides clinically reviewed content for dental practices: blogs, social posts, patient emails, service pages, FAQs, video scripts, review responses and local SEO content, each verified by a board-certified dentist.

It is a single-page static site (no backend). Content lives in typed data files, sections live in `src/layout/`, and reusable UI lives in `src/components/`.

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) for dev server and builds
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`, with design tokens defined in `@theme`
- [Font Awesome](https://fontawesome.com) (free solid icons) and Nunito / Nunito Sans via Fontsource
- [Oxlint](https://oxc.rs) for linting
- GitHub Actions for deployment to Hostinger

## Getting started

Requires Node 22 (the version used in CI).

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
.github/workflows/deploy.yml   CI: build and FTP deploy to Hostinger
public/                        Favicons, web app manifest and icons
src/
  main.tsx        Entry point: loads fonts and global CSS, mounts <App />
  App.tsx         Page composition and tiny router
  index.css       Tailwind import, global styles, shared utility classes
  theme.css       Design tokens (@theme): colors, type scale, spacing, radius
  layout/         Page sections, rendered top to bottom in App.tsx
  components/     Reusable UI, data-driven where it renders lists
  data/           Content arrays that feed the sections
  styleguide/     Component reference page
  assets/         SVG illustrations and icons
```

### Page sections (`src/layout/`)

Rendered in this order by [App.tsx](src/App.tsx):

| Section      | File                                | Anchor          |
| ------------ | ----------------------------------- | --------------- |
| Top bar      | [topbar.tsx](src/layout/topbar.tsx)           |                 |
| Navigation   | [navbar.tsx](src/layout/navbar.tsx)           |                 |
| Hero         | [hero.tsx](src/layout/hero.tsx)               |                 |
| About        | [about.tsx](src/layout/about.tsx)             | `#about`        |
| Services     | [services.tsx](src/layout/services.tsx)       | `#services`     |
| Testimonials | [testimonials.tsx](src/layout/testimonials.tsx) | `#testimonials` |
| Plans        | [plans.tsx](src/layout/plans.tsx)             | `#plans`        |
| Contact      | [contact.tsx](src/layout/contact.tsx)         | `#contact`      |
| Welcome      | [welcome.tsx](src/layout/welcome.tsx)         |                 |
| Footer       | [footer.tsx](src/layout/footer.tsx)           |                 |

### Components (`src/components/`)

| Component | File | Notes |
| --------- | ---- | ----- |
| Button | [button.tsx](src/components/button.tsx) | Variants `primary`, `sun`, `outline` (also `PrimaryButton`, `SunButton`, `OutlineButton`). Renders `<a>` with `href`, otherwise `<button>`. Never pair two filled buttons. |
| Badge | [badge.tsx](src/components/badge.tsx) | `Tag`, `Kicker`, `StatusPill`, `CheckBadge` |
| Accordion | [accordion.tsx](src/components/accordion.tsx) | Expandable items |
| Nav | [nav.tsx](src/components/nav.tsx) | `NavList`, fed by `navItems` |
| ServiceCard | [service-card.tsx](src/components/service-card.tsx) | Four icon tints; `ServiceCardGrid` |
| PlanCard | [plan-card.tsx](src/components/plan-card.tsx) | Pricing plans; `PlanCardGrid` |
| TestimonialCard | [testimonial-card.tsx](src/components/testimonial-card.tsx) | Quote, name, role, star rating; `TestimonialCardGrid` |
| PosterCard | [poster-card.tsx](src/components/poster-card.tsx) | Reviewer / key-point poster blocks |
| ContactCard | [contact-card.tsx](src/components/contact-card.tsx) | Tones `tint`, `dark`, `white`; `ContactCardGroup` |
| Table | [table.tsx](src/components/table.tsx) | Generic sortable table, built on [table-parts.tsx](src/components/table-parts.tsx) and [table-styles.ts](src/components/table-styles.ts) |

## Editing content

Page copy lives in `src/data/`. Edit, add, remove or reorder entries in those arrays and the sections render whatever is there.

| File | Drives |
| ---- | ------ |
| [nav.tsx](src/data/nav.tsx) | Navigation links (`id` must match a section id) |
| [services.tsx](src/data/services.tsx) | Services grid |
| [testimonials.tsx](src/data/testimonials.tsx) | Testimonials |
| [plans.tsx](src/data/plans.tsx) | Pricing plans |
| [poster.tsx](src/data/poster.tsx) | Poster cards |
| [contact.tsx](src/data/contact.tsx) | Contact cards (address, phone, email, response hours) |
| [footer.tsx](src/data/footer.tsx) | Footer brand blurb and link groups |

Section layout and headline copy live in `src/layout/`.

## Design system

- **Tokens** are in [theme.css](src/theme.css) under Tailwind's `@theme`, so they become utilities automatically: colors (`bg-brand-primary`, `text-ink-navy`, `bg-accent-sun`, `bg-surface-tint`, ...), type scale (`text-hero-h1`, `text-section-h2`, `text-body-base`, ...), spacing (`p-md`, `gap-lg`, `py-section-md`, ...) and radius (`rounded-card`, `rounded-pill`, ...).
- **Fonts**: Nunito (headings) and Nunito Sans (body), self-hosted through Fontsource.
- **Global styles** are in [index.css](src/index.css): smooth anchor scrolling (disabled for reduced-motion users), base typography, and shared classes such as `heading-section`. Dark mode is currently disabled.
- Prefer tokens over hard-coded values when adding UI.

## Style guide

Visit `/styleguide` (or `/#/styleguide`) in the running app to see a reference of the reusable components. In production this is `/clinicalreviewed/styleguide`. The page is built from [styleguide.tsx](src/styleguide/styleguide.tsx) and [specimen.tsx](src/styleguide/specimen.tsx).

## Routing

There is no router library. [App.tsx](src/App.tsx) checks `window.location` and renders the style guide for `<BASE_URL>styleguide` or `#/styleguide`; everything else renders the landing page. Navigation between sections uses in-page anchors.

## Configuration

| Item | Where | Notes |
| ---- | ----- | ----- |
| `VITE_BASE` | env var read in [vite.config.ts](vite.config.ts) | Public base path. Defaults to `/`; CI sets `/clinicalreviewed/` because the site is served from a subfolder. Use `import.meta.env.BASE_URL` for asset or route paths in code. |
| Lint rules | [.oxlintrc.json](.oxlintrc.json) | React, TypeScript and oxc plugins; hooks rules are errors |
| TypeScript | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | App code and Vite config are checked separately |

## Deployment

Pushing to `main` (or running the workflow manually) triggers [deploy.yml](.github/workflows/deploy.yml), which:

1. Installs dependencies with `npm ci` on Node 22.
2. Runs `npm run build` with `VITE_BASE=/clinicalreviewed/`.
3. Uploads `dist/` over FTP to Hostinger using [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action). It creates the target subfolder if needed and only touches that folder.

Secrets are stored in the GitHub `hostinger` environment: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` and `FTP_SERVER_DIR`.

To deploy manually or elsewhere, run `npm run build` and upload `dist/` to any static host. Set `VITE_BASE` to match the path the site is served from. `dist/` is git-ignored and regenerated on every build.

The package pins `@emnapi/core` and `@emnapi/runtime` as dev dependencies so `npm ci` works on CI; do not remove them.
