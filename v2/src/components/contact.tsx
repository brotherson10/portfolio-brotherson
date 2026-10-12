import { anchors, dictionaries } from "@/content/dictionaries"
import { home } from "@/content/home"
import type { Locale } from "@/lib/i18n"
import { container, grid } from "@/lib/layout"
import { CopyEmail } from "@/components/copy-email"
import { ExternalLink } from "@/components/external-link"

const email = "brotherson100@gmail.com"

/** Closing: one large question, one address, and the other channels as a short ledger. */
export function Contact({ lang }: { lang: Locale }) {
  const { contact } = home[lang]
  const { newTab } = dictionaries[lang]

  return (
    <section id={anchors[lang].contact} aria-labelledby="contact-title" className="scroll-mt-20 border-t border-rule pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
      <div className={container}>
        <p className="label reveal flex items-center gap-3">
          <span className="text-blue">{contact.index}</span>
          <span aria-hidden="true" className="draw-on-view block h-px w-8 bg-blue" />
        </p>
        <h2
          id="contact-title"
          className="reveal mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,1.4rem+5.6vw,7.5rem)] leading-[0.95] tracking-[-0.015em] text-paper"
        >
          {contact.question} <em className="text-blue">{contact.emphasis}</em>
        </h2>

        <div className={`${grid} mt-16 gap-y-12 md:mt-24`}>
          <div className="reveal col-span-4 md:col-span-8 lg:col-span-7">
            <p className="label text-paper-subtle">{contact.emailLabel}</p>
            {/* Sans, not the display serif: in Instrument Serif the 1 in "100" reads as an l. */}
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-block font-sans text-[clamp(1.375rem,0.9rem+2.2vw,2.75rem)] font-light leading-tight tracking-[-0.01em] break-all text-paper underline decoration-rule-strong decoration-1 underline-offset-[0.2em] transition-colors hover:text-blue-soft hover:decoration-current sm:break-normal"
            >
              {email}
            </a>
            <div className="mt-6">
              <CopyEmail email={email} label={contact.copy} copiedLabel={contact.copied} failedLabel={contact.copyFailed} />
            </div>
          </div>

          <div className="reveal col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <h3 className="label text-paper-subtle">{contact.channelsLabel}</h3>
            <ul className="mt-3">
              {contact.channels.map((channel) => (
                <li key={channel.label} className="border-b border-rule">
                  <ExternalLink
                    href={channel.href}
                    newTabLabel={newTab}
                    className="group flex min-h-12 items-baseline justify-between gap-4 py-3 text-paper transition-colors hover:text-blue-soft"
                  >
                    <span>{channel.label}</span>
                    <span className="label ml-auto normal-case tracking-normal text-paper-muted group-hover:text-blue-soft">
                      {channel.value}
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
