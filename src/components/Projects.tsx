import { useLanguage } from "@/lib/i18n"
import { Section } from "@/components/Section"
import { SectionTitle } from "@/components/SectionHeading"
import { ProjectCard } from "@/components/ProjectCard"
import { projectsMeta } from "@/data/projects"

export function Projects() {
  const { content: c } = useLanguage()

  return (
    <Section id="projects" className="py-20 md:py-28">
      <SectionTitle
        text={c.projects.eyebrow}
        trailing={
          <a
            href="https://github.com/brotherson10"
            target="_blank"
            rel="noreferrer"
            className="border-b border-azure font-mono text-xs text-azure"
          >
            {c.projects.githubCta}
          </a>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {projectsMeta.map((meta, i) => {
          const data = c.projects.items.find((item) => item.key === meta.key)
          if (!data) return null
          return (
            <ProjectCard key={meta.key} meta={meta} data={data} linkLabels={c.projects.linkLabels} delay={(i % 3) * 70} />
          )
        })}
      </div>
    </Section>
  )
}
