// Runs after `next build` (npm "postbuild"). Netlify headers in netlify.toml are global and
// cannot be scoped to a deploy context, so the preview-only noindex header is written here, into
// the published folder, only when the build is not a production build.
//
// It also fails the build if the export misses a file the launch depends on.
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const out = path.resolve(import.meta.dirname, "..", "out")
const context = process.env.CONTEXT
const indexable = !context || context === "production"

const required = ["index.html", "pt/index.html", "en/index.html", "404.html", "robots.txt", "sitemap.xml", "_redirects", "favicon.ico"]
const missing = required.filter((file) => !existsSync(path.join(out, file)))
if (missing.length) {
  console.error(`postbuild: missing from out/: ${missing.join(", ")}`)
  process.exit(1)
}

const robots = readFileSync(path.join(out, "robots.txt"), "utf8")
if (indexable === /Disallow: \/\s*$/m.test(robots)) {
  console.error(`postbuild: robots.txt does not match the ${context ?? "local"} context`)
  process.exit(1)
}

if (!indexable) {
  writeFileSync(path.join(out, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow\n")
}
console.log(`postbuild: context=${context ?? "local"} indexable=${indexable}`)
