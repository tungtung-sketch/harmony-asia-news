import { useI18n } from '@/i18n/I18nProvider';
import { Globe, ShieldAlert, FileText, Target } from 'lucide-react';

const pillars = [
  { icon: Target, key: 'signal.pillar1' },
  { icon: Globe, key: 'signal.pillar2' },
  { icon: ShieldAlert, key: 'signal.pillar3' },
  { icon: FileText, key: 'signal.pillar4' },
] as const;

const SignalOverNoise = () => {
  const { t, lang } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            {t('signal.label')}
          </p>
          <h2 className={`font-bold text-foreground mb-4 ${
            lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
          }`}>
            {t('signal.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('signal.subtitle')}
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pillars.map(({ icon: Icon, key }) => (
            <div 
              key={key}
              className="group relative bg-card border border-border/60 rounded-xl p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className={`font-semibold text-foreground mb-2 ${
                lang === 'ja' ? 'text-base md:text-lg' : 'text-lg md:text-xl'
              }`}>
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignalOverNoise;
