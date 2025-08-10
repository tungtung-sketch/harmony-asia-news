import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n/I18nProvider';

const InsightHighlight = () => {
  const { t } = useI18n();
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{t('home.insightHighlight.title')}</h2>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">{t('home.insightHighlight.exampleTitle')}</h3>
          <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-5 text-muted-foreground">
            <li>Labor market shifts toward high-skill bilingual roles</li>
            <li>Supply chain Thailand+1 strategies accelerating</li>
            <li>EV ecosystem incentives expand to Tier-2 suppliers</li>
            <li>Digital payments interoperability with Japan grows</li>
            <li>Corporate governance reforms attract long-term capital</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default InsightHighlight;
