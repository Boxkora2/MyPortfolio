import { MetadataRoute } from 'next'

// Always use the canonical production URL — never expose preview deployment URLs
const BASE_URL = 'https://korachoco.cv'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Permit AI assistants to read the dedicated LLM context files
        userAgent: 'GPTBot',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/llms.txt', '/llms-full.txt'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
