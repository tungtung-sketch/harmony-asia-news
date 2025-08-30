import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import DataCard from '@/components/BusinessIntelligence/DataCard';
import { tradeData } from '@/data/businessIntelligenceData';
import { Package, Factory } from 'lucide-react';

const TradeIndustry = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO 
        title={t('bi.trade.title')}
        description={t('bi.trade.metaDescription')}
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
                <BreadcrumbPage>{t('bi.trade.title')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold">{t('bi.trade.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {t('bi.trade.description')}
            </p>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tradeData.map((data) => (
              <DataCard key={data.id} data={data} />
            ))}
          </div>

          {/* Data Sources */}
          <div className="mt-12 p-6 bg-background/50 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Factory className="h-5 w-5" />
              {t('bi.dataSources.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Thai Customs Department</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.customs')}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Federation of Thai Industries</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.fti')}
                </p>
                <a 
                  href="https://www.fti.or.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.fti.or.th
                </a>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Ministry of Commerce</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.moc')}
                </p>
                <a 
                  href="https://www.moc.go.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.moc.go.th
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

export default TradeIndustry;