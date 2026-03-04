import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/conspiracy",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
