import { copyFile, mkdir } from 'node:fs/promises';

// GitHub Pages does not provide SPA fallback routes. Copy the self-contained
// entry point so each server page works on direct visits and refreshes.
for (const slug of ['minecraft', 'seven-days-to-die']) {
  await mkdir(`dist/${slug}`, { recursive: true });
  await copyFile('dist/index.html', `dist/${slug}/index.html`);
}
