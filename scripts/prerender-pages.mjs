/**
 * Post-build pre-rendering script.
 *
 * Runs automatically via `postbuild` after `npm run build`.
 * For each target route it:
 *   1. Copies dist/index.html
 *   2. Replaces <title>, meta description, og:title, og:description
 *   3. Injects fallback HTML inside <div id="root"> for non-JS crawlers
 *   4. Writes the result to dist/<route>/index.html
 *
 * This means Google and social-media bots reading the raw HTML get correct,
 * page-specific meta tags and visible intro text without executing JavaScript.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

let template;
try {
  template = readFileSync(join(distDir, 'index.html'), 'utf-8');
} catch {
  console.error('[prerender] dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const pages = [
  {
    route: 'news',
    title: 'Latest News | WaLens Thailand & Asia Business Intelligence',
    description:
      'Curated daily business news from Thailand and Asia for Japanese executives. Policy updates, market shifts, and strategic intelligence.',
    h1: 'Latest News',
    intro:
      'WaLens delivers curated daily business news from Thailand and Asia for Japanese executives navigating global markets. Our editorial team covers policy updates, market shifts, and strategic intelligence every business day.',
  },
  {
    route: 'insights',
    title: 'Insights & Reports | WaLens Executive Intelligence',
    description:
      'In-depth insights and executive reports on Thailand and Asia markets. Business intelligence for cross-border decision makers.',
    h1: 'Insights & Reports',
    intro:
      'WaLens publishes in-depth insights and executive reports on Thailand and Asia markets. Each report is designed to support cross-border decision makers with actionable business intelligence.',
  },
  {
    route: 'business-intelligence',
    title: 'Business Intelligence | WaLens Thailand',
    description:
      'Strategic business intelligence on Thailand economy, regulations, trade and investment for Japanese executives operating in Asia.',
    h1: 'Business Intelligence',
    intro:
      'WaLens Business Intelligence delivers strategic intelligence on the Thailand economy, regulations, trade, and investment — curated for Japanese executives operating in Asia.',
  },
  {
    route: 'insights/services',
    title: 'Services | WaLens Executive Intelligence Platform',
    description:
      'WaLens intelligence services for Japanese executives in Thailand. Market analysis, risk alerts, and decision-ready reports.',
    h1: 'Services',
    intro:
      'WaLens intelligence services support Japanese executives in Thailand with market analysis, risk alerts, and decision-ready reports across the services sector.',
  },
];

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

for (const page of pages) {
  const fallback = `<div id="root"><div style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:2rem 1rem"><h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem">${esc(page.h1)}</h1><p style="color:#555;line-height:1.75">${esc(page.intro)}</p></div></div>`;

  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${esc(page.description)}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${esc(page.title)}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${esc(page.description)}"`,
    )
    .replace('<div id="root"></div>', fallback);

  const dir = join(distDir, page.route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  console.log(`[prerender] wrote dist/${page.route}/index.html`);
}

console.log('[prerender] done.');
