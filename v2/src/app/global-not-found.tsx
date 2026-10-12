import type { Metadata } from "next"
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

// The site has two root layouts (the "/" redirect and /[lang]), so the 404 is a global page that
// brings its own styles and fonts. Bilingual on one page, since the language is unknown here.
// Exported as out/404.html, which Netlify serves for any unmatched URL.

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

export const metadata: Metadata = {
  title: "404 · Brotherson Américo",
  // Next adds noindex to not-found pages itself.
}

export default function GlobalNotFound() {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <main className="mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-4 py-20 md:px-8 lg:px-12">
          <p className="label flex items-center gap-3 text-blue">
            404
            <span aria-hidden="true" className="block h-px w-8 bg-blue" />
            <span className="text-paper-muted">Brotherson Américo</span>
          </p>
          <h1 className="mt-6 font-display text-headline text-paper">Página não encontrada.</h1>
          <p lang="en" className="mt-2 font-display text-title text-paper-muted italic">
            Page not found.
          </p>
          <ul className="mt-12 flex flex-col gap-4 text-[1.0625rem] sm:flex-row sm:gap-10">
            <li>
              <a href="/pt/" hrefLang="pt-PT" className="link text-paper">
                Ir para a página inicial <span aria-hidden="true">→</span>
              </a>
            </li>
            <li>
              <a href="/en/" hrefLang="en" lang="en" className="link text-paper">
                Go to the home page <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </main>
      </body>
    </html>
  )
}
