import { useLanguage } from "@/lib/i18n"
import { Section } from "@/components/Section"
import { SectionTitle } from "@/components/SectionHeading"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"

function AboutParagraph({ text, delay }: { text: string; delay: number }) {
  const { ref, visible, style } = useReveal<HTMLParagraphElement>(delay)

  return (
    <p
      ref={ref}
      style={style}
      className={cn(revealBase, visible ? revealVisible : revealHidden, "text-muted-foreground")}
    >
      {text}
    </p>
  )
}

function AboutHighlightRow({
  label,
  value,
  index,
  delay,
}: {
  label: string
  value: string
  index: number
  delay: number
}) {
  const { ref, visible, style } = useReveal<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        revealBase,
        visible ? revealVisible : revealHidden,
        "flex flex-col gap-1 py-5",
        index > 0 && "border-t border-hairline"
      )}
    >
      <dt className="font-mono text-xs tracking-[0.16em] text-azure uppercase">{label}</dt>
      <dd className="text-sm text-paper">{value}</dd>
    </div>
  )
}

export function About() {
  const { content: c } = useLanguage()

  return (
    <Section id="about" className="py-20 md:py-28">
      <SectionTitle text={c.about.eyebrow} />
      <div className="grid gap-14 md:grid-cols-[1.3fr_0.7fr]">
        <div className="flex flex-col gap-4">
          {c.about.paragraphs.map((p, i) => (
            <AboutParagraph key={i} text={p} delay={i * 80} />
          ))}
        </div>
        <dl className="flex flex-col">
          {c.about.highlights.map((h, i) => (
            <AboutHighlightRow key={h.label} label={h.label} value={h.value} index={i} delay={i * 80} />
          ))}
        </dl>
      </div>
    </Section>
  )
}
