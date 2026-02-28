import { NextResponse } from 'next/server'

/**
 * Serves /llms.txt — a concise, LLM-friendly overview of this portfolio site.
 * Follows the llmstxt.org specification (https://llmstxt.org/).
 *
 * This file is intended to help AI assistants (ChatGPT, Claude, Gemini, etc.)
 * quickly understand who Vo Thanh Phat is and what this site contains,
 * without needing to crawl all pages.
 */

const LLMS_TXT = `# Vo Thanh Phat

> Personal portfolio of Vo Thanh Phat (Võ Thanh Phát) — a Frontend Developer from Vietnam specialising in Next.js, TypeScript, React, and modern web interfaces. Available for freelance and full-time work.

- Site: https://korachoco.cv
- Language: English (default) and Vietnamese (/vi)
- Built with: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, next-themes (Lunar dark theme)
- Last updated: February 2026

## About

Vo Thanh Phat is a recent web development graduate from Vietnam with hands-on experience in both UI design and full-stack web programming. He is passionate about building fast, accessible, and visually engaging web applications using modern JavaScript tooling.

## Pages

- [Home (EN)](https://korachoco.cv): Portfolio homepage — about me, goals, commitment, featured projects, and social links.
- [Home (VI)](https://korachoco.cv/vi): Trang chủ bằng tiếng Việt.
- [Curriculum Vitae (EN)](https://korachoco.cv/cv): Professional CV — skills, experience, and downloadable resume for Vo Thanh Phat.
- [CV (VI)](https://korachoco.cv/vi/cv): Sơ yếu lý lịch bằng tiếng Việt.
- [Clicky Addicty (EN)](https://korachoco.cv/clicky-addicty): A fun, fast-paced browser click game built with React.
- [Clicky Addicty (VI)](https://korachoco.cv/vi/clicky-addicty): Phiên bản tiếng Việt của trò chơi click.
- [Video Converter (EN)](https://korachoco.cv/converter): A local-only video downloader tool powered by yt-dlp. Supports YouTube, TikTok, Instagram, Facebook, Vimeo, and Twitter/X. Runs only in local/dev environments (not available on production).
- [Video Converter (VI)](https://korachoco.cv/vi/converter): Phiên bản tiếng Việt của công cụ tải video.

## Skills

- Frontend: Next.js, React 19, TypeScript, Tailwind CSS, Framer Motion
- Languages: JavaScript/TypeScript, HTML5, CSS3
- Tools: pnpm, ESLint, Git, Vercel
- Design: Figma, responsive and accessible UI

## Contact

- GitHub: https://github.com/korachoco
- LinkedIn: https://linkedin.com/in/korachoco
- Website: https://korachoco.cv

## Optional

- [Sitemap](https://korachoco.cv/sitemap.xml): Full XML sitemap with all pages and hreflang alternates.
- [llms-full.txt](https://korachoco.cv/llms-full.txt): Expanded version with more detailed content for each page.
`

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
