import type { MetadataRoute } from "next"
import { htmlLang, locales } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

// The two editions, each listing the other (and x-default) as alternates.
const languages = {
  ...Object.fromEntries(locales.map((locale) => [htmlLang[locale], `${siteUrl}/${locale}/`])),
  "x-default": `${siteUrl}/pt/`,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}/`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }))
}
