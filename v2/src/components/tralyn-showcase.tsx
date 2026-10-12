import { dictionaries } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container, grid } from "@/lib/layout"
import { ExternalLink } from "@/components/external-link"
import { ResponsiveImage } from "@/components/responsive-image"

/**
 * Tralyn as the portfolio's cinematic moment: a short editorial column beside a stage where the
 * real dashboard sits in a CSS-built laptop and the real phone view in a CSS-built phone, under a
 * faint blue light. Deliberately light on text: the captures and the demo do the explaining.
 */
export function TralynShowcase({ lang }: { lang: Locale }) {
  const { tralyn, linksLabel } = home[lang].work
  const { newTab } = dictionaries[lang]
  const [demo, ...secondary] = tralyn.links

  return (
    <article aria-labelledby="tralyn-title" className="tralyn-stage relative isolate mt-14 overflow-hidden border-y border-rule py-20 md:mt-20 md:py-24">
      <div aria-hidden="true" className="tralyn-light pointer-events-none absolute inset-0 -z-10" />

      <div className={`${container} ${grid} gap-y-12 lg:items-center`}>
        {/* Editorial zone */}
        <header className="reveal col-span-4 md:col-span-8 lg:col-span-4">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-blue">01</span>
            <span aria-hidden="true" className="draw-on-view block h-px w-8 bg-blue" />
            <span className="text-paper-muted">{tralyn.kicker}</span>
          </p>
          <h3 id="tralyn-title" className="mt-5 font-display text-[clamp(4.25rem,2.4rem+6vw,8rem)] leading-[0.9] tracking-[-0.02em] text-paper">
            {tralyn.title}
          </h3>
          <p className="mt-6 max-w-[30rem] text-lead text-paper-muted">{tralyn.lead}</p>
          <p className="stack-line mt-5">{tralyn.stack}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={demo.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {demo.label}
              <span aria-hidden="true" className="btn-arrow">
                ↗
              </span>
              <span className="sr-only"> {newTab}</span>
            </a>
            <ul aria-label={`${linksLabel}: ${tralyn.title}`} className="flex gap-x-6 text-[0.9375rem] text-paper">
              {secondary.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} newTabLabel={newTab} className="link link-target">
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm text-paper-muted">{tralyn.note}</p>
        </header>

        {/* Visual zone: laptop and phone, both real captures */}
        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
          <div className="device-stage">
            <div className="device-rise">
              <figure className="laptop">
                <div className="laptop-screen">
                  <div className="relative overflow-hidden rounded-[3px]">
                    <ResponsiveImage
                      name="tralyn-laptop"
                      widths={[720, 1100, 1560, 2160]}
                      width={2880}
                      height={1800}
                      alt={tralyn.laptopAlt}
                      sizes="(min-width: 1440px) 820px, (min-width: 1024px) 58vw, 92vw"
                      className="block h-auto w-full"
                    />
                    <span aria-hidden="true" className="screen-glass absolute inset-0" />
                  </div>
                </div>
                <div aria-hidden="true" className="laptop-base" />
              </figure>

              <figure className="phone">
                <div className="phone-body">
                  <div className="overflow-hidden rounded-[1.35rem]">
                    <ResponsiveImage
                      name="tralyn-mobile"
                      widths={[240, 480]}
                      width={780}
                      height={1400}
                      alt={tralyn.mobileAlt}
                      sizes="(min-width: 1024px) 190px, (min-width: 768px) 22vw, 38vw"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </figure>
            </div>
            <div aria-hidden="true" className="device-floor" />
          </div>
          {/* On phones the caption sits in the space left of the phone, below the laptop. */}
          <p className="label mt-6 text-paper-subtle max-md:-mt-12 max-md:pr-[44%] md:mt-10 lg:text-right">{tralyn.screenCaption}</p>
        </div>
      </div>
    </article>
  )
}
