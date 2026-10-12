# Design system · Portfólio 2.0

Direção: **Dark Editorial Cinematográfico + Technical Blueprint**.
O editorial dá a base (escuro, tipografia de display, espaço negativo, fotografia tratada).
O blueprint dá a camada técnica (linhas de construção, marcas de registo e de corte, índices numerados, anotações em mono).
Regra de equilíbrio: o blueprint nunca compete com o conteúdo. São linhas finas, uma cor e sem movimento contínuo, e cada anotação tem de dizer algo sobre engenharia.

**Posicionamento:** o site apresenta apenas "Full Stack Developer", sem referências à residência (nem no hero, nem no contacto, nem nos metadados). Mantém-se o indicativo do número de WhatsApp, que faz parte do contacto.

**Hierarquia do hero:** 1. headline · 2. retrato · 3. papel (Full Stack Developer) e subheadline · 4. ações · 5. eixo de camadas e ligação "A seguir".

Tokens em `src/app/globals.css` (bloco `@theme`). Os nomes abaixo são as classes Tailwind geradas (`bg-ink`, `text-paper-muted`, `border-rule`…).

## 1. Cor

| Token | HEX | Uso | Contraste sobre `ink` |
|---|---|---|---|
| `ink` | `#0B0C0F` | Fundo da página | |
| `ink-raised` | `#121419` | Molduras de figura, superfícies | |
| `rule` | `#23262E` | Fios e divisórias | decorativo |
| `rule-strong` | `#3A3F4B` | Linhas de construção, contorno do botão secundário | 1,86:1, decorativo |
| `paper` | `#ECE8E1` | Texto principal (branco quente, não puro) | 16,02:1 |
| `paper-muted` | `#A6A29A` | Texto secundário, lead | 7,69:1 |
| `paper-subtle` | `#85827B` | Etiquetas, legendas | 5,10:1 |
| `blue` | `#8FB3FF` | **Único acento**: links ativos, marcas, focus, CTA principal | 9,37:1 |
| `blue-soft` | `#B9CFFF` | Hover do acento | 12,51:1 |

- O texto do CTA principal (`ink` sobre `blue`) tem 9,37:1.
- Nenhum texto usa `rule` nem `rule-strong`.
- O botão secundário identifica-se pelo texto, não pelo contorno.
- Não há gradientes de cor nem brilhos. O azul é sempre plano.

## 2. Tipografia

| Papel | Família | Carregamento | Uso |
|---|---|---|---|
| Display | **Instrument Serif** 400, normal e itálico | `next/font/google`, self-hosted, subset latin | Headline, títulos, nome no header. O itálico azul marca a palavra-chave. |
| Corpo e UI | **Archivo** variável | idem | Texto corrido, navegação, botões |
| Mono | **IBM Plex Mono** 400 | idem | Etiquetas `.label`, índices, legendas, anotações |

São 4 ficheiros woff2 pré-carregados. O subset latin já cobre ã, ç, é e õ.

**Escala responsiva** (o tamanho cresce de forma contínua entre mobile e desktop):

| Token | Valor | Em 390 / 820 / 1440 px |
|---|---|---|
| display (`.display-fit`) | ajustado à largura: `min(teto, largura disponível ÷ --measure)`, lh 0.92, tracking −0.02em | PT 59 (320) · 73 (390) · 120 (820, teto tablet) · 126 (1024) · 144 (1440, teto) |
| `text-headline` | `clamp(2.25rem, 1rem + 4.5vw, 4.5rem)`, lh 1 | 36 / 53 / 72 px |
| `text-title` | `clamp(1.375rem, 1.1rem + 1vw, 1.875rem)`, lh 1.15 | 22 / 26 / 30 px |
| `text-lead` | `clamp(1.0625rem, 0.95rem + 0.45vw, 1.25rem)`, lh 1.55 | 17 / 19 / 20 px |
| corpo | 1rem, lh 1.6 | 16 px |
| `.label` | 0.75rem mono, maiúsculas, tracking 0.12em | 12 px |

**Display ajustado à largura:** a headline usa o maior tamanho em que a linha mais longa cabe na largura disponível. Essa largura é a página menos as margens no mobile e no tablet, e 8 de 12 colunas no desktop. `--measure` é a largura medida dessa linha em em (PT 4,9; EN 5,25, com folga para o itálico), definida em `hero.tsx`. Assim não há overflow a 320 px e a headline não encolhe em ecrãs grandes. O teto é `--text-display-max` (9rem), ou 7,5rem no tablet. Se o texto mudar, é preciso medir de novo.

**Hierarquia:** no máximo três tamanhos por ecrã. O contraste faz-se com escala (display contra label), não com pesos. A coluna de leitura fica abaixo de 40rem (cerca de 65 caracteres).

## 3. Grelha e espaçamento

| | Mobile < 768 | Tablet 768 a 1023 | Desktop ≥ 1024 |
|---|---|---|---|
| Colunas | 4 | 8 | 12 |
| Goteira | 16 px | 24 px | 24 px |
| Margem | 16 px | 32 px | 48 px |
| Largura máxima | | | 1440 px |

- Espaçamento com base de 4 px (escala Tailwind). Na prática: 8, 12, 16, 24, 32, 48, 64, 80, 112.
- Entre secções: 80 px em mobile, 112 px em tablet e 128 px em desktop (`section` em `lib/layout.ts`).
- **Assimetria intencional:** no desktop o texto ocupa as colunas 1 a 8 e o retrato fica ancorado à direita, a sangrar para fora da grelha (36vw entre 1024 e 1279 px; min(42vw, 680px) a partir de 1280). A headline pode tocar a zona de fade do retrato, mas nunca o sujeito.

## 4. Botões e links

| Componente | Classe | Estados |
|---|---|---|
| CTA principal | `.btn .btn-primary` | Fundo `blue`. Hover `blue-soft`, a seta avança 4 px. Active baixa 1 px. |
| CTA secundário | `.btn .btn-secondary` | Contorno `rule-strong`. Hover com contorno `paper`. |
| Link editorial | `.link` | Sublinhado de 1 px em `rule-strong`. Hover: texto `blue-soft` e sublinhado na cor do texto. |
| Link externo | `<ExternalLink>` | Acrescenta `↗` (aria-hidden) e o texto "(abre num novo separador)" só para leitores de ecrã. |
| Navegação | header | Índice mono azul (01 a 04) mais o rótulo. Hover desenha um fio por baixo. |

- Altura mínima dos botões: 48 px. Os alvos de toque no mobile têm pelo menos 44 px.
- Raio de 2 px, deliberadamente quase reto (editorial, não SaaS).

**Elementos secundários (16E.4):** `.stack-line` (mono 13 px, `paper-muted`, 7,7:1) para a stack dos projetos; notas em `paper-muted`; links dos projetos com `.link-target` (área de toque de 44 px nos telemóveis e espaço antes do ↗).

## 5. Imagens

**Retrato** (fotografia original, sem alterações no rosto, na expressão nem nas características):
- O ficheiro só é redimensionado e recodificado em AVIF e WebP com 4 larguras, por `scripts/prepare-images.mjs`. Passa de 2 MB (PNG) para 18 a 54 KB (AVIF).
- **Sem moldura.** A integração faz-se só em CSS, sem destruir nada:
  - `.portrait-grade`: `saturate(0.74) contrast(1.06) brightness(0.8)`. A camisa continua verde e o rosto nítido.
  - `.portrait-vignette`: escurece o fundo de estúdio à volta do sujeito, sobretudo acima da cabeça. O centro superior (o rosto) fica intacto.
  - `.portrait-blend`: uma máscara que dissolve as bordas no fundo da página.
    - Desktop: fade em cima, um fade longo à esquerda (em direção ao texto), fade curto à direita e fade na base, sob o eixo.
    - Tablet: base e laterais.
    - Mobile: topo suave e fade longo na base.
- **Tablet (768 a 1023 px, 16E.4):** a mesma lógica do desktop. O retrato fica ancorado à direita (46vw, 3:4), com a mesma máscara, ao lado da headline; o texto ocupa 5 de 8 colunas e a headline ajusta-se a essa largura (`.display-fit`: 89 px a 768, 96 px a 820).
- **Enquadramento:**
  - Desktop: o retrato inteiro, ancorado à direita, com a altura do hero.
  - Tablet: 4:5.
  - Mobile: uma faixa a toda a largura com altura `min(100vw, 38svh)` (cabeça e ombros, `object-position 50% 4%`). A headline sobrepõe-se aos 38% inferiores, que já estão escurecidos, como numa capa de revista. A altura acompanha o ecrã para que o CTA fique na primeira dobra em ecrãs baixos.

**Capturas de projeto:**
- Sempre reais (o dashboard da demo pública do Tralyn), recortadas para a zona legível.
- Usadas como miniatura discreta (96 a 176 px), com opacidade de 0,75 que sobe para 1 no hover.

## 6. Linguagem blueprint

Só dois elementos, ambos com significado:

| Elemento | Onde | Significado |
|---|---|---|
| Índice editorial | `00 ── Brotherson Américo`, `01 Trabalho`… | A mesma numeração na navegação, no hero e nas secções |
| **Eixo de camadas** (a única linha de construção) | Um fio de largura total sob as ações, com três marcas azuis alinhadas à grelha (terços = colunas 1, 5 e 9) | A headline tornada literal: 01 Interface (React · Next.js), 02 Servidor (Node.js · APIs), 03 Dados (PostgreSQL). É uma lista ordenada com nome acessível. |

**Removido nesta revisão:** a moldura com marcas de corte, as marcas de registo, a linha tracejada vertical e a legenda "Fig. 01" (o `alt` cobre a descrição).
**A evitar:** grelhas milimétricas por todo o lado, diagramas decorativos sem conteúdo, glow, partículas.

## 7. Movimento

| Animação | Técnica | Duração |
|---|---|---|
| Linhas da headline sobem dentro de uma máscara | CSS `@keyframes line-up` | 1000 ms, intervalo de 110 ms entre linhas |
| Etiquetas, lead e CTAs entram com fade-up de 10 px | CSS `.enter` com `--d` | 800 ms |
| O retrato aparece com fade e um zoom-out de 3,5% (sem obturador, para não sugerir moldura) | CSS `.enter-photo` | 1600 ms |
| O eixo de camadas e o fio do índice desenham-se | CSS `.enter-draw-x` (`scaleX`) | 1200 ms |
| Passagem para a secção seguinte: as camadas do hero sobem e escurecem com o scroll | Motion (`useScroll` + `useTransform`), só transform e opacity | ligada ao scroll |
| Índices das secções (fio ao lado do número) desenham-se ao entrar | CSS `.draw-on-view`, scroll-driven (`animation-timeline: view()`) | ligada ao scroll |
| Texto das secções sobe 10 px e aparece à entrada no ecrã | CSS `.reveal`, scroll-driven, `entry 0%` a `entry 60%` | ligada ao scroll |
| Imagens de projeto assentam a partir de 32 px e opacidade 0,2 | CSS `.reveal-media`, scroll-driven, `entry 0%` a `cover 28%` | ligada ao scroll |
| Navegação: secção atual marcada | `NavLinks` (IntersectionObserver), `aria-current="location"` e fio desenhado | ao mudar de secção |

**Curva:** `--ease-editorial` `cubic-bezier(0.2, 0.7, 0.1, 1)` para todas as entradas.

**Abaixo do hero não há JavaScript de animação.** As revelações usam scroll-driven animations em CSS dentro de `@supports (animation-timeline: view())` e `no-preference`. Os browsers sem suporte (o Firefox, à data) mostram o conteúdo diretamente, por isso nunca há conteúdo escondido à espera de um script. Como estão ligadas à posição do scroll, revertem ao subir; é o comportamento esperado e não interceta o scroll.

**Garantias:**
- Todas as animações de entrada estão dentro de `@media (prefers-reduced-motion: no-preference)` e da classe `.js`, que um script inline põe antes do primeiro paint. Sem JS ou com reduced motion, o conteúdo aparece completo e imóvel.
- Com reduced motion, as camadas de scroll do Motion recebem intervalos nulos (o markup do servidor e do cliente é idêntico, por isso não há erros de hidratação).
- O `scroll-behavior: smooth` também só se aplica com `no-preference`.
- Não há loops, scroll hijacking, elementos fixados, cursores personalizados nem animações permanentes.

## 8. Breakpoints

São os do Tailwind: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

A composição muda em dois pontos:
- **`md` (tablet):** a headline ocupa a largura toda, e o lead fica ao lado do retrato.
- **`lg` (desktop):** a navegação completa aparece no header, e o retrato passa a ocupar uma coluna própria ao lado da headline e do lead.

## 9. Acessibilidade

- Skip link ("Saltar para o conteúdo") como primeiro elemento focável.
- O link do nome no header usa o texto visível como nome acessível (sem `aria-label` divergente).
- Abaixo de 375 px o botão do menu mostra só o ícone, e o rótulo "Menu" fica disponível para leitores de ecrã.
- Focus visível e único: contorno `blue` de 2 px com 4 px de distância.
- Landmarks: `header`, `nav` com nome, `main#conteudo`, secções com `aria-labelledby`.
- Seletor de idioma com links reais, `hrefLang`, `lang` e `aria-current`.
- Menu mobile: `aria-expanded`, `aria-controls`, Escape fecha e devolve o foco, e o conteúdo fica `inert` enquanto está aberto.
- `alt` descritivo no retrato e na captura. A ordem visual é igual à ordem de tabulação.

## 10. Secções da Home

| Secção | Componente | Composição | Ritmo |
|---|---|---|---|
| 00 Hero | `hero.tsx` | Ver acima | escuro |
| 01 Trabalho | `work.tsx`, `tralyn-showcase.tsx` | Tralyn como momento cinematográfico (ver abaixo). RunFlow: imagem à esquerda (7 colunas), descrição curta, stack e links à direita, com uma nota discreta sobre a API local. Clientes: par desencontrado, uma frase e Site/GitHub em cada um | faixa escura, depois ink |
| 02 Abordagem | `approach.tsx` | O eixo do hero continuado: três princípios (título e uma frase) nas mesmas colunas e com as mesmas marcas azuis (horizontal a partir do tablet, vertical nos telemóveis) | ink, divisão por fio |
| 03 Sobre | `about.tsx` | Apresentação curta à esquerda (lead em serifa e um parágrafo); à direita, as tecnologias comprovadas pelos projetos, agrupadas pelas camadas do eixo (texto, sem ícones) | ink |
| 04 Contacto | `contact.tsx` | Uma pergunta em display, o email em sans grande com botão de copiar, e os outros canais como uma lista curta | ink |
| Rodapé | `site-footer.tsx` | Direitos, voltar ao topo, idioma | |

### Vitrine do Tralyn (16E.1)

O único momento cinematográfico do site, pensado como continuação do hero: o mesmo display, os mesmos índices e o eixo de camadas.

- **Palco:** fundo `#07080B` (mais escuro do que `ink`) e uma luz azul radial muito ténue atrás dos dispositivos (`.tralyn-light`, opacidade de 0,13 a 0,15). Não há gradientes animados.
- **Zona editorial (colunas 1 a 4):** índice, título em display (até 8rem), uma descrição de duas frases, a stack numa linha, a ação principal "Demo" e os links GitHub e Vídeo, e a nota "Demo só de leitura, com dados fictícios".
- **Zona visual (colunas 5 a 12):**
  - Um portátil e um telemóvel construídos em CSS: moldura, base com dobradiça e reflexo de vidro de 7 %.
  - Lá dentro estão capturas **reais** da demo pública: o dashboard a 1440 × 900 (`capture-tralyn.mjs`) e a vista mobile a 390 × 844.
  - Não há imagens de dispositivos que escondam o produto.
- **Profundidade:** vista de três quartos com `perspective`: `rotateY(-11deg) rotateX(4deg)` no desktop e `-8deg` no tablet. O telemóvel está em `translateZ(70px)` à frente do portátil. Nos telemóveis tudo fica plano.
- **Movimento:** scroll-driven em CSS. Os dispositivos assentam a partir de um ângulo mais inclinado (`entry 0%` a `cover 42%`), e o telemóvel sobe um pouco mais depressa do que o portátil, o que dá a sensação de profundidade. Com reduced motion fica o ângulo final, estático.
- **Mobile:** os dispositivos ficam planos, o telemóvel por baixo e à direita do portátil (com uma sobreposição mínima), e a legenda e o eixo vêm depois.

**Componentes partilhados:** `SectionHeading` (índice, título e intro em contraponto), `LinkRow` (links externos com nome acessível do grupo), `ResponsiveImage` (AVIF/WebP com dimensões intrínsecas) e `CopyEmail` (estado anunciado por `<output aria-live>`).

**Simplificação (16E.3, "less is more"):** saíram o mini-cartão do Tralyn do hero; da vitrine, os marcadores, a legenda, a faixa de quatro camadas e a linha de rastreabilidade; as tabelas de factos do RunFlow e dos clientes; os exemplos "Na prática" e o princípio transversal da Abordagem; e o registo cronológico do Sobre. Rótulos uniformes: Demo/Site e GitHub.

**Âncoras localizadas:** `/pt/#trabalho`, `/en/#work`… (definidas em `anchors`, `dictionaries.ts`).

## 11. Verificação responsiva

`node scripts/capture.mjs [url] [pasta]` usa o Chrome via DevTools Protocol (`scripts/lib/cdp.mjs`), com emulação real do dispositivo. Também verifica as âncoras internas e os links externos, e gera capturas de página completa (com reduced motion, que é o estado final das revelações, e com as imagens lazy carregadas à força).
- Larguras: 320, 360, 375, 390, 430, 820, 1024, 1280 e 1440, em PT e EN.
- Cada largura é testada com e sem `prefers-reduced-motion`.
- Mede o overflow do documento, os elementos mais largos que o viewport, o tamanho da headline e a posição do CTA.
- Guarda capturas e `responsive-report.json`, e falha se houver overflow.

Atenção: não uses `chrome --screenshot --window-size` para larguras de telemóvel. O Chrome headless não reduz a janela abaixo de cerca de 500 px e recorta a imagem, o que simula um overflow que não existe.

## 12. Rotas e SEO (protótipo)

- `/pt/` e `/en/` são geradas estaticamente, com `hreflang` recíproco, `x-default` e canonical.
- `/` redireciona para `/pt/` com meta refresh. Em produção será um redirect do Netlify por idioma do browser.
- O protótipo está marcado `noindex`. Esta marca é para retirar no lançamento.
