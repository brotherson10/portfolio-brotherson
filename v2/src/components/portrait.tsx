const widths = [400, 640, 880, 1120]
const srcSet = (format: "avif" | "webp") =>
  widths.map((w) => `/images/portrait-${w}.${format} ${w}w`).join(", ")

// Mobile: full-bleed band. Tablet and desktop: anchored to the right edge of the page.
const sizes = "(min-width: 1280px) min(42vw, 680px), (min-width: 1024px) 36vw, (min-width: 768px) 46vw, 100vw"

/**
 * The original photograph, never altered in pixels. Integration with the dark page is done in
 * CSS only: a light grade, a vignette and an edge mask that dissolves the studio backdrop into
 * the page, so the portrait reads as part of the composition rather than a framed print.
 *
 * On phones the band height follows the screen height (--portrait-h) so the headline and the
 * primary action stay in the first screen on short devices too.
 */
export function Portrait({ alt }: { alt: string }) {
  return (
    <div className="portrait-blend enter-photo relative h-(--portrait-h) md:h-full">
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src="/images/portrait-880.webp"
          alt={alt}
          width={1120}
          height={1400}
          fetchPriority="high"
          decoding="async"
          className="portrait-grade absolute inset-0 h-full w-full object-cover object-[50%_4%] md:object-top"
        />
      </picture>
      <div aria-hidden="true" className="portrait-vignette pointer-events-none absolute inset-0" />
    </div>
  )
}
