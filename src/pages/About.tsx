import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Recycle, Globe, Handshake } from 'lucide-react';

const About = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t('about.title') + " - Business Intelligence for Thailand"}
        description={t('about.description')}
        canonicalPath="/about"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-foreground">
                {t('about.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                {t('about.hero.subtitle')}
              </p>
              <Button asChild size="lg" className="px-8 py-3">
                <Link to="/subscribe">
                  {t('about.hero.cta')}
                </Link>
              </Button>
            </div>
          </section>

          {/* Company Overview Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.overview.title')}
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed text-center">
                    {t('about.overview.content')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mission Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="text-center max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-foreground">
                {t('about.mission.title')}
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-primary leading-relaxed">
                {t('about.mission.content')}
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.vision.title')}
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-8 md:p-12 text-center">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    {t('about.vision.content')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sustainability & Impact Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.sustainability.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Recycle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t('about.sustainability.growth.title')}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t('about.sustainability.growth.content')}
                  </p>
                </div>

                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t('about.sustainability.presence.title')}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t('about.sustainability.presence.content')}
                  </p>
                </div>

                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Handshake className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t('about.sustainability.partnership.title')}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t('about.sustainability.partnership.content')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Serve Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-foreground">
                {t('about.target.title')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {t('about.target.content')}
              </p>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="bg-muted/30 border-y">
            <div className="container mx-auto py-16 md:py-20 text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {t('about.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('about.cta.content')}
              </p>
              <Button asChild size="lg" className="px-8 py-3">
                <Link to="/subscribe">
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