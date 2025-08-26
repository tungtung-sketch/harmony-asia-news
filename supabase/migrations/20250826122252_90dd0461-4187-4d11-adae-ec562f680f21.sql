-- Fix premium content security issue
-- Drop the existing policy that allows public access to all published articles
DROP POLICY IF EXISTS "Published articles are publicly readable" ON public.articles;

-- Create separate policies for free and premium content
-- Policy 1: Free articles are publicly readable
CREATE POLICY "Free articles are publicly readable" 
ON public.articles 
FOR SELECT 
USING (
  (status = 'published'::content_status AND is_premium = false)
  OR 
  -- Editors and admins can still see everything
  (EXISTS (
    SELECT 1 FROM profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = ANY (ARRAY['editor'::user_role, 'admin'::user_role])
  ))
);

-- Policy 2: Premium articles require active subscription
CREATE POLICY "Premium articles require subscription" 
ON public.articles 
FOR SELECT 
USING (
  (
    status = 'published'::content_status 
    AND is_premium = true 
    AND EXISTS (
      SELECT 1 FROM subscriptions s 
      WHERE s.user_id = auth.uid() 
      AND s.is_active = true 
      AND (
        -- Active paid subscription
        (s.tier != 'free_trial' AND (s.subscription_end_date IS NULL OR s.subscription_end_date > now()))
        OR 
        -- Valid trial period
        (s.tier = 'free_trial' AND s.trial_end_date > now())
      )
    )
  )
  OR 
  -- Editors and admins can still see everything
  (EXISTS (
    SELECT 1 FROM profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = ANY (ARRAY['editor'::user_role, 'admin'::user_role])
  ))
);