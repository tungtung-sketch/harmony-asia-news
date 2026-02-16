
-- Create visitor_logs table
CREATE TABLE public.visitor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  page_path text NOT NULL,
  referrer text,
  user_agent text NOT NULL DEFAULT '',
  device_type text NOT NULL DEFAULT 'desktop',
  browser text NOT NULL DEFAULT '',
  os text NOT NULL DEFAULT '',
  language text,
  viewport_w int,
  viewport_h int,
  ip_hash text NOT NULL DEFAULT '',
  cookie_id text NOT NULL DEFAULT '',
  is_test boolean NOT NULL DEFAULT false
);

-- Create analytics_exclusions table
CREATE TABLE public.analytics_exclusions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  exclusion_type text NOT NULL, -- ip_hash | cookie_id
  exclusion_value text NOT NULL,
  note text
);

-- Enable RLS on both tables
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_exclusions ENABLE ROW LEVEL SECURITY;

-- visitor_logs: only admins can read
CREATE POLICY "Admins can read visitor_logs"
  ON public.visitor_logs FOR SELECT
  USING (is_admin_user());

-- visitor_logs: service role inserts (edge function), no client insert
-- No INSERT policy for authenticated users - edge function uses service role

-- analytics_exclusions: admin only for all operations
CREATE POLICY "Admins can manage analytics_exclusions"
  ON public.analytics_exclusions FOR ALL
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- Indexes for performance
CREATE INDEX idx_visitor_logs_created_at ON public.visitor_logs (created_at DESC);
CREATE INDEX idx_visitor_logs_cookie_id ON public.visitor_logs (cookie_id);
CREATE INDEX idx_visitor_logs_ip_hash ON public.visitor_logs (ip_hash);
CREATE INDEX idx_visitor_logs_is_test ON public.visitor_logs (is_test);
CREATE INDEX idx_analytics_exclusions_type_value ON public.analytics_exclusions (exclusion_type, exclusion_value);
