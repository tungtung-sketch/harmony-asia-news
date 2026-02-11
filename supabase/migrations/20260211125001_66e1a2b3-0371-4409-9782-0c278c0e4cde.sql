
-- Fix Security Definer Views by explicitly setting SECURITY INVOKER
-- Drop and recreate views with explicit security invoker

DROP VIEW IF EXISTS public.v_top_categories_7d;
DROP VIEW IF EXISTS public.v_top_pages_7d;
DROP VIEW IF EXISTS public.v_content_performance_7d;
DROP VIEW IF EXISTS public.v_funnel_30d;
DROP VIEW IF EXISTS public.v_plan_conversion_30d;

-- Recreate with explicit SECURITY INVOKER
CREATE VIEW public.v_top_categories_7d WITH (security_invoker = true) AS
SELECT
  category,
  COUNT(*) AS view_count,
  COUNT(DISTINCT COALESCE(user_id::text, anon_id)) AS unique_viewers
FROM public.events
WHERE ts >= now() - interval '7 days'
  AND event_name IN ('article_view', 'report_view', 'page_view')
  AND category IS NOT NULL
GROUP BY category
ORDER BY view_count DESC;

CREATE VIEW public.v_top_pages_7d WITH (security_invoker = true) AS
SELECT
  path,
  COUNT(*) AS view_count,
  COUNT(DISTINCT COALESCE(user_id::text, anon_id)) AS unique_viewers
FROM public.events
WHERE ts >= now() - interval '7 days'
  AND event_name = 'page_view'
GROUP BY path
ORDER BY view_count DESC;

CREATE VIEW public.v_content_performance_7d WITH (security_invoker = true) AS
SELECT
  content_id,
  category,
  event_name,
  COUNT(*) AS view_count,
  COUNT(DISTINCT COALESCE(user_id::text, anon_id)) AS unique_viewers
FROM public.events
WHERE ts >= now() - interval '7 days'
  AND content_id IS NOT NULL
GROUP BY content_id, category, event_name
ORDER BY view_count DESC;

CREATE VIEW public.v_funnel_30d WITH (security_invoker = true) AS
WITH funnel_steps AS (
  SELECT
    event_name AS step,
    COUNT(*) AS step_count,
    COUNT(DISTINCT COALESCE(user_id::text, anon_id)) AS unique_users
  FROM public.events
  WHERE ts >= now() - interval '30 days'
    AND event_name IN ('page_view', 'paywall_hit', 'signup_start', 'signup_complete', 'checkout_start', 'subscribe_success')
  GROUP BY event_name
),
first_step AS (
  SELECT step_count FROM funnel_steps WHERE step = 'page_view'
)
SELECT
  f.step,
  f.step_count,
  f.unique_users,
  CASE WHEN fs.step_count > 0 
    THEN ROUND((f.step_count::numeric / fs.step_count) * 100, 2) 
    ELSE 0 
  END AS conversion_from_start_pct
FROM funnel_steps f
CROSS JOIN first_step fs
ORDER BY f.step_count DESC;

CREATE VIEW public.v_plan_conversion_30d WITH (security_invoker = true) AS
WITH checkout_starts AS (
  SELECT plan, COUNT(*) AS starts
  FROM public.events
  WHERE ts >= now() - interval '30 days'
    AND event_name = 'checkout_start'
    AND plan IS NOT NULL
  GROUP BY plan
),
subscribe_success AS (
  SELECT plan, COUNT(*) AS successes
  FROM public.events
  WHERE ts >= now() - interval '30 days'
    AND event_name = 'subscribe_success'
    AND plan IS NOT NULL
  GROUP BY plan
)
SELECT
  COALESCE(c.plan, s.plan) AS plan,
  COALESCE(c.starts, 0) AS checkout_starts,
  COALESCE(s.successes, 0) AS subscribe_successes,
  CASE WHEN COALESCE(c.starts, 0) > 0 
    THEN ROUND((COALESCE(s.successes, 0)::numeric / c.starts) * 100, 2) 
    ELSE 0 
  END AS conversion_rate_pct
FROM checkout_starts c
FULL OUTER JOIN subscribe_success s ON c.plan = s.plan
ORDER BY checkout_starts DESC;
