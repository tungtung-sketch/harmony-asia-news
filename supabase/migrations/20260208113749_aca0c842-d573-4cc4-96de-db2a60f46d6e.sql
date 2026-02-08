INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES (
  'wellness-healthcare',
  'Thailand''s Wellness & Healthcare Industry: A Strategic Blueprint for Japanese Enterprise',
  'タイ・ウェルネス＆ヘルスケア産業：日本企業のための戦略的青写真',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;