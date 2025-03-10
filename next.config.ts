import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "ae01.alicdn.com",
      },
      {
        hostname: "img.drz.lazcdn.com",
      }
    ]
  }
};

export default nextConfig;
