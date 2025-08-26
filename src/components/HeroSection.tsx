import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bkk-tokyo.webp';
import { useI18n } from '@/i18n/I18nProvider';

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <img
        src={heroImage}
        alt="Bangkok and Tokyo cityscape background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="eager"
      />
      <div className="container mx-auto relative">
        <div className="max-w-3xl space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('home.hero.subtext')}
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/subscribe" aria-label={t('home.hero.cta')}>
                {t('home.hero.cta')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;