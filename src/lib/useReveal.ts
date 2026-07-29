import { useEffect, useRef, useState } from "react"

export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    visible,
    style: delayMs ? { transitionDelay: `${delayMs}ms` } : undefined,
  }
}

export const revealBase = "transition-all duration-500 ease-out motion-reduce:transition-none"
export const revealHidden = "opacity-0 translate-y-2"
export const revealVisible = "opacity-100 translate-y-0"
