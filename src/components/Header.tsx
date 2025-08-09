import { Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
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
          <NavigationMenu className="relative z-50">
            <NavigationMenuList className="hidden md:flex items-center space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('nav.news')}</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[300px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.news.latest')}</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.news.thaiPolicyWatch')}</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.news.globalExecsInTH')}</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.news.industryTrends')}</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('nav.reports')}</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[300px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.reports.strategicAnalysis')}</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.reports.industryReport')}</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.reports.archives')}</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Removed Thailand 101 per request */}

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('nav.subscribe')}</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[240px]">
                    <li><a href="#pricing" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.subscribe.pricing')}</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('nav.about')}</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[260px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.about.ourTeam')}</a></li>
                    <li><a href="/contact" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">{t('nav.about.contactUs')}</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('nav.languages')}</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[240px]">
                    <li>
                      <button
                        onClick={() => setLang('ja')}
                        className="w-full text-left block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {t('nav.languages.ja')}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setLang('en')}
                        className="w-full text-left block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {t('nav.languages.en')}
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport className="z-50 bg-background" />
          </NavigationMenu>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('search.placeholder')}
                className="w-64 pl-9"
              />
            </div>
            <Button className="hidden md:inline-flex" aria-label={t('cta.membership')}>
              {t('cta.membership')}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
