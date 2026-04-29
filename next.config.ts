import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'top-right',
  },
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
