# Adding an insight report

1. **Content lives in the repo, not Supabase.** Each report is one page component in `src/pages/insights/reports/<Name>.tsx` with a bilingual `content = { en, ja }` object. Copy the newest report (e.g. `ThailandFlood2026.tsx`) and replace the constants, `tocSections`, `content`, hero image import and breadcrumb.
2. **Register the route** in `src/App.tsx`: `/insights/<category>/<slug>`.
3. **List it** by adding a `reportMetadata['<slug>']` entry (with `titleEn`, `titleJa`, `lastUpdated`) in `src/hooks/useInsightReports.ts`. No database row is needed, and site search picks the report up automatically from this entry. `industry` must match a filter id in `src/pages/insights/InsightsLanding.tsx`. A new category also needs the filter pill, the i18n key, and Header and Footer links.
4. **Promote it** by adding a featured teaser block at the top of the teasers in `src/components/homepage/IntelligenceProof.tsx`, plus a `<url>` entry in `public/sitemap.xml`.
5. **Verify:** `npx tsc --noEmit -p tsconfig.app.json`, `npx eslint <changed files>` and `npm run build`. Then check the route in `npm run dev` logged out (paywall shows) and as premium, in JP and EN, at 375px, and in light and dark mode. Work on a `feat/insight-<slug>` branch and open a PR. Do not push to `main`, because Cloudflare Pages deploys it automatically.
