// Minimal static server for the exported site in ./out (no extra dependency).
import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..", "out")
const port = Number(process.env.PORT ?? 4173)
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
}

async function resolveFile(urlPath) {
  const target = path.join(root, decodeURIComponent(urlPath))
  if (!target.startsWith(root)) return null
  try {
    const info = await stat(target)
    return info.isDirectory() ? path.join(target, "index.html") : target
  } catch {
    return null
  }
}

createServer(async (req, res) => {
  const urlPath = new URL(req.url ?? "/", "http://localhost").pathname
  const file = (await resolveFile(urlPath)) ?? path.join(root, "404.html")
  try {
    const body = await readFile(file)
    res.writeHead(file.endsWith("404.html") && !urlPath.endsWith("404.html") ? 404 : 200, {
      "content-type": types[path.extname(file)] ?? "application/octet-stream",
    })
    res.end(body)
  } catch {
    res.writeHead(404).end("Not found")
  }
}).listen(port, () => console.log(`Preview: http://localhost:${port}/pt/`))
