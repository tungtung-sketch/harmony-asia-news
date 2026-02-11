
-- ==============================================
-- 1. Events table for analytics tracking
-- ==============================================
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts timestamptz NOT NULL DEFAULT now(),
  event_name text NOT NULL,
  user_id uuid,
  anon_id text,
  session_id text NOT NULL,
  path text NOT NULL,
  category text,
  content_id text,
  plan text,
  step text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  language text,
  country text,
  device text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Indexes for performant analytics queries
CREATE INDEX idx_events_ts ON public.events (ts DESC);
CREATE INDEX idx_events_event_name ON public.events (event_name);
CREATE INDEX idx_events_user_id ON public.events (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_events_session_id ON public.events (session_id);
CREATE INDEX idx_events_path ON public.events (path);
CREATE INDEX idx_events_category ON public.events (category) WHERE category IS NOT NULL;
CREATE INDEX idx_events_content_id ON public.events (content_id) WHERE content_id IS NOT NULL;
CREATE INDEX idx_events_ts_event ON public.events (ts DESC, event_name);

-- ==============================================
-- 2. RLS: deny all direct access, service role only
-- ==============================================
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- No policies = no access for anon/authenticated.
-- Service role bypasses RLS by default.

-- Admin read-only policy for dashboard queries
CREATE POLICY "Admins can read events"
  ON public.events FOR SELECT
  USING (is_admin_user());

-- ==============================================
-- 3. Analytics views
-- ==============================================

-- Top categories last 7 days
CREATE OR REPLACE VIEW public.v_top_categories_7d AS
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

-- Top pages last 7 days
CREATE OR REPLACE VIEW public.v_top_pages_7d AS
SELECT
  path,
  COUNT(*) AS view_count,
  COUNT(DISTINCT COALESCE(user_id::text, anon_id)) AS unique_viewers
FROM public.events
WHERE ts >= now() - interval '7 days'
  AND event_name = 'page_view'
GROUP BY path
ORDER BY view_count DESC;

-- Content performance last 7 days
CREATE OR REPLACE VIEW public.v_content_performance_7d AS
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

-- Funnel last 30 days
CREATE OR REPLACE VIEW public.v_funnel_30d AS
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

-- Plan conversion last 30 days
CREATE OR REPLACE VIEW public.v_plan_conversion_30d AS
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

-- Grant view access (views inherit the table's RLS for the underlying events table)
