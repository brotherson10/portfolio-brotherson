import { useState } from "react"
import { Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons"
import { useReveal, revealBase, revealHidden, revealVisible } from "@/lib/useReveal"
import { cn } from "@/lib/utils"

export function Contact() {
  const { content: c } = useLanguage()
  const { ref, visible, style } = useReveal<HTMLDivElement>()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(c.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <Section id="contact" className="py-20 md:py-28">
      <div
        ref={ref}
        style={style}
        className={cn(
          revealBase,
          visible ? revealVisible : revealHidden,
          "mx-auto max-w-2xl rounded-sm border border-hairline bg-surface px-6 py-12 text-center sm:px-14"
        )}
      >
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-azure uppercase">{c.contact.eyebrow}</p>
        <h2 className="font-mono text-3xl font-semibold tracking-tight md:text-5xl">
          {c.contact.titleLead} <em className="text-azure not-italic">{c.contact.titleEmphasis}</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">{c.contact.text}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="h-11 gap-2 px-6 font-mono text-sm">
            <a
              href="https://wa.me/351933368428?text=Ol%C3%A1%20Brotherson!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappIcon className="size-4" />
              {c.contact.actions.whatsapp}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 gap-2 px-6 font-mono text-sm">
            <a href="https://www.linkedin.com/in/brotherson/" target="_blank" rel="noreferrer">
              <LinkedinIcon className="size-4" />
              {c.contact.actions.linkedin}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 gap-2 px-6 font-mono text-sm">
            <a href="https://github.com/brotherson10/" target="_blank" rel="noreferrer">
              <GithubIcon className="size-4" />
              {c.contact.actions.github}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="h-11 gap-2 px-6 font-mono text-sm" onClick={copyEmail}>
            <Mail className="size-4" />
            {c.contact.actions.copyEmail}
          </Button>
        </div>

        <p className="mt-8 font-mono text-sm text-muted-foreground">{c.contact.email}</p>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-7 left-1/2 z-[100] -translate-x-1/2 rounded-sm border border-azure bg-ink px-5 py-3 font-mono text-sm text-azure transition-all duration-300",
          copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        {c.contact.copiedToast}
      </div>
    </Section>
  )
}
