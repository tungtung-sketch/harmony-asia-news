import { useI18n } from '@/i18n/I18nProvider';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import reportImage from '@/assets/executive-reports-dashboard.jpg';
import thaiChuayImage from '@/assets/thai-chuay-thai-anutin.jpg';

interface InsightCard {
  signal: string;
  signalJa: string;
  impact: string;
  impactJa: string;
  tags: string[];
  url: string;
  isPremium?: boolean;
}

const sampleInsights: InsightCard[] = [
  {
    signal: 'US-Iran tensions trigger Hormuz Strait shipping disruptions',
    signalJa: '米イラン緊張によりホルムズ海峡の航行が混乱',
    impact: 'Thai manufacturing faces 15-20% energy cost surge — diversification of LNG sourcing becomes urgent for Japanese plants.',
    impactJa: 'タイ製造業はエネルギーコスト15-20%上昇に直面。日系工場にとってLNG調達先の多様化が急務に。',
    tags: ['Geopolitics', 'Energy', 'Manufacturing'],
    url: '/insights/manufacturing/hormuz-crisis-impact',
    isPremium: true,
  },
  {
    signal: "Thailand's Anutin 2 government enacts Made-in-Thailand procurement mandate",
    signalJa: 'タイ・アヌティン2政権が「Made in Thailand」調達義務化を施行',
    impact: 'Japanese firms must localize 40%+ of government-contract supply chains within 18 months or face exclusion from public tenders.',
    impactJa: '日系企業は政府契約サプライチェーンの40%以上を18ヶ月以内に現地化しなければ、公共入札から除外されるリスク。',
    tags: ['Policy', 'Supply Chain'],
    url: '/insights/services/thai-gov-policy-japanese',
    isPremium: true,
  },
  {
    signal: 'Thailand wellness economy reaches USD 40.5B — aging society accelerates demand',
    signalJa: 'タイのウェルネス経済が405億ドルに到達 — 高齢化社会が需要を加速',
    impact: 'Kaigo & senior living presents a $2B+ entry opportunity — BOI offers 8-year CIT exemption for Japanese eldercare firms.',
    impactJa: '介護・シニアリビングは20億ドル超の参入機会。BOIは日本の高齢者ケア企業に8年間の法人税免除を提供。',
    tags: ['Healthcare', 'Investment'],
    url: '/insights/wellness-healthcare/wellness-report',
    isPremium: true,
  },
];

const IntelligenceProof = () => {
  const { t, lang } = useI18n();

  return (
    <section id="intelligence-proof" className="py-16 md:py-24">
      <div className="container mx-auto">
        {/* Header with image accent */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 mb-12 md:mb-16">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              {t('proof.label')}
            </p>
            <h2 className={`font-bold text-foreground mb-4 ${
              lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
            }`}>
              {t('proof.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6">
              {t('proof.subtitle')}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/signup">
                {lang === 'ja' ? '30日間無料トライアルを開始' : 'Start 30-Day Free Trial'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-5/12 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-lg aspect-[3/2]">
              <img
                src={reportImage}
                alt="Executive reports dashboard"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>

        {/* Insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleInsights.map((insight, i) => (
            <Link
              key={i}
              to={insight.url}
              className="group bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Colored top strip */}
              <div className="h-1 bg-primary/60 group-hover:bg-primary transition-colors" />

              <div className="p-6 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {insight.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium bg-primary/5 text-primary border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {insight.isPremium && (
                    <Badge className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                      Premium
                    </Badge>
                  )}
                </div>

                {/* Headline */}
                <div className="mb-4">
                  <p className={`font-semibold text-foreground leading-snug ${
                    lang === 'ja' ? 'text-sm sm:text-base' : 'text-base'
                  }`}>
                    {lang === 'ja' ? insight.signalJa : insight.signal}
                  </p>
                </div>

                {/* Impact */}
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] mb-1.5">
                    {t('proof.impact')}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lang === 'ja' ? insight.impactJa : insight.impact}
                  </p>
                </div>

                {/* Read more */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  {t('proof.readMore')}
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured report teaser */}
        <div className="max-w-6xl mx-auto mt-8">
          <Link
            to="/insights/economic-policy/thai-chuay-thai-plus-2026"
            className="group flex flex-col md:flex-row bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="md:w-2/5 flex-shrink-0 flex flex-col bg-black/90">
              <img
                src={thaiChuayImage}
                alt="PM Anutin Charnvirakul at Thai Chuay Thai Plus press conference"
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
              <p className="px-2 py-1.5 text-[10px] text-gray-400 leading-snug">
                Photo: The Standard (thestandard.co), May 2026
              </p>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="secondary" className="text-xs font-medium bg-primary/5 text-primary border-0">Economic Policy</Badge>
                  <Badge variant="secondary" className="text-xs font-medium bg-primary/5 text-primary border-0">Consumer Markets</Badge>
                  <Badge variant="secondary" className="text-xs font-medium bg-primary/5 text-primary border-0">China Competition</Badge>
                  <Badge className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <h3 className={`font-bold text-foreground leading-snug mb-3 ${lang === 'ja' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                  {lang === 'ja'
                    ? 'タイ「タイ・チュワイ・タイ・プラス」政策の全解剖 ── 中国企業の次の一手と、日系エグゼクティブが今知るべき戦略的含意'
                    : "Thailand's 'Thais Help Thais Plus' Stimulus: Strategic Implications for Japanese Executives"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === 'ja'
                    ? '1,757億バーツが4ヵ月間で4,318万人の消費者に流れる——中国ブランドがタイ自動車市場の46.8%を占有する中、日系企業が今すべきことをWaLensが解説する。'
                    : '฿175.7 billion targeting 43 million consumers over four months. With Chinese brands holding 46.8% of the Thai auto market, WaLens breaks down what Japanese executives must do now.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/40 flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {lang === 'ja' ? 'フルレポートを読む' : 'Read Full Report'}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default IntelligenceProof;
