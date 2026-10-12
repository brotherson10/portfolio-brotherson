import { grid } from "@/lib/layout"

/** Editorial section opener: index and rule, serif title, and an intro set against it. */
export function SectionHeading({
  id,
  index,
  title,
  intro,
}: {
  id: string
  index: string
  title: string
  intro?: string
}) {
  return (
    <div className={`${grid} items-end gap-y-6`}>
      <div className="reveal col-span-4 md:col-span-8 lg:col-span-7">
        <p className="label flex items-center gap-3">
          <span className="text-blue">{index}</span>
          <span aria-hidden="true" className="draw-on-view block h-px w-8 bg-blue" />
        </p>
        <h2 id={id} className="mt-5 font-display text-headline text-paper">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="reveal col-span-4 max-w-[36rem] text-lead text-paper-muted md:col-span-6 lg:col-span-5">{intro}</p>
      )}
    </div>
  )
}
