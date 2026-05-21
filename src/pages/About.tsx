import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, Filter, Target, Lightbulb, Shield } from 'lucide-react';
import CompanyProfileDownload from '@/components/CompanyProfileDownload';

const About = () => {
  const { t, lang } = useI18n();

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
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* Intro — platform description */}
          <section className="container mx-auto pt-10 pb-2 px-4">
            <div className="max-w-3xl mx-auto">
              {lang === 'ja' ? (
                <p className="text-base md:text-lg text-foreground leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                  WaLensは、タイで働く日本人エグゼクティブのために、<strong className="font-semibold text-foreground">現地の経営コンサルタントが厳選した</strong>戦略情報をお届けするプラットフォームです。自動車・エネルギー・金融・物流など、日系企業が関わる業界に特化した独自の視点で、<strong className="font-semibold text-foreground">ChatGPTでは得られない</strong><strong className="font-semibold text-foreground">実務的なインサイト</strong>を提供します。
                </p>
              ) : (
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  WaLens delivers curated strategic intelligence for Japanese executives working in Thailand — selected by a <strong className="font-semibold text-foreground">Thailand-based management consultant</strong> with <strong className="font-semibold text-foreground">5+ years of on-the-ground experience</strong> across <strong className="font-semibold text-foreground">automotive, energy, finance, and logistics</strong>.
                </p>
              )}
            </div>
          </section>

          {/* Mission & Philosophy */}
          <section className="container mx-auto py-12 md:py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                {t('about.mission.paragraph1')}
              </p>
            </div>
          </section>

          {/* What WaLens Is / Is Not */}
          <section className="bg-muted/20 border-y">
            <div className="container mx-auto py-16 md:py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                  {t('about.definition.title')}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* What WaLens IS */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="font-semibold text-lg mb-4 text-primary">
                        {t('about.definition.is.title')}
                      </h3>
                      <ul className="space-y-3">
                        {['point1', 'point2', 'point3', 'point4'].map((key) => (
                          <li key={key} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground text-sm md:text-base">
                              {t(`about.definition.is.${key}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* What WaLens is NOT */}
                  <Card className="bg-muted/30 border-muted">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="font-semibold text-lg mb-4 text-muted-foreground">
                        {t('about.definition.isNot.title')}
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        {['point1', 'point2', 'point3'].map((key) => (
                          <li key={key} className="flex items-start gap-3">
                            <span className="text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                            <span className="text-sm md:text-base">
                              {t(`about.definition.isNot.${key}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* How WaLens Adds Value */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                {t('about.value.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Filter, key: 'filter' },
                  { icon: Lightbulb, key: 'interpretation' },
                  { icon: Target, key: 'prioritization' },
                  { icon: Shield, key: 'judgment' },
                ].map(({ icon: Icon, key }) => (
                  <Card key={key} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">
                        {t(`about.value.${key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`about.value.${key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Company Profile Table */}
          <section className="bg-muted/20 border-y">
            <div className="container mx-auto py-16 md:py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                  {t('about.profile.title')}
                </h2>
                <Card className="bg-card border-border">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid gap-6">
                      {['company', 'founded', 'headquarters', 'business', 'team'].map((field, i, arr) => (
                        <div
                          key={field}
                          className={`grid grid-cols-1 md:grid-cols-3 gap-4 items-start ${
                            i < arr.length - 1 ? 'border-b border-muted pb-4' : ''
                          }`}
                        >
                          <div className="font-semibold text-foreground">
                            {t(`about.profile.${field}`)}
                          </div>
                          <div className="md:col-span-2 text-muted-foreground">
                            {t(`about.profile.${field}.value`)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Company Profile Download */}
          <CompanyProfileDownload variant="banner" />

          {/* Final CTA Section */}
          <section className="container mx-auto py-16 md:py-20 text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {t('about.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
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
