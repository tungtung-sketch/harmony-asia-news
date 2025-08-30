import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import DataCard from '@/components/BusinessIntelligence/DataCard';
import { regulationData } from '@/data/businessIntelligenceData';
import { FileText, Shield } from 'lucide-react';

const RegulationTax = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO 
        title={t('bi.regulation.title')}
        description={t('bi.regulation.metaDescription')}
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
                <BreadcrumbPage>{t('bi.regulation.title')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold">{t('bi.regulation.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {t('bi.regulation.description')}
            </p>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regulationData.map((data) => (
              <DataCard key={data.id} data={data} />
            ))}
          </div>

          {/* Data Sources */}
          <div className="mt-12 p-6 bg-background/50 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('bi.dataSources.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Revenue Department</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.revenue')}
                </p>
                <a 
                  href="https://www.rd.go.th" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  www.rd.go.th
                </a>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Royal Gazette</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.gazette')}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Ministry of Labour</h3>
                <p className="text-sm text-muted-foreground">
                  {t('bi.dataSources.labour')}
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RegulationTax;