import type { Locale } from "@/lib/i18n"

export const links = {
  github: "https://github.com/brotherson10",
  linkedin: "https://www.linkedin.com/in/brotherson/",
  email: "mailto:brotherson100@gmail.com",
}

export type SectionKey = "work" | "approach" | "about" | "contact"

/** In-page anchors, localised so EN URLs read /en/#work rather than /en/#trabalho. */
export const anchors: Record<Locale, Record<SectionKey, string>> = {
  pt: { work: "trabalho", approach: "abordagem", about: "sobre", contact: "contacto" },
  en: { work: "work", approach: "approach", about: "about", contact: "contact" },
}

type Layer = { index: string; label: string; stack: string }

type Dictionary = {
  meta: { title: string; description: string; ogAlt: string }
  skipLink: string
  newTab: string
  header: {
    role: string
    nav: { key: SectionKey; label: string }[]
    navLabel: string
    languageLabel: string
    menuOpen: string
    menuClose: string
  }
  hero: {
    index: string
    name: string
    role: string
    titleLines: [string, string]
    titleEmphasis: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    socialLabel: string
    portraitAlt: string
    layersLabel: string
    layers: [Layer, Layer, Layer]
    next: { label: string; target: string }
  }
}

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    meta: {
      title: "Brotherson Américo · Full Stack Developer",
      description:
        "Full Stack Developer. Aplicações web completas, com atenção à experiência de quem utiliza e à engenharia que as sustenta.",
      ogAlt: "Brotherson Américo, Full Stack Developer, de óculos e camisa verde, ao lado do título Da interface à arquitetura.",
    },
    skipLink: "Saltar para o conteúdo",
    newTab: "(abre num novo separador)",
    header: {
      role: "Full Stack Developer",
      nav: [
        { key: "work", label: "Trabalho" },
        { key: "approach", label: "Abordagem" },
        { key: "about", label: "Sobre" },
        { key: "contact", label: "Contacto" },
      ],
      navLabel: "Navegação principal",
      languageLabel: "Idioma",
      menuOpen: "Menu",
      menuClose: "Fechar",
    },
    hero: {
      index: "00",
      name: "Brotherson Américo",
      role: "Full Stack Developer",
      titleLines: ["Da interface", "à"],
      titleEmphasis: "arquitetura.",
      lead: "Desenvolvo aplicações web completas, com atenção à experiência de quem utiliza e à engenharia que as sustenta.",
      ctaPrimary: "Ver projetos",
      ctaSecondary: "Escrever-me",
      socialLabel: "Perfis",
      portraitAlt: "Brotherson Américo, de óculos e camisa verde, sorri de braços cruzados.",
      layersLabel: "As camadas em que trabalho",
      layers: [
        { index: "01", label: "Interface", stack: "React · Next.js" },
        { index: "02", label: "Servidor", stack: "Node.js · APIs" },
        { index: "03", label: "Dados", stack: "PostgreSQL" },
      ],
      next: { label: "A seguir", target: "Trabalho selecionado" },
    },
  },
  en: {
    meta: {
      title: "Brotherson Américo · Full Stack Developer",
      description:
        "Full Stack Developer. Complete web applications, with attention to user experience and the engineering behind them.",
      ogAlt: "Brotherson Américo, Full Stack Developer, wearing glasses and a green shirt, beside the title From interface to architecture.",
    },
    skipLink: "Skip to content",
    newTab: "(opens in a new tab)",
    header: {
      role: "Full Stack Developer",
      nav: [
        { key: "work", label: "Work" },
        { key: "approach", label: "Approach" },
        { key: "about", label: "About" },
        { key: "contact", label: "Contact" },
      ],
      navLabel: "Main navigation",
      languageLabel: "Language",
      menuOpen: "Menu",
      menuClose: "Close",
    },
    hero: {
      index: "00",
      name: "Brotherson Américo",
      role: "Full Stack Developer",
      titleLines: ["From interface", "to"],
      titleEmphasis: "architecture.",
      lead: "I build complete web applications, with attention to user experience and the engineering behind them.",
      ctaPrimary: "See projects",
      ctaSecondary: "Write to me",
      socialLabel: "Profiles",
      portraitAlt: "Brotherson Américo, wearing glasses and a green shirt, smiling with arms crossed.",
      layersLabel: "The layers I work across",
      layers: [
        { index: "01", label: "Interface", stack: "React · Next.js" },
        { index: "02", label: "Server", stack: "Node.js · APIs" },
        { index: "03", label: "Data", stack: "PostgreSQL" },
      ],
      next: { label: "Next", target: "Selected work" },
    },
  },
}
