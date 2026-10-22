import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/services/proactive-security",
        destination: "/services/vulnerability-assessment",
        permanent: true,
      },
      {
        source: "/services/endpoint-security",
        destination: "/services/application-security",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
