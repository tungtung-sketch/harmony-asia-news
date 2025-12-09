import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmarks, BookmarkArticle } from '@/hooks/useBookmarks';
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  article: BookmarkArticle;
  variant?: 'icon' | 'button' | 'compact';
  className?: string;
  onAuthRequired?: () => void;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  article,
  variant = 'button',
  className,
  onAuthRequired
}) => {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark, loading } = useBookmarks();
  const { lang } = useI18n();
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);

  const bookmarked = isBookmarked(article.slug);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        toast({
          title: lang === 'ja' ? 'ログインが必要です' : 'Login required',
          description: lang === 'ja' 
            ? 'この記事を保存するにはログインしてください' 
            : 'Please log in to save this article.',
        });
      }
      return;
    }

    setIsToggling(true);
    await toggleBookmark(article);
    setIsToggling(false);
  };

  const isLoading = loading || isToggling;

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'p-1.5 rounded-full transition-colors hover:bg-muted',
          bookmarked && 'text-yellow-500',
          isLoading && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-label={bookmarked 
          ? (lang === 'ja' ? '保存済み' : 'Saved') 
          : (lang === 'ja' ? '保存する' : 'Save')}
      >
        <Star 
          className={cn(
            'w-5 h-5 transition-transform',
            isToggling && 'animate-pulse'
          )}
          fill={bookmarked ? 'currentColor' : 'none'}
        />
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'gap-1.5',
          bookmarked && 'text-yellow-500',
          className
        )}
      >
        <Star 
          className={cn(
            'w-4 h-4',
            isToggling && 'animate-pulse'
          )}
          fill={bookmarked ? 'currentColor' : 'none'}
        />
        <span className="text-xs">
          {bookmarked 
            ? (lang === 'ja' ? '保存済み' : 'Saved') 
            : (lang === 'ja' ? '保存' : 'Save')}
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant={bookmarked ? 'secondary' : 'outline'}
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'gap-2',
        bookmarked && 'text-yellow-500 border-yellow-500/50',
        className
      )}
    >
      <Star 
        className={cn(
          'w-4 h-4',
          isToggling && 'animate-pulse'
        )}
        fill={bookmarked ? 'currentColor' : 'none'}
      />
      {bookmarked 
        ? (lang === 'ja' ? '保存済み' : 'Saved') 
        : (lang === 'ja' ? '記事を保存' : 'Save Article')}
    </Button>
  );
};

export default BookmarkButton;
