-- Create bookmarks table for saved articles
CREATE TABLE public.bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  article_slug text NOT NULL,
  article_title text NOT NULL,
  article_language text DEFAULT 'EN',
  article_url text,
  thumbnail_url text,
  category text,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure user can't bookmark same article twice
  UNIQUE (user_id, article_slug)
);

-- Enable RLS
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookmarks
CREATE POLICY "Users can view their own bookmarks"
ON public.bookmarks
FOR SELECT
USING (user_id = auth.uid());

-- Users can insert their own bookmarks
CREATE POLICY "Users can insert their own bookmarks"
ON public.bookmarks
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete their own bookmarks"
ON public.bookmarks
FOR DELETE
USING (user_id = auth.uid());

-- Admins can view all bookmarks for debugging
CREATE POLICY "Admins can view all bookmarks"
ON public.bookmarks
FOR SELECT
USING (is_admin_user());

-- Create index for faster queries
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_article_slug ON public.bookmarks(article_slug);