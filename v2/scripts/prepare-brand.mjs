// Generates the favicon, app icons and Open Graph images. Each one is a small HTML composition
// rendered in headless Chrome on top of the local preview, so it uses the site's own fonts,
// colours and the original portrait (pixels untouched; the same CSS grade and mask as the hero).
//
//   npm run build && npm run preview   (in another terminal)
//   npm run brand                      then build again so the files are exported
//
// Writes: src/app/favicon.ico (16/32/48), src/app/icon.png (512), src/app/apple-icon.png (180),
//         public/og/og-pt.png and public/og/og-en.png (1200 × 630).
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"
import { launch, sleep } from "./lib/cdp.mjs"

const root = path.resolve(import.meta.dirname, "..")
const base = process.env.PREVIEW_URL ?? "http://localhost:4173"

const icon = `
  <div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0b0c0f">
    <div style="position:relative;line-height:1">
      <span style="font-family:var(--font-display);font-size:330px;letter-spacing:-0.045em;color:#ece8e1">BA</span>
      <span style="position:absolute;left:4px;right:4px;bottom:-26px;height:22px;background:#8fb3ff"></span>
    </div>
  </div>`

const og = (headline, emphasis, layers) => `
  <div style="position:fixed;inset:0;overflow:hidden;background:#0b0c0f">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse 45% 70% at 80% 40%, rgb(91 132 245 / 0.16), transparent 70%)"></div>
    <img src="/images/portrait-880.webp" class="portrait-grade" alt=""
      style="position:absolute;right:0;top:0;height:630px;width:500px;object-fit:cover;object-position:50% 8%;
      -webkit-mask-image:linear-gradient(to right, transparent 0%, #000 38%, #000 90%, transparent 100%), linear-gradient(to bottom, #000 62%, transparent 98%);
      -webkit-mask-composite:source-in;mask-composite:intersect" />
    <div style="position:absolute;left:72px;top:64px;right:420px">
      <p style="margin:0;display:flex;align-items:center;gap:16px;font-family:var(--font-mono);font-size:20px;letter-spacing:0.14em;text-transform:uppercase;color:#8fb3ff">
        00<span style="display:block;width:44px;height:2px;background:#8fb3ff"></span><span style="color:#a6a29a">brotherson.dev</span>
      </p>
      <h1 style="margin:34px 0 0;font-family:var(--font-display);font-weight:400;font-size:104px;line-height:0.92;letter-spacing:-0.02em;color:#ece8e1">Brotherson<br/>Américo</h1>
      <p style="margin:28px 0 0;font-family:var(--font-sans);font-weight:500;font-size:36px;color:#ece8e1">Full Stack Developer</p>
      <p style="margin:14px 0 0;font-family:var(--font-display);font-size:40px;color:#a6a29a">${headline} <em style="color:#8fb3ff">${emphasis}</em></p>
    </div>
    <div style="position:absolute;left:72px;right:72px;bottom:48px;border-top:2px solid #3a3f4b;display:grid;grid-template-columns:repeat(3,1fr);padding-top:16px">
      ${layers.map((l, i) => `<span style="position:relative;font-family:var(--font-mono);font-size:18px;letter-spacing:0.12em;text-transform:uppercase;color:#ece8e1">
        <span style="position:absolute;left:0;top:-23px;width:2px;height:12px;background:#8fb3ff"></span><span style="color:#8fb3ff">0${i + 1}</span> ${l}</span>`).join("")}
    </div>
  </div>`

const compositions = [
  { name: "icon", width: 512, height: 512, html: icon },
  { name: "og-pt", width: 1200, height: 630, html: og("Da interface à", "arquitetura.", ["Interface", "Servidor", "Dados"]) },
  { name: "og-en", width: 1200, height: 630, html: og("From interface to", "architecture.", ["Interface", "Server", "Data"]) },
]

// A .ico that simply wraps PNG images (supported by every current browser). Next decodes it at
// build time and requires RGBA PNGs, hence ensureAlpha() below.
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i
    header.writeUInt8(size >= 256 ? 0 : size, e)
    header.writeUInt8(size >= 256 ? 0 : size, e + 1)
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(data.length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...pngs.map((p) => p.data)])
}

const chrome = await launch({ port: 9342 })
const shots = {}
try {
  for (const c of compositions) {
    await chrome.emulate({ width: c.width, height: c.height, scale: 1, reduceMotion: true })
    await chrome.navigate(`${base}/pt/`)
    // Let React hydrate first; replacing the DOM earlier makes it re-render the original page.
    await sleep(2500)
    await chrome.evaluate(`(async () => {
      document.body.innerHTML = ${JSON.stringify(c.html)}
      document.documentElement.style.overflow = "hidden"
      await document.fonts.ready
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
    })()`)
    await sleep(400)
    shots[c.name] = await chrome.screenshot()
  }
} finally {
  chrome.close()
}

mkdirSync(path.join(root, "public", "og"), { recursive: true })
for (const lang of ["pt", "en"]) {
  const file = path.join(root, "public", "og", `og-${lang}.png`)
  await sharp(shots[`og-${lang}`]).png({ compressionLevel: 9 }).toFile(file)
  console.log(path.relative(root, file))
}
const app = path.join(root, "src", "app")
await sharp(shots.icon).png().toFile(path.join(app, "icon.png"))
await sharp(shots.icon).resize(180).png().toFile(path.join(app, "apple-icon.png"))
const sizes = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await sharp(shots.icon).resize(size).ensureAlpha().png().toBuffer() })))
writeFileSync(path.join(app, "favicon.ico"), ico(sizes))
console.log("src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico")
