import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';

const About = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title={t('about.title')}
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

          {/* Narrative Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.narrative.title')}
              </h2>
              <div className="prose prose-lg mx-auto text-foreground leading-relaxed">
                {t('about.narrative.content').split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-base md:text-lg">
                    {paragraph.includes('**') ? (
                      paragraph.split('**').map((part, i) => 
                        i % 2 === 1 ? (
                          <strong key={i} className="font-bold text-primary">{part}</strong>
                        ) : (
                          part
                        )
                      )
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Company Profile Table Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.profile.title')}
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-8 md:p-12">
                  <div className="grid gap-6">
                    {/* Company Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                      <div className="font-semibold text-foreground">{t('about.profile.company')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.company.value')}</div>
                    </div>
                    
                    {/* Founded */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                      <div className="font-semibold text-foreground">{t('about.profile.founded')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.founded.value')}</div>
                    </div>
                    
                    {/* Headquarters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                      <div className="font-semibold text-foreground">{t('about.profile.headquarters')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.headquarters.value')}</div>
                    </div>
                    
                    {/* Business Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-muted pb-4">
                      <div className="font-semibold text-foreground">{t('about.profile.business')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.business.value')}</div>
                    </div>
                    
                    {/* Editorial Team */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-muted pb-4">
                      <div className="font-semibold text-foreground">{t('about.profile.team')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.team.value')}</div>
                    </div>
                    
                    {/* Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div className="font-semibold text-foreground">{t('about.profile.identity')}</div>
                      <div className="md:col-span-2 text-muted-foreground">{t('about.profile.identity.value')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

          {/* Mission Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.mission.title')}
              </h2>
              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.mission.point1')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.mission.point2')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.mission.point3')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.mission.point4')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                {t('about.value.title')}
              </h2>
              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.value.point1')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.value.point2')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.value.point3')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.value.point4')}
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed">
                    {t('about.value.point5')}
                  </p>
                </div>
              </div>
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