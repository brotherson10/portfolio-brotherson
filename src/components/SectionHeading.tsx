import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"

export function SectionTitle({ text, trailing }: { text: string; trailing?: ReactNode }) {
  const { ref, visible, style } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        revealBase,
        visible ? revealVisible : revealHidden,
        "mb-11 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end"
      )}
    >
      <h2 className="font-mono text-lg font-semibold tracking-[0.04em] text-azure uppercase md:text-[1.8rem]">
        {text}
      </h2>
      {trailing}
    </div>
  )
}
