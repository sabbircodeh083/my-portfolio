# Sabbir Sikder — Portfolio

A personal portfolio website for **Mohammad Sabbir Sikder**, a full-stack web developer. Built with Next.js (App Router), React, TypeScript, and Tailwind CSS v4.

All site content is data-driven: edit a single JSON file to change the page.

## Features

- **Single-page layout** with anchor navigation — Hero, About, Skills, Projects, Education, Contact
- **Data-driven content** from [`data/portfolio.json`](data/portfolio.json)
- **Skill icons** via [react-icons](https://react-icons.github.io/react-icons/) with graceful fallbacks
- **Scroll-reveal animations** and floating hero skill icons (CSS-based, no animation library)
- **Automatic dark mode** that follows the operating system theme
- **Fully responsive** and accessible (semantic markup, keyboard focus states, reduced-motion aware)
- **Optimized images** through `next/image`

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (Turbopack plugin) |
| Icons | react-icons |
| Tooling | ESLint, React Compiler |

## Getting started

**Requirements:** Node.js 20.9 or newer.

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project (there is no `typecheck` script) |

There is currently no automated test suite.

## Project structure

```
.
├── data/
│   └── portfolio.json        # All site content (edit this to update the site)
├── public/
│   └── portfolio.png         # Hero portrait (transparent background)
└── src/
    ├── app/
    │   ├── globals.css       # Design tokens, theme palette, animations
    │   ├── layout.tsx        # Root layout + metadata
    │   └── page.tsx          # Composes the page sections
    ├── components/           # Page sections and shared UI
    └── lib/
        ├── portfolio.ts      # Typed access to portfolio.json + helpers
        └── skillIcons.ts     # Skill name → icon mapping
```

## Customizing content

Everything shown on the page comes from [`data/portfolio.json`](data/portfolio.json):

- `personalInfo` — name, titles, headline, location, email, résumé URL
- `about` — summary, interests, currently-learning list
- `skills` — grouped technology lists
- `projects` — name, description, technologies, features, links
- `education` — institutions, degrees, years, GPA/CGPA
- `socialLinks` — GitHub, LinkedIn, DEV, Facebook, Discord
- `contact` — email and message
- `githubProfileWidgets` — GitHub activity cards
- `portfolioPreferences` — feature toggles (e.g. show résumé, live links, GitHub stats)

**Project links:** each project can define a `githubLink` for the "Code" button and a `liveUrl` for the "Live demo" button. If `githubLink` is absent, the component falls back to `repositoryUrl`.

**Hero image:** replace `public/portfolio.png` with your own portrait (a transparent PNG works best).

The **GitHub activity** section is wired up but currently commented out in [`src/app/page.tsx`](src/app/page.tsx). To enable it, restore the `GithubActivity` import and uncomment `<GithubActivity />`.

## Theming

The palette lives in [`src/app/globals.css`](src/app/globals.css) as CSS variables (slate neutrals with blue/violet/cyan accents) and is exposed to Tailwind through `@theme inline`. Light and dark values swap automatically via `prefers-color-scheme`.

Use semantic utility classes in components rather than raw colors:

```tsx
<div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
  <span className="text-accent">Accent</span>
</div>
```

Available tokens: `background`, `foreground`, `card`, `muted`, `muted-foreground`, `border`, `accent`, `accent-foreground`, `accent-soft`, `accent-2`, `accent-3`.

## Deployment

The project deploys to [Vercel](https://vercel.com/new) with no extra configuration:

```bash
npm run build
```

Any Node.js hosting that supports Next.js will also work.

## Notes

- Tailwind v4 is wired through a **Turbopack rule** in `next.config.ts` — there is no `postcss.config`.
- **Cache Components** (`cacheComponents: true`) is enabled, so routes are prerendered by default. Avoid calling `new Date()`, `Math.random()`, or other runtime values during render, as that breaks prerendering.
