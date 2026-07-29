import { useLanguage } from "@/lib/i18n"
import { Section } from "@/components/Section"
import { SectionTitle } from "@/components/SectionHeading"
import { skillIcons } from "@/lib/skillIcons"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"
import type { Content } from "@/lib/content"

function SkillGroup({ group, delay }: { group: Content["skills"]["groups"][number]; delay: number }) {
  const { ref, visible, style } = useReveal<HTMLDivElement>(delay)

  return (
    <div ref={ref} style={style} className={cn(revealBase, visible ? revealVisible : revealHidden, "bg-surface p-6")}>
      <h3 className="mb-4 font-mono text-sm font-semibold">{group.name}</h3>
      <div className="grid grid-cols-3 gap-2">
        {group.items.map((item) => {
          const Icon = skillIcons[item]
          return (
            <div
              key={item}
              className="flex flex-col items-center gap-2 rounded-sm border border-hairline px-2 py-4 text-center transition-colors duration-200 hover:border-azure/60"
            >
              {Icon && <Icon className="size-6 text-paper" aria-hidden />}
              <span className="font-mono text-[0.6rem] tracking-wide text-muted-foreground uppercase">{item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Skills() {
  const { content: c } = useLanguage()

  return (
    <Section id="skills" className="py-20 md:py-28">
      <SectionTitle text={c.skills.eyebrow} />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {c.skills.groups.map((group, i) => (
          <SkillGroup key={group.name} group={group} delay={i * 70} />
        ))}
      </div>
    </Section>
  )
}
