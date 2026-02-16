import { useState, useMemo } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import BIFilter from '@/components/BusinessIntelligence/BIFilter';
import DataCard from '@/components/BusinessIntelligence/DataCard';
import TimePeriodFilter from '@/components/BusinessIntelligence/TimePeriodFilter';
import { allBusinessData, categories, TimePeriod } from '@/data/businessIntelligenceData';
import { BarChart3, TrendingUp, Database } from 'lucide-react';

const BusinessIntelligence = () => {
  const { t, lang } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('quarterly');

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return allBusinessData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesYear = selectedYear === 'all' || item.year?.toString() === selectedYear;
      const matchesSearch = searchQuery === '' || 
        item.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.ja.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.ja.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  return (
    <>
      <SEO 
        title={t('bi.title')}
        description={t('bi.metaDescription')}
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
                <BreadcrumbPage>{t('nav.businessIntelligence')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t('bi.hero.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('bi.hero.subtitle')}
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="bg-background/50 border rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{allBusinessData.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('bi.stats.dataPoints')}</p>
              </div>
              <div className="bg-background/50 border rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">5</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('bi.stats.categories')}</p>
              </div>
              <div className="bg-background/50 border rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">24/7</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('bi.stats.realTime')}</p>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="space-y-4">
            <BIFilter
              selectedCategory={selectedCategory}
              selectedYear={selectedYear}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onYearChange={setSelectedYear}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
              resultCount={filteredData.length}
              totalCount={allBusinessData.length}
            />
            
            {/* Time Period Filter */}
            <div className="flex justify-end">
              <TimePeriodFilter
                selectedPeriod={timePeriod}
                onPeriodChange={setTimePeriod}
              />
            </div>
          </div>

          {/* Data Grid */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {filteredData.map((data) => (
                <DataCard key={data.id} data={data} timePeriod={timePeriod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">{t('bi.filter.noResults')}</h3>
                <p>{t('bi.filter.noResultsDesc')}</p>
              </div>
              <button 
                onClick={handleClearFilters}
                className="text-primary hover:underline"
              >
                {t('bi.filter.clearFilters')}
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessIntelligence;