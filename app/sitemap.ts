import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyunwoopark.com'

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    ...['research', 'publications', 'teaching', 'about'].map(path => ({ url: `${baseUrl}/${path}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${baseUrl}/bio/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/bio/resume-ko/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
