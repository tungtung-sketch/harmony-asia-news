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
} from '@/components/ui/navigation-menu';

const Header = () => {
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
              HARMONY
            </span>
          </div>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex items-center space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger>News</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[300px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Latest</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Thai Policy Watch</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Global Execs in TH</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Industry Trends</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[300px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Strategic Analysis</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Infographics</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Archives</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Thailand 101</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[300px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Living & Lifestyle</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Business Culture</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Must-Know Laws</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Subscribe</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[240px]">
                    <li><a href="#pricing" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Pricing</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[260px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Our Team</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">Contact us</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Languages</NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-background">
                  <ul className="grid gap-2 p-4 md:w-[240px]">
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">日本語</a></li>
                    <li><a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">English</a></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="w-64 pl-9"
              />
            </div>
            <Button className="hidden md:inline-flex" aria-label="Join Membership">
              Membership
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;