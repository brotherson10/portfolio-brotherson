// Real captures of the Tralyn public demo at laptop proportions (16:10) for the showcase.
// Signs in through the demo's own read-only button ("Explorar demonstração") and only reads.
//
//   node scripts/capture-tralyn.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { launch, sleep } from "./lib/cdp.mjs"

const outDir = path.resolve(import.meta.dirname, "..", "assets-src", "projects")
const base = "https://tralyn.vercel.app"

const clickByText = (text) => `(() => {
  const el = [...document.querySelectorAll("button, a")].find((e) => e.textContent.trim().startsWith(${JSON.stringify(text)}))
  if (!el) return false
  el.click()
  return true
})()`

mkdirSync(outDir, { recursive: true })
const chrome = await launch({ port: 9335 })
try {
  await chrome.emulate({ width: 1440, height: 900, scale: 2, reduceMotion: true })
  await chrome.navigate(base + "/")
  await sleep(1500)
  if (!(await chrome.evaluate(clickByText("Explorar demonstração")))) throw new Error("demo button not found")
  await sleep(600)
  if (!(await chrome.evaluate(clickByText("Entrar")))) throw new Error("sign-in button not found")

  // Wait for the dashboard after sign-in.
  for (let i = 0; i < 40; i++) {
    await sleep(500)
    if (await chrome.evaluate(`document.querySelector("h1")?.textContent.includes("Dashboard") ?? false`)) break
  }
  await sleep(1200)
  writeFileSync(path.join(outDir, "tralyn-laptop-dashboard.png"), await chrome.screenshot())
  console.log("tralyn-laptop-dashboard.png", await chrome.evaluate("location.pathname"))
} finally {
  chrome.close()
}
