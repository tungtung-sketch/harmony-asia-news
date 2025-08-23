import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t("news.title")}
        description="Stay updated with the latest news from Harmony"
        canonicalPath="/news"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              {t("notfound.title")}
            </h1>
            
            <p className="text-muted-foreground mb-8 text-lg">
              {t("notfound.subtitle")}
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("notfound.backHome")}
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default News;