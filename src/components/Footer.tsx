import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/7b8ba96a-3acf-4389-a970-9c41ac7fa4d6.png"
                alt="HARMONY logo"
                className="h-6 w-6"
                width={24}
                height={24}
                loading="lazy"
              />
              <span className="text-xl font-bold">HARMONY</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for Asia-Pacific news and insights, connecting communities across the region.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Politics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Technology</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Culture</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sports</a></li>
            </ul>
          </div>

          {/* Regions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Regions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">East Asia</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Southeast Asia</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">South Asia</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pacific</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Central Asia</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 HARMONY. All rights reserved. | Connecting Asia through trusted journalism.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;