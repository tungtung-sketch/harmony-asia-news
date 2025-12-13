-- Create storage bucket for insight PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('insight-pdfs', 'insight-pdfs', false, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for insight PDFs
CREATE POLICY "Premium users can download their own PDFs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'insight-pdfs' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Service role can manage PDFs"
ON storage.objects FOR ALL
USING (bucket_id = 'insight-pdfs')
WITH CHECK (bucket_id = 'insight-pdfs');

-- Create table for PDF generation settings and caching
CREATE TABLE IF NOT EXISTS public.insight_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_ja TEXT NOT NULL,
  pdf_enabled BOOLEAN DEFAULT true,
  watermark_text TEXT DEFAULT 'For Premium Members of WaLen Only',
  last_content_update TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for PDF cache
CREATE TABLE IF NOT EXISTS public.pdf_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_slug TEXT NOT NULL,
  user_id UUID NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  storage_path TEXT NOT NULL,
  content_version TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(report_slug, user_id, language)
);

-- Create table for PDF download logs
CREATE TABLE IF NOT EXISTS public.pdf_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_slug TEXT NOT NULL,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  user_company TEXT,
  language TEXT NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT now(),
  ip_hash TEXT
);

-- Enable RLS
ALTER TABLE public.insight_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdf_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdf_downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for insight_reports (admin only for write, public read for pdf_enabled check)
CREATE POLICY "Anyone can read insight report settings"
ON public.insight_reports FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify insight reports"
ON public.insight_reports FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- RLS Policies for pdf_cache
CREATE POLICY "Users can read their own cache"
ON public.pdf_cache FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service role manages cache"
ON public.pdf_cache FOR ALL
USING (true)
WITH CHECK (true);

-- RLS Policies for pdf_downloads (admin can view all, users can view their own)
CREATE POLICY "Users can view their own downloads"
ON public.pdf_downloads FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all downloads"
ON public.pdf_downloads FOR SELECT
USING (public.is_admin_user());

CREATE POLICY "Service role can insert downloads"
ON public.pdf_downloads FOR INSERT
WITH CHECK (true);

-- Insert initial report data
INSERT INTO public.insight_reports (report_slug, title_en, title_ja)
VALUES ('ev-battery-industry', 'Thailand EV & Battery Industry Intelligence Report', 'タイEV・バッテリー産業 インテリジェンスレポート')
ON CONFLICT (report_slug) DO NOTHING;

-- Create function to update timestamps
CREATE TRIGGER update_insight_reports_updated_at
BEFORE UPDATE ON public.insight_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();