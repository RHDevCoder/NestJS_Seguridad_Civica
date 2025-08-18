import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: process.env.DOMAIN!,
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  }
};

export default nextConfig;
