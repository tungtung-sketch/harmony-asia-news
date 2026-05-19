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
    title: 'Thailand & Asia Business News | WaLens',
    description:
      'Breaking business news, market analysis, and policy updates from Thailand and Asia. Daily intelligence for Japanese executives and business leaders navigating global markets.',
    h1: 'Thailand & Asia Business News',
    intro:
      'WaLens delivers daily business news from Thailand, Japan, and across Asia, curated for Japanese executives navigating global markets. Our editorial team translates and summarizes key developments in politics, economics, industry, and policy. Stay ahead with concise, bilingual coverage updated every business day.',
  },
  {
    route: 'insights',
    title: 'Premium Insight Reports — Asia Market Intelligence | WaLens',
    description:
      'Premium industry reports and strategic market intelligence for Japanese companies expanding in Asia. Covering manufacturing, services, healthcare, agriculture, and real estate.',
    h1: 'Insight Reports',
    intro:
      'WaLens Insight Reports provide in-depth market analysis and strategic intelligence for Japanese companies exploring opportunities in Asia. Each report covers industry trends, regulatory environment, competitive landscape, and actionable recommendations. Browse our premium reports by industry sector below.',
  },
  {
    route: 'business-intelligence',
    title: 'Thailand Business Intelligence Dashboard | WaLens',
    description:
      'Real-time Thailand economic indicators, trade statistics, and regulatory data from official government sources — BOT, NESDC, BOI, and more. Updated regularly for strategic decision-making.',
    h1: 'Business Intelligence',
    intro:
      'WaLens Business Intelligence aggregates real-time economic data from official Thai government sources, including the Bank of Thailand, NESDC, and Ministry of Commerce. Our dashboard presents key economic indicators, trade statistics, and regulatory updates in a clear, actionable format. Updated regularly with official data for strategic decision-making.',
  },
  {
    route: 'insights/services',
    title: 'Services Sector Intelligence — Fintech & Digital Transformation | WaLens',
    description:
      'Strategic intelligence on digital transformation, fintech, and professional services expansion across Thailand and Asia for Japanese companies.',
    h1: 'Services Sector Intelligence',
    intro:
      'WaLens Services Intelligence covers digital transformation, cross-border fintech, and professional services expansion across Thailand and Asia. Our analysis helps Japanese executives identify opportunities in cloud infrastructure, digital banking, and business process outsourcing. Updated regularly with market intelligence for the services sector.',
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
