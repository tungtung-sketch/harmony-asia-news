import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { Check, ArrowRight, MessageSquare } from 'lucide-react';

const PricingPreview = () => {
  const { t, lang } = useI18n();

  const freeFeatures = [
    t('pricing.free.f1'),
    t('pricing.free.f2'),
    t('pricing.free.f3'),
  ];

  const corpFeatures = [
    t('pricing.corp.f1'),
    t('pricing.corp.f2'),
    t('pricing.corp.f3'),
    t('pricing.corp.f4'),
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            {t('pricing.label')}
          </p>
          <h2 className={`font-bold text-foreground mb-4 ${
            lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
          }`}>
            {t('pricing.title')}
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Free Trial */}
          <div className="bg-card border border-border/60 rounded-xl p-7 md:p-9 flex flex-col">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {t('pricing.free.label')}
            </p>
            <h3 className={`font-bold text-foreground mb-1 ${
              lang === 'ja' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
            }`}>
              {t('pricing.free.name')}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">{t('pricing.free.desc')}</p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" size="lg" className="w-full font-semibold">
              <Link to="/subscribe">{t('pricing.free.cta')}</Link>
            </Button>
          </div>

          {/* Corporate */}
          <div className="bg-card border-2 border-primary rounded-xl p-7 md:p-9 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              {t('pricing.corp.badge')}
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              {t('pricing.corp.label')}
            </p>
            <h3 className={`font-bold text-foreground mb-1 ${
              lang === 'ja' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
            }`}>
              {t('pricing.corp.name')}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">{t('pricing.corp.desc')}</p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {corpFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="w-full font-semibold">
              <Link to="/subscribe">
                {t('pricing.corp.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Advisory CTA */}
        <div className="max-w-3xl mx-auto mt-12 md:mt-16 text-center">
          <div className="bg-card border border-border/60 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-4">
            <MessageSquare className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className={`font-semibold text-foreground ${
                lang === 'ja' ? 'text-base md:text-lg' : 'text-lg md:text-xl'
              }`}>
                {t('pricing.advisory.title')}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('pricing.advisory.desc')}
              </p>
            </div>
            <Button asChild variant="outline" className="flex-shrink-0">
              <Link to="/contact">{t('pricing.advisory.cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
