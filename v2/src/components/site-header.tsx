import { anchors, dictionaries } from "@/content/dictionaries"
import type { Locale } from "@/lib/i18n"
import { LanguageSwitch } from "@/components/language-switch"
import { MobileMenu } from "@/components/mobile-menu"
import { NavLinks } from "@/components/nav-links"

export function SiteHeader({ lang }: { lang: Locale }) {
  const { header } = dictionaries[lang]
  const items = header.nav.map((item) => ({ href: `#${anchors[lang][item.key]}`, label: item.label }))

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8 lg:h-[4.5rem] lg:px-12">
        <a href={`/${lang}/`} className="group flex items-baseline gap-3">
          <span className="font-display text-[1.375rem] leading-none whitespace-nowrap text-paper">Brotherson Américo</span>
          <span className="label hidden text-paper-subtle transition-colors group-hover:text-paper-muted md:inline">
            {header.role}
          </span>
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <NavLinks items={items} label={header.navLabel} />
          <LanguageSwitch lang={lang} label={header.languageLabel} />
        </div>

        <div className="flex items-center gap-5 lg:hidden">
          <LanguageSwitch lang={lang} label={header.languageLabel} />
          <MobileMenu
            items={items}
            navLabel={header.navLabel}
            openLabel={header.menuOpen}
            closeLabel={header.menuClose}
          />
        </div>
      </div>
    </header>
  )
}
