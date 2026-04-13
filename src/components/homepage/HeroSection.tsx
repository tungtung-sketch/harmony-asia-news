import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const { t, lang } = useI18n();

  const scrollToInsights = () => {
    document.getElementById('intelligence-proof')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background" />
      
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center text-center py-16 sm:py-20 md:py-28 lg:py-36 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-muted/40 text-xs sm:text-sm text-muted-foreground mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t('hero.badge')}
          </div>

          {/* Headline */}
          <h1 className={`font-bold leading-[1.15] tracking-tight text-foreground mb-5 md:mb-6 ${
            lang === 'ja' 
              ? 'text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem]' 
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]'
          }`}>
            {t('hero.headline')}
          </h1>

          {/* Sub-headline */}
          <p className={`text-muted-foreground leading-relaxed max-w-2xl mb-8 md:mb-10 ${
            lang === 'ja'
              ? 'text-base sm:text-lg md:text-xl'
              : 'text-lg sm:text-xl md:text-[1.35rem]'
          }`}>
            {t('hero.subheadline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 md:mb-14">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6 font-semibold">
              <Link to="/subscribe">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToInsights}
              className="w-full sm:w-auto text-base px-8 py-6 font-medium"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground/70 tracking-wide uppercase">
              {t('hero.trust')}
            </p>
            <div className="h-px w-16 bg-border/60" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex">
        <ChevronDown className="h-5 w-5 text-muted-foreground/40 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
