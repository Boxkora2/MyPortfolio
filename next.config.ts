import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Enable production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
