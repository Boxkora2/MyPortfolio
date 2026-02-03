import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'https://korachoco.cv'
  
  const currentDate = new Date()

  // Helper to generate alternates for a path
  const getAlternates = (path: string = '') => {
    const enPath = `${baseUrl}${path}`
    const viPath = `${baseUrl}/vi${path}`
    
    return {
      languages: {
        en: enPath,
        vi: viPath,
        // x-default for unmatched languages (fallback to English)
        'x-default': enPath,
      },
    }
  }
  
  return [
    // --- English Routes ---
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: getAlternates(''),
    },
    {
      url: `${baseUrl}/clicky-addicty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/clicky-addicty'),
    },
    {
      url: `${baseUrl}/converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/converter'),
    },

    // --- Vietnamese Routes ---
    {
      url: `${baseUrl}/vi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: getAlternates(''),
    },
    {
      url: `${baseUrl}/vi/clicky-addicty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/clicky-addicty'),
    },
    {
      url: `${baseUrl}/vi/converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates('/converter'),
    },
  ]
}
