# AI Coding Agent Instructions for MyPortfolio

## Project Overview
Next.js 16 portfolio site with **internationalization (i18n)**, custom Lunar/Solar theme system, and video downloader utility. Uses App Router with TypeScript and Tailwind CSS.

## Architecture & Key Patterns

### Internationalization (i18n) Structure (2026 Standard - English No Prefix)
- **Route-based i18n**: English pages at root (`src/app/`), Vietnamese pages under `src/app/vi/`
  - English (default): `domain.com`, `domain.com/converter`, `domain.com/clicky-addicty`
  - Vietnamese: `domain.com/vi`, `domain.com/vi/converter`, `domain.com/vi/clicky-addicty`
- **Middleware pattern**: `src/proxy.ts` handles locale detection via `@formatjs/intl-localematcher` and `negotiator`
  - Matcher config: `/((?!_next|api|favicon.ico|.*\..*).*)`excludes internal paths, API routes, and static files
  - Detects user language preference and redirects to `/vi` if Vietnamese preferred
  - English pages served directly without prefix (no redirect/rewrite needed)
- **Dictionary system**: Use `getDictionary(locale)` from `src/get-dictionary.ts` to load translations from `src/dictionaries/{en,vi}.json`
  - Locale parameter is optional, defaults to "en"
  - Each layout (root and vi/) fetches its own dictionary
- **Server-only imports**: Dictionary loading uses `"server-only"` package to prevent client-side bundling
- **Language switching**: Navigation component has `getOtherLangLink()` helper
  - English → Vietnamese: adds `/vi` prefix to current path
  - Vietnamese → English: removes `/vi` prefix from current path
  - Example: `/converter` ↔ `/vi/converter`, `/` ↔ `/vi`

Example: Adding a new page requires creating both `src/app/new-page/page.tsx` (English) and `src/app/vi/new-page/page.tsx` (Vietnamese), plus updating dictionary files.

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
  - Navigation has helper functions: `getLink(path)` adds `/vi` for Vietnamese, `getOtherLangLink()` toggles languages
- **Server components**: Pages and layouts are async server components that fetch dictionaries
  - Root layout example: `export default async function RootLayout({ children }: { children: React.ReactNode })`
  - No params needed - locale determined by route structure (root = English, /vi = Vietnamese)
- **No params handling needed**: Unlike old `[lang]` structure, pages don't receive dynamic params
  - Root pages: `const dict = await getDictionary("en");`
  - Vietnamese pages: `const dict = await getDictionary("vi");`
- **Dictionary passing**: Each layout fetches dictionary and passes to Navigation
  - Root layout: `const dict = await getDictionary("en");` → `<Navigation lang="en" dict={dict} />`
  - Vi layout: `const dict = await getDictionary("vi");` → `<Navigation lang="vi" dict={dict} />`

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
│   ├── layout.tsx           # Root layout (html/body/Providers only)
│   ├── (en)/                # English route group (no prefix in URL)
│   │   ├── layout.tsx       # English layout with Navigation
│   │   ├── page.tsx         # English home page
│   │   ├── clicky-addicty/  # English clicky game
│   │   │   └── page.tsx
│   │   └── converter/       # English video converter
│   │       └── page.tsx
│   ├── vi/                  # Vietnamese routes (with /vi prefix)
│   │   ├── layout.tsx       # Vietnamese layout with Navigation
│   │   ├── page.tsx         # Vietnamese home page
│   │   ├── clicky-addicty/  # Vietnamese clicky game
│   │   │   └── page.tsx
│   │   └── converter/       # Vietnamese video converter
│   │       └── page.tsx
│   ├── api/                 # API routes (video-info, download, proxy-download)
│   └── globals.css          # Lunar theme CSS variables
├── components/              # React components (client & server)
├── dictionaries/            # i18n JSON files (en.json, vi.json)
├── get-dictionary.ts        # Dictionary loader with server-only
└── proxy.ts                 # Middleware for locale detection
```

## Development Workflow

### Commands (uses pnpm)
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding New Features
1. **New page with i18n**: Create both `src/app/(en)/feature-name/page.tsx` (English) and `src/app/vi/feature-name/page.tsx` (Vietnamese), update dictionaries, add nav links using `getLink()` helper in Navigation
2. **New translations**: Add keys to both `src/dictionaries/en.json` and `vi.json`
3. **New component**: Determine if client (`"use client"`) or server component based on interactivity
4. **Styling**: Use Lunar theme CSS variables, not hardcoded colors
5. **Navigation links**: Use `getLink(path)` helper in Navigation component to generate correct URLs for current language
6. **Layout hierarchy**: Root layout has html/body/Providers only. (en)/ and vi/ layouts add Navigation and page-specific wrappers

### Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Example: `import { FeaturedSection } from "@/components/FeaturedSection"`

## Critical Conventions
- **Never hardcode colors**: Always use `var(--color-lunar-*)` variables
- **i18n everywhere**: All user-facing strings must come from dictionary files
- **Duplicate pages for both locales**: Every page must exist in both root (English) and `/vi` (Vietnamese)
- **No dynamic params**: Pages don't use `[lang]` params - locale is determined by route structure
- **Client components receive dict**: Server components fetch dictionaries, pass to client as props
- **No yt-dlp on Vercel**: Video features are local development only
- **English = no prefix**: Root paths are English (`/`, `/converter`), only Vietnamese uses `/vi` prefix

## Image Configuration
`next.config.ts` allows all remote image sources (`hostname: "**"`). Optimize if restricting domains later.

## Font Setup
Uses Geist Sans and Geist Mono fonts loaded via `next/font/google` with CSS variables `--font-geist-sans` and `--font-geist-mono`.
