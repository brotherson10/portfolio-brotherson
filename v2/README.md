# Portfólio 2.0 · protótipo do hero

Protótipo isolado (Etapa 16C). Vive na branch `v2/hero-prototype`, na pasta `v2/`, e não substitui nem altera o site atual.

Stack: Next.js 16 (App Router, export estático), React 19, TypeScript, Tailwind CSS 4 e Motion para React.
Decisões visuais: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Correr localmente

```bash
cd v2
npm install
npm run dev        # http://localhost:3000/pt/  (desenvolvimento)

npm run build      # export estático para ./out
npm run preview    # http://localhost:4173/pt/  (serve ./out)
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run typecheck` | Verifica os tipos |
| `npm run lint` | Corre o oxlint, com as regras jsx-a11y |
| `npm run images` | Regenera as variantes AVIF/WebP do retrato e da captura do Tralyn |
| `node scripts/capture.mjs` | Com o preview a correr: verificação responsiva (320 a 1440, PT/EN, com e sem reduced motion), âncoras e links, e capturas em `docs/prototype/home/` |
| `node scripts/capture-tralyn.mjs` | Captura do dashboard da demo pública do Tralyn a 1440 × 900 para `assets-src/projects/` |
| `node scripts/capture-section.mjs <seletor> <pasta>` | Captura de uma secção (estado final e com movimento) em 1440, 1024, 820, 390 e 320 px, PT e EN |
| `node scripts/capture-projects.mjs` | Capturas mobile dos sites de clientes ao vivo para `assets-src/projects/` (depois `npm run images`) |

## Estrutura

```text
src/app/(root)/          "/" redireciona para /pt/
src/app/[lang]/          layout (fontes, metadata, hreflang) e a página por idioma
src/app/globals.css      tokens do design system e animações
src/content/             textos PT-PT e EN e links
src/components/          header, menu mobile, seletor de idioma, hero, retrato, destaque do Tralyn, camadas de scroll
scripts/                 preparação de imagens e servidor de pré-visualização
public/images/           imagens geradas
docs/prototype/before/   capturas da 16C
docs/prototype/after/    capturas da 16C.1 e responsive-report.json
docs/prototype/home/     capturas da Home completa (16D) e report.json
docs/prototype/16e1-tralyn/  capturas da vitrine do Tralyn (16E.1)
docs/reference/          referências conceptuais (não publicadas)
assets-src/projects/     capturas originais dos sites de clientes
```

## Publicação (Netlify)

- `../netlify.toml` (raiz do repositório): `base = "v2"`, `npm run build`, `publish = "out"` (relativo a `base`), Node 22, headers de segurança e cache imutável só para `/_next/static/*`.
- `public/_redirects`: `/` → `/en/` para browsers com inglês como primeira língua, `/pt/` para os restantes.
- Indexação: `src/lib/site.ts` lê `CONTEXT` (definido pela Netlify). Em `production` (ou numa build local) o site é indexável; em `deploy-preview` e `branch-deploy` saem `noindex` no HTML, `Disallow: /` no `robots.txt` e o header `X-Robots-Tag` (`out/_headers`, escrito por `scripts/postbuild.mjs`).
- `scripts/postbuild.mjs` falha a build se faltar `404.html`, `robots.txt`, `sitemap.xml`, `_redirects` ou `favicon.ico`.
- Marca: `npm run brand` (com o preview a correr) gera `src/app/favicon.ico`, `icon.png`, `apple-icon.png` e `public/og/og-{pt,en}.png`. Depois, nova build.
- Simular contextos localmente: `CONTEXT=deploy-preview npm run build`.
