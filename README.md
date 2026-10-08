# cccjson.github.io

Personal portfolio of **Chen Jinsheng (Jason)** — quant research, C++ trading engines and ML systems.

Live at **https://cccjson.github.io**

Layout and visual language follow [react-portfolio-template](https://github.com/yujisatojr/react-portfolio-template) (MIT), rebuilt with scroll-driven animations and a case-study page per project.

## Stack

- React 19 + TypeScript, Vite, React Router
- Plain CSS (no UI framework); charts are hand-written SVG
- Deployed to GitHub Pages by GitHub Actions on every push to `main`

## Structure

```
src/
  data/          content: projects, career history, Numerai round data, profile links
  components/    home sections, shared case-study building blocks (ProjectKit)
  pages/         Home and one page per project
  styles/        global tokens + motion, home, project, page-specific styles
  hooks/         useReveal — reveals .rv elements as they scroll into view
public/images/   responsive WebP + JPG/PNG fallbacks
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build (also writes 404.html for SPA routes)
npm run lint
```

## Editing content

Most text lives in `src/data/`. To add a project: add an entry to `src/data/projects.ts`, create `src/pages/projects/<Name>.tsx` with the `ProjectKit` components, and register the route in `src/App.tsx`.
