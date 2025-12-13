import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, Filter, Target, Lightbulb, Shield, AlertTriangle, TrendingUp, Building2 } from 'lucide-react';

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
          {/* Hero Section - Redefine WaLens */}
          <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-foreground">
                {t('about.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                {t('about.hero.subtitle')}
              </p>
              
              {/* Key Differentiator Box */}
              <div className="max-w-3xl mx-auto bg-muted/50 border border-border rounded-xl p-6 md:p-8 mb-8">
                <p className="text-base md:text-lg text-muted-foreground mb-3">
                  {t('about.keyMessage.chatgpt')}
                </p>
                <p className="text-xl md:text-2xl font-bold text-foreground">
                  {t('about.keyMessage.walens')}
                </p>
              </div>
            </div>
          </section>

          {/* What WaLens Is - and Is Not */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                {t('about.definition.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* What WaLens IS */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-lg mb-4 text-primary">
                      {t('about.definition.is.title')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm md:text-base">{t('about.definition.is.point1')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm md:text-base">{t('about.definition.is.point2')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm md:text-base">{t('about.definition.is.point3')}</span>
                      </li>
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
                      <li className="flex items-start gap-3">
                        <span className="text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                        <span className="text-sm md:text-base">{t('about.definition.isNot.point1')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                        <span className="text-sm md:text-base">{t('about.definition.isNot.point2')}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-muted-foreground mt-0.5 flex-shrink-0">✕</span>
                        <span className="text-sm md:text-base">{t('about.definition.isNot.point3')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="bg-muted/20 border-y">
            <div className="container mx-auto py-16 md:py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                  {t('about.problem.title')}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.problem.overload.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.problem.overload.description')}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.problem.ai.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.problem.ai.description')}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.problem.context.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.problem.context.description')}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Japanese Executive Context Section */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                {t('about.context.title')}
              </h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  {t('about.context.paragraph1')}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t('about.context.paragraph2')}
                </p>
              </div>
            </div>
          </section>

          {/* How WaLens Adds Value */}
          <section className="bg-muted/20 border-y">
            <div className="container mx-auto py-16 md:py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                  {t('about.value.title')}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Filter className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.value.filter.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.value.filter.description')}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.value.interpretation.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.value.interpretation.description')}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.value.prioritization.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.value.prioritization.description')}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{t('about.value.judgment.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('about.value.judgment.description')}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Decisions We Support */}
          <section className="container mx-auto py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-foreground">
                {t('about.decisions.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('about.decisions.investment.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('about.decisions.investment.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('about.decisions.regulation.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('about.decisions.regulation.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('about.decisions.risk.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('about.decisions.risk.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('about.decisions.operations.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('about.decisions.operations.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Profile Table Section */}
          <section className="bg-muted/20 border-y">
            <div className="container mx-auto py-16 md:py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-foreground">
                  {t('about.profile.title')}
                </h2>
                <Card className="bg-card border-border">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                        <div className="font-semibold text-foreground">{t('about.profile.company')}</div>
                        <div className="md:col-span-2 text-muted-foreground">{t('about.profile.company.value')}</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                        <div className="font-semibold text-foreground">{t('about.profile.founded')}</div>
                        <div className="md:col-span-2 text-muted-foreground">{t('about.profile.founded.value')}</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-muted pb-4">
                        <div className="font-semibold text-foreground">{t('about.profile.headquarters')}</div>
                        <div className="md:col-span-2 text-muted-foreground">{t('about.profile.headquarters.value')}</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-muted pb-4">
                        <div className="font-semibold text-foreground">{t('about.profile.business')}</div>
                        <div className="md:col-span-2 text-muted-foreground">{t('about.profile.business.value')}</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="font-semibold text-foreground">{t('about.profile.team')}</div>
                        <div className="md:col-span-2 text-muted-foreground">{t('about.profile.team.value')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

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
