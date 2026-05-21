import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const { t, lang } = useI18n();
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <span className="text-lg md:text-xl font-bold">{t('brand.name')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
              <p className="text-xs font-semibold text-foreground">
                {lang === 'ja'
                  ? 'LINE公式アカウントをスキャンして無料デイリーニュースレターを購読'
                  : 'Scan to subscribe to our free Daily Newsletter'}
              </p>
              <p className="text-xs text-muted-foreground">LINE ID: @644qbjjv</p>
              <img
                src="/assets/LINE_OA_QR_code.png"
                alt="LINE Official Account QR Code"
                className="w-20 h-20 rounded-md border border-border/50"
              />
            </div>
          </div>

          {/* Business Intelligence */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('nav.businessIntelligence')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/business-intelligence" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.overview')}</Link></li>
              <li><Link to="/business-intelligence/economy" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.economy')}</Link></li>
              <li><Link to="/business-intelligence/trade" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.trade')}</Link></li>
              <li><Link to="/business-intelligence/regulation" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.regulation')}</Link></li>
              <li><Link to="/business-intelligence/workforce" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.workforce')}</Link></li>
              <li><Link to="/business-intelligence/infrastructure" className="text-muted-foreground hover:text-primary transition-colors">{t('bi.nav.infrastructure')}</Link></li>
            </ul>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('nav.insights')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/insights" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.overview')}</Link></li>
              <li><Link to="/insights?filter=services" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.services')}</Link></li>
              <li><Link to="/insights?filter=manufacturing" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.manufacturing')}</Link></li>
              <li><Link to="/insights?filter=wellness-healthcare" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.wellness')}</Link></li>
              <li><Link to="/insights?filter=agriculture" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.agriculture')}</Link></li>
              <li><Link to="/insights?filter=real-estate" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.realestate')}</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('footer.about')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.aboutUs')}</a></li>
              <li><Link to="/corporate" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.corporate')}</Link></li>
              <li><Link to="/coaching" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.coaching')}</Link></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.contact')}</a></li>
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.privacy')}</a></li>
              <li><a href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.terms')}</a></li>
              <li className="pt-2 text-muted-foreground">
                📞 <a href="tel:+66953256631" className="hover:text-primary transition-colors">(+66) 95-325-6631</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025–2026 {t('brand.name')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;