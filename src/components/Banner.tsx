import { Megaphone } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

const Banner = () => {
  const { t } = useI18n()
  return (
    <div role="region" aria-label="Site banner" className="w-full bg-primary/10 text-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <Megaphone className="h-4 w-4 text-primary" aria-hidden="true" />
        <p className="text-center">
          {t('banner.text')} <a href="#pricing" className="underline hover:text-primary">{t('banner.subscribeLink')}</a>.
        </p>
      </div>
    </div>
  )
}

export default Banner
