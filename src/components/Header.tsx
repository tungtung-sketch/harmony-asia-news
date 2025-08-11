import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';


const Header = () => {
  const { t, setLang } = useI18n();
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/7b8ba96a-3acf-4389-a970-9c41ac7fa4d6.png"
              alt="HARMONY logo - Harmonize the global business"
              className="h-8 w-8"
              loading="eager"
              width={32}
              height={32}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('brand.name')}
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.news')}
            </NavLink>
            <NavLink to="/insights" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.insights')}
            </NavLink>
            <NavLink to="/tips" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.tips')}
            </NavLink>
            <NavLink to="/subscribe" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.subscribe')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              {t('nav.contact')}
            </NavLink>
          </nav>

          {/* Right side: Language toggle */}
          <div className="flex items-center space-x-2">
            <span className="hidden sm:block text-sm text-muted-foreground pr-2">{t('brand.tagline')}</span>
            <Button variant="ghost" size="sm" onClick={() => setLang('ja')} aria-label="Switch to Japanese">JP</Button>
            <Button variant="ghost" size="sm" onClick={() => setLang('en')} aria-label="Switch to English">EN</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
