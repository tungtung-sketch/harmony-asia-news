INSERT INTO public.insight_reports (report_slug, title_en, title_ja, base_report_version, base_report_updated_at, last_content_update)
VALUES 
(
  'agriculture-industry',
  'Thailand''s Agriculture Sector: Compliance, Climate & Value-Add — Where Japanese Capital Should Play',
  'タイ農業セクター：コンプライアンス・気候変動・高付加価値化——日本企業の資本投下先はどこか？',
  '1.0',
  '2026-02-08',
  '2026-02-08'
),
(
  'real-estate-market',
  'Thailand Real Estate Market 2026: Structural Shifts & Winning Strategies for Japanese Companies',
  'タイ不動産市場2026：構造変化と日本企業の勝ち筋',
  '1.0',
  '2026-02-08',
  '2026-02-08'
)
ON CONFLICT (report_slug) DO NOTHING;