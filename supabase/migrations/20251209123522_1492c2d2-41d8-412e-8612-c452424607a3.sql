-- Create reading_history table
CREATE TABLE public.reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_slug text NOT NULL,
  article_title text NOT NULL,
  article_url text NOT NULL,
  language text NOT NULL DEFAULT 'EN',
  read_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create indexes for fast querying
CREATE INDEX idx_reading_history_user_read_at ON public.reading_history(user_id, read_at DESC);
CREATE INDEX idx_reading_history_user_slug ON public.reading_history(user_id, article_slug);

-- Enable Row Level Security
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own reading history
CREATE POLICY "Users can view their own reading history"
ON public.reading_history
FOR SELECT
USING (user_id = auth.uid());

-- Policy: Users can insert their own reading history
CREATE POLICY "Users can insert their own reading history"
ON public.reading_history
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own reading history (for updating read_at)
CREATE POLICY "Users can update their own reading history"
ON public.reading_history
FOR UPDATE
USING (user_id = auth.uid());

-- Policy: Admins can view all reading history
CREATE POLICY "Admins can view all reading history"
ON public.reading_history
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.user_id = auth.uid() AND p.role = 'admin'::user_role
));