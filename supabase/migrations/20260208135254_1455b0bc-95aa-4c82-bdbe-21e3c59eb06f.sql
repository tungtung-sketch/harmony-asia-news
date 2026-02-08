INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'automotive-industry',
  'Strategic Realignment: Thailand''s Industrial Transformation Amidst Mega-Trends (2026 Outlook)',
  '戦略的再編：メガトレンドの中でのタイ産業変革（2026年展望）',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;