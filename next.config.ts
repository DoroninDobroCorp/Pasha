import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/pasha",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
