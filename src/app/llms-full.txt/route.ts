import { NextResponse } from 'next/server'

/**
 * Serves /llms-full.txt — a comprehensive, LLM-friendly document describing
 * every page, component, and feature of this portfolio site in detail.
 * Follows the llmstxt.org specification (https://llmstxt.org/).
 *
 * Use this file when you need complete context about korachoco.cv.
 * Use /llms.txt for a shorter summary.
 */

const LLMS_FULL_TXT = `# Vo Thanh Phat — Full Site Context

> Complete LLM context for https://korachoco.cv — the personal portfolio of Vo Thanh Phat (Võ Thanh Phát), a Frontend Developer from Vietnam.

---

## Identity

- **Legal name**: Vo Thanh Phat / Võ Thanh Phát (Vietnamese diacritics)
- **Role**: Frontend Developer
- **Location**: Vietnam (Ho Chi Minh City area)
- **Domain**: https://korachoco.cv
- **Languages**: English (primary), Vietnamese
- **Available for**: Freelance projects, full-time positions, remote work

---

## Site Architecture

The portfolio is a **Next.js 16 App Router** project with full **i18n support**:

- English pages live at the root (e.g. \`/\`, \`/cv\`, \`/clicky-addicty\`, \`/converter\`)
- Vietnamese pages live under \`/vi\` (e.g. \`/vi\`, \`/vi/cv\`, \`/vi/clicky-addicty\`, \`/vi/converter\`)
- Middleware at \`/src/proxy.ts\` auto-detects browser language and redirects Vietnamese users to \`/vi\`
- All pages have proper hreflang alternates and canonical URLs

**Tech Stack:**
- Framework: Next.js 16 (App Router, React Server Components by default)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v4 + custom CSS variables (Lunar Theme)
- Animations: Framer Motion 12
- Theming: next-themes (\`attribute="class"\`, default dark "Lunar" theme)
- Icons: Emoji (inline)
- Package manager: pnpm
- Deployment: Vercel
- Analytics: @vercel/analytics, @vercel/speed-insights

---

## Pages — Detailed Content

### Home Page — https://korachoco.cv

**Purpose:** Main portfolio landing page. Introduces Vo Thanh Phat with a profile photo, bio, goals, commitment statement, featured projects, and social links.

**Key Sections:**
1. **Hero** — Profile photo (circular, with glow effect) + name "Vo Thanh Phat" + role "Frontend Developer"
2. **About Me** — Short bio: recent web development graduate, 6 months hands-on experience in UI design and web programming
3. **My Goals** — (1) Develop practical experience through diverse projects; (2) Earn income while sharpening professional skills
4. **My Commitment** — Always eager to learn, ready for challenges, committed to high-quality on-time delivery
5. **Featured Projects & Social Links** — FeaturedSection component showing portfolio projects and contact links (GitHub, LinkedIn)

**Structured Data:** Person schema (JSON-LD) with name, url, jobTitle, description, sameAs (GitHub, LinkedIn)

---

### CV Page — https://korachoco.cv/cv

**Purpose:** Interactive CV page displaying Vo Thanh Phat's professional resume.

**Key Features:**
- Animated header with "My Curriculum Vitae" title
- CV image displayed with hover effects and border animation (gradient: primary → gold → secondary)
- Download button to save the CV as PNG/PDF
- "View Full Size" button to open the CV in a new tab
- CV is stored as \`/public/cv2026.png\`
- Last Updated: February 2026

**Skills shown in CV:**
- Frontend: Next.js, React, TypeScript, JavaScript (ES6+), HTML5, CSS3
- Styling: Tailwind CSS, CSS Modules, Responsive Design
- Tools: Git, GitHub, VS Code, pnpm, Vercel, Figma
- Soft skills: Communication, Time Management, Problem Solving

---

### Clicky Addicty — https://korachoco.cv/clicky-addicty

**Purpose:** A fun browser game that tests clicking speed. Built as a JavaScript/React skill demonstration.

**Gameplay:**
- Player clicks a target as many times as possible within a time limit
- High score tracking
- Animated UI with the Lunar theme
- Mobile-friendly (touch events supported)

**Tech:** React hooks (\`useState\`, \`useEffect\`, \`useRef\`), Tailwind CSS animations

---

### Video Converter / Downloader — https://korachoco.cv/converter

**Purpose:** A local-only video downloading utility. **NOT available on the live production site** — only works in local development environments.

**Supported Platforms:** YouTube, TikTok, Instagram, Facebook, Vimeo, Twitter/X

**How it works:**
- Frontend (VideoDownloader.tsx): Input field for URL, format selector, download button
- API routes: \`/api/video-info\` fetches video metadata, \`/api/download\` streams the file
- Backend: Uses \`youtube-dl-exec\` npm package wrapping \`yt-dlp\` binary
- Binary path: read from \`process.env.YTDLP_PATH\` (never hardcoded)
- Production guard: Returns HTTP 501 when \`process.env.VERCEL === '1'\`
- Format filtering: Progressive MP4 only (no DASH/HLS), requires both video + audio codecs

**Warning shown to users:** Yellow warning box explains the tool is for local use only.

---

## Theme System — Lunar Theme

All colors are CSS custom properties defined in \`globals.css\`:

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| \`--color-lunar-bg\` | light cream | dark navy/purple | Page background |
| \`--color-lunar-card\` | white | dark card | Card backgrounds |
| \`--color-lunar-primary\` | purple | purple/violet | Brand color, headings |
| \`--color-lunar-secondary\` | cyan | cyan | Accent color |
| \`--color-lunar-gold\` | gold | gold | Special highlights |
| \`--color-lunar-text\` | dark | light | Body text |
| \`--color-lunar-muted\` | gray | muted | Secondary text |
| \`--color-lunar-glow\` | subtle | glow | Glow effects |

The default theme is **dark** (Lunar). Light mode is called "Solar".
Theme is toggled via a \`ThemeToggle\` component using next-themes.

---

## Internationalization

**Dictionary keys (en.json / vi.json):**

\`home.title\`: "Vo Thanh Phat" / "Võ Thanh Phát"
\`home.role\`: "Frontend Developer" / "Lập Trình Viên Frontend"
\`home.about_title\`: "About Me" / "Giới Thiệu"
\`home.goals_title\`: "My Goals" / "Mục Tiêu"
\`home.commitment_title\`: "My Commitment" / "Cam Kết"
\`nav.home\`: "MyPortfolio" / "Trang Chủ"
\`nav.clicky\`: "Clicky Addicty" / "Nghiện Click"
\`nav.cv\`: "My CV" / "Hồ Sơ"
\`nav.converter\`: "Converter" / "Công Cụ Chuyển Đổi"
\`cv.title\`: "My Curriculum Vitae" / "Sơ Yếu Lý Lịch"
\`cv.subtitle\`: "Professional Resume 2026" / "Hồ Sơ Chuyên Nghiệp 2026"

---

## SEO Configuration

- **Sitemap**: https://korachoco.cv/sitemap.xml — lists all 8 pages (4 EN + 4 VI) with hreflang alternates
- **Robots**: https://korachoco.cv/robots.txt — allows all bots, disallows /api/
- **Canonical URLs**: Each page has a canonical URL matching the page's primary language version
- **hreflang**: All pages include \`en\`, \`vi\`, and \`x-default\` alternates
- **OG Images**: All pages share \`/og-image.png\` (1200×630 px)
- **Structured Data**: WebSite schema on root + Person schema on homepage
- **llms.txt**: https://korachoco.cv/llms.txt (summary for LLMs)
- **llms-full.txt**: https://korachoco.cv/llms-full.txt (this file — full detail)

---

## Contact & Social

- **GitHub**: https://github.com/korachoco
- **LinkedIn**: https://linkedin.com/in/korachoco
- **Portfolio**: https://korachoco.cv

---

## Frequently Asked Questions

**Who is Vo Thanh Phat?**
Vo Thanh Phat (Võ Thanh Phát) is a Vietnamese Frontend Developer who recently graduated from a web development program. He specialises in building modern web UIs with Next.js and TypeScript.

**What technologies does Vo Thanh Phat use?**
Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Git, Vercel.

**Is Vo Thanh Phat available for freelance work?**
Yes. He can be contacted via LinkedIn or GitHub (links above).

**What is the Lunar Theme?**
A custom dark theme for this portfolio inspired by Vietnamese Lunar New Year aesthetics, using deep navy/purple backgrounds with gold and cyan accents.

**Why is the video converter not working on the live site?**
The video downloader requires the yt-dlp binary installed locally. For security and Vercel's serverless constraints, it is disabled in production and only works in local development.
`

export async function GET() {
  return new NextResponse(LLMS_FULL_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
