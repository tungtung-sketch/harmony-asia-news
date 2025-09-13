import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/Harmony_Logo_only.png"
                alt="HARMONY logo"
                className="h-6 w-6"
                width={24}
                height={24}
                loading="lazy"
              />
              <span className="text-lg md:text-xl font-bold">{t('brand.name')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </Button>
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
              <li><Link to="/insights/services" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.services')}</Link></li>
              <li><Link to="/insights/manufacturing" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.manufacturing')}</Link></li>
              <li><Link to="/insights/wellness-healthcare" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.wellness')}</Link></li>
              <li><Link to="/insights/agriculture" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.agriculture')}</Link></li>
              <li><Link to="/insights/real-estate" className="text-muted-foreground hover:text-primary transition-colors">{t('insights.dropdown.realestate')}</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('footer.about')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.aboutUs')}</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.contact')}</a></li>
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.privacy')}</a></li>
              <li><a href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about.terms')}</a></li>
              
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 {t('brand.name')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;