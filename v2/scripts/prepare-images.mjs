// Generates the responsive AVIF/WebP variants used by the prototype.
// Sources are read only: the original portrait from the current site and a real
// screenshot of the Tralyn public demo. Pixels are only resized, cropped and re-encoded;
// any colour treatment happens in CSS so the originals stay untouched.
import sharp from "sharp"
import { mkdirSync, statSync } from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "public", "images")
mkdirSync(outDir, { recursive: true })

const oldSite = (file) => path.resolve(root, "..", "public", "assets", file)
const tralyn = (file) => path.resolve(root, "..", "..", "tralyn-public", "docs", "screenshots", file)
const captured = (file) => path.resolve(root, "assets-src", "projects", file)

const jobs = [
  { name: "portrait", src: oldSite("foto-brotherson.png"), widths: [400, 640, 880, 1120] },
  // Work section. Real captures only: Tralyn public demo, the current site's project
  // screenshots, and phone-width captures of the live client sites (capture-projects.mjs).
  {
    name: "tralyn-mobile",
    src: tralyn("06-mobile-dashboard.png"),
    extract: { left: 0, top: 0, width: 780, height: 1400 },
    widths: [240, 480],
  },
  // Tralyn showcase: dashboard captured at 1440 × 900 (16:10) by capture-tralyn.mjs.
  { name: "tralyn-laptop", src: captured("tralyn-laptop-dashboard.png"), widths: [720, 1100, 1560, 2160] },
  { name: "runflow", src: oldSite("runflow.png"), widths: [640, 960, 1343] },
  { name: "sohard", src: oldSite("sohard-energia-solar.png"), widths: [640, 960, 1400] },
  {
    name: "sohard-mobile",
    src: captured("sohard-mobile.png"),
    extract: { left: 0, top: 0, width: 780, height: 1400 },
    widths: [200, 400],
  },
  { name: "gsa", src: oldSite("gsa-sports.png"), widths: [640, 960, 1400] },
]

for (const job of jobs) {
  for (const width of job.widths) {
    let pipeline = sharp(job.src)
    if (job.extract) pipeline = pipeline.extract(job.extract)
    pipeline = pipeline.resize({ width, withoutEnlargement: true })

    for (const [format, options] of [
      ["avif", { quality: 55, effort: 6 }],
      ["webp", { quality: 78 }],
    ]) {
      const file = path.join(outDir, `${job.name}-${width}.${format}`)
      await pipeline.clone().toFormat(format, options).toFile(file)
      console.log(`${path.basename(file)}  ${(statSync(file).size / 1024).toFixed(0)} KB`)
    }
  }
}
