import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'picsum.photos',
      'lh3.googleusercontent.com',
    ],
    deviceSizes: [640, 1024],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
