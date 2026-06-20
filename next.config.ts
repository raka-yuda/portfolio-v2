import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      { source: '/projects', destination: '/project', permanent: true },
      { source: '/projects/:slug*', destination: '/project/:slug*', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      new URL('https://images.pexels.com/**'),
      new URL('https://raw.githubusercontent.com/**')
    ],
  },
  allowedDevOrigins: [
    '192.168.18.*',
    'https://*.ngrok-free.app'
  ],
};

export default nextConfig;
