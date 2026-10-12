import { anchors } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container, grid } from "@/lib/layout"

/**
 * A short introduction on the left; on the right, the technologies the projects actually prove,
 * grouped by the same layers as the hero axis (text only, no icon grid).
 */
export function About({ lang }: { lang: Locale }) {
  const { about } = home[lang]

  return (
    <section id={anchors[lang].about} aria-labelledby="about-title" className="scroll-mt-20 border-t border-rule pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
      <div className={`${container} ${grid} gap-y-12`}>
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <p className="label reveal flex items-center gap-3">
            <span className="text-blue">{about.index}</span>
            <span aria-hidden="true" className="draw-on-view block h-px w-8 bg-blue" />
          </p>
          <h2 id="about-title" className="reveal mt-5 font-display text-headline text-paper">
            {about.title}
          </h2>
          <p className="reveal mt-8 font-display text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] leading-[1.2] text-paper">
            {about.lead}
          </p>
          <p className="reveal mt-6 max-w-[38rem] text-paper-muted">{about.body}</p>
        </div>

        <div className="reveal col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end">
          <h3 className="label text-paper">{about.stackTitle}</h3>
          <dl className="mt-4 border-t border-rule-strong">
            {about.stack.map((group) => (
              <div key={group.layer} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4">
                <dt className="label pt-0.5 text-blue">{group.layer}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-paper">{group.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
