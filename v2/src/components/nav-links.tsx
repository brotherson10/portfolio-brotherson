"use client"

import { useEffect, useState } from "react"

type Item = { href: string; label: string }

/**
 * Desktop navigation with the section currently in view marked (`aria-current="location"`
 * plus a drawn rule). Without JS it is a plain list of in-page links.
 */
export function NavLinks({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    // A section counts as current while it crosses a band just below the header.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    )
    sections.forEach((el) => observer.observe(el))

    // Back above the first section (the hero): nothing is current.
    const onScroll = () => {
      const first = sections[0]
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.3) setActive(null)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [items])

  return (
    <nav aria-label={label}>
      <ol className="flex items-center gap-8">
        {items.map((item, i) => {
          const current = active === item.href
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={`group flex items-baseline gap-2 text-[0.9375rem] transition-colors hover:text-paper ${current ? "text-paper" : "text-paper-muted"}`}
              >
                <span className="label text-[0.6875rem] text-blue">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`bg-[linear-gradient(currentColor,currentColor)] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] ${current ? "bg-[length:100%_1px]" : "bg-[length:0%_1px]"}`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
