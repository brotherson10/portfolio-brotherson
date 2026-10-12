import type { CSSProperties } from "react"
import { anchors, dictionaries, links } from "@/content/dictionaries"
import type { Locale } from "@/lib/i18n"
import { ExternalLink } from "@/components/external-link"
import { Portrait } from "@/components/portrait"
import { ScrollLayer } from "@/components/scroll-layer"

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties
const line = (i: number) => ({ "--i": i }) as CSSProperties

// Width of the longest headline line, in em of Instrument Serif: measured in the browser
// (PT 4.77, EN 5.12) plus ~0.12em for the italic overhang. The display size is the largest
// that lets that line fit the available width, capped by --text-display-max
// (see .display-fit in globals.css). Re-measure if the headline copy changes.
const headlineMeasure: Record<Locale, number> = { pt: 4.9, en: 5.25 }

const grid =
  "mx-auto grid max-w-[1440px] grid-cols-4 gap-x-4 px-4 md:grid-cols-8 md:gap-x-6 md:px-8 lg:grid-cols-12 lg:px-12"

export function Hero({ lang }: { lang: Locale }) {
  const { hero, newTab } = dictionaries[lang]
  const workHref = `#${anchors[lang].work}`

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-x-clip [--portrait-h:min(100vw,38svh)]">
      <div
        className={`${grid} gap-y-8 pt-8 pb-12 md:gap-y-10 md:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-rows-[auto_auto_1fr_auto] lg:gap-y-10 lg:pt-16 lg:pb-10`}
      >
        {/* Identity: who and what, before the statement */}
        <ScrollLayer drift={-40} fadeTo={0.3} className="relative z-10 col-span-4 md:col-span-5 lg:col-span-7">
          <p className="label enter flex items-center gap-3" style={delay(0)}>
            <span className="text-blue">{hero.index}</span>
            <span aria-hidden="true" className="enter-draw-x block h-px w-8 bg-blue" style={delay(100)} />
            <span className="text-paper-muted">{hero.name}</span>
          </p>
          <p className="enter mt-3 text-lg font-medium tracking-[0.005em] text-paper md:text-xl" style={delay(80)}>
            {hero.role}
          </p>
        </ScrollLayer>

        {/* Portrait: full bleed on phones; from tablet up, anchored to the right edge beside the
            headline (a 3:4 frame on tablet, the full hero height on desktop) */}
        <ScrollLayer
          drift={-24}
          className="col-span-4 -mx-4 md:absolute md:top-0 md:right-0 md:z-0 md:mx-0 md:aspect-[3/4] md:w-[46vw] lg:inset-y-0 lg:aspect-auto lg:w-[36vw] xl:w-[min(42vw,680px)]"
        >
          <Portrait alt={hero.portraitAlt} />
        </ScrollLayer>

        {/* Statement: the main element. On phones it overlaps the faded lower 38% of the portrait. */}
        <ScrollLayer
          drift={-56}
          fadeTo={0.25}
          className="relative z-10 col-span-4 max-md:-mt-[calc(var(--portrait-h)*0.38+2rem)] md:col-span-5 md:row-start-2 lg:col-span-8"
        >
          <h1
            id="hero-title"
            className="display-fit font-display text-paper"
            style={{ "--measure": headlineMeasure[lang] } as CSSProperties}
          >
            <span className="mask-line">
              <span style={line(0)}>{hero.titleLines[0]}</span>
            </span>
            <span className="mask-line">
              <span style={line(1)}>
                {hero.titleLines[1]} <em className="text-blue">{hero.titleEmphasis}</em>
              </span>
            </span>
          </h1>
        </ScrollLayer>

        {/* Lead, actions, profiles */}
        <ScrollLayer
          drift={-32}
          fadeTo={0.4}
          className="relative z-10 col-span-4 md:col-span-5 md:row-start-3 lg:col-span-6 lg:self-start"
        >
          <p className="enter max-w-[34rem] text-lead text-paper-muted" style={delay(450)}>
            {hero.lead}
          </p>

          <div className="enter mt-8 flex flex-wrap gap-3" style={delay(560)}>
            <a href={workHref} className="btn btn-primary">
              {hero.ctaPrimary}
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </a>
            <a href={links.email} className="btn btn-secondary">
              {hero.ctaSecondary}
            </a>
          </div>

          <ul aria-label={hero.socialLabel} className="enter mt-7 flex gap-6 text-[0.9375rem] text-paper" style={delay(640)}>
            <li>
              <ExternalLink href={links.github} newTabLabel={newTab} className="link">
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.linkedin} newTabLabel={newTab} className="link">
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </ScrollLayer>

        {/* The one construction line: an axis from interface to data, the headline made literal. */}
        <div className="enter relative z-10 col-span-4 md:col-span-8 lg:col-span-12" style={delay(800)}>
          <ol aria-label={hero.layersLabel} className="relative grid grid-cols-3 gap-x-4 pt-4 md:gap-x-6">
            <span aria-hidden="true" className="enter-draw-x absolute inset-x-0 top-0 h-px bg-rule-strong" style={delay(900)} />
            {hero.layers.map((layer) => (
              <li key={layer.index} className="relative min-w-0">
                <span aria-hidden="true" className="absolute -top-[calc(1rem+3px)] left-0 h-[7px] w-px bg-blue" />
                <p className="label flex flex-wrap gap-x-2 text-paper">
                  <span className="text-blue">{layer.index}</span>
                  {layer.label}
                </p>
                <p className="label mt-1 truncate normal-case tracking-normal text-paper-subtle">{layer.stack}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label -- text comes from the dictionary */}
            <a
              href={workHref}
              className="group col-span-4 flex items-end justify-between gap-4 self-end md:col-span-8 lg:col-span-4 lg:col-start-9"
            >
              <span className="flex flex-col gap-1.5">
                <span className="label text-paper-subtle">{hero.next.label}</span>
                <span className="font-display text-title text-paper transition-colors group-hover:text-blue-soft">
                  01 · {hero.next.target}
                </span>
              </span>
              <span aria-hidden="true" className="relative mb-1 block h-10 w-px overflow-hidden bg-rule-strong">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-blue transition-transform duration-500 ease-out group-hover:translate-y-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
