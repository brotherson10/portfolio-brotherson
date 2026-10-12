import type { ExternalLinkItem } from "@/content/home"
import { ExternalLink } from "@/components/external-link"

export function LinkRow({
  links,
  newTab,
  label,
  className = "",
}: {
  links: ExternalLinkItem[]
  newTab: string
  label: string
  className?: string
}) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-x-6 text-[0.9375rem] text-paper md:gap-y-2 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <ExternalLink href={link.href} newTabLabel={newTab} className="link link-target">
            {link.label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
