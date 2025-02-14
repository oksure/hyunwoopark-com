/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/v1',
        destination: '/v1/index.html'
      },
      {
        source: '/v2',
        destination: '/v2/index.html'
      },
      {
        source: '/v3',
        destination: '/v3/index.html'
      },
      {
        source: '/v4',
        destination: '/v4/index.html'
      },
      {
        source: '/netview',
        destination: '/netview/index.html'
      },
      {
        source: '/econsec',
        destination: '/econsec/index.html'
      },
      {
        source: '/klpga',
        destination: '/klpga/index.html'
      },
      {
        source: '/snumba',
        destination: '/snumba/index.html'
      },
      {
        source: '/courses/dav-fall21',
        destination: '/courses/dav-fall21/index.html'
      },
      {
        source: '/courses/ibk2023',
        destination: '/courses/ibk2023/index.html'
      },
    ]
  }
};

module.exports = nextConfig;