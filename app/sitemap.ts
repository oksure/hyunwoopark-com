import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyunwoopark.com'

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/bio/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/v4/`, lastModified: new Date('2023-01-01'), changeFrequency: 'never', priority: 0.3 },
  ]
}
