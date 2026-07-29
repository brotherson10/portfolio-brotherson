export type RepoLink = {
  type: "code" | "frontend" | "backend"
  href: string
}

export type ProjectMeta = {
  key: string
  image: string
  featured?: boolean
  demoHref: string
  repos: RepoLink[]
  tags: string[]
}

export const projectsMeta: ProjectMeta[] = [
  {
    key: "devclub",
    image: "/assets/devclub-oficial.png",
    featured: true,
    demoHref: "https://devclub-oficial.netlify.app/",
    repos: [{ type: "code", href: "https://github.com/brotherson10/devclub-oficial-landing" }],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "runflow",
    image: "/assets/runflow.png",
    demoHref: "https://runflow-page.netlify.app/",
    repos: [
      { type: "frontend", href: "https://github.com/brotherson10/decode-project-1-runflow" },
      { type: "backend", href: "https://github.com/brotherson10/decode-project-3-runflow-db" },
    ],
    tags: ["HTML", "CSS", "JavaScript", "API", "Backend"],
  },
  {
    key: "sohard",
    image: "/assets/sohard-energia-solar.png",
    demoHref: "https://sohard-energiasolar.com.br/",
    repos: [{ type: "code", href: "https://github.com/brotherson10/landing-solar" }],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "gsa",
    image: "/assets/gsa-sports.png",
    demoHref: "https://gsa-sports.com/",
    repos: [{ type: "code", href: "https://github.com/brotherson10/gsa-sports-landpg" }],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "powervolt",
    image: "/assets/powervolt-energy.png",
    demoHref: "https://powervolt-energy.netlify.app/",
    repos: [{ type: "code", href: "https://github.com/brotherson10/landing-solar" }],
    tags: ["HTML", "CSS", "JavaScript"],
  },
]
