import { dictionaries } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container } from "@/lib/layout"
import { LanguageSwitch } from "@/components/language-switch"

export function SiteFooter({ lang }: { lang: Locale }) {
  const { footer } = home[lang]
  const { header } = dictionaries[lang]

  return (
    <footer className="border-t border-rule">
      <div className={`${container} flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="label text-paper-subtle">{footer.rights}</p>
        <div className="flex items-center gap-8">
          <a href="#conteudo" className="link text-[0.9375rem] text-paper">
            {footer.backToTop} <span aria-hidden="true">↑</span>
          </a>
          <LanguageSwitch lang={lang} label={header.languageLabel} />
        </div>
      </div>
    </footer>
  )
}
