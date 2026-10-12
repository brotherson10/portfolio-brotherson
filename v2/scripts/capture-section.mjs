// Captures one section of the page across viewports (real device emulation via CDP).
//
//   node scripts/capture-section.mjs <selector> <outDir> [baseUrl]
//
// For each viewport it saves:
//   {name}.png          the whole section, final state (reduced motion: no scroll-linked offsets)
//   {name}-motion.png   the viewport after scrolling the section into view with motion on
// and reports overflow inside the section.
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { launch, sleep } from "./lib/cdp.mjs"

const [selector, outArg, baseArg] = process.argv.slice(2)
if (!selector || !outArg) {
  console.error("usage: node scripts/capture-section.mjs <selector> <outDir> [baseUrl]")
  process.exit(1)
}
const outDir = path.resolve(outArg)
const base = baseArg ?? "http://localhost:4173"

const viewports = [
  { name: "desktop-pt-1440", path: "/pt/", width: 1440, height: 900, mobile: false },
  { name: "desktop-en-1440", path: "/en/", width: 1440, height: 900, mobile: false },
  { name: "desktop-pt-1024", path: "/pt/", width: 1024, height: 768, mobile: false },
  { name: "tablet-pt-820", path: "/pt/", width: 820, height: 1180, mobile: true },
  { name: "mobile-pt-390", path: "/pt/", width: 390, height: 844, mobile: true },
  { name: "mobile-en-390", path: "/en/", width: 390, height: 844, mobile: true },
  { name: "mobile-pt-320", path: "/pt/", width: 320, height: 640, mobile: true },
]

const loadImages = `Promise.all([...document.images].map((img) => {
  img.loading = "eager"
  return Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 4000))])
}))`

const measure = `(() => {
  const el = document.querySelector(${JSON.stringify(selector)})
  const r = el.getBoundingClientRect()
  const vw = document.documentElement.clientWidth
  const wide = [...el.querySelectorAll("*")]
    .filter((n) => { const b = n.getBoundingClientRect(); return b.width > 0 && (b.right > vw + 0.5 || b.left < -0.5) })
    .filter((n) => !n.closest("[aria-hidden='true']"))
    .map((n) => n.tagName.toLowerCase() + "." + String(n.className).split(" ")[0])
  return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height, vw, scrollWidth: document.documentElement.scrollWidth, wide: wide.slice(0, 5) }
})()`

mkdirSync(outDir, { recursive: true })
const chrome = await launch({ port: 9336 })
const rows = []
try {
  for (const vp of viewports) {
    // Final state of the whole section.
    await chrome.emulate({ ...vp, scale: 1, reduceMotion: true })
    await chrome.navigate(base + vp.path)
    await chrome.evaluate(loadImages)
    await sleep(500)
    const box = await chrome.evaluate(measure)
    const { data } = await chrome.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height, scale: 1 },
    })
    writeFileSync(path.join(outDir, `${vp.name}.png`), Buffer.from(data, "base64"))

    // With motion: scroll the section in and capture what a visitor sees.
    await chrome.emulate({ ...vp, reduceMotion: false })
    await chrome.navigate(base + vp.path)
    await chrome.evaluate(loadImages)
    await chrome.evaluate(`window.scrollTo(0, document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top + scrollY - 40)`)
    await sleep(900)
    writeFileSync(path.join(outDir, `${vp.name}-motion.png`), await chrome.screenshot())

    rows.push({ shot: vp.name, vw: box.vw, scrollW: box.scrollWidth, sectionH: Math.round(box.height), overflow: box.wide.join(", ") || "none" })
  }
} finally {
  chrome.close()
}
console.table(rows)
writeFileSync(path.join(outDir, "report.json"), JSON.stringify(rows, null, 2))
if (rows.some((r) => r.scrollW > r.vw || r.overflow !== "none")) process.exitCode = 1
