import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Only files with Next.js route conventions are routes; the rest of src/pages
  // belongs to the existing Vite admin app and is imported as normal modules.
  pageExtensions: ['page.tsx', 'page.ts'],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
