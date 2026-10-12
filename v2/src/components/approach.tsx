import { anchors } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container, section } from "@/lib/layout"
import { SectionHeading } from "@/components/section-heading"

/**
 * The hero's layer axis, expanded into working principles. Same thirds and blue ticks as the
 * hero, so the two read as one construction line: horizontal from tablet up, vertical on phones.
 */
export function Approach({ lang }: { lang: Locale }) {
  const { approach } = home[lang]

  return (
    <section id={anchors[lang].approach} aria-labelledby="approach-title" className={`${section} border-t border-rule`}>
      <div className={container}>
        <SectionHeading id="approach-title" index={approach.index} title={approach.title} intro={approach.intro} />

        <ol className="relative mt-14 grid gap-12 border-l border-rule-strong pl-6 md:mt-20 md:grid-cols-3 md:gap-6 md:border-t md:border-l-0 md:pt-8 md:pl-0">
          {approach.principles.map((p) => (
            <li key={p.index} className="reveal relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[calc(1.5rem+3px)] h-px w-[7px] bg-blue md:-top-[calc(2rem+3px)] md:left-0 md:h-[7px] md:w-px"
              />
              <p className="label text-paper">
                <span className="mr-2 text-blue">{p.index}</span>
                {p.layer}
              </p>
              <h3 className="mt-5 font-display text-title text-paper">{p.title}</h3>
              <p className="mt-4 text-paper-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
