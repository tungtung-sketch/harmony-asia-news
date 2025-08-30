import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBox from '@/components/SearchBox';


const Header = () => {
  const { t, setLang } = useI18n();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ mobile = false, closeMenu = () => {} }) => (
    <>
      <NavLink 
        to="/" 
        end 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.home')}
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.about')}
      </NavLink>
      <NavLink 
        to="/news" 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.news')}
      </NavLink>
      
      {mobile ? (
        <div className="py-3 px-4">
          <div className="text-lg font-medium mb-2">{t('nav.businessIntelligence')}</div>
          <div className="ml-4 space-y-2">
            <Link to="/business-intelligence" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.overview')}
            </Link>
            <Link to="/business-intelligence/economy" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.economy')}
            </Link>
            <Link to="/business-intelligence/trade" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.trade')}
            </Link>
            <Link to="/business-intelligence/regulation" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.regulation')}
            </Link>
            <Link to="/business-intelligence/workforce" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.workforce')}
            </Link>
            <Link to="/business-intelligence/infrastructure" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('bi.nav.infrastructure')}
            </Link>
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center hover:text-primary focus:outline-none">
            <span>{t('nav.businessIntelligence')}</span>
            <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-50 bg-background border shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence">{t('bi.nav.overview')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence/economy">{t('bi.nav.economy')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence/trade">{t('bi.nav.trade')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence/regulation">{t('bi.nav.regulation')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence/workforce">{t('bi.nav.workforce')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/business-intelligence/infrastructure">{t('bi.nav.infrastructure')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {mobile ? (
        <div className="py-3 px-4">
          <div className="text-lg font-medium mb-2">{t('nav.insights')}</div>
          <div className="ml-4 space-y-2">
            <Link to="/insights" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.overview')}
            </Link>
            <Link to="/insights/services" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.services')}
            </Link>
            <Link to="/insights/manufacturing" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.manufacturing')}
            </Link>
            <Link to="/insights/wellness-healthcare" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.wellness')}
            </Link>
            <Link to="/insights/agriculture" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.agriculture')}
            </Link>
            <Link to="/insights/real-estate" className="block py-2 text-muted-foreground hover:text-primary" onClick={closeMenu}>
              {t('insights.dropdown.realestate')}
            </Link>
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center hover:text-primary focus:outline-none">
            <span>{t('nav.insights')}</span>
            <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-50 bg-background border shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/insights">{t('insights.dropdown.overview')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/insights/services">{t('insights.dropdown.services')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/insights/manufacturing">{t('insights.dropdown.manufacturing')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/insights/wellness-healthcare">{t('insights.dropdown.wellness')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/insights/agriculture">{t('insights.dropdown.agriculture')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/insights/real-estate">{t('insights.dropdown.realestate')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <NavLink 
        to="/business-tips" 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.tips')}
      </NavLink>
      <NavLink 
        to="/subscribe" 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.subscribe')}
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => 
          `${isActive ? 'text-primary font-medium' : 'hover:text-primary'} ${mobile ? 'block py-3 px-4 text-lg' : ''}`
        }
        onClick={closeMenu}
      >
        {t('nav.contact')}
      </NavLink>
    </>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/Harmony_Logo_only.png"
                alt="HARMONY logo - Harmonize the global business"
                className="h-6 w-6 sm:h-8 sm:w-8"
                loading="eager"
                width={32}
                height={32}
              />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t('brand.name')}
              </span>
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground ml-8 sm:ml-10 -mt-1">
              {t('brand.tagline')}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            <NavLinks />
          </nav>

          {/* Right side: Search, Language toggle and Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Search Box - Desktop */}
            <div className="hidden md:block">
              <SearchBox />
            </div>
            
            <div className="hidden sm:flex space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setLang('ja')} aria-label="Switch to Japanese">JP</Button>
              <Button variant="ghost" size="sm" onClick={() => setLang('en')} aria-label="Switch to English">EN</Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open mobile menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/lovable-uploads/Harmony_Logo_only.png"
                        alt="HARMONY logo"
                        className="h-6 w-6"
                        width={24}
                        height={24}
                      />
                      <span className="text-lg font-bold">{t('brand.name')}</span>
                    </div>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="px-4 py-4 border-b">
                    <SearchBox />
                  </div>
                  
                  <nav className="flex-1 py-4" aria-label="Mobile navigation">
                    <NavLinks mobile closeMenu={() => setMobileMenuOpen(false)} />
                  </nav>
                  
                  <div className="border-t p-4">
                    <div className="flex space-x-2 justify-center">
                      <Button variant="ghost" size="sm" onClick={() => setLang('ja')} aria-label="Switch to Japanese">JP</Button>
                      <Button variant="ghost" size="sm" onClick={() => setLang('en')} aria-label="Switch to English">EN</Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
