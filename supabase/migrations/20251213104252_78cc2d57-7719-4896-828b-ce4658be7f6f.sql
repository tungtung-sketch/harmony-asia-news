-- Create enum for premium action types
CREATE TYPE public.premium_action_type AS ENUM ('view', 'download', 'access_data');

-- Create premium action logs table
CREATE TABLE public.premium_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type public.premium_action_type NOT NULL,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  company_name TEXT,
  report_slug TEXT NOT NULL,
  report_title TEXT NOT NULL,
  industry_category TEXT,
  report_version TEXT DEFAULT '1.0',
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  language TEXT NOT NULL DEFAULT 'en',
  device_type TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for common queries
CREATE INDEX idx_premium_logs_user ON public.premium_action_logs(user_id);
CREATE INDEX idx_premium_logs_report ON public.premium_action_logs(report_slug);
CREATE INDEX idx_premium_logs_logged_at ON public.premium_action_logs(logged_at DESC);
CREATE INDEX idx_premium_logs_action_type ON public.premium_action_logs(action_type);

-- Enable RLS
ALTER TABLE public.premium_action_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Only admins can view premium action logs"
ON public.premium_action_logs
FOR SELECT
USING (is_admin_user());

-- Allow authenticated users to insert their own logs
CREATE POLICY "Authenticated users can insert own logs"
ON public.premium_action_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create anomaly flags table for governance
CREATE TABLE public.anomaly_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  flag_type TEXT NOT NULL,
  flag_reason TEXT NOT NULL,
  severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  review_notes TEXT,
  is_resolved BOOLEAN DEFAULT false,
  related_log_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_anomaly_flags_user ON public.anomaly_flags(user_id);
CREATE INDEX idx_anomaly_flags_resolved ON public.anomaly_flags(is_resolved);
CREATE INDEX idx_anomaly_flags_severity ON public.anomaly_flags(severity);

-- Enable RLS
ALTER TABLE public.anomaly_flags ENABLE ROW LEVEL SECURITY;

-- Only admins can manage anomaly flags
CREATE POLICY "Only admins can view anomaly flags"
ON public.anomaly_flags
FOR SELECT
USING (is_admin_user());

CREATE POLICY "Only admins can manage anomaly flags"
ON public.anomaly_flags
FOR ALL
USING (is_admin_user());

-- Create view for usage analytics (admin only)
CREATE OR REPLACE VIEW public.premium_usage_summary AS
SELECT 
  report_slug,
  report_title,
  industry_category,
  action_type,
  COUNT(*) as total_actions,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT company_name) as unique_companies,
  DATE_TRUNC('month', logged_at) as month
FROM public.premium_action_logs
GROUP BY report_slug, report_title, industry_category, action_type, DATE_TRUNC('month', logged_at);

-- Create function to detect anomalies (called periodically or on-demand)
CREATE OR REPLACE FUNCTION public.check_user_anomalies(check_user_id UUID)
RETURNS TABLE(flag_type TEXT, flag_reason TEXT, severity TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  download_count INTEGER;
  rapid_access_count INTEGER;
  company_count INTEGER;
BEGIN
  -- Check high download frequency (>10 downloads in last 24 hours)
  SELECT COUNT(*) INTO download_count
  FROM premium_action_logs
  WHERE user_id = check_user_id
    AND action_type = 'download'
    AND logged_at > NOW() - INTERVAL '24 hours';
  
  IF download_count > 10 THEN
    flag_type := 'high_download_frequency';
    flag_reason := format('User downloaded %s PDFs in the last 24 hours', download_count);
    severity := CASE WHEN download_count > 20 THEN 'high' WHEN download_count > 15 THEN 'medium' ELSE 'low' END;
    RETURN NEXT;
  END IF;
  
  -- Check rapid access pattern (>20 reports accessed in 1 hour)
  SELECT COUNT(DISTINCT report_slug) INTO rapid_access_count
  FROM premium_action_logs
  WHERE user_id = check_user_id
    AND action_type = 'view'
    AND logged_at > NOW() - INTERVAL '1 hour';
  
  IF rapid_access_count > 20 THEN
    flag_type := 'rapid_access_pattern';
    flag_reason := format('User accessed %s different reports in the last hour', rapid_access_count);
    severity := 'medium';
    RETURN NEXT;
  END IF;
  
  -- Check multiple companies (same user accessing from different company names)
  SELECT COUNT(DISTINCT company_name) INTO company_count
  FROM premium_action_logs
  WHERE user_id = check_user_id
    AND company_name IS NOT NULL
    AND logged_at > NOW() - INTERVAL '30 days';
  
  IF company_count > 2 THEN
    flag_type := 'multiple_companies';
    flag_reason := format('User associated with %s different companies in the last 30 days', company_count);
    severity := 'high';
    RETURN NEXT;
  END IF;
  
  RETURN;
END;
$$;