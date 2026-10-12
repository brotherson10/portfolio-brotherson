import type { ReactNode } from "react"

export function ExternalLink({
  href,
  newTabLabel,
  className,
  children,
}: {
  href: string
  newTabLabel: string
  className?: string
  children: ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  )
}
