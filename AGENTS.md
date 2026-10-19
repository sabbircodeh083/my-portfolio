<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Personal portfolio site: Next.js 16.4.2 (App Router), React 19, TypeScript, Tailwind v4. App lives in `src/app/`; site content comes from `data/portfolio.json` (read via `src/lib/portfolio.ts`) rather than being hardcoded in components — edit the JSON to change content. Page sections are in `src/components/`; tech-logo mapping is `src/lib/skillIcons.ts`. Path alias `@/*` → `./src/*`, and generated route types like `LayoutProps<"/">` are globally available (no import needed).

The hero portrait is `public/portfolio.png` (transparent background). Scroll animations live in `src/components/Reveal.tsx` + `globals.css` and respect `prefers-reduced-motion`. Theme colors are CSS variables in `globals.css` (slate + blue) with automatic dark mode — use semantic classes (`bg-card`, `text-muted-foreground`, `bg-accent`), not raw color utilities.

Don't call `new Date()` / `Math.random()` while rendering — with `cacheComponents` enabled that breaks prerendering. Keep components static.

Use `npm` — the repo has a `package-lock.json`.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script)
- No test suite exists; don't invent test commands.

## Gotchas

- **Tailwind v4 is wired through a Turbopack rule** in `next.config.ts` (`@tailwindcss/turbopack` loader for `*.css`), and `globals.css` uses `@import "tailwindcss"` + `@theme`. There is no `postcss.config` — don't add one.
- **`cacheComponents: true`** is enabled: routes are not cached by default. Read the bundled caching docs before using `use cache`, `revalidate`, or dynamic APIs.
- **React Compiler is enabled** (`reactCompiler: true`). Follow React Compiler rules (don't mutate props/state, keep hooks unconditional); do not add `useMemo`/`useCallback`/`memo` for performance.
- Other experimental flags are on (`partialPrefetching`, `agentFeedback`) — prefetching behavior is non-standard, so consult the bundled docs before touching navigation or caching.
