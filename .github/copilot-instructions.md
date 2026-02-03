# AI Coding Agent Instructions for MyPortfolio

## Project Overview
Next.js 16 portfolio site with **internationalization (i18n)**, custom Lunar/Solar theme system, and video downloader utility. Uses App Router with TypeScript and Tailwind CSS.

## Architecture & Key Patterns

### Internationalization (i18n) Structure
- **Route-based i18n**: All pages live under `src/app/[lang]/` where `lang` is "en" or "vi"
- **Middleware pattern**: `src/proxy.ts` handles locale detection via `@formatjs/intl-localematcher` and `negotiator`
  - Matcher config: `/((?!_next|api|favicon.ico|.*\..*).*)`excludes internal paths, API routes, and static files
  - Default locale rewrites URL, non-default redirects to localized path
- **Dictionary system**: Use `getDictionary(lang)` from `src/get-dictionary.ts` to load translations from `src/dictionaries/{en,vi}.json`
- **Server-only imports**: Dictionary loading uses `"server-only"` package to prevent client-side bundling
- **Language switching**: Navigation preserves current path when switching languages via `/${otherLang}${pathname.substring(3)}`

Example: Adding a new page requires creating `src/app/[lang]/new-page/page.tsx` and updating dictionary files with translations.

### Custom Theme System ("Lunar Theme")
- **CSS variables in `src/app/globals.css`**: All colors use `var(--color-lunar-*)` tokens, NOT direct Tailwind classes
- **Available color tokens**: `--color-lunar-bg`, `--color-lunar-card`, `--color-lunar-primary`, `--color-lunar-secondary`, `--color-lunar-gold`, `--color-lunar-text`, `--color-lunar-muted`, `--color-lunar-glow`
- **Light/dark modes**: `:root` (light/solar) and `.dark` (lunar) defined in globals.css
- **Theme provider**: `next-themes` manages theme state in `src/components/Providers.tsx` (attribute="class", defaultTheme="dark")
- **Usage**: Always use CSS variables like `bg-[var(--color-lunar-card)]`, never hardcode colors

### Component Patterns
- **Client components**: Use `"use client"` directive for interactivity (Navigation, ThemeToggle, FeaturedSection, ClickyGame, VideoDownloader)
  - Example: `Navigation` receives `lang` and `dict` as props from server layout
  - State management: Use React hooks (useState, useRef) for interactive features
- **Server components**: Pages and layouts are async server components that await dictionaries and params
  - Example: `export default async function Home({ params }: { params: Promise<{ lang: "en" | "vi" }> })`
- **Params handling**: Next.js 16 requires `await params` in pages/layouts - params is a Promise
  - Pattern: `const { lang } = await params;` at start of component
- **Dictionary passing**: RootLayout fetches dictionary and passes to client components as props
  - Server fetches: `const dict = await getDictionary(lang as "en" | "vi");`
  - Client receives: `function Navigation({ lang, dict }: NavigationProps)`

### API Routes & Video Downloader
- **Local-only feature**: Video converter (`src/app/api/video-info/route.ts`) uses `youtube-dl-exec` with hardcoded local binary path `C:\\Users\\kurot\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe`
- **Supported platforms**: YouTube, TikTok, Instagram, Facebook, Vimeo, Twitter/X (validated via URL regex)
- **Production check**: Routes detect Vercel via `process.env.VERCEL === '1'` and return 501 error explaining feature is local-only
- **Deployment alternatives**: For video feature, use Docker/VPS platforms (Railway, Render, DigitalOcean) instead of serverless
- **Timeout config**: Uses `export const maxDuration = 60;` and `export const dynamic = 'force-dynamic';`
- **Format filtering**: Only returns progressive MP4 formats (no DASH/HLS) with both video and audio codecs
- **Error handling**: Specific error messages for unsupported URLs, unavailable videos, and private videos

## Project Structure
```
src/
├── app/
│   ├── [lang]/          # Localized routes (en, vi)
│   │   ├── layout.tsx   # Root layout with i18n
│   │   ├── page.tsx     # Home page
│   │   └── */page.tsx   # Feature pages
│   ├── api/             # API routes (video-info, download, proxy-download)
│   └── globals.css      # Lunar theme CSS variables
├── components/          # React components (client & server)
├── dictionaries/        # i18n JSON files (en.json, vi.json)
├── get-dictionary.ts    # Dictionary loader with server-only
└── proxy.ts             # Middleware for locale detection
```

## Development Workflow

### Commands (uses pnpm)
```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding New Features
1. **New page with i18n**: Create in `src/app/[lang]/feature-name/page.tsx`, update dictionaries, add nav link
2. **New translations**: Add keys to both `src/dictionaries/en.json` and `vi.json`
3. **New component**: Determine if client (`"use client"`) or server component based on interactivity
4. **Styling**: Use Lunar theme CSS variables, not hardcoded colors

### Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Example: `import { FeaturedSection } from "@/components/FeaturedSection"`

## Critical Conventions
- **Never hardcode colors**: Always use `var(--color-lunar-*)` variables
- **i18n everywhere**: All user-facing strings must come from dictionary files
- **Params are async**: Always `await params` in Next.js 16 pages/layouts
- **Client components receive dict**: Server components fetch dictionaries, pass to client as props
- **No yt-dlp on Vercel**: Video features are local development only

## Image Configuration
`next.config.ts` allows all remote image sources (`hostname: "**"`). Optimize if restricting domains later.

## Font Setup
Uses Geist Sans and Geist Mono fonts loaded via `next/font/google` with CSS variables `--font-geist-sans` and `--font-geist-mono`.
