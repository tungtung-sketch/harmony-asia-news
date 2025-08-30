import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  time: string;
  author: string;
  location: string;
  featured?: boolean;
  image?: string;
}

const NewsCard = ({ title, excerpt, category, time, author, location, featured = false, image }: NewsCardProps) => {
  const { t } = useI18n();
  return (
    <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-300 ${featured ? 'border-primary/20' : ''}`}>
      <CardContent className="p-0">
        <div className={`aspect-[16/10] bg-gradient-to-br from-muted to-muted/50 ${featured ? 'border-b-2 border-primary/10' : ''}`}>
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm sm:text-lg">📰</span>
                </div>
                <p className="text-xs text-muted-foreground">{t('newsCard.newsImageLabel')}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {category}
            </Badge>
            {featured && (
              <Badge variant="secondary" className="text-xs">
                {t('newsCard.featured')}
              </Badge>
            )}
          </div>
          
          <h3 className={`font-semibold leading-tight group-hover:text-primary transition-colors ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
            {title}
          </h3>
          
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>{time}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;