import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Lightbulb } from "lucide-react";
import BusinessTipCard from '@/components/BusinessTipCard';
import { businessTips } from '@/data/businessTips';

const BusinessTips = () => {
  const { t, lang } = useI18n();

  return (
    <>
      <SEO
        title={t("tips.title")}
        description={t("tips.description")}
        canonicalPath="/business-tips"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("tips.title")}
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                {t("tips.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessTips.map((tip) => (
                <BusinessTipCard
                  key={tip.id}
                  title={lang === 'ja' ? tip.titleJa : tip.title}
                  description={lang === 'ja' ? tip.descriptionJa : tip.description}
                  readTime={tip.readTime}
                  href={`/business-tips/${tip.id}`}
                  imageUrl={tip.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BusinessTips;