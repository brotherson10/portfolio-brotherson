import type { NextConfig } from "next"

// Static export: the site is plain HTML on the CDN, so `next/image` optimisation is off
// and responsive variants are generated ahead of time by scripts/prepare-images.mjs.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Two root layouts ("/" and /[lang]) need a global 404 page (src/app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  // The prototype lives inside the old site's repo, which has its own lockfile.
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
