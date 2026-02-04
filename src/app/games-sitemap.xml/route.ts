import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://korachoco.cv'

  const currentDate = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/clicky-addicty</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/clicky-addicty"/>
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi/clicky-addicty"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/clicky-addicty"/>
  </url>
  <url>
    <loc>${baseUrl}/vi/clicky-addicty</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/clicky-addicty"/>
    <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/vi/clicky-addicty"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/clicky-addicty"/>
  </url>
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
