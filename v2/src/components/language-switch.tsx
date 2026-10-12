import { htmlLang, locales, type Locale } from "@/lib/i18n"

export function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label} className="label flex items-center gap-1.5 text-paper-subtle">
      {locales.map((locale, i) => {
        const active = locale === lang
        return (
          <span key={locale} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            <a
              href={`/${locale}/`}
              hrefLang={htmlLang[locale]}
              lang={htmlLang[locale]}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "text-paper underline decoration-blue decoration-1 underline-offset-[0.45em]"
                  : "transition-colors hover:text-paper"
              }
            >
              {locale.toUpperCase()}
            </a>
          </span>
        )
      })}
    </nav>
  )
}
