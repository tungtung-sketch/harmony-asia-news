INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update, pdf_enabled, watermark_text)
VALUES (
  'energy-crisis-baht-strategy-2026',
  'Strategic Briefing for Japanese Executives in Thailand: Energy Crisis, Baht Depreciation, and Sector Recommendations (April 2026)',
  '在タイ日系企業経営層向け戦略ブリーフィング：エネルギー危機・バーツ安・セクター別推奨アクション（2026年4月）',
  '1.0',
  now(),
  now(),
  true,
  'For Premium Members of WaLen Only'
)
ON CONFLICT (report_slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ja = EXCLUDED.title_ja,
  last_content_update = now(),
  updated_at = now();