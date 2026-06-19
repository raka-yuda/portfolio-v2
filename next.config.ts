import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  allowedDevOrigins: ['192.168.18.*'],
};

export default nextConfig;
