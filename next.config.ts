import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
      }
    ],
  },
};

export default nextConfig;
