-- Add company and country columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS country text;

-- Add thumbnail and category columns to reading_history table  
ALTER TABLE public.reading_history
ADD COLUMN IF NOT EXISTS thumbnail_url text,
ADD COLUMN IF NOT EXISTS category text;