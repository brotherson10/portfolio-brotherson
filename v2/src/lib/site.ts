export const siteUrl = "https://brotherson.dev"

/**
 * Netlify sets CONTEXT during every build: "production", "deploy-preview", "branch-deploy" or "dev".
 * Only production (and a local build, where CONTEXT is absent and the output mirrors production)
 * may be indexed. Deploy previews and branch deploys get noindex in the HTML, a disallow-all
 * robots.txt and an X-Robots-Tag header (written by scripts/postbuild.mjs), so their protection
 * never depends on a dashboard setting.
 */
export const indexable = !process.env.CONTEXT || process.env.CONTEXT === "production"

/**
 * Origin for absolute asset URLs such as the Open Graph image. Production uses the domain. A
 * preview uses its own address (DEPLOY_PRIME_URL, set by Netlify, e.g.
 * https://deploy-preview-1--portfolio-brotherson.netlify.app), so share images resolve there
 * before the domain serves V2. Canonicals and hreflang always use siteUrl. A missing or invalid
 * value falls back to the domain rather than producing a broken URL.
 */
export const assetOrigin = (() => {
  if (indexable) return siteUrl
  try {
    const url = new URL(process.env.DEPLOY_PRIME_URL ?? "")
    return url.protocol === "https:" ? url.origin : siteUrl
  } catch {
    return siteUrl
  }
})()
