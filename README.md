# Fulgor Abstracto

Static website for **Fulgor Abstracto**, a Portuguese company offering IT services, software development and server maintenance.

**Live site:** https://fulgorabstracto.vercel.app

## Features

- English and Portuguese versions (`/en`, `/pt`); the root `/` redirects based on the browser language
- Light and dark mode that follows the system preference, with a manual toggle
- Sections: Hero, Services, Benefits, Process, Contact
- Contact form powered by [Web3Forms](https://web3forms.com)
- Fully static export, SEO metadata, `robots.txt` and `sitemap.xml`
- Accessible: semantic HTML, visible focus and `prefers-reduced-motion` support

## Tech stack

| Area       | Tools                                   |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19       |
| Language   | TypeScript                              |
| Styling    | Tailwind CSS 4                          |
| Theming    | next-themes                             |
| Animations | motion                                  |
| Icons      | Heroicons                               |

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the development server        |
| `npm run lint`  | Run ESLint                          |
| `npm run build` | Build the static export into `out/` |

## Project structure

```
src/app/
├── (default)/          # "/" redirects to /en or /pt
├── [lang]/             # Per-language layout and page
├── components/         # One component per section, plus navbar and toggles
├── dictionaries/       # en.json, pt.json and the loader
├── design-system.json  # Color scales (primary, ink)
├── site.ts             # Public site URL
├── robots.ts
├── sitemap.ts
└── globals.css
logo-export/            # Brand assets (SVG, PNG, favicon, social, print)
```

## Content and styling

- **Text:** all visible copy lives in `src/app/dictionaries/en.json` and `pt.json`. Both files must keep the same keys.
- **Colors:** defined in `src/app/design-system.json` and used through Tailwind classes. Do not hardcode hex values in components.
- **Site URL:** only in `src/app/site.ts`.
- **Contact form:** the Web3Forms public key is set in `src/app/components/ContactSection.tsx`.

## Deployment

The GitHub repository is connected to [Vercel](https://vercel.com). Every push to `main` triggers a deploy of the static export.

## Commit convention

Commits use [gitmoji](https://gitmoji.dev): `✨ feat`, `🐛 fix`, `💄 ui`, `📝 docs`.
