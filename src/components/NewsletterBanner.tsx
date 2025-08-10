import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useI18n } from '@/i18n/I18nProvider';

const NewsletterBanner = () => {
  const { t } = useI18n();
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ description: 'Subscribed! Check your inbox.' });
  };

  return (
    <section className="bg-muted/40 border-y">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">{t('home.newsletter.title')}</h2>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <Input type="email" required placeholder={t('home.newsletter.placeholder')} aria-label={t('home.newsletter.placeholder')} />
          <Button type="submit">{t('home.newsletter.cta')}</Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBanner;
