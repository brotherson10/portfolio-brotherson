import { notFound } from "next/navigation"
import { dictionaries } from "@/content/dictionaries"
import { isLocale } from "@/lib/i18n"
import { About } from "@/components/about"
import { Approach } from "@/components/approach"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Work } from "@/components/work"

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const { skipLink } = dictionaries[lang]

  return (
    <>
      <a
        href="#conteudo"
        className="label fixed top-3 left-3 z-50 -translate-y-24 bg-blue px-4 py-3 text-ink transition-transform focus-visible:translate-y-0"
      >
        {skipLink}
      </a>
      <SiteHeader lang={lang} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero lang={lang} />
        <Work lang={lang} />
        <Approach lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
