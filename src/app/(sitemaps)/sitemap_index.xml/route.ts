import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://korachoco.cv'

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/pages-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/tools-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/games-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
