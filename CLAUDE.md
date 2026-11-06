# Fulgor Abstracto

Site estático da Fulgor Abstracto (Portugal): serviços de TI, desenvolvimento de software e manutenção de servidores.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- i18n en/pt com dicionários JSON
- Dark mode com `next-themes` (segue o browser, com toggle)
- `motion/react` para animações, `@heroicons/react` para ícones
- `output: 'export'` — build estático em `./out`
- Formulário de contacto via Web3Forms (chave pública em `src/app/components/ContactSection.tsx`)

## Comandos

```bash
npm install
npm run dev     # servidor local
npm run lint    # Biome (lint + formatação)
npm run format  # formatar com Biome
npm run build   # export estático para ./out
```

## Estrutura

```
src/app/
  (default)/          # raiz "/": redireciona para /en ou /pt conforme o browser
  [lang]/             # layout e página por idioma
  components/         # um componente por secção (Hero, Services, Benefits, Process, Contact, Footer) + Navbar, toggles, etc.
  dictionaries/       # en.json, pt.json e index.ts (getDictionary, locales)
  design-system.json  # cores (escalas primary e ink)
  site.ts             # siteUrl = https://fulgorabstracto.vercel.app
  robots.ts, sitemap.ts, globals.css
```

- Todo o texto visível vive em `dictionaries/*.json`; `en.json` e `pt.json` têm exatamente as mesmas chaves.
- Cores definidas em `design-system.json` (`primary`, `ink`); os componentes usam as classes Tailwind correspondentes.
- URL do site só em `site.ts`.

## Deploy

- Repositório GitHub importado na Vercel; cada push faz deploy.
- Export estático (`output: 'export'`). Não há workflow de GitHub Pages.

## Convenções

- Sem texto visível hardcoded nos componentes — usar sempre o dicionário.
- Sem hex soltos nos componentes — usar as cores do design system.
- Acessibilidade: HTML semântico, `alt` em imagens, `aria-label` em botões só com ícone, foco visível, contraste suficiente em light e dark, respeitar `prefers-reduced-motion`.
- Commits com gitmoji: `✨ feat`, `🐛 fix`, `💄 ui`, `📝 docs`.
