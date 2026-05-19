import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import NewsSectionFromSheet from '@/components/NewsSectionFromSheet';

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

          {/* Static intro for SEO */}
          <section className="container mx-auto px-4 py-8 max-w-3xl text-center">
            <p className="text-muted-foreground leading-relaxed">
              WaLens delivers daily business news from Thailand, Japan, and across Asia, curated
              for Japanese executives navigating global markets. Our editorial team translates and
              summarizes key developments in politics, economics, industry, and policy. Stay ahead
              with concise, bilingual coverage updated every business day.
            </p>
          </section>

          {/* News Content */}
          <NewsSectionFromSheet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default News;