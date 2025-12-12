import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, BarChart3, RefreshCw } from 'lucide-react';

// KPI data type
interface KPIData {
  id: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down' | 'flat';
  period: string;
  source: string;
  lastUpdated: string;
  frequency: 'monthly' | 'quarterly';
}

const ThailandKeyIndicators = () => {
  const { t, lang } = useI18n();

  // Latest available data (as of knowledge cutoff - these would be updated via API/CMS in production)
  const kpiData: Record<string, KPIData> = {
    gdp: {
      id: 'gdp',
      value: '3.0%',
      change: '+0.4%',
      changeDirection: 'up',
      period: 'Q3 2024',
      source: 'NESDC',
      lastUpdated: '2024-11',
      frequency: 'quarterly'
    },
    inflation: {
      id: 'inflation',
      value: '1.5%',
      change: '+0.3%',
      changeDirection: 'up',
      period: 'Nov 2024',
      source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
      lastUpdated: '2024-12',
      frequency: 'monthly'
    },
    interestRate: {
      id: 'interestRate',
      value: '2.25%',
      change: '-0.25%',
      changeDirection: 'down',
      period: '16 Oct 2024',
      source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
      lastUpdated: '2024-10',
      frequency: 'monthly'
    },
    exchangeRate: {
      id: 'exchangeRate',
      value: '¥4.18',
      change: '-1.2%',
      changeDirection: 'down',
      period: 'Dec 2024',
      source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
      lastUpdated: '2024-12',
      frequency: 'monthly'
    },
    exportGrowth: {
      id: 'exportGrowth',
      value: '+6.7%',
      change: '+2.1%',
      changeDirection: 'up',
      period: 'Oct 2024',
      source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
      lastUpdated: '2024-11',
      frequency: 'monthly'
    },
    ipi: {
      id: 'ipi',
      value: '94.2',
      change: '-1.5%',
      changeDirection: 'down',
      period: 'Oct 2024',
      source: lang === 'ja' ? '工業経済局' : 'OIE',
      lastUpdated: '2024-11',
      frequency: 'monthly'
    },
    boiInvestment: {
      id: 'boiInvestment',
      value: '₿722B',
      change: '+42%',
      changeDirection: 'up',
      period: 'Jan-Sep 2024',
      source: lang === 'ja' ? '投資委員会' : 'BOI Thailand',
      lastUpdated: '2024-10',
      frequency: 'quarterly'
    },
    unemployment: {
      id: 'unemployment',
      value: '1.0%',
      change: '-0.1%',
      changeDirection: 'down',
      period: 'Q3 2024',
      source: lang === 'ja' ? '国家統計局' : 'NSO',
      lastUpdated: '2024-11',
      frequency: 'quarterly'
    }
  };

  const kpiCards = [
    {
      key: 'gdp',
      label: t('bi.keyIndicators.gdp.label'),
      description: t('bi.keyIndicators.gdp.description')
    },
    {
      key: 'inflation',
      label: t('bi.keyIndicators.inflation.label'),
      description: t('bi.keyIndicators.inflation.description')
    },
    {
      key: 'interestRate',
      label: t('bi.keyIndicators.interestRate.label'),
      description: t('bi.keyIndicators.interestRate.description')
    },
    {
      key: 'exchangeRate',
      label: t('bi.keyIndicators.exchangeRate.label'),
      description: t('bi.keyIndicators.exchangeRate.description')
    },
    {
      key: 'exportGrowth',
      label: t('bi.keyIndicators.exportGrowth.label'),
      description: t('bi.keyIndicators.exportGrowth.description')
    },
    {
      key: 'ipi',
      label: t('bi.keyIndicators.ipi.label'),
      description: t('bi.keyIndicators.ipi.description')
    },
    {
      key: 'boiInvestment',
      label: t('bi.keyIndicators.boiInvestment.label'),
      description: t('bi.keyIndicators.boiInvestment.description')
    },
    {
      key: 'unemployment',
      label: t('bi.keyIndicators.unemployment.label'),
      description: t('bi.keyIndicators.unemployment.description')
    }
  ];

  const getTrendIcon = (direction?: 'up' | 'down' | 'flat') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (direction?: 'up' | 'down' | 'flat', isPositiveGood: boolean = true) => {
    if (direction === 'up') {
      return isPositiveGood ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    }
    if (direction === 'down') {
      return isPositiveGood ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
    }
    return 'text-muted-foreground';
  };

  // Map which indicators are "positive when down" (like unemployment, inflation)
  const invertedIndicators = ['unemployment', 'inflation'];

  return (
    <>
      <SEO 
        title={t('bi.keyIndicators.title')}
        description={t('bi.keyIndicators.metaDescription')}
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t('nav.home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/business-intelligence">{t('nav.businessIntelligence')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('bi.keyIndicators.nav')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                {t('bi.keyIndicators.hero.title')}
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('bi.keyIndicators.hero.subtitle')}
            </p>
            
            {/* Last update notice */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span>{t('bi.keyIndicators.updateNotice')}</span>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {kpiCards.map((card) => {
              const data = kpiData[card.key];
              const isInverted = invertedIndicators.includes(card.key);
              
              return (
                <Card 
                  key={card.key} 
                  className="bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                      {card.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                          {data.value}
                        </span>
                        {data.change && (
                          <div className={`flex items-center gap-1 ${getTrendColor(data.changeDirection, !isInverted)}`}>
                            {getTrendIcon(data.changeDirection)}
                            <span className="text-sm md:text-base font-medium">{data.change}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">
                        {data.period}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {lang === 'ja' ? '出典: ' : 'Source: '}{data.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Data Sources Notice */}
          <div className="mt-10 max-w-5xl mx-auto">
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="py-4">
                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  {t('bi.keyIndicators.dataSourcesNote')}
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThailandKeyIndicators;
