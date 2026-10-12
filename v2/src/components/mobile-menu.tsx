"use client"

import { useEffect, useId, useRef, useState } from "react"

type Props = {
  items: { href: string; label: string }[]
  navLabel: string
  openLabel: string
  closeLabel: string
}

export function MobileMenu({ items, navLabel, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    // Everything behind the panel becomes unreachable while it is open.
    const main = document.getElementById("conteudo")
    main?.setAttribute("inert", "")
    document.body.style.overflow = "hidden"

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onDesktop = () => desktop.matches && setOpen(false)

    window.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onDesktop)
    return () => {
      main?.removeAttribute("inert")
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onDesktop)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="label flex min-h-11 items-center gap-2 px-1 text-paper"
      >
        <span
          aria-hidden="true"
          className="relative block h-2.5 w-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-current before:transition-transform after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:transition-transform data-[open=true]:before:translate-y-[4.5px] data-[open=true]:before:rotate-45 data-[open=true]:after:-translate-y-[4.5px] data-[open=true]:after:-rotate-45"
          data-open={open}
        />
        {/* Below 375px the header has no room for the word; it stays for screen readers. */}
        <span className="max-[374px]:sr-only">{open ? closeLabel : openLabel}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto border-t border-rule bg-ink px-4 pt-10 pb-12 md:px-8"
      >
        <nav aria-label={navLabel}>
          <ol className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-5 font-display text-5xl leading-none text-paper"
                >
                  <span className="label text-blue">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  )
}
