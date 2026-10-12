import { anchors, dictionaries } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container, grid, section } from "@/lib/layout"
import { LinkRow } from "@/components/link-row"
import { ResponsiveImage } from "@/components/responsive-image"
import { SectionHeading } from "@/components/section-heading"
import { TralynShowcase } from "@/components/tralyn-showcase"

const frame = "overflow-hidden rounded-[2px] border border-rule bg-ink-raised"

export function Work({ lang }: { lang: Locale }) {
  const { work } = home[lang]
  const { newTab } = dictionaries[lang]
  const { runflow, clients, linksLabel } = work

  return (
    <section id={anchors[lang].work} aria-labelledby="work-title" className={section}>
      <div className={container}>
        <SectionHeading id="work-title" index={work.index} title={work.title} intro={work.intro} />
      </div>

      {/* 01 · Tralyn: the cinematic showcase */}
      <TralynShowcase lang={lang} />

      {/* 02 · RunFlow: image left, a short honest account on the right */}
      <div className={container}>
        <article aria-labelledby="runflow-title" className={`${grid} mt-20 gap-y-8 md:mt-24 lg:items-center`}>
          <figure className="col-span-4 md:col-span-8 lg:col-span-7">
            <div className={`reveal-media ${frame}`}>
              <ResponsiveImage
                name="runflow"
                widths={[640, 960, 1343]}
                width={1343}
                height={607}
                alt={runflow.imageAlt}
                sizes="(min-width: 1440px) 770px, (min-width: 1024px) 54vw, 92vw"
                className="h-auto w-full"
              />
            </div>
          </figure>

          <div className="reveal col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="label flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-blue">02</span>
              <span className="text-paper-muted">{runflow.kicker}</span>
            </p>
            <h3 id="runflow-title" className="mt-4 font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-none text-paper">
              {runflow.title}
            </h3>
            <p className="mt-5 text-paper-muted">{runflow.lead}</p>
            <p className="stack-line mt-5">{runflow.stack}</p>
            <LinkRow links={runflow.links} newTab={newTab} label={`${linksLabel}: ${runflow.title}`} className="mt-6" />
            <p className="mt-5 flex gap-2.5 text-sm text-paper-muted">
              <span aria-hidden="true" className="text-blue">●</span>
              {runflow.note}
            </p>
          </div>
        </article>

        {/* 03 and 04 · client work, as a pair */}
        <div className="mt-20 border-t border-rule pt-10 md:mt-28">
          <div className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="font-display text-title text-paper">{clients.title}</h3>
            <p className="stack-line">{clients.stack}</p>
          </div>

          <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-6 lg:gap-12">
            {clients.items.map((client, i) => {
              const media = i === 0 ? "sohard" : "gsa"
              const id = `${media}-title`
              return (
                <article key={client.title} aria-labelledby={id} className={i === 1 ? "md:mt-20" : undefined}>
                  <figure className="relative">
                    <div className={`reveal-media ${frame}`}>
                      <ResponsiveImage
                        name={media}
                        widths={[640, 960, 1400]}
                        width={1400}
                        height={media === "sohard" ? 722 : 726}
                        alt={client.imageAlt}
                        sizes="(min-width: 1440px) 650px, (min-width: 768px) 46vw, 92vw"
                        className="h-auto w-full"
                      />
                    </div>
                    {client.mobileAlt && (
                      <div className={`reveal-media ${frame} absolute -bottom-8 right-4 w-[24%] max-w-[9rem] shadow-[0_24px_48px_-12px_rgb(0_0_0/0.6)]`}>
                        <ResponsiveImage
                          name="sohard-mobile"
                          widths={[200, 400]}
                          width={780}
                          height={1400}
                          alt={client.mobileAlt}
                          sizes="144px"
                          className="h-auto w-full"
                        />
                      </div>
                    )}
                  </figure>

                  <div className={`reveal ${client.mobileAlt ? "mt-14" : "mt-7"}`}>
                    <p className="label flex flex-wrap gap-x-3 gap-y-1">
                      <span className="text-blue">{String(i + 3).padStart(2, "0")}</span>
                      <span className="text-paper-muted">{client.kicker}</span>
                    </p>
                    <h4 id={id} className="mt-3 font-display text-title text-paper">
                      {client.title}
                    </h4>
                    <p className="mt-3 max-w-[34rem] text-paper-muted">{client.lead}</p>
                    <LinkRow links={client.links} newTab={newTab} label={`${linksLabel}: ${client.title}`} className="mt-5" />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
