-- Create insight_updates table for Living Updates
CREATE TABLE public.insight_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_slug TEXT NOT NULL,
  update_date DATE NOT NULL DEFAULT CURRENT_DATE,
  headline_en TEXT NOT NULL,
  headline_ja TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ja TEXT NOT NULL,
  tag TEXT CHECK (tag IN ('policy', 'market', 'competitor', 'workforce', 'investment')),
  related_section TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Add base report version tracking to insight_reports
ALTER TABLE public.insight_reports 
ADD COLUMN IF NOT EXISTS base_report_version TEXT DEFAULT '1.0',
ADD COLUMN IF NOT EXISTS base_report_updated_at TIMESTAMPTZ DEFAULT now();

-- Enable RLS
ALTER TABLE public.insight_updates ENABLE ROW LEVEL SECURITY;

-- Anyone can read published updates (for premium check in frontend)
CREATE POLICY "Anyone can read published insight updates"
ON public.insight_updates FOR SELECT USING (is_published = true);

-- Only admins can manage updates
CREATE POLICY "Only admins can manage insight updates"
ON public.insight_updates FOR ALL USING (is_admin_user()) WITH CHECK (is_admin_user());

-- Create index for efficient queries
CREATE INDEX idx_insight_updates_report_slug ON public.insight_updates(report_slug);
CREATE INDEX idx_insight_updates_date ON public.insight_updates(update_date DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_insight_updates_updated_at
BEFORE UPDATE ON public.insight_updates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample living updates for EV report
INSERT INTO public.insight_updates (report_slug, update_date, headline_en, headline_ja, description_en, description_ja, tag, related_section) VALUES
('ev-battery-industry', '2025-06-10', 'Chinese OEMs increase promotional financing in Thailand', '中国OEMがタイでプロモーション融資を拡大', 'BYD and NETA offering 0% financing for 84 months, intensifying price competition. This accelerates Scenario A likelihood in our strategic forecast.', 'BYDとNETAが84ヶ月0%ファイナンスを提供開始。価格競争が激化し、戦略予測のシナリオA実現可能性が高まる。', 'competitor', 'strategic-scenarios'),
('ev-battery-industry', '2025-06-05', 'BOI announces additional EV3.5 incentives for battery recycling', 'BOIがバッテリーリサイクル向け追加EV3.5インセンティブを発表', 'New 8-year tax holiday for battery recycling facilities meeting 40% local content. Opens opportunity for Japanese recycling technology providers.', 'ローカルコンテンツ40%を満たすバッテリーリサイクル施設に8年間の免税措置。日系リサイクル技術企業に新たな参入機会。', 'policy', 'boi-incentives'),
('ev-battery-industry', '2025-05-28', 'Toyota Thailand confirms LFP battery local assembly timeline', 'トヨタ・タイランドがLFPバッテリー現地組立スケジュールを確認', 'Production to begin Q3 2026 at Gateway plant. Signals Japanese OEM commitment to Thailand EV ecosystem despite Chinese competition.', '2026年第3四半期にゲートウェイ工場で生産開始。中国勢との競争下でも日系OEMのタイEVエコシステムへのコミットメントを示す。', 'investment', 'industry-snapshot'),
('ev-battery-industry', '2025-05-20', 'Ministry of Industry revises EV penetration target to 35% by 2030', '工業省が2030年EV普及目標を35%に上方修正', 'Previous 30% target raised amid faster-than-expected adoption. Infrastructure investment acceleration expected.', '予想を上回る普及速度を受け、従来の30%目標を引き上げ。インフラ投資の加速が見込まれる。', 'policy', 'policy-regulation'),
('ev-battery-industry', '2025-05-12', 'CATL evaluating second Thailand battery plant', 'CATLがタイ第2バッテリー工場を検討中', 'Expansion would double Chinese battery capacity in Thailand. Japanese Tier-1 suppliers face increased competitive pressure.', '拡張により中国系バッテリー生産能力が倍増。日系Tier-1サプライヤーへの競争圧力が増大。', 'competitor', 'battery-battlefield');