import { useI18n } from '@/i18n/I18nProvider';
import { Mail, BarChart3, ShieldAlert, FileText, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import executiveImg from '@/assets/executive-analysis.jpg';

const SignalOverNoise = () => {
  const { t, lang } = useI18n();

  const deliverables = [
    { icon: Mail, key: 'signal.d1' },
    { icon: BarChart3, key: 'signal.d2' },
    { icon: ShieldAlert, key: 'signal.d3' },
    { icon: Zap, key: 'signal.d4' },
    { icon: FileText, key: 'signal.d5' },
  ] as const;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            {t('signal.label')}
          </p>
          <h2 className={`font-bold text-foreground mb-4 ${
            lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
          }`} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
            {t('signal.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t('signal.subtitle')}
          </p>
        </div>

        {/* Two-column: image + deliverables list */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 max-w-6xl mx-auto mb-12 md:mb-16">
          {/* Image */}
          <div className="w-full lg:w-5/12 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={executiveImg}
                alt="Executive reviewing intelligence report on tablet"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* Deliverables */}
          <div className="flex-1">
            <h3 className={`font-bold text-foreground mb-6 ${
              lang === 'ja' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
            }`}>
              {t('signal.listTitle')}
            </h3>

            <div className="space-y-5">
              {deliverables.map(({ icon: Icon, key }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-semibold text-foreground ${
                      lang === 'ja' ? 'text-sm md:text-base' : 'text-base'
                    }`}>
                      {t(`${key}.title`)}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {t(`${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/subscribe">
                  {t('signal.cta.trial')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link to="/insights">
                  {t('signal.cta.sample')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignalOverNoise;
