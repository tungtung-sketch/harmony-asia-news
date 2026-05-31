import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InsightHero from '@/components/InsightHero';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { useInsightReports } from '@/hooks/useInsightReports';
import { InsightReportCard } from '@/components/insights/InsightReportCard';
import { ComingSoonSection } from '@/components/insights/ComingSoonSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Filter,
  Clock,
  Factory,
  Building2,
  Leaf,
  Heart,
  Home,
  RefreshCw,
  Landmark,
  Zap,
  Cpu
} from 'lucide-react';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const VALID_FILTERS = ['all', 'manufacturing', 'services', 'agriculture', 'healthcare', 'real-estate', 'economic-policy', 'energy', 'technology'];

const InsightsLanding = () => {
  const { t, lang } = useI18n();
  const { reports, loading } = useInsightReports();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filterParam = searchParams.get('filter') || 'all';
  const activeFilter = VALID_FILTERS.includes(filterParam) ? filterParam : 'all';

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  };

  const isJapanese = lang === 'ja';
  const title = isJapanese
    ? 'インサイト＆レポート | WaLens エグゼクティブインテリジェンス'
    : 'Insights & Reports | WaLens Executive Intelligence';
  const description = isJapanese
    ? 'タイ・アジア市場の詳細なインサイトとエグゼクティブレポート。クロスボーダーの意思決定者向けビジネスインテリジェンス。'
    : 'In-depth insights and executive reports on Thailand and Asia markets. Business intelligence for cross-border decision makers.';

  // Industry categories with icons
  const industries = [
    { id: 'all', label: isJapanese ? 'すべて' : 'All', labelEn: 'All', icon: Filter },
    { id: 'manufacturing', label: isJapanese ? '製造業' : 'Manufacturing', labelEn: 'Manufacturing', icon: Factory },
    { id: 'services', label: isJapanese ? 'サービス' : 'Services', labelEn: 'Services', icon: Building2 },
    { id: 'economic-policy', label: isJapanese ? '経済政策' : 'Economic Policy', labelEn: 'Economic Policy', icon: Landmark },
    { id: 'energy', label: isJapanese ? 'エネルギー' : 'Energy', labelEn: 'Energy', icon: Zap },
    { id: 'technology', label: isJapanese ? 'テクノロジー' : 'Technology', labelEn: 'Technology', icon: Cpu },
    { id: 'agriculture', label: isJapanese ? '農業' : 'Agriculture', labelEn: 'Agriculture', icon: Leaf },
    { id: 'healthcare', label: isJapanese ? 'ヘルスケア' : 'Healthcare', labelEn: 'Healthcare', icon: Heart },
    { id: 'real-estate', label: isJapanese ? '不動産' : 'Real Estate', labelEn: 'Real Estate', icon: Home },
  ];

  // Normalize strings for comparison (remove hyphens/spaces for consistent matching)
  const normalize = (s: string) => s.toLowerCase().replace(/[-\s]/g, '');

  // Filter reports by industry
  const filteredReports = reports.filter(report => {
    if (activeFilter === 'all') return true;
    return normalize(report.industry).includes(normalize(activeFilter));
  });

  // Group reports by industry for display
  const reportsByIndustry = industries.slice(1).map(ind => ({
    ...ind,
    reports: reports.filter(r => normalize(r.industry).includes(normalize(ind.labelEn)))
  }));




  return (
    <>
      <SEO title={title} description={description} canonicalPath="/insights" />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title={isJapanese ? 'インサイトレポート' : 'Insight Reports'}
          description={isJapanese 
            ? 'グローバルビジネスの深層分析。日系企業経営層のための戦略的インテリジェンス。'
            : 'In-depth global business analysis. Strategic intelligence for Japanese executives.'
          }
          category={isJapanese ? 'プレミアムインテリジェンス' : 'Premium Intelligence'}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[{ label: t('insights.breadcrumb') }]} />

          {/* Static intro for SEO */}
          <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            {isJapanese
              ? 'WaLensインサイトレポートは、アジアで事業拡大を目指す日系企業向けの深層市場分析と戦略的インテリジェンスを提供します。各レポートは業界トレンド、規制環境、競争環境、実践的な提言を網羅しています。以下から業種別にプレミアムレポートをご覧ください。'
              : 'WaLens Insight Reports provide in-depth market analysis and strategic intelligence for Japanese companies exploring opportunities in Asia. Each report covers industry trends, regulatory environment, competitive landscape, and actionable recommendations. Browse our premium reports by industry sector below.'
            }
          </p>

          {/* Premium Reports Directory */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {isJapanese ? 'プレミアムレポート一覧' : 'Premium Report Directory'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4" />
                {isJapanese ? '最終更新順' : 'Sorted by recently updated'}
              </div>
            </div>

            {/* Filter Tabs */}
            <Tabs value={activeFilter} className="mb-6" onValueChange={handleFilterChange}>
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {industries.map(ind => (
                  <TabsTrigger 
                    key={ind.id} 
                    value={ind.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full border"
                  >
                    <ind.icon className="h-4 w-4 mr-2" />
                    {ind.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Reports List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 rounded-lg border">
                    <div className="flex gap-4">
                      <Skeleton className="h-16 w-16 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredReports.length > 0 ? (
              <div className="space-y-4">
                {filteredReports.map(report => (
                  <InsightReportCard
                    key={report.id}
                    title={report.title_en}
                    titleJa={report.title_ja}
                    description={report.description}
                    descriptionJa={report.descriptionJa}
                    industry={report.industry}
                    industryJa={report.industryJa}
                    reportType="base"
                    lastUpdated={report.last_content_update || report.updated_at || ''}
                    link={report.link}
                    isPremium={true}
                    updateCount={report.updateCount30Days}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {activeFilter === 'all' ? (
                  // Show coming soon for each industry without reports
                  reportsByIndustry
                    .filter(ind => ind.reports.length === 0)
                    .slice(0, 3)
                    .map(ind => (
                      <ComingSoonSection 
                        key={ind.id} 
                        industry={ind.labelEn} 
                        industryJa={ind.label}
                      />
                    ))
                ) : (
                  <ComingSoonSection 
                    industry={industries.find(i => i.id === activeFilter)?.labelEn || activeFilter}
                    industryJa={industries.find(i => i.id === activeFilter)?.label}
                  />
                )}
              </div>
            )}
          </section>

          {/* If some reports exist but filtered shows none */}
          {!loading && reports.length > 0 && filteredReports.length === 0 && (
            <ComingSoonSection 
              industry={industries.find(i => i.id === activeFilter)?.labelEn || 'Selected Industry'}
              industryJa={industries.find(i => i.id === activeFilter)?.label}
            />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InsightsLanding;
