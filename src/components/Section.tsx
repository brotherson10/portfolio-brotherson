import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("mx-auto w-[calc(100%-2.5rem)] max-w-[1140px]", className)}>
      {children}
    </section>
  )
}
