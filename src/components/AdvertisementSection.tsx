import { useI18n } from '@/i18n/I18nProvider'

const AdvertisementSection = () => {
  const { t } = useI18n()
  return (
    <aside aria-label={t('ad.label')} className="container mx-auto px-4 py-12">
      <div className="rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
        <div className="px-6 py-3 border-b text-xs uppercase tracking-wider">{t('ad.label')}</div>
        <div className="flex items-center justify-center h-32 sm:h-36 md:h-40 lg:h-48">
          <span className="text-sm">{t('ad.placeholder')}</span>
        </div>
      </div>
    </aside>
  )
}

export default AdvertisementSection
