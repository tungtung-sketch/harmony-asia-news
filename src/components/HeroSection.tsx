import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main Feature Story */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{t('hero.time')}</span>
              </div>
              <span>•</span>
              <span>{t('hero.by')}</span>
              <span>•</span>
              <span>{t('hero.location')}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/30 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('hero.featuredImageLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;