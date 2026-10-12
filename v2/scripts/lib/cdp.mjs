// Tiny Chrome DevTools Protocol client over Node's built-in WebSocket (no dependency).
// Launches headless Chrome with a throwaway profile and exposes `send`, `navigate` and `close`.
import { spawn } from "node:child_process"
import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

const chromePath = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe"
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Rejects if `promise` has not settled after `ms`, so one stuck step cannot hang a whole run. */
export function withTimeout(promise, ms, what) {
  let timer
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`timed out after ${ms} ms: ${what}`)), ms)
    }),
  ])
}

export async function launch({ port = 9333 } = {}) {
  const profile = mkdtempSync(path.join(tmpdir(), "v2-cdp-"))
  const browser = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ])

  let target
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200)
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      target = list.find((t) => t.type === "page")
    } catch {}
  }
  if (!target) throw new Error("Chrome did not start")

  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener("open", r, { once: true }))
  let seq = 0
  const pending = new Map()
  const listeners = new Map()
  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(msg.error.message))
      else resolve(msg.result)
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method)()
      listeners.delete(msg.method)
    }
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++seq
      pending.set(id, { resolve, reject })
      ws.send(JSON.stringify({ id, method, params }))
    })
  const once = (method) => new Promise((r) => listeners.set(method, r))

  await send("Page.enable")

  return {
    send,
    async emulate({ width, height, mobile = false, scale = mobile ? 2 : 1, reduceMotion = false }) {
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile })
      await send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: reduceMotion ? "reduce" : "no-preference" }],
      })
    },
    async navigate(url) {
      const loaded = once("Page.loadEventFired")
      await send("Page.navigate", { url })
      // Continue after 20 s even without a load event (a slow third-party resource, say).
      await withTimeout(loaded, 20000, `load ${url}`).catch((error) => console.error(error.message))
    },
    async evaluate(expression) {
      const { result } = await withTimeout(
        send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }),
        30000,
        "evaluate",
      )
      return result.value
    },
    async screenshot({ fullPage = false } = {}) {
      const params = { format: "png" }
      if (fullPage) {
        const { cssContentSize } = await send("Page.getLayoutMetrics")
        params.captureBeyondViewport = true
        params.clip = { x: 0, y: 0, width: cssContentSize.width, height: Math.ceil(cssContentSize.height), scale: 1 }
      }
      const { data } = await withTimeout(send("Page.captureScreenshot", params), 90000, "screenshot")
      return Buffer.from(data, "base64")
    },
    close() {
      ws.close()
      browser.kill()
    },
  }
}
