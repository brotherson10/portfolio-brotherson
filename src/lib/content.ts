export type Lang = "pt" | "en"

export type Content = {
  meta: { title: string; description: string }
  nav: {
    links: { home: string; about: string; projects: string; skills: string; contact: string }
    openMenu: string
    closeMenu: string
  }
  hero: {
    eyebrow: string
    titleLead: string
    titleEmphasis: string
    role: string
    text: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    eyebrow: string
    paragraphs: string[]
    highlights: { label: string; value: string }[]
  }
  projects: {
    eyebrow: string
    githubCta: string
    linkLabels: { view: string; code: string; frontend: string; backend: string }
    items: { key: string; title: string; description: string }[]
  }
  skills: {
    eyebrow: string
    groups: { name: string; items: string[] }[]
  }
  contact: {
    eyebrow: string
    titleLead: string
    titleEmphasis: string
    text: string
    actions: { whatsapp: string; linkedin: string; github: string; copyEmail: string }
    copiedToast: string
    email: string
  }
  footer: string
}

export const content: Record<Lang, Content> = {
  pt: {
    meta: {
      title: "Brotherson Américo | Full Stack Developer",
      description:
        "Brotherson Américo, Full Stack Developer. Portfólio com projetos reais em React, JavaScript e integrações de back-end.",
    },
    nav: {
      links: { home: "Início", about: "Sobre", projects: "Projetos", skills: "Habilidades", contact: "Contato" },
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      eyebrow: "Olá, eu sou",
      titleLead: "Brotherson",
      titleEmphasis: "Américo",
      role: "Full Stack Developer",
      text: "Desenvolvedor Full Stack focado em criar experiências modernas, responsivas e funcionais, com conhecimentos em APIs, bancos de dados e serviços externos para desenvolver soluções completas de ponta a ponta.",
      ctaPrimary: "Ver projetos",
      ctaSecondary: "Falar comigo",
    },
    about: {
      eyebrow: "Sobre mim",
      paragraphs: [
        "Sou Full Stack Developer com foco em desenvolvimento Web, criando aplicações modernas do frontend ao backend. Trabalho com React, JavaScript, Node.js, APIs e bancos de dados, desenvolvendo desde interfaces responsivas até sistemas completos e integrações.",
        "Minha formação em Administração complementa meu perfil técnico: gosto de entender o problema antes de escrever código e construir soluções que façam sentido tanto para o usuário quanto para o negócio.",
        "Aprendo rápido, valorizo código bem estruturado e gosto de transformar problemas reais em produtos que funcionam.",
      ],
      highlights: [
        { label: "UX/UI", value: "Interfaces claras, modernas e responsivas." },
        { label: "Projetos reais", value: "Sistemas e aplicações web, APIs, deploy e GitHub." },
        { label: "Aprendizado", value: "Evolução constante com prática e entregas." },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      githubCta: "Ver todos no GitHub →",
      linkLabels: { view: "Ver projeto", code: "GitHub", frontend: "Frontend", backend: "Backend" },
      items: [
        {
          key: "devclub",
          title: "DevClub Oficial",
          description:
            "A loja precisava de uma vitrine que priorizasse conversão sem depender de um backend robusto. Construí uma landing estática com carrossel de produtos e hierarquia visual focada na oferta. O resultado: uma página leve, rápida e fácil de manter.",
        },
        {
          key: "runflow",
          title: "RunFlow",
          description:
            "A assessoria esportiva precisava de captação de leads real, não só uma página estática. Desenhei o frontend e construí a API e o banco de dados por trás, do formulário até a persistência dos dados.",
        },
        {
          key: "sohard",
          title: "Sohard Energia Solar",
          description:
            "A empresa de energia solar precisava transmitir credibilidade técnica num site institucional. Priorizei hierarquia clara de informação e performance em mobile, onde acontece a maior parte do tráfego de simulação de orçamento.",
        },
        {
          key: "gsa",
          title: "GSA Sports",
          description:
            "A agência de atletas precisava de um site que funcionasse como cartão de visita para clubes e patrocinadores. Layout direto, sem ruído visual, com foco em contato rápido.",
        },
        {
          key: "powervolt",
          title: "Powervolt Energy",
          description:
            "Segunda apresentação digital para o setor de energia solar, reaproveitando aprendizados do projeto anterior. Ajustei a estrutura para reduzir tempo de carregamento e simplificar a navegação em telas pequenas.",
        },
      ],
    },
    skills: {
      eyebrow: "Stack",
      groups: [
        { name: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"] },
        {
          name: "Backend",
          items: ["Node.js", "Express", "API REST", "MongoDB", "MySQL", "PostgreSQL", "Docker", "Supabase"],
        },
        { name: "Automação", items: ["n8n", "Fluxos com IA"] },
        { name: "Versionamento", items: ["Git", "GitHub", "Netlify"] },
      ],
    },
    contact: {
      eyebrow: "Contato",
      titleLead: "Vamos",
      titleEmphasis: "conversar?",
      text: "Vamos conversar e trocar ideias. Estou aberto a oportunidades e network.",
      actions: { whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub", copyEmail: "Copiar email" },
      copiedToast: "Email copiado!",
      email: "brotherson100@gmail.com",
    },
    footer: "Brotherson Américo © 2026",
  },
  en: {
    meta: {
      title: "Brotherson Américo | Full Stack Developer",
      description:
        "Brotherson Américo, Full Stack Developer. Portfolio with real projects in React, JavaScript and backend integrations.",
    },
    nav: {
      links: { home: "Home", about: "About", projects: "Projects", skills: "Skills", contact: "Contact" },
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      eyebrow: "Hello, I'm",
      titleLead: "Brotherson",
      titleEmphasis: "Américo",
      role: "Full Stack Developer",
      text: "Full Stack Developer focused on creating modern, responsive and functional experiences, with knowledge of APIs, databases and external services to develop complete, end-to-end solutions.",
      ctaPrimary: "See projects",
      ctaSecondary: "Get in touch",
    },
    about: {
      eyebrow: "About",
      paragraphs: [
        "I'm a Full Stack Developer focused on Web development, building modern applications from frontend to backend. I work with React, JavaScript, Node.js, APIs and databases, developing everything from responsive interfaces to complete systems and integrations.",
        "My background in Business Administration complements my technical profile: I like understanding the problem before writing code, and building solutions that make sense both for the user and for the business.",
        "I learn fast, value well-structured code, and enjoy turning real problems into products that work.",
      ],
      highlights: [
        { label: "UX/UI", value: "Clear, modern, responsive interfaces." },
        { label: "Real projects", value: "Web systems and applications, APIs, deployment and GitHub." },
        { label: "Learning", value: "Constant growth through practice and shipping." },
      ],
    },
    projects: {
      eyebrow: "Projects",
      githubCta: "See all on GitHub →",
      linkLabels: { view: "View project", code: "GitHub", frontend: "Frontend", backend: "Backend" },
      items: [
        {
          key: "devclub",
          title: "DevClub Oficial",
          description:
            "The store needed a showcase built for conversion, without depending on a full backend. I built a static landing page with a product carousel and a visual hierarchy focused on the offer. The result: a light, fast page that's easy to maintain.",
        },
        {
          key: "runflow",
          title: "RunFlow",
          description:
            "The sports agency needed real lead capture, not just a static page. I designed the frontend and built the API and database behind it, from the form to data persistence.",
        },
        {
          key: "sohard",
          title: "Sohard Energia Solar",
          description:
            "The solar energy company needed to project technical credibility on an institutional site. I prioritized clear information hierarchy and mobile performance, where most of the budget-simulation traffic happens.",
        },
        {
          key: "gsa",
          title: "GSA Sports",
          description:
            "The athlete agency needed a site that worked as a business card for clubs and sponsors. Direct layout, no visual noise, built around fast contact.",
        },
        {
          key: "powervolt",
          title: "Powervolt Energy",
          description:
            "A second digital presence for the solar energy sector, reusing lessons from the previous project. I adjusted the structure to cut load time and simplify navigation on small screens.",
        },
      ],
    },
    skills: {
      eyebrow: "Stack",
      groups: [
        { name: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"] },
        {
          name: "Backend",
          items: ["Node.js", "Express", "REST API", "MongoDB", "MySQL", "PostgreSQL", "Docker", "Supabase"],
        },
        { name: "Automation", items: ["n8n", "AI-assisted flows"] },
        { name: "Version control", items: ["Git", "GitHub", "Netlify"] },
      ],
    },
    contact: {
      eyebrow: "Contact",
      titleLead: "Let's",
      titleEmphasis: "talk?",
      text: "Let's talk and exchange ideas. I'm open to opportunities and networking.",
      actions: { whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub", copyEmail: "Copy email" },
      copiedToast: "Email copied!",
      email: "brotherson100@gmail.com",
    },
    footer: "Brotherson Américo © 2026",
  },
}
