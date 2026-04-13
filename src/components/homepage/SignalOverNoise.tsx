import { useI18n } from '@/i18n/I18nProvider';
import { Globe, ShieldAlert, FileText, Target } from 'lucide-react';
import executiveImg from '@/assets/executive-analysis.jpg';

const pillars = [
  { icon: Target, key: 'signal.pillar1' },
  { icon: Globe, key: 'signal.pillar2' },
  { icon: ShieldAlert, key: 'signal.pillar3' },
  { icon: FileText, key: 'signal.pillar4' },
] as const;

const SignalOverNoise = () => {
  const { t, lang } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        {/* Top: image + text side by side */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-14 md:mb-20">
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

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              {t('signal.label')}
            </p>
            <h2 className={`font-bold text-foreground mb-4 ${
              lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
            }`} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
              {t('signal.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              {t('signal.subtitle')}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {t('signal.body')}
            </p>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
          {pillars.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="group bg-card border border-border/60 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className={`font-semibold text-foreground mb-2 ${
                lang === 'ja' ? 'text-base' : 'text-base md:text-lg'
              }`}>
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
