# Project Playbook: How Clinical Reviewed Was Built

A repeatable process for building a small marketing site and deploying it to a shared host, reconstructed from this repo's git history (2026-11-19 to 2026-11-21). Reuse it as a template for future projects.

> **Caveat:** this was written from commit history and the final repo state, not the original chat transcripts. The phases and decisions are accurate to the code. The prompts under "Prompt pattern" are suggested wording, not verbatim quotes. Add the real ones if you want.

## Outcome

A single-page static React site (no backend) for a dental content service. It is built with Vite, deployed by GitHub Actions over FTP to a Hostinger subfolder, and it has an in-repo style guide.

**Timeline:** 11 commits over 3 days.

| Day | Work |
| --- | ---- |
| Nov 19 | Scaffold, README, smooth-scroll nav |
| Nov 20 | Layout refactor, content passes, Welcome/Footer/Contact, CI deploy (+ 3 CI fixes) |
| Nov 21 | README rewrite with structure and deployment docs |

## Phase 1: Scaffold and stack

1. Create the project with Vite's React + TypeScript template. Run `npm create vite@latest`, then choose React and TypeScript.
2. Add Tailwind CSS 4 using the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`. Tokens go in CSS (see Phase 2).
3. Add Font Awesome (free solid) for icons. Add Fontsource for self-hosted fonts (Nunito and Nunito Sans). Self-hosting avoids a third-party font request.
4. Use Oxlint instead of ESLint for fast linting. Config is in `.oxlintrc.json`, with the React hooks rules set to errors.
5. Split the TypeScript config into `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config).
6. Make `npm run build` run `tsc -b && vite build`, so a type error fails CI.
7. In `vite.config.ts`, set `server.host: true` and `allowedHosts: ['.ts.net']` to test on a phone or tablet over Tailscale.
8. Make the base path configurable from day one: `base: process.env.VITE_BASE ?? '/'`. This is what lets the site live in a subfolder later.

Commit: `first commit`, then `Update README.md to reflect project details and tech stack`.

**Prompt pattern:** "Set up a Vite + React + TypeScript project with Tailwind 4, Font Awesome and Oxlint. Write the README with the tech stack."

## Phase 2: Design tokens before UI

Define the design system first, in `src/theme.css` under Tailwind's `@theme`:

- Colors: `brand-primary`, `ink-navy`, `accent-sun`, `surface-tint`
- Type scale: `hero-h1`, `section-h2`, `body-base`
- Spacing: `md`, `lg`, `section-md`
- Radius: `card`, `pill`

Tailwind turns these into utilities automatically (`bg-brand-primary`, `rounded-card`). Keep global styles and shared classes (such as `heading-section`) in `src/index.css`.

**Rule that paid off:** use tokens, never hard-coded values. It kept later content passes from touching styling.

**Prompt pattern:** "Define the brand tokens (colors, type scale, spacing, radius) in `@theme`. Here are the brand colors and fonts: …"

## Phase 3: Folder structure and data-driven content

Separate three concerns:

| Folder | Holds | Rule |
| ------ | ----- | ---- |
| `src/layout/` | Page sections (topbar, navbar, hero, about, services, testimonials, plans, contact, welcome, footer) | Rendered top to bottom in `App.tsx` |
| `src/components/` | Reusable UI (Button, Badge, Accordion, cards, Table) | Data-driven when it renders lists |
| `src/data/` | Typed content arrays | Edit copy here, not in JSX |

Content changes (services, testimonials, plans, contact, footer) then become array edits. This is why the Nov 20 content-update commits were small and safe.

Section anchors (`#about`, `#services`, `#plans`, `#contact`) must match the `id` values in `src/data/nav.tsx`.

## Phase 4: Build the page top to bottom

Build and review one section at a time, in page order. The commits show the pattern:

1. Hero, About, Services, Testimonials, Plans first.
2. Navigation and smooth scrolling: `scroll-behavior: smooth` in CSS, disabled under `prefers-reduced-motion`.
3. A refactor pass: replace `header`/`nav` with a single `navbar`, and rename section IDs to match the nav.
4. Content and copy pass: update services, testimonials, plan feature lists.
5. Finishing sections last: Welcome, Footer and a Contact layout built on `ContactCard` (tones `tint`, `dark`, `white`).

**Habits worth keeping:**
- Refactor structure early, before the content is final.
- Do copy changes as separate commits from layout changes.
- Add each new component to the style guide in the same commit (see Phase 5).

## Phase 5: In-repo style guide

Build a `/styleguide` page that shows every reusable component and its variants: `src/styleguide/styleguide.tsx` and `specimen.tsx`.

- No router library. `App.tsx` checks `window.location` and renders the style guide for `<BASE_URL>styleguide` or `#/styleguide`. Everything else renders the landing page.
- It acts as visual regression checking and living documentation.
- It gives you a reference to hand to an AI assistant ("use the components in the style guide").

## Phase 6: Deploy (GitHub Actions to Hostinger over FTP)

1. Create a GitHub **environment** named `hostinger` and store four secrets there: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.
2. Add `.github/workflows/deploy.yml`, triggered on push to `main` and on manual dispatch:
   - `actions/checkout`, then `actions/setup-node` (Node 22, npm cache)
   - `npm ci`
   - `npm run build` with `VITE_BASE=/clinicalreviewed/`
   - `SamKirkland/FTP-Deploy-Action` uploads `dist/` to `server-dir`
3. Use a `concurrency` group so a new push cancels an in-flight deploy.
4. Scope the FTP account and `server-dir` to the subfolder only, so a deploy cannot touch other sites on the host.

### Problems hit, and the fixes

| Commit | Symptom | Fix |
| ------ | ------- | --- |
| `da6cb1e` | `npm ci` failed on CI (lockfile mismatch for native deps) | Pin `@emnapi/core` and `@emnapi/runtime` as devDependencies. Do not remove them. |
| `319bc2b` | Workflow could not read secrets | Add `environment: hostinger` to the job. Environment secrets are only available to jobs that name the environment. |
| `5e79b68` | Assets and routes broke under the subfolder | Set `VITE_BASE=/clinicalreviewed/` in CI. Use `import.meta.env.BASE_URL` for paths in code. |

**Lesson:** test the production base path locally before the first deploy. Run `VITE_BASE=/yourapp/ npm run build && npm run preview`. All three fixes above would have shown up before pushing.

## Phase 7: Document

Finish with a README that covers: what the site is, tech stack, getting started (Node version), scripts table, project structure, section and component tables, how to edit content, design system notes, routing, configuration (`VITE_BASE`), and deployment (including the secrets list and the emnapi warning).

## Reusable checklist for the next project

- [ ] Scaffold Vite + React + TS; add Tailwind 4, icons, self-hosted fonts, Oxlint
- [ ] Make the base path env-driven (`VITE_BASE`) from the start
- [ ] Define tokens in `@theme` before writing UI
- [ ] Create `layout/`, `components/`, `data/` folders; keep copy in `data/`
- [ ] Build sections in page order; one concern per commit
- [ ] Add components to the style guide as you build them
- [ ] Make the build run `tsc -b` so type errors fail CI
- [ ] Create the GitHub environment and FTP secrets before writing the workflow
- [ ] Verify a subfolder build locally (`VITE_BASE=… npm run build && npm run preview`)
- [ ] Run `npm ci` locally from a clean `node_modules` to catch lockfile issues before CI does
- [ ] Write the README last, from the real structure

## Working with an AI assistant: what worked

- **Give a stack and constraints up front** (no backend, token-driven styling, Node 22). It avoided library sprawl, for example no router package.
- **Small, scoped requests per commit.** Layout, content and CI changes were separate, so each was easy to review and revert.
- **Let CI failures drive fixes.** Paste the failing log and ask for the minimal fix, as with the three CI commits.
- **Ask for documentation at milestones.** The README was updated twice, once after scaffolding and once after deployment.
- **Use `.agents/runs` and the style guide as shared context** so later sessions start from the real state of the project.
