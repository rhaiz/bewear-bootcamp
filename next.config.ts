import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "d4lgxe9bm8juw.cloudfront.net",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
