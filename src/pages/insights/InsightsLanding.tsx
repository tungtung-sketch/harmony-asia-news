import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  RefreshCw
} from 'lucide-react';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const InsightsLanding = () => {
  const { t, lang } = useI18n();
  const { reports, loading } = useInsightReports();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const isJapanese = lang === 'ja';
  const title = isJapanese ? 'インサイトレポート一覧 | WaLens' : 'Insight Reports Directory | WaLens';
  const description = isJapanese 
    ? 'WaLensのプレミアムインサイトレポート一覧。日系企業幹部向けのタイ・ASEAN市場インテリジェンス。'
    : 'Directory of WaLens premium insight reports. Thailand and ASEAN market intelligence for Japanese executives.';

  // Industry categories with icons
  const industries = [
    { id: 'all', label: isJapanese ? 'すべて' : 'All', labelEn: 'All', icon: Filter },
    { id: 'manufacturing', label: isJapanese ? '製造業' : 'Manufacturing', labelEn: 'Manufacturing', icon: Factory },
    { id: 'services', label: isJapanese ? 'サービス' : 'Services', labelEn: 'Services', icon: Building2 },
    { id: 'agriculture', label: isJapanese ? '農業' : 'Agriculture', labelEn: 'Agriculture', icon: Leaf },
    { id: 'healthcare', label: isJapanese ? 'ヘルスケア' : 'Healthcare', labelEn: 'Healthcare', icon: Heart },
    { id: 'real-estate', label: isJapanese ? '不動産' : 'Real Estate', labelEn: 'Real Estate', icon: Home },
  ];

  // Filter reports by industry
  const filteredReports = reports.filter(report => {
    if (activeFilter === 'all') return true;
    return report.industry.toLowerCase().includes(activeFilter.toLowerCase());
  });

  // Group reports by industry for display
  const reportsByIndustry = industries.slice(1).map(ind => ({
    ...ind,
    reports: reports.filter(r => r.industry.toLowerCase().includes(ind.labelEn.toLowerCase()))
  }));

  // Navigation cards for industry pages
  const industryCards = [
    { to: '/insights/manufacturing', label: isJapanese ? '製造業' : 'Manufacturing', icon: Factory, description: isJapanese ? 'サプライチェーン、自動化、インダストリー4.0' : 'Supply chain, automation, Industry 4.0' },
    { to: '/insights/services', label: isJapanese ? 'サービス' : 'Services', icon: Building2, description: isJapanese ? 'デジタル変革、金融サービス' : 'Digital transformation, financial services' },
    { to: '/insights/wellness-healthcare', label: isJapanese ? 'ウェルネス・ヘルスケア' : 'Wellness / Healthcare', icon: Heart, description: isJapanese ? '医療技術、ウェルネスツーリズム' : 'Medical tech, wellness tourism' },
    { to: '/insights/agriculture', label: isJapanese ? '農業' : 'Agriculture', icon: Leaf, description: isJapanese ? 'アグリテック、持続可能な農業' : 'Agritech, sustainable farming' },
    { to: '/insights/real-estate', label: isJapanese ? '不動産' : 'Real Estate', icon: Home, description: isJapanese ? '商業不動産、都市開発' : 'Commercial property, urban development' },
  ];

  return (
    <>
      <SEO title={title} description={description} canonicalPath="/insights" />
      <div className="min-h-screen bg-background">
        <Header />
        
        <InsightHero 
          title={isJapanese ? 'インサイトレポート' : 'Insight Reports'}
          description={isJapanese 
            ? 'タイ・ASEANビジネスの深層分析。日系企業経営層のための戦略的インテリジェンス。'
            : 'In-depth analysis of Thailand & ASEAN business. Strategic intelligence for Japanese executives.'
          }
          category={isJapanese ? 'プレミアムインテリジェンス' : 'Premium Intelligence'}
          backgroundImage={heroImage}
        />

        <main className="container mx-auto px-4 py-12">
          <Breadcrumb items={[{ label: t('insights.breadcrumb') }]} />

          {/* Industry Navigation Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isJapanese ? '業界別インサイト' : 'Industry Focus'}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {industryCards.map((item) => (
                <Link key={item.to} to={item.to} className="group">
                  <div className="h-full p-5 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
                    <item.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

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
            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
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
