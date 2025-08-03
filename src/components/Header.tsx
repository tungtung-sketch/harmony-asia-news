import { Search, Menu, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              HARMONY
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Latest
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Politics
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Business
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Technology
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Culture
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Regional
            </a>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="w-64 pl-9"
              />
            </div>
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