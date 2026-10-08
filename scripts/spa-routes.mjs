// GitHub Pages serves static files only. Copy index.html to every client route
// so deep links return 200 (404.html stays as the catch-all fallback).
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';

const slugs = [...readFileSync('src/data/projects.ts', 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
copyFileSync('dist/index.html', 'dist/404.html');
for (const slug of slugs) {
  mkdirSync(`dist/projects/${slug}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/projects/${slug}/index.html`);
}
console.log(`spa-routes: 404.html + ${slugs.length} project routes`);
