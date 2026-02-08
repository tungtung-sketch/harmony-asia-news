INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'energy-industry',
  'Thailand''s Energy Transformation and Industrial Renaissance: A Strategic Blueprint for Japanese Executives (2025–2030)',
  'タイのエネルギー変革と産業ルネサンス：日本企業経営者のための戦略青写真（2025–2030）',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;