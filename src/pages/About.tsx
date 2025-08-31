import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Globe, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t('about.title') + " - Business Intelligence for Thailand"}
        description={t('about.description') + " Learn about Harmony Asia News mission and vision."}
        canonicalPath="/about"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                {t('about.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* Company Overview Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                {t('about.overview.title')}
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-6 md:p-8">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed text-center">
                    {t('about.overview.content')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mission Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                {t('about.mission.title')}
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-primary leading-relaxed">
                {t('about.mission.content')}
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                {t('about.vision.title')}
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-6 md:p-8 text-center">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    {t('about.vision.content')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                {t('about.target.title')}
              </h2>
              
              <div className="text-center mb-8 md:mb-12">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t('about.target.content')}
                </p>
              </div>

              {/* Icons and Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t('about.target.global.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.target.global.content')}
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t('about.target.thailand.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.target.thailand.content')}
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t('about.target.insights.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('about.target.insights.content')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted/30 border-y">
            <div className="container mx-auto py-12 md:py-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('about.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('about.cta.content')}
              </p>
              <Button asChild size="lg" className="px-8 py-3">
                <Link to="/contact">
                  {t('about.cta.button')}
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;