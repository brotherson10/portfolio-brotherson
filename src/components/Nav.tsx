import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { useActiveSection } from "@/lib/useActiveSection"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Lang } from "@/lib/content"

const SECTION_IDS = ["home", "about", "projects", "skills", "contact"]

function LangSwitch({ lang, toggle }: { lang: Lang; toggle: () => void }) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase">
      <span className={lang === "pt" ? "text-paper" : "text-muted-foreground"}>PT</span>
      <Switch
        checked={lang === "en"}
        onCheckedChange={toggle}
        aria-label="Alternar idioma / Toggle language"
      />
      <span className={lang === "en" ? "text-paper" : "text-muted-foreground"}>EN</span>
    </label>
  )
}

export function Nav() {
  const { lang, content: c, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { ref, visible, style } = useReveal<HTMLElement>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { id: "home", label: c.nav.links.home },
    { id: "about", label: c.nav.links.about },
    { id: "projects", label: c.nav.links.projects },
    { id: "skills", label: c.nav.links.skills },
    { id: "contact", label: c.nav.links.contact },
  ]

  return (
    <header
      ref={ref}
      style={style}
      className={cn(
        revealBase,
        visible ? revealVisible : revealHidden,
        "sticky top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8",
        scrolled ? "border-b border-hairline bg-ink/90 backdrop-blur-sm" : "border-b border-transparent"
      )}
    >
      <a href="#home" className="flex items-center gap-3">
        <span className="flex size-9 -rotate-3 items-center justify-center rounded-md border border-azure font-mono text-sm font-semibold text-azure">
          BA
        </span>
        <span className="font-mono text-sm font-medium tracking-tight">
          Brotherson <em className="text-azure not-italic">Américo</em>
        </span>
      </a>

      <nav className="hidden items-center gap-7 md:flex">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={cn(
              "relative py-1 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-azure after:transition-transform after:duration-200 hover:text-paper hover:after:scale-x-100",
              active === link.id && "text-paper after:scale-x-100"
            )}
          >
            {link.label}
          </a>
        ))}
        <LangSwitch lang={lang} toggle={toggle} />
      </nav>

      <div className="flex items-center gap-3 md:hidden">
        <LangSwitch lang={lang} toggle={toggle} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label={c.nav.openMenu}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="border-hairline bg-ink">
            <nav className="mt-8 mb-4 flex flex-col items-center gap-1">
              {links.map((link) => (
                <SheetClose asChild key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="w-full py-3 text-center font-mono text-sm tracking-[0.14em] text-paper uppercase"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
