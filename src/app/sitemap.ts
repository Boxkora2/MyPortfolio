import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://korachoco.cv'
  const currentDate = new Date()
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          vi: `${baseUrl}/vi`,
        },
      },
    },
    {
      url: `${baseUrl}/clicky-addicty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/clicky-addicty`,
          vi: `${baseUrl}/vi/clicky-addicty`,
        },
      },
    },
    {
      url: `${baseUrl}/converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/converter`,
          vi: `${baseUrl}/vi/converter`,
        },
      },
    },
    {
      url: `${baseUrl}/vi`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/vi/clicky-addicty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vi/converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
