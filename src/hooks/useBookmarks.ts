import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n/I18nProvider';

export interface Bookmark {
  id: string;
  user_id: string;
  article_slug: string;
  article_title: string;
  article_language: string;
  article_url: string | null;
  thumbnail_url: string | null;
  category: string | null;
  created_at: string;
}

export interface BookmarkArticle {
  slug: string;
  title: string;
  language: string;
  url?: string;
  thumbnail_url?: string;
  category?: string;
}

export const useBookmarks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { lang } = useI18n();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch all bookmarks for the user
  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setBookmarkedSlugs(new Set());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookmarks(data || []);
      setBookmarkedSlugs(new Set((data || []).map(b => b.article_slug)));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Check if an article is bookmarked
  const isBookmarked = useCallback((articleSlug: string): boolean => {
    return bookmarkedSlugs.has(articleSlug);
  }, [bookmarkedSlugs]);

  // Add a bookmark
  const addBookmark = useCallback(async (article: BookmarkArticle): Promise<boolean> => {
    if (!user) return false;

    // Optimistic update
    setBookmarkedSlugs(prev => new Set(prev).add(article.slug));

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          article_slug: article.slug,
          article_title: article.title,
          article_language: article.language,
          article_url: article.url || `/news/sheet/${article.slug}`,
          thumbnail_url: article.thumbnail_url,
          category: article.category
        });

      if (error) {
        // Rollback optimistic update
        setBookmarkedSlugs(prev => {
          const next = new Set(prev);
          next.delete(article.slug);
          return next;
        });
        
        if (error.code === '23505') {
          // Unique constraint violation - already bookmarked
          toast({
            title: lang === 'ja' ? '既に保存済み' : 'Already saved',
            description: lang === 'ja' ? 'この記事は既に保存されています' : 'This article is already in your bookmarks.',
          });
          return true;
        }
        throw error;
      }

      toast({
        title: lang === 'ja' ? '保存しました' : 'Saved',
        description: lang === 'ja' ? '記事を保存しました' : 'Article added to your bookmarks.',
      });

      // Refresh bookmarks to get the new item
      await fetchBookmarks();
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: lang === 'ja' ? 'エラー' : 'Error',
        description: lang === 'ja' ? '保存に失敗しました' : 'Failed to save article. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, lang, toast, fetchBookmarks]);

  // Remove a bookmark
  const removeBookmark = useCallback(async (articleSlug: string): Promise<boolean> => {
    if (!user) return false;

    // Optimistic update
    setBookmarkedSlugs(prev => {
      const next = new Set(prev);
      next.delete(articleSlug);
      return next;
    });
    setBookmarks(prev => prev.filter(b => b.article_slug !== articleSlug));

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('article_slug', articleSlug);

      if (error) throw error;

      toast({
        title: lang === 'ja' ? '削除しました' : 'Removed',
        description: lang === 'ja' ? '保存した記事を削除しました' : 'Article removed from your bookmarks.',
      });

      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      // Rollback on error
      await fetchBookmarks();
      toast({
        title: lang === 'ja' ? 'エラー' : 'Error',
        description: lang === 'ja' ? '削除に失敗しました' : 'Failed to remove bookmark. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, lang, toast, fetchBookmarks]);

  // Toggle bookmark
  const toggleBookmark = useCallback(async (article: BookmarkArticle): Promise<boolean> => {
    if (isBookmarked(article.slug)) {
      return removeBookmark(article.slug);
    } else {
      return addBookmark(article);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return {
    bookmarks,
    loading,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    refreshBookmarks: fetchBookmarks
  };
};
