"use client"

import type { ReactNode } from "react"
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "motion/react"

// Scroll distance (px) over which the hero hands over to the next section.
const HANDOFF = 720

/**
 * Ties a hero layer to the native scroll position: it drifts and dims as the page moves on.
 * Transform and opacity only; nothing is pinned and scrolling is never intercepted.
 * With reduced motion the ranges collapse to no-ops, so server and client markup stay identical.
 */
export function ScrollLayer({
  children,
  drift = -48,
  fadeTo = 1,
  className,
}: {
  children: ReactNode
  drift?: number
  fadeTo?: number
  className?: string
}) {
  const still = useReducedMotion() === true
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, HANDOFF], [0, still ? 0 : drift], { clamp: true })
  const opacity = useTransform(scrollY, [0, HANDOFF], [1, still ? 1 : fadeTo], { clamp: true })

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className={className} style={{ y, opacity }}>
        {children}
      </m.div>
    </LazyMotion>
  )
}
