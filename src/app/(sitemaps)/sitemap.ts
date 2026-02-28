import { MetadataRoute } from 'next'

// Always use the canonical production URL — never expose Vercel preview URLs
const BASE_URL = 'https://korachoco.cv'

// Use a fixed last-modified date to prevent cache busting on every build
// Update this when content actually changes
const LAST_MODIFIED = new Date('2026-02-28')

export default function sitemap(): MetadataRoute.Sitemap {
  // Helper to generate hreflang alternates for a path
  const getAlternates = (path: string = '') => {
    const enPath = `${BASE_URL}${path}`
    const viPath = `${BASE_URL}/vi${path}`
    return {
      languages: {
        'en': enPath,
        'vi': viPath,
        'x-default': enPath,
      },
    }
  }

  return [
    // --- English Pages ---
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: getAlternates(''),
    },
    {
      url: `${BASE_URL}/cv`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: getAlternates('/cv'),
    },
    {
      url: `${BASE_URL}/clicky-addicty`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: getAlternates('/clicky-addicty'),
    },
    {
      url: `${BASE_URL}/converter`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: getAlternates('/converter'),
    },

    // --- Vietnamese Pages ---
    {
      url: `${BASE_URL}/vi`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: getAlternates(''),
    },
    {
      url: `${BASE_URL}/vi/cv`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/cv'),
    },
    {
      url: `${BASE_URL}/vi/clicky-addicty`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getAlternates('/clicky-addicty'),
    },
    {
      url: `${BASE_URL}/vi/converter`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getAlternates('/converter'),
    },
  ]
}
