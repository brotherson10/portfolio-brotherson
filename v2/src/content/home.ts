import type { Locale } from "@/lib/i18n"

// Copy for the sections below the hero. Kept deliberately short (16E.3, "less is more"):
// every claim is backed by the project's code or README, with no metrics or explanations.

export type ExternalLinkItem = { label: string; href: string }

type Project = {
  kicker: string
  title: string
  lead: string
  links: ExternalLinkItem[]
}

type Home = {
  work: {
    index: string
    title: string
    intro: string
    linksLabel: string
    tralyn: Project & {
      stack: string
      note: string
      laptopAlt: string
      mobileAlt: string
      screenCaption: string
    }
    runflow: Project & { stack: string; note: string; imageAlt: string }
    clients: {
      title: string
      stack: string
      items: (Project & { imageAlt: string; mobileAlt?: string })[]
    }
  }
  approach: {
    index: string
    title: string
    intro: string
    principles: { index: string; layer: string; title: string; text: string }[]
  }
  about: {
    index: string
    title: string
    lead: string
    body: string
    stackTitle: string
    stack: { layer: string; items: string }[]
  }
  contact: {
    index: string
    question: string
    emphasis: string
    emailLabel: string
    copy: string
    copied: string
    copyFailed: string
    channelsLabel: string
    channels: { label: string; value: string; href: string }[]
  }
  footer: { rights: string; backToTop: string }
}

const links = {
  tralynDemo: "https://tralyn.vercel.app",
  tralynSource: "https://github.com/brotherson10/tralyn",
  tralynVideo: "https://youtu.be/4XeDwiE5B28",
  runflowSite: "https://runflow-page.netlify.app/",
  runflowFrontend: "https://github.com/brotherson10/runflow-frontend",
  runflowBackend: "https://github.com/brotherson10/runflow-backend",
  sohardSite: "https://sohard-energiasolar.com.br/",
  sohardSource: "https://github.com/brotherson10/landing-solar",
  gsaSite: "https://gsa-sports.com/",
  gsaSource: "https://github.com/brotherson10/gsa-sports-landpg",
}

const channels = [
  { label: "LinkedIn", value: "in/brotherson", href: "https://www.linkedin.com/in/brotherson/" },
  { label: "GitHub", value: "brotherson10", href: "https://github.com/brotherson10" },
  { label: "WhatsApp", value: "+351 933 368 428", href: "https://wa.me/351933368428" },
]

const clientStack = "HTML · CSS · JavaScript"

export const home: Record<Locale, Home> = {
  pt: {
    work: {
      index: "01",
      title: "Trabalho selecionado",
      intro: "Aplicações e sites publicados, com links para a versão online e para o código.",
      linksLabel: "Ligações",
      tralyn: {
        kicker: "Produto · Full Stack · 2026",
        title: "Tralyn",
        lead: "Gestão de inventário de armazém em que cada movimento fica registado e nenhum saldo é editado à mão. As permissões são aplicadas pela própria base de dados.",
        stack: "Next.js · TypeScript · Supabase · PostgreSQL · Playwright",
        links: [
          { label: "Demo", href: links.tralynDemo },
          { label: "GitHub", href: links.tralynSource },
          { label: "Vídeo", href: links.tralynVideo },
        ],
        note: "Demo só de leitura, com dados fictícios.",
        laptopAlt:
          "Dashboard do Tralyn na demo pública: stock total 330, 12 produtos, 4 a repor, 2 sem stock, e as cinco movimentações mais recentes.",
        mobileAlt: "O mesmo dashboard num telemóvel, com os indicadores empilhados numa coluna.",
        screenCaption: "Capturas reais da demo pública",
      },
      runflow: {
        kicker: "Estágio · DecodeLabs · 2026",
        title: "RunFlow",
        lead: "Landing page para uma assessoria de corrida e API REST em Express e SQLite, construídas durante o estágio Full Stack.",
        stack: "HTML · CSS · JavaScript · Node.js · Express · SQLite",
        note: "A API corre apenas em ambiente local; online está publicada a landing page.",
        links: [
          { label: "Site", href: links.runflowSite },
          { label: "GitHub (frontend)", href: links.runflowFrontend },
          { label: "GitHub (backend)", href: links.runflowBackend },
        ],
        imageAlt: "Landing page do RunFlow: título, chamada para ação e fotografia de um grupo a correr.",
      },
      clients: {
        title: "Projetos para clientes",
        stack: clientStack,
        items: [
          {
            kicker: "Cliente · Energia solar",
            title: "Sohard Energia Solar",
            lead: "Landing page para uma empresa de energia solar, publicada no domínio do cliente.",
            links: [
              { label: "Site", href: links.sohardSite },
              { label: "GitHub", href: links.sohardSource },
            ],
            imageAlt: "Página inicial da Sohard Energia Solar em desktop: título, pedido de orçamento e fotografia de uma instalação.",
            mobileAlt: "A mesma página num telemóvel, com o título e os botões numa coluna.",
          },
          {
            kicker: "Cliente · Agenciamento desportivo",
            title: "GSA Sports",
            lead: "Site institucional para uma agência de carreira de futebolistas, publicado no domínio do cliente.",
            links: [
              { label: "Site", href: links.gsaSite },
              { label: "GitHub", href: links.gsaSource },
            ],
            imageAlt: "Página inicial da GSA Sports: título sobre uma fotografia da equipa num campo de futebol.",
          },
        ],
      },
    },
    approach: {
      index: "02",
      title: "Abordagem",
      intro: "Três camadas, uma regra: cada decisão no sítio certo.",
      principles: [
        {
          index: "01",
          layer: "Interface",
          title: "A interface orienta, não decide.",
          text: "Mostra o que cada pessoa pode fazer; as regras vivem por trás dela.",
        },
        {
          index: "02",
          layer: "Servidor",
          title: "Validar onde se decide.",
          text: "Cada pedido é verificado no servidor antes de tocar nos dados.",
        },
        {
          index: "03",
          layer: "Dados",
          title: "A base de dados é a autoridade.",
          text: "O que não pode falhar fica em restrições e permissões, não em convenções.",
        },
      ],
    },
    about: {
      index: "03",
      title: "Sobre",
      lead: "Antes de escrever uma linha, quero perceber o processo, quem o usa e o que acontece quando corre mal.",
      body: "Passei por projetos de formação, sites para clientes e um estágio Full Stack na DecodeLabs. Hoje construo aplicações completas, como o Tralyn, e procuro uma equipa onde continuar a crescer.",
      stackTitle: "Tecnologias que uso",
      stack: [
        { layer: "Interface", items: "React, Next.js, TypeScript, Tailwind CSS" },
        { layer: "Servidor", items: "Node.js, Express, Server Actions, APIs REST" },
        { layer: "Dados", items: "PostgreSQL, Supabase, SQLite" },
        { layer: "Qualidade", items: "Git, Vitest, Playwright" },
      ],
    },
    contact: {
      index: "04",
      question: "Tem uma vaga, um projeto ou uma pergunta técnica?",
      emphasis: "Escreva-me.",
      emailLabel: "Email",
      copy: "Copiar",
      copied: "Email copiado",
      copyFailed: "Não foi possível copiar. O endereço está ao lado.",
      channelsLabel: "Outros canais",
      channels,
    },
    footer: { rights: "© 2026 Brotherson Américo", backToTop: "Voltar ao topo" },
  },
  en: {
    work: {
      index: "01",
      title: "Selected work",
      intro: "Published applications and websites, with links to the live version and to the code.",
      linksLabel: "Links",
      tralyn: {
        kicker: "Product · Full Stack · 2026",
        title: "Tralyn",
        lead: "Warehouse inventory management where every movement is recorded and no balance is edited by hand. Permissions are enforced by the database itself.",
        stack: "Next.js · TypeScript · Supabase · PostgreSQL · Playwright",
        links: [
          { label: "Demo", href: links.tralynDemo },
          { label: "GitHub", href: links.tralynSource },
          { label: "Video", href: links.tralynVideo },
        ],
        note: "Read-only demo with fictional data.",
        laptopAlt:
          "Tralyn dashboard in the public demo: total stock 330, 12 products, 4 to reorder, 2 out of stock, and the five latest movements.",
        mobileAlt: "The same dashboard on a phone, with the indicators stacked in one column.",
        screenCaption: "Real captures of the public demo",
      },
      runflow: {
        kicker: "Internship · DecodeLabs · 2026",
        title: "RunFlow",
        lead: "A landing page for a running coaching service and a REST API in Express and SQLite, built during the Full Stack internship.",
        stack: "HTML · CSS · JavaScript · Node.js · Express · SQLite",
        note: "The API runs locally only; the landing page is what is published online.",
        links: [
          { label: "Website", href: links.runflowSite },
          { label: "GitHub (frontend)", href: links.runflowFrontend },
          { label: "GitHub (backend)", href: links.runflowBackend },
        ],
        imageAlt: "RunFlow landing page: headline, call to action and a photo of a group running.",
      },
      clients: {
        title: "Client projects",
        stack: clientStack,
        items: [
          {
            kicker: "Client · Solar energy",
            title: "Sohard Energia Solar",
            lead: "A landing page for a solar energy company, live on the client's domain.",
            links: [
              { label: "Website", href: links.sohardSite },
              { label: "GitHub", href: links.sohardSource },
            ],
            imageAlt: "Sohard Energia Solar home page on desktop: headline, quote request and a photo of an installation.",
            mobileAlt: "The same page on a phone, with the headline and buttons in one column.",
          },
          {
            kicker: "Client · Sports agency",
            title: "GSA Sports",
            lead: "An institutional website for a football career agency, live on the client's domain.",
            links: [
              { label: "Website", href: links.gsaSite },
              { label: "GitHub", href: links.gsaSource },
            ],
            imageAlt: "GSA Sports home page: headline over a photo of the team on a football pitch.",
          },
        ],
      },
    },
    approach: {
      index: "02",
      title: "Approach",
      intro: "Three layers, one rule: every decision in the right place.",
      principles: [
        {
          index: "01",
          layer: "Interface",
          title: "The interface guides; it does not decide.",
          text: "It shows what each person can do; the rules live behind it.",
        },
        {
          index: "02",
          layer: "Server",
          title: "Validate where the decision is made.",
          text: "Every request is checked on the server before it touches the data.",
        },
        {
          index: "03",
          layer: "Data",
          title: "The database is the authority.",
          text: "What cannot fail lives in constraints and permissions, not in conventions.",
        },
      ],
    },
    about: {
      index: "03",
      title: "About",
      lead: "Before writing a line, I want to understand the process, who uses it and what happens when it fails.",
      body: "I went from training projects to client websites and a Full Stack internship at DecodeLabs. Today I build complete applications, like Tralyn, and I am looking for a team to keep growing with.",
      stackTitle: "What I work with",
      stack: [
        { layer: "Interface", items: "React, Next.js, TypeScript, Tailwind CSS" },
        { layer: "Server", items: "Node.js, Express, Server Actions, REST APIs" },
        { layer: "Data", items: "PostgreSQL, Supabase, SQLite" },
        { layer: "Quality", items: "Git, Vitest, Playwright" },
      ],
    },
    contact: {
      index: "04",
      question: "Have a role, a project or a technical question?",
      emphasis: "Write to me.",
      emailLabel: "Email",
      copy: "Copy",
      copied: "Email copied",
      copyFailed: "Could not copy. The address is shown next to the button.",
      channelsLabel: "Other channels",
      channels,
    },
    footer: { rights: "© 2026 Brotherson Américo", backToTop: "Back to top" },
  },
}
