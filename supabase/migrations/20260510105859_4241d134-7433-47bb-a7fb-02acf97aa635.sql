INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update, pdf_enabled, watermark_text)
VALUES (
  'sea-automotive-aftermarket-2026',
  'Strategic Transformation of Southeast Asia''s Automotive Aftermarket: Growth Drivers, Disruptive Entrants, and Supply Chain Reconfiguration',
  '東南アジア自動車アフターマーケットの構造転換：成長ドライバー、ディスラプター、サプライチェーン再編',
  '1.0',
  now(),
  now(),
  true,
  'For Premium Members of WaLens Only'
)
ON CONFLICT (report_slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ja = EXCLUDED.title_ja,
  last_content_update = now(),
  updated_at = now();