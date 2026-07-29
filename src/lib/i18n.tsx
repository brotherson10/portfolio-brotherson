import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { content, type Lang } from "@/lib/content"

const STORAGE_KEY = "portfolio-lang"

type LanguageContextValue = {
  lang: Lang
  content: (typeof content)[Lang]
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === "en" ? "en" : "pt"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en"
    document.title = content[lang].meta.title
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      content: content[lang],
      toggle: () => setLang((prev) => (prev === "pt" ? "en" : "pt")),
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
