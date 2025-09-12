import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t('terms.title')}
        description={t('terms.metaDescription')}
        canonicalPath="/terms-of-service"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-foreground">
                {t('terms.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                {t('terms.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* Terms Content */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Section 1: Introduction */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section1.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section1.content')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 2: Services */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section2.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section2.content')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 3: Subscription & Payment */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section3.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section3.trial')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section3.autorenewal')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section3.payment')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 4: Account & Usage */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section4.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section4.information')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section4.sharing')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 5: Cancellation & Refunds */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section5.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section5.cancellation')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section5.refunds')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 6: Content & Intellectual Property */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section6.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section6.ownership')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section6.purpose')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 7: Privacy & Data */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section7.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section7.policy')}
                  </p>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section7.metadata')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 8: Limitation of Liability */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section8.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section8.content')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 9: Changes to Terms */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section9.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section9.content')}
                  </p>
                </CardContent>
              </Card>

              {/* Section 10: Contact Us */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                    {t('terms.section10.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('terms.section10.content')}{' '}
                    <Link to="/contact" className="text-primary hover:text-primary/80 underline font-medium">
                      {t('terms.section10.link')}
                    </Link>
                    {t('terms.section10.suffix')}
                  </p>
                </CardContent>
              </Card>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;