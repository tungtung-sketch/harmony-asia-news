INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'decarbonization',
  'Thailand''s Decarbonization Agenda: From Targets to Enforceable Policy Stack',
  'タイの脱炭素化：「目標」から「執行可能な政策体系」への転換',
  '1.0',
  '2026-02-08',
  '2026-02-08'
),
(
  'chemical-industry',
  'Thailand''s Chemical Industry at the 2025 Inflection Point: From Manufacturing Base to Social Solutions Hub',
  'タイ化学産業の2025年転換点：「製造拠点」から「社会課題解決ハブ」への変貌',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;