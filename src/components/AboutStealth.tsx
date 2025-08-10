import { useI18n } from '@/i18n/I18nProvider';

const AboutStealth = () => {
  const { t } = useI18n();
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-3">{t('home.about.title')}</h2>
      <p className="text-muted-foreground max-w-3xl">{t('home.about.text')}</p>
    </section>
  );
};

export default AboutStealth;
