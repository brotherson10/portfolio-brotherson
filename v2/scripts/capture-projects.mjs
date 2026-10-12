// Captures real phone-width screenshots of the live client sites (read only: load and capture).
// The PNGs land in assets-src/projects/ and are turned into web variants by prepare-images.mjs.
//
//   node scripts/capture-projects.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { launch, sleep } from "./lib/cdp.mjs"

const outDir = path.resolve(import.meta.dirname, "..", "assets-src", "projects")
const sites = [
  { name: "sohard-mobile", url: "https://sohard-energiasolar.com.br/" },
  { name: "gsa-mobile", url: "https://gsa-sports.com/" },
]

mkdirSync(outDir, { recursive: true })
const chrome = await launch({ port: 9334 })
try {
  for (const site of sites) {
    // Reduced motion so scroll-reveal content is not caught half-way in.
    await chrome.emulate({ width: 390, height: 844, mobile: true, scale: 2, reduceMotion: true })
    await chrome.navigate(site.url)
    await sleep(2500)
    writeFileSync(path.join(outDir, `${site.name}.png`), await chrome.screenshot())
    console.log(`${site.name}.png  ${site.url}`)
  }
} finally {
  chrome.close()
}
