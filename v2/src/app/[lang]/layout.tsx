import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google"
import { dictionaries } from "@/content/dictionaries"
import { htmlLang, isLocale, locales } from "@/lib/i18n"
import { assetOrigin, indexable, siteUrl } from "@/lib/site"
import "../globals.css"

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { meta } = dictionaries[lang]
  // Share image: 1200 × 630, composed by scripts/prepare-brand.mjs from the original portrait.
  // Absolute on the deploy that serves it (the preview itself, or the domain in production).
  const image = { url: `${assetOrigin}/og/og-${lang}.png`, width: 1200, height: 630, alt: meta.ogAlt }
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { "pt-PT": "/pt/", en: "/en/", "x-default": "/pt/" },
    },
    // Indexable in production only; deploy previews and branch deploys stay out of indexes.
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: `/${lang}/`,
      siteName: "Brotherson Américo",
      title: meta.title,
      description: meta.description,
      locale: lang === "pt" ? "pt_PT" : "en_US",
      alternateLocale: lang === "pt" ? ["en_US"] : ["pt_PT"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#0b0c0f",
  colorScheme: "dark",
}

// Flags the document before first paint so entrance animations only run when JS is present.
const jsFlag = "document.documentElement.classList.add('js')"

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html
      lang={htmlLang[lang]}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
