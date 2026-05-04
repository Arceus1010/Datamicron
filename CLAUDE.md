# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite HMR)
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # TypeScript type-check only (no emit)
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Architecture

This is the **Datamicron** marketing/product website — a React 19 + TypeScript + Vite SPA using Tailwind CSS v4 and Framer Motion.

**Routing** — All routes are nested under a single `<Layout>` wrapper in [src/App.tsx](src/App.tsx). The layout renders `<Navbar>` / `<Outlet>` / `<Footer>`. Routes are declared in the `ROUTES` config array (path + element pairs) and mapped to `<Route>` elements — no lazy loading, all page components are eagerly imported.

**Navigation config** — [src/components/layout/navConfig.ts](src/components/layout/navConfig.ts) is the single source of truth for nav structure. Adding a new page requires: (1) importing the component and adding an entry to the `ROUTES` array in `App.tsx`, (2) creating the page file, and (3) adding the nav entry in `navConfig.ts`.

**Mega menu** — `Navbar` drives the mega menu via hover state. `MegaMenu` receives `panel` (title + description) and `sections` (array of link groups) as props. New top-level nav items with `sections` automatically get a mega menu.

**Page structure** — Pages live under `src/pages/` organised by nav category:
- `phoenix-aip/` — AI platform product pages
- `platforms/` — individual platform pages (InstaBI, EagleEye, Foresight, etc.)
- `solutions/industries/`, `solutions/department/`, `solutions/domain/` — solution pages
- `about/` — company, contact, services

**Styling** — Tailwind CSS v4 with custom theme tokens defined in [src/index.css](src/index.css) via `@theme`:
- `brand` = `#117EC2`, `brand-dark` = `#0D65A0`, `brand-light` = `#EAF4FB`
- `brand-navy` = `#0B1E2D` (dark sections)
- `font-sans` = Source Sans 3, `font-display` = Manrope (headings)

**Path alias** — `@/` maps to `src/` (configured in `tsconfig.app.json` and Vite).

**Animations** — Framer Motion is used throughout. Shared animation primitives (`EASE`, `fadeUp`, `stagger`, `slidingLineVariants`) live in [src/lib/motion.ts](src/lib/motion.ts) — import from there rather than redefining locally. Common pattern: define page-specific `variants` objects at the top of a file and apply via `motion.*` components with `initial`/`animate`/`exit` props.
