INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'electronics-semiconductor',
  'Thailand''s Electronics & Semiconductor Industry 2026: Supply Chain Realignment and Japanese Opportunities',
  'タイ電子機器・半導体産業 2026：サプライチェーン再編と日本企業の勝機',
  '1.0',
  '2026-02-08',
  '2026-02-08'
),
(
  'big-data-ai',
  'Big Data and AI Trends in Thailand: From Experimentation to National Infrastructure',
  'タイのビッグデータ＆AI動向：「実験」から「国家インフラ」への転換',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;