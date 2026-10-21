import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  experimental: {
    cpus: 4,
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async redirects() {
    return ['research', 'publications', 'teaching', 'about'].map(page => ({
      source: `/${page}/`, destination: '/', permanent: false,
    }))
  },
  async rewrites() {
    return [
      { source: '/v1', destination: '/v1/index.html' },
      { source: '/v2', destination: '/v2/index.html' },
      { source: '/v3', destination: '/v3/index.html' },
      { source: '/v4', destination: '/v4/index.html' },
      { source: '/netview', destination: '/netview/index.html' },
      { source: '/econsec', destination: '/econsec/index.html' },
      { source: '/klpga', destination: '/klpga/index.html' },
      { source: '/snumba', destination: '/snumba/index.html' },
      { source: '/courses/dav-fall21', destination: '/courses/dav-fall21/index.html' },
      { source: '/courses/ibk2023', destination: '/courses/ibk2023/index.html' },
    ]
  }
}

export default nextConfig
