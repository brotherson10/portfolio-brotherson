import { useLanguage } from "@/lib/i18n"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"

export function Footer() {
  const { content: c } = useLanguage()
  const { ref, visible, style } = useReveal<HTMLElement>()

  return (
    <footer
      ref={ref}
      style={style}
      className={cn(
        revealBase,
        visible ? revealVisible : revealHidden,
        "border-t border-hairline py-8 text-center font-mono text-xs text-muted-foreground"
      )}
    >
      {c.footer}
    </footer>
  )
}
