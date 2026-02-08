INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'food-industry',
  'Thailand''s Food Revolution: From ''Kitchen of the World'' to ''Pharmacy of the World''',
  'タイの食品革命：「世界の台所」から「世界の薬局」への変貌',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;