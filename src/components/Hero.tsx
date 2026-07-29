import { useLanguage } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/Section"
import { useTypewriterLoop } from "@/lib/useTypewriterLoop"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="motion-safe:animate-[pulse_5s_ease-in-out_infinite] pointer-events-none absolute -inset-10 rounded-[2.5rem] bg-gradient-to-br from-azure/40 via-iris/35 to-azure-deep/20 opacity-80 blur-3xl"
        aria-hidden
      />

      <div className="relative rounded-[1.75rem] bg-gradient-to-br from-azure via-iris to-azure-deep p-[2px] shadow-[0_30px_70px_-20px_rgba(79,125,255,0.55)]">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-2px)] bg-[radial-gradient(ellipse_75%_75%_at_50%_28%,rgba(143,179,255,0.4),rgba(178,140,240,0.28)_45%,var(--surface)_78%)]">
          <img src={src} alt={alt} className="relative aspect-[4/5] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { content: c } = useLanguage()
  const { hero } = c
  const typedEyebrow = useTypewriterLoop(hero.eyebrow)

  const eyebrowReveal = useReveal<HTMLParagraphElement>(0)
  const titleReveal = useReveal<HTMLHeadingElement>(70)
  const roleReveal = useReveal<HTMLParagraphElement>(140)
  const textReveal = useReveal<HTMLParagraphElement>(210)
  const ctaReveal = useReveal<HTMLDivElement>(280)
  const socialsReveal = useReveal<HTMLDivElement>(350)
  const photoReveal = useReveal<HTMLDivElement>(140)

  return (
    <Section
      id="home"
      className="grid gap-14 pt-8 pb-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-14 md:pb-28"
    >
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
        <p
          ref={eyebrowReveal.ref}
          style={eyebrowReveal.style}
          className={cn(
            revealBase,
            eyebrowReveal.visible ? revealVisible : revealHidden,
            "flex h-4 items-center font-mono text-xs tracking-[0.2em] text-azure uppercase"
          )}
        >
          {typedEyebrow}
          <span className="ml-0.5 animate-pulse" aria-hidden="true">
            |
          </span>
        </p>

        <h1
          ref={titleReveal.ref}
          style={titleReveal.style}
          className={cn(
            revealBase,
            titleReveal.visible ? revealVisible : revealHidden,
            "font-mono text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl"
          )}
        >
          {hero.titleLead} <em className="text-azure not-italic">{hero.titleEmphasis}</em>
        </h1>

        <p
          ref={roleReveal.ref}
          style={roleReveal.style}
          className={cn(
            revealBase,
            roleReveal.visible ? revealVisible : revealHidden,
            "font-mono text-lg font-medium tracking-wide text-iris md:text-xl"
          )}
        >
          {hero.role}
        </p>

        <p
          ref={textReveal.ref}
          style={textReveal.style}
          className={cn(
            revealBase,
            textReveal.visible ? revealVisible : revealHidden,
            "max-w-lg text-muted-foreground md:text-lg"
          )}
        >
          {hero.text}
        </p>

        <div
          ref={ctaReveal.ref}
          style={ctaReveal.style}
          className={cn(
            revealBase,
            ctaReveal.visible ? revealVisible : revealHidden,
            "flex flex-wrap justify-center gap-3 md:justify-start"
          )}
        >
          <Button asChild size="lg" className="h-11 px-6 font-mono text-sm">
            <a href="#projects">{hero.ctaPrimary}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-6 font-mono text-sm">
            <a href="#contact">{hero.ctaSecondary}</a>
          </Button>
        </div>

        <div
          ref={socialsReveal.ref}
          style={socialsReveal.style}
          className={cn(
            revealBase,
            socialsReveal.visible ? revealVisible : revealHidden,
            "flex justify-center gap-3 md:justify-start"
          )}
        >
          <a
            href="https://www.linkedin.com/in/brotherson/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-10 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-azure hover:text-azure"
          >
            <LinkedinIcon className="size-[18px]" />
          </a>
          <a
            href="https://github.com/brotherson10/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-hairline text-muted-foreground transition-colors hover:border-azure hover:text-azure"
          >
            <GithubIcon className="size-[18px]" />
          </a>
        </div>
      </div>

      <div ref={photoReveal.ref} style={photoReveal.style} className={cn(revealBase, photoReveal.visible ? revealVisible : revealHidden)}>
        <PhotoCard src="/assets/foto-brotherson.png" alt="Foto de Brotherson Américo" />
      </div>
    </Section>
  )
}
