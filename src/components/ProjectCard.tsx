import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"
import type { ProjectMeta } from "@/data/projects"
import type { Content } from "@/lib/content"

type ProjectContent = Content["projects"]["items"][number]

export function ProjectCard({
  meta,
  data,
  linkLabels,
  delay,
}: {
  meta: ProjectMeta
  data: ProjectContent
  linkLabels: Content["projects"]["linkLabels"]
  delay: number
}) {
  const { ref, visible, style } = useReveal<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      style={style}
      className={cn(revealBase, visible ? revealVisible : revealHidden, meta.featured && "md:col-span-2")}
    >
    <Card className="gap-0 rounded-sm border border-hairline bg-surface py-0 ring-0 transition-colors duration-300 hover:border-azure/60">
      <div className={cn("overflow-hidden bg-surface-2", meta.featured ? "h-64" : "h-52")}>
        <img src={meta.image} alt={data.title} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <CardHeader className="mt-5 px-5">
        <CardTitle className="text-lg">{data.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-5 pt-2 pb-5">
        <p className="text-sm text-muted-foreground">{data.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-sm border-hairline font-mono text-[0.65rem] text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <a
            href={meta.demoHref}
            target="_blank"
            rel="noreferrer"
            className="border-b border-azure font-mono text-xs font-medium text-azure"
          >
            {linkLabels.view}
          </a>
          {meta.repos.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-muted-foreground/40 font-mono text-xs font-medium text-muted-foreground hover:border-paper hover:text-paper"
            >
              {linkLabels[repo.type]}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
