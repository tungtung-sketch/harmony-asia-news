import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import NewsSection from '@/components/NewsSection';

const News = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t("news.title")}
        description={t("news.description")}
        canonicalPath="/news"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('news.heroTitle')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('news.heroSubtitle')}
              </p>
            </div>
          </section>

          {/* News Content */}
          <NewsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default News;