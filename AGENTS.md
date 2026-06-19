<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server (port 3000)
- `npm run build` — production build (also runs typecheck via Next.js)
- `npm run lint` — ESLint (no separate typecheck script; `build` catches type errors)
- No test framework is configured

## Architecture

- **Next.js 16** App Router, React 19, Tailwind CSS **v4**, shadcn/ui (base-nova style)
- **Path alias**: `@/*` → project root (not `src/`)
- **Content layer**: MDX files in `content/{blog,projects}/*.mdx`, read at build time by `lib/mdx.ts` with strict frontmatter validation. Missing required fields throw `MalformedContentError`.
  - Blog required: `title`, `description`, `publishedAt`, `tags`
  - Project required: `title`, `emoji`, `description`, `techStack`, `tags`, `publishedAt`
- **Component hierarchy**: atomic design — `atoms/` → `molecules/` → `organisms/` → `templates/`. shadcn primitives live in `components/ui/`.
- **Theme**: dual-axis — color (light/dark via `next-themes`) × style (modern/skeumorphic via custom `ThemeContextProvider` in `lib/theme.tsx`). CSS variables in `app/globals.css` + `app/theme-skeumorphic.css`.
- **Site config**: single source of truth is `lib/site.ts` (`SITE` object) — used by layout metadata, sitemap, robots, JSON-LD.
- **Utility**: `cn()` in `lib/utils.ts` (clsx + tailwind-merge) for class composition.
- **TweaksPanel** (dev-only UI inspector) renders only when `NODE_ENV === 'development'`.

## Conventions

- Server components by default; add `'use client'` only when needed (hooks, browser APIs, event handlers).
- List pages (`app/blog/page.tsx`, `app/projects/page.tsx`) fetch data server-side then pass to a `*Client.tsx` client component for interactive filtering.
- `lib/use-content-filter.ts` is the shared tag-filter hook used by list pages.
- Images: only `https://images.pexels.com/**` is whitelisted in `next.config.ts`.
- No `.env` variables are currently used.
