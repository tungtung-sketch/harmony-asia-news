import { useI18n } from '@/i18n/I18nProvider';

const AboutStealth = () => {
  const { t } = useI18n();
  return (
    <section className="container mx-auto py-8 md:py-12">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold mb-3">{t('home.about.title')}</h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto md:mx-0 leading-relaxed">
          {t('home.about.text')}
        </p>
      </div>
    </section>
  );
};

export default AboutStealth;
