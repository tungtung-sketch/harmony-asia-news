import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-bkk-tokyo.webp';

const HeroSection = () => {
  const { t, lang } = useI18n();

  const scrollToInsights = () => {
    document.getElementById('intelligence-proof')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[680px] flex items-center">
      {/* Background image with dark overlay */}
      <img
        src={heroImage}
        alt="Executive boardroom with global market intelligence dashboards"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        width={1920}
        height={960}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,6%,0.92)] via-[hsl(222,47%,6%,0.85)] to-[hsl(222,47%,6%,0.7)]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl py-16 sm:py-20 md:py-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(210,100%,60%,0.3)] bg-[hsl(210,100%,60%,0.1)] text-xs sm:text-sm text-[hsl(210,40%,90%)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142,76%,50%)] animate-pulse" />
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className={`font-bold tracking-tight text-[hsl(0,0%,100%)] mb-5 md:mb-6 ${
            lang === 'ja'
              ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] leading-[1.45]'
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12]'
          }`} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
            {t('hero.headline')}
          </h1>

          {/* Sub-headline */}
          <p className={`text-[hsl(210,40%,80%)] leading-relaxed max-w-xl mb-8 md:mb-10 ${
            lang === 'ja'
              ? 'text-base sm:text-lg md:text-xl'
              : 'text-lg sm:text-xl md:text-[1.3rem]'
          }`}>
            {t('hero.subheadline')}
          </p>

          {/* Deliverables list */}
          <ul className="space-y-2 mb-8 md:mb-10">
            {['hero.deliver1', 'hero.deliver2', 'hero.deliver3'].map((key) => (
              <li key={key} className="flex items-center gap-2.5 text-sm sm:text-base text-[hsl(210,40%,85%)]">
                <span className="w-1 h-1 rounded-full bg-[hsl(210,100%,60%)] flex-shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6 font-semibold bg-[hsl(210,100%,60%)] hover:bg-[hsl(210,100%,55%)] text-[hsl(222,47%,6%)]">
              <Link to="/subscribe">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToInsights}
              className="w-full sm:w-auto text-base px-8 py-6 font-medium border-[hsl(210,40%,40%)] text-[hsl(210,40%,90%)] bg-transparent hover:bg-[hsl(210,40%,20%,0.3)]"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Trust bar */}
          <p className="mt-10 text-xs sm:text-sm text-[hsl(210,40%,55%)] tracking-wide">
            {t('hero.trust')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
