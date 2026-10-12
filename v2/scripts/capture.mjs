// Responsive check, link check and screenshots through the Chrome DevTools Protocol.
// Emulates real device metrics (plain `chrome --screenshot --window-size` cannot go below the
// minimum window width, which crops the page instead of reflowing it).
//
//   node scripts/capture.mjs [baseUrl] [outDir]
//
// 1. For every viewport (PT, plus EN at 390 and 1440): document overflow, elements wider than
//    the viewport, headline size and primary CTA position, with and without reduced motion.
// 2. Full-page captures (desktop, tablet, mobile, PT and EN) taken with reduced motion, which is
//    the final resting state of every scroll-linked reveal.
// 3. Links: every in-page anchor must hit an element id; every external URL must answer < 400.
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { launch, sleep } from "./lib/cdp.mjs"

const log = (message) => console.error(`[${new Date().toISOString().slice(11, 19)}] ${message}`)

const base = process.argv[2] ?? "http://localhost:4173"
const outDir = path.resolve(process.argv[3] ?? path.join(import.meta.dirname, "..", "docs", "prototype", "home"))

const viewports = [
  { name: "mobile-pt-320", path: "/pt/", width: 320, height: 640, mobile: true },
  { name: "mobile-pt-375", path: "/pt/", width: 375, height: 667, mobile: true },
  { name: "mobile-pt-390", path: "/pt/", width: 390, height: 844, mobile: true },
  { name: "mobile-en-390", path: "/en/", width: 390, height: 844, mobile: true },
  { name: "mobile-pt-430", path: "/pt/", width: 430, height: 932, mobile: true },
  { name: "tablet-pt-768", path: "/pt/", width: 768, height: 1024, mobile: true },
  { name: "tablet-pt-820", path: "/pt/", width: 820, height: 1180, mobile: true },
  { name: "desktop-pt-1024", path: "/pt/", width: 1024, height: 768, mobile: false },
  { name: "desktop-pt-1440", path: "/pt/", width: 1440, height: 900, mobile: false },
  { name: "desktop-en-1440", path: "/en/", width: 1440, height: 900, mobile: false },
]
const fullPages = ["desktop-pt-1440", "desktop-en-1440", "desktop-pt-1024", "tablet-pt-820", "mobile-pt-390", "mobile-en-390"]

const probe = `(() => {
  const vw = document.documentElement.clientWidth
  const wide = [...document.querySelectorAll("body *")]
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5) })
    .filter((el) => !el.closest("[aria-hidden='true']"))
    .map((el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + " " + Math.round(el.getBoundingClientRect().right))
  const cta = document.querySelector(".btn-primary")?.getBoundingClientRect()
  const anchors = [...document.querySelectorAll("a[href^='#']")].map((a) => a.getAttribute("href"))
  const external = [...new Set([...document.querySelectorAll("a[href^='http'], a[href^='mailto:']")].map((a) => a.href))]
  return {
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    pageHeight: document.documentElement.scrollHeight,
    overflowingElements: wide.slice(0, 6),
    h1FontPx: Math.round(parseFloat(getComputedStyle(document.querySelector("h1")).fontSize) * 10) / 10,
    primaryCtaTop: cta ? Math.round(cta.top) : null,
    brokenAnchors: [...new Set(anchors)].filter((h) => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1)))),
    external,
  }
})()`

mkdirSync(outDir, { recursive: true })
const chrome = await launch()
const report = []
const externalUrls = new Set()

try {
  for (const vp of viewports) {
    for (const reduceMotion of [false, true]) {
      log(`${vp.name}${reduceMotion ? " reduced" : ""}`)
      const fullPage = reduceMotion && fullPages.includes(vp.name)
      // Full pages at 1x: at 2x a tablet page is ~30 MP, beyond what Chrome will capture.
      await chrome.emulate({ ...vp, reduceMotion, ...(fullPage ? { scale: 1 } : {}) })
      await chrome.navigate(base + vp.path)
      await sleep(reduceMotion ? 400 : 3200)
      const result = await chrome.evaluate(probe)
      result.external.forEach((u) => externalUrls.add(u))
      if (!reduceMotion) writeFileSync(path.join(outDir, `${vp.name}.png`), await chrome.screenshot())
      if (fullPage) {
        // A full-page capture never scrolls, so lazy images would stay unloaded: load them first.
        await chrome.evaluate(`Promise.all([...document.images].map((img) => {
          img.loading = "eager"
          // Images hidden at this width (display: none) never load; do not wait on them forever.
          return Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 4000))])
        }))`)
        await sleep(300)
        writeFileSync(path.join(outDir, `${vp.name}-full.png`), await chrome.screenshot({ fullPage: true }))
      }
      report.push({ shot: vp.name, reduceMotion, ...result, external: undefined })
    }
  }
} finally {
  chrome.close()
}

const links = []
for (const url of externalUrls) {
  if (url.startsWith("mailto:")) {
    links.push({ url, status: "mailto" })
    continue
  }
  try {
    log(`link ${url}`)
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 portfolio-link-check" },
      signal: AbortSignal.timeout(15000),
    })
    // LinkedIn answers automated requests with its own 999 code; that is bot blocking, not a broken link.
    links.push({ url, status: res.status === 999 && url.includes("linkedin.com") ? "999 (bot blocked)" : res.status })
  } catch (error) {
    links.push({ url, status: `error: ${error.message}` })
  }
}

console.table(
  report.map((r) => ({
    shot: r.shot + (r.reduceMotion ? " (reduced)" : ""),
    vw: r.viewport,
    scrollW: r.scrollWidth,
    overflow: r.scrollWidth > r.viewport || r.overflowingElements.length ? r.overflowingElements.join(", ") || "document" : "none",
    h1px: r.h1FontPx,
    ctaTop: r.primaryCtaTop,
    pageH: r.pageHeight,
    brokenAnchors: r.brokenAnchors.join(" ") || "none",
  })),
)
console.table(links)

writeFileSync(path.join(outDir, "report.json"), JSON.stringify({ viewports: report, links }, null, 2))
const overflow = report.filter((r) => r.scrollWidth > r.viewport || r.overflowingElements.length)
const anchorsBroken = report.filter((r) => r.brokenAnchors.length)
const linksBroken = links.filter((l) => (typeof l.status === "number" ? l.status >= 400 : l.status.startsWith("error")))
if (overflow.length || anchorsBroken.length || linksBroken.length) {
  console.error(`overflow: ${overflow.length}, broken anchors: ${anchorsBroken.length}, broken links: ${linksBroken.length}`)
  process.exitCode = 1
}
