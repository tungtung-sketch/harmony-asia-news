import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n/I18nProvider';
import { Filter, Target, Shield, Lightbulb } from 'lucide-react';

const WhyWaLens = () => {
  const { t } = useI18n();
  
  return (
    <section className="container mx-auto py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Key Message */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
            {t('whyWaLens.title')}
          </h2>
          <div className="bg-muted/50 border border-border rounded-lg p-6 md:p-8">
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              {t('whyWaLens.chatgpt')}
            </p>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {t('whyWaLens.walens')}
            </p>
          </div>
        </div>

        {/* Value Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Filter className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('whyWaLens.point1.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whyWaLens.point1.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('whyWaLens.point2.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whyWaLens.point2.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('whyWaLens.point3.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whyWaLens.point3.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('whyWaLens.point4.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whyWaLens.point4.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyWaLens;
