-- Drop the SECURITY DEFINER view and recreate as regular view with RLS enforcement
DROP VIEW IF EXISTS public.premium_usage_summary;

-- Create a function instead for secure access (SECURITY DEFINER functions are appropriate for admin-only operations)
CREATE OR REPLACE FUNCTION public.get_premium_usage_summary(
  from_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '12 months',
  to_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TABLE(
  report_slug TEXT,
  report_title TEXT,
  industry_category TEXT,
  action_type public.premium_action_type,
  total_actions BIGINT,
  unique_users BIGINT,
  unique_companies BIGINT,
  month TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT is_admin_user() THEN
    RAISE EXCEPTION 'Access denied: Admin only';
  END IF;
  
  RETURN QUERY
  SELECT 
    pal.report_slug,
    pal.report_title,
    pal.industry_category,
    pal.action_type,
    COUNT(*)::BIGINT as total_actions,
    COUNT(DISTINCT pal.user_id)::BIGINT as unique_users,
    COUNT(DISTINCT pal.company_name)::BIGINT as unique_companies,
    DATE_TRUNC('month', pal.logged_at) as month
  FROM public.premium_action_logs pal
  WHERE pal.logged_at BETWEEN from_date AND to_date
  GROUP BY pal.report_slug, pal.report_title, pal.industry_category, pal.action_type, DATE_TRUNC('month', pal.logged_at);
END;
$$;