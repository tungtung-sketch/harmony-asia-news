import { useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import DataCard from '@/components/BusinessIntelligence/DataCard';
import TimePeriodFilter from '@/components/BusinessIntelligence/TimePeriodFilter';
import { economyData, TimePeriod } from '@/data/businessIntelligenceData';
import { TrendingUp, DollarSign } from 'lucide-react';

const EconomyInvestment = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('quarterly');
  const { t } = useI18n();

  return (
    <>
      <SEO 
        title={t('bi.economy.title')}
        description={t('bi.economy.metaDescription')}
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
                <BreadcrumbPage>{t('bi.economy.title')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold">{t('bi.economy.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {t('bi.economy.description')}
            </p>
          </div>

          {/* Time Period Filter */}
          <div className="flex justify-end mb-6">
            <TimePeriodFilter
              selectedPeriod={timePeriod}
              onPeriodChange={setTimePeriod}
            />
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {economyData.map((data) => (
              <DataCard key={data.id} data={data} timePeriod={timePeriod} />
            ))}
          </div>

          {/* Data Sources */}
          <div className="mt-12 p-6 bg-background/50 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t('bi.dataSources.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Bank of Thailand (BOT)</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.bot')}
                </p>
                <a 
                  href="https://www.bot.or.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.bot.or.th
                </a>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">NESDC</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.nesdc')}
                </p>
                <a 
                  href="https://www.nesdc.go.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.nesdc.go.th
                </a>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">BOI</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.boi')}
                </p>
                <a 
                  href="https://www.boi.go.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.boi.go.th
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EconomyInvestment;