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
}

const NewsCard = ({ title, excerpt, category, time, author, location, featured = false }: NewsCardProps) => {
  const { t } = useI18n();
  return (
    <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-300 ${featured ? 'border-primary/20' : ''}`}>
      <CardContent className="p-0">
        <div className={`aspect-[16/10] bg-gradient-to-br from-muted to-muted/50 ${featured ? 'border-b-2 border-primary/10' : ''}`}>
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-lg">📰</span>
              </div>
              <p className="text-xs text-muted-foreground">{t('newsCard.newsImageLabel')}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {featured && (
              <Badge variant="secondary" className="text-xs">
                {t('newsCard.featured')}
              </Badge>
            )}
          </div>
          
          <h3 className={`font-semibold leading-tight group-hover:text-primary transition-colors ${featured ? 'text-lg' : 'text-base'}`}>
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </div>
              <span>•</span>
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;