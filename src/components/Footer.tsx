import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

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

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('footer.categories')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.categories.politics')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.categories.business')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.categories.technology')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.categories.culture')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.categories.sports')}</a></li>
            </ul>
          </div>

          {/* Regions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">{t('footer.regions')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.regions.eastAsia')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.regions.southeastAsia')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.regions.southAsia')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.regions.pacific')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.regions.centralAsia')}</a></li>
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