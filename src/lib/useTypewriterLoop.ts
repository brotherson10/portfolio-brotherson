import { useEffect, useState } from "react"

const TYPE_MS = 85
const DELETE_MS = 45
const HOLD_MS = 1600
const PAUSE_MS = 400

export function useTypewriterLoop(text: string) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let charIndex = 0
    let deleting = false
    let timeoutId: number

    const tick = () => {
      let delay = deleting ? DELETE_MS : TYPE_MS

      if (!deleting && charIndex === text.length) {
        delay = HOLD_MS
        deleting = true
      } else if (deleting && charIndex === 0) {
        deleting = false
        delay = PAUSE_MS
      } else {
        charIndex += deleting ? -1 : 1
      }

      setDisplay(text.slice(0, charIndex))
      timeoutId = window.setTimeout(tick, delay)
    }

    setDisplay("")
    timeoutId = window.setTimeout(tick, TYPE_MS)

    return () => window.clearTimeout(timeoutId)
  }, [text])

  return display
}
