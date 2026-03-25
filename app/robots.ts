import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/v1/', '/v2/', '/v3/', '/netview/'],
    },
    sitemap: 'https://hyunwoopark.com/sitemap.xml',
  }
}
