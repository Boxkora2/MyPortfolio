# AI Coding Agent Instructions for MyPortfolio  Vo Thanh Phat

## Project Overview
Personal portfolio of **Vo Thanh Phat** (Frontend Developer). Next.js 16 portfolio site with **internationalization (i18n)**, custom Lunar/Solar theme system, and a local-only video downloader utility. Uses App Router with TypeScript and Tailwind CSS, deployed at `https://korachoco.cv`.

---

## Identity & Branding
- **Real name**: Vo Thanh Phat / Võ Thanh Phát (Vietnamese)
- **Domain**: `https://korachoco.cv`
- **Role**: Frontend Developer
- All metadata (`title`, `creator`, `author`, OG tags, JSON-LD) must use "Vo Thanh Phat"  never "Boxkora" or "My Portfolio"
- The `en.json` dictionary key `home.title` = `"Vo Thanh Phat"`, `home.role` = `"Frontend Developer"`
- The `vi.json` dictionary key `home.title` = `"Võ Thanh Phát"`, `home.role` = `"Lập Trình Viên Frontend"`

---

## Architecture & Key Patterns

### Internationalization (i18n) Structure (2026 Standard - English No Prefix)
- **Route-based i18n**: English pages at root (`src/app/`), Vietnamese pages under `src/app/vi/`
  - English (default): `domain.com`, `domain.com/converter`, `domain.com/clicky-addicty`
  - Vietnamese: `domain.com/vi`, `domain.com/vi/converter`, `domain.com/vi/clicky-addicty`
- **Middleware pattern**: `src/proxy.ts` handles locale detection via `@formatjs/intl-localematcher` and `negotiator`
  - Matcher config: `/((?!_next|api|favicon.ico|.*\..*).*)`   excludes internal paths, API routes, and static files
  - Detects user language preference and redirects to `/vi` if Vietnamese preferred
  - English pages served directly without prefix (no redirect/rewrite needed)
- **Dictionary system**: Use `getDictionary(locale)` from `src/get-dictionary.ts` to load translations from `src/dictionaries/{en,vi}.json`
  - Locale parameter is optional, defaults to `"en"`
  - Each layout (`(en)/` and `vi/`) fetches its own dictionary
- **Server-only imports**: Dictionary loading uses `"server-only"` package to prevent client-side bundling
- **Language switching**: Navigation component has `getOtherLangLink()` helper
  - English  Vietnamese: adds `/vi` prefix
  - Vietnamese  English: removes `/vi` prefix
  - Example: `/converter`  `/vi/converter`, `/`  `/vi`

Adding a new page requires:
1. `src/app/(en)/feature-name/page.tsx` (English)
2. `src/app/vi/feature-name/page.tsx` (Vietnamese)
3. Update both `en.json` and `vi.json`

### SEO & Structured Data
- **hreflang**: Both `(en)/layout.tsx` and `vi/layout.tsx` export `metadata.alternates` with `canonical` and `languages` pointing to the correct locales
- **JSON-LD**: `(en)/page.tsx` injects a `Person` schema via `<script type="application/ld+json">`  update `sameAs` with real GitHub/LinkedIn URLs
- **Root layout** (`app/layout.tsx`) holds all global metadata: `title`, `description`, `openGraph`, `twitter`, `robots`  all using "Vo Thanh Phat"
- **robots.ts** and sitemap files are in `app/(sitemaps)/`

### Custom Theme System ("Lunar Theme")
- **CSS variables in `src/app/globals.css`**: All colors use `var(--color-lunar-*)` tokens
- **Available color tokens**: `--color-lunar-bg`, `--color-lunar-card`, `--color-lunar-primary`, `--color-lunar-secondary`, `--color-lunar-gold`, `--color-lunar-text`, `--color-lunar-muted`, `--color-lunar-glow`
- **Light/dark modes**: `:root` (light/solar) and `.dark` (lunar) defined in globals.css
- **Theme provider**: `next-themes` in `src/components/Providers.tsx` (`attribute="class"`, `defaultTheme="dark"`)
- **Usage**: Always `bg-[var(--color-lunar-card)]`  never hardcode hex colors

### Component Patterns
- **Client components**: `"use client"` for Navigation, ThemeToggle, FeaturedSection, ClickyGame, VideoDownloader
  - `Navigation` receives `lang` and `dict` as props from server layout
  - `getLink(path)` adds `/vi` prefix for Vietnamese, `getOtherLangLink()` toggles languages
- **Server components**: Pages and layouts are async RSCs that fetch dictionaries
  - Root pages: `const dict = await getDictionary("en");`
  - Vietnamese pages: `const dict = await getDictionary("vi");`
- **Layout hierarchy**: Root `layout.tsx` has html/body/Providers only. `(en)/` and `vi/` layouts add Navigation.

### API Routes & Video Downloader
- **Local-only feature**: `video-info/route.ts` and `download/route.ts` use `youtube-dl-exec`
- **Binary path**: Read from `process.env.YTDLP_PATH` (set in `.env.local`)  **never hardcode a path**
  ```ts
  const binaryPath = process.env.YTDLP_PATH ?? '';
  ```
- **Type safety**: Use derived type  never `any`:
  ```ts
  type YtOptions = NonNullable<Parameters<typeof youtubeDl>[1]>;
  ```
- **Production guard**: Both routes check `process.env.VERCEL === '1'` and return `501` if true
- **Supported platforms**: YouTube, TikTok, Instagram, Facebook, Vimeo, Twitter/X
- **Format filtering**: Progressive MP4 only (no DASH/HLS), both video + audio codecs required
- **UI notice**: `VideoDownloader.tsx` already shows a yellow warning box for local-only context

---

## Project Structure
```
src/
 app/
    layout.tsx            # Root layout  global metadata for "Vo Thanh Phat"
    (en)/
       layout.tsx        # hreflang alternates + Navigation (lang="en")
       page.tsx          # Home  JSON-LD Person schema injected here
       clicky-addicty/
       converter/
       cv/
    vi/
       layout.tsx        # hreflang alternates + Navigation (lang="vi")
       page.tsx
       clicky-addicty/
       converter/
    api/                  # video-info, download, proxy-download
    (sitemaps)/           # sitemap.ts, robots.ts
    globals.css           # Lunar theme CSS variables
 components/
    Navigation.tsx        # "use client"  lang switcher, getLink(), getOtherLangLink()
    FeaturedSection.tsx   # "use client"
    VideoDownloader.tsx   # "use client"  local-only feature with warning badge
    ClickyGame.tsx
    ThemeToggle.tsx
    Providers.tsx         # next-themes wrapper
 dictionaries/
    en.json               # English strings  home.title = "Vo Thanh Phat"
    vi.json               # Vietnamese strings  home.title = "Võ Thanh Phát"
 get-dictionary.ts         # server-only dictionary loader
 proxy.ts                  # Middleware  locale detection
```

---

## Development Workflow

### Commands (uses pnpm)
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Environment Variables
```bash
# .env.local (never commit  covered by .gitignore via .env*)
YTDLP_PATH=C:\Users\kurot\AppData\Local\Microsoft\WinGet\Links\yt-dlp.exe
```

### Adding New Features
1. **New page with i18n**: Create in both `(en)/` and `vi/`, update both dictionaries, add nav link using `getLink()`
2. **New translations**: Add matching keys to both `en.json` and `vi.json`
3. **New component**: RSC by default; `"use client"` only for interactivity
4. **Styling**: Lunar CSS variables only  no hardcoded hex colors
5. **Metadata**: All new pages must use "Vo Thanh Phat" in any title/OG fields

### Path Aliases
- `@/*`  `src/*` (tsconfig.json)

---

## CI / Quality
- GitHub Actions: `.github/workflows/ci.yml`  runs `pnpm lint` + `tsc --noEmit` on every push and PR
- No `any` types  derive from library signatures
- No hardcoded file system paths  use environment variables

---

## Critical Conventions
- **Never hardcode colors**: Always `var(--color-lunar-*)` variables
- **Never hardcode paths**: Use `process.env.YTDLP_PATH` for binary paths
- **Never use `any`**: Derive types  `type T = NonNullable<Parameters<typeof fn>[1]>`
- **i18n everywhere**: All user-visible strings from dictionary files
- **Duplicate pages**: Every page must exist in both `(en)/` and `vi/`
- **No dynamic params**: Locale from route structure, not `[lang]` params
- **hreflang required**: Every locale layout exports `metadata.alternates`
- **JSON-LD on homepage**: `Person` schema must stay current (name, url, jobTitle, sameAs)
- **No yt-dlp on Vercel**: Video feature is local dev only  `.env.local` provides binary path
- **Identity**: All references must say "Vo Thanh Phat"  never "Boxkora" or "My Portfolio"

---

## Image Configuration
`next.config.ts` allows all remote image sources (`hostname: "**"`). Optimize if restricting domains later.

## Font Setup
Geist Sans and Geist Mono via `next/font/google`. CSS variables: `--font-geist-sans`, `--font-geist-mono`.


---

## Agent Skills
The following skills are installed in `.github/instructions/` and apply automatically:

### `vercel-react-best-practices`
**Apply when:** writing/refactoring any component, page, or API route in MyPortfolio.
Key rules relevant to this project:
- `async-parallel`  `(en)/page.tsx` and `vi/page.tsx` should use `Promise.all()` if they ever fetch multiple independent data sources
- `bundle-barrel-imports`  import `getDictionary` directly, never re-export through an index barrel
- `bundle-dynamic-imports`  use `next/dynamic` for `VideoDownloader` if the `youtube-dl-exec` import grows the client bundle
- `bundle-defer-third-party`  defer any analytics or chat widgets until after hydration
- `server-cache-react`  wrap `getDictionary` calls with `React.cache()` to deduplicate per-request
- `server-serialization`  pass only the required dictionary keys to client components, not the entire dict object
- `server-parallel-fetching`  if a page ever calls `getDictionary` + another source, run them in parallel
- `rerender-memo`  memoize `FeaturedSection` items if they re-render on parent state changes
- `rendering-conditional-render`  use ternary instead of `&&` for optional UI elements in Navigation
- `rendering-hoist-jsx`  hoist static footer/nav JSX outside component bodies where possible
- `rendering-hydration-no-flicker`  theme toggle uses `next-themes` with `suppressHydrationWarning`  keep this pattern

### `vercel-composition-patterns`
**Apply when:** adding new props to Navigation, FeaturedSection, or any new reusable UI component.
Key rules relevant to this project:
- `architecture-avoid-boolean-props`  don't add `isVietnamese` boolean to `Navigation`; derive from `lang` prop
- `state-decouple-implementation`  `Navigation` receives `dict` and `lang` as props from server layout; it should never fetch its own translations
- `state-context-interface`  if adding a user preferences store, define `{ state, actions, meta }` interface pattern
- `patterns-explicit-variants`  create locale-specific variant components rather than embedding ternaries for EN vs VI differences
- `patterns-children-over-render-props`  page layouts should use `children` for content slots, not `renderContent={...}`
- `react19-no-forwardref`  React 19 is in use; skip `forwardRef`, pass `ref` as plain prop

### `web-design-guidelines`
**Apply when:** asked to "review my UI", "check accessibility", "audit design", or "check UX".
Process:
1. Fetch live rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
2. Read the target files
3. Report findings in `file:line` terse format

Key areas to watch in MyPortfolio:
- **Accessibility**: Navigation links need `aria-current="page"` for active route; language toggle needs `aria-label`
- **Focus states**: theme toggle and nav links need visible `:focus-visible` outlines matching `--color-lunar-primary`
- **i18n**: use `Intl.DateTimeFormat` / `Intl.NumberFormat` for locale-aware formatting, not manual strings
- **Animation**: any Framer Motion animations should respect `prefers-reduced-motion`
- **Dark Mode**: Lunar theme uses `next-themes` with `attribute="class"`  always use `var(--color-lunar-*)` tokens, never hardcode
- **Images**: all next/image usages need non-empty `alt` text; project thumbnails should describe the project
- **hreflang**: both locale layouts export `metadata.alternates`  keep this consistent when adding new pages
