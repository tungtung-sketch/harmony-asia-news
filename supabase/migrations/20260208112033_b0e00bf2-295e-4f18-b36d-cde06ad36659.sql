INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES (
  'thailand-market-strategy',
  'Thailand Market Development: New Strategies for Japanese Companies',
  'タイ市場開拓：日本企業の新戦略',
  '1.0',
  '2026-02-04',
  '2026-02-04'
)
ON CONFLICT (report_slug) DO NOTHING;