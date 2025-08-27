import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BusinessTipCardProps {
  title: string;
  description: string;
  readTime: string;
  imageUrl?: string;
  href: string;
  category?: string;
}

const BusinessTipCard = ({ 
  title, 
  description, 
  readTime, 
  imageUrl,
  href,
  category = "Business Tips"
}: BusinessTipCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardContent className="p-0">
        {/* Article Image */}
        <div className="aspect-[16/10] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden rounded-t-lg">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Business Tip</p>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {category}
            </Badge>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="p-5 space-y-4">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-auto p-1 hover:text-primary" asChild>
              <Link to={href}>
                Read More <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessTipCard;