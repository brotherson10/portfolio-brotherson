import sharp from "sharp"
import { readdirSync, statSync } from "node:fs"
import path from "node:path"

const dir = path.resolve(import.meta.dirname, "..", "public", "assets")
const files = readdirSync(dir).filter((f) => f.endsWith(".png"))

const MAX_WIDTH_SCREENSHOT = 1400
const MAX_WIDTH_PORTRAIT = 900

for (const file of files) {
  const filePath = path.join(dir, file)
  const before = statSync(filePath).size
  const isPortrait = file.includes("foto-brotherson")
  const maxWidth = isPortrait ? MAX_WIDTH_PORTRAIT : MAX_WIDTH_SCREENSHOT

  const image = sharp(filePath)
  const metadata = await image.metadata()

  const buffer = await image
    .resize({ width: Math.min(maxWidth, metadata.width ?? maxWidth), withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toBuffer()

  await sharp(buffer).toFile(filePath)
  const after = statSync(filePath).size
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`)
}
