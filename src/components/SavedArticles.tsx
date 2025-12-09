import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookmarks, Bookmark } from '@/hooks/useBookmarks';
import { useI18n } from '@/i18n/I18nProvider';

interface SavedArticlesProps {
  className?: string;
}

export const SavedArticles: React.FC<SavedArticlesProps> = ({ className }) => {
  const { bookmarks, loading, removeBookmark } = useBookmarks();
  const { lang } = useI18n();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRemove = async (e: React.MouseEvent, articleSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    await removeBookmark(articleSlug);
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            {lang === 'ja' ? '保存した記事' : 'Saved Articles'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-16 h-16 bg-muted rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
          {lang === 'ja' ? '保存した記事' : 'Saved Articles'}
          {bookmarks.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {bookmarks.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookmarks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {lang === 'ja' 
                ? '保存した記事はありません。記事の⭐アイコンをタップして保存しましょう。'
                : 'No saved articles yet. Tap the ⭐ icon on any article to save it for later.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bookmark) => (
              <BookmarkItem 
                key={bookmark.id} 
                bookmark={bookmark}
                onRemove={handleRemove}
                formatDateTime={formatDateTime}
                lang={lang}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface BookmarkItemProps {
  bookmark: Bookmark;
  onRemove: (e: React.MouseEvent, slug: string) => void;
  formatDateTime: (date: string) => string;
  lang: string;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ 
  bookmark, 
  onRemove, 
  formatDateTime,
  lang 
}) => {
  const articleUrl = bookmark.article_url || `/news/sheet/${bookmark.article_slug}`;

  return (
    <Link 
      to={articleUrl}
      className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
        {bookmark.thumbnail_url ? (
          <img 
            src={bookmark.thumbnail_url} 
            alt={bookmark.article_title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-6 h-6 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {bookmark.article_title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
          {bookmark.category && (
            <Badge variant="outline" className="text-xs px-1.5 py-0">
              {bookmark.category}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs px-1.5 py-0">
            {bookmark.article_language}
          </Badge>
          <span>{formatDateTime(bookmark.created_at)}</span>
        </div>
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        onClick={(e) => onRemove(e, bookmark.article_slug)}
        aria-label={lang === 'ja' ? '削除' : 'Remove'}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </Link>
  );
};

export default SavedArticles;
