-- Create SECURITY DEFINER functions to check roles without causing recursion

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
$$;

-- Function to check if current user is editor or admin
CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('editor', 'admin')
  )
$$;

-- Drop and recreate all problematic policies

-- 1. PROFILES table
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
FOR ALL USING (public.is_admin_user());

-- 2. ARTICLE_CONTENT table
DROP POLICY IF EXISTS "Editors and admins can manage article content" ON article_content;
CREATE POLICY "Editors and admins can manage article content" ON article_content
FOR ALL USING (public.is_editor_or_admin());

DROP POLICY IF EXISTS "Published article content is publicly readable" ON article_content;
CREATE POLICY "Published article content is publicly readable" ON article_content
FOR SELECT USING (
  (EXISTS (SELECT 1 FROM articles a WHERE a.id = article_content.article_id AND a.status = 'published'))
  OR public.is_editor_or_admin()
);

-- 3. ARTICLE_VIEWS table
DROP POLICY IF EXISTS "Admins can view all article views" ON article_views;
CREATE POLICY "Admins can view all article views" ON article_views
FOR SELECT USING (public.is_admin_user());

-- 4. ARTICLES table
DROP POLICY IF EXISTS "Editors and admins can manage articles" ON articles;
CREATE POLICY "Editors and admins can manage articles" ON articles
FOR ALL USING (public.is_editor_or_admin());

DROP POLICY IF EXISTS "Free articles are publicly readable" ON articles;
CREATE POLICY "Free articles are publicly readable" ON articles
FOR SELECT USING (
  (status = 'published' AND is_premium = false)
  OR public.is_editor_or_admin()
);

DROP POLICY IF EXISTS "Premium articles require subscription" ON articles;
CREATE POLICY "Premium articles require subscription" ON articles
FOR SELECT USING (
  (status = 'published' AND is_premium = true AND EXISTS (
    SELECT 1 FROM subscriptions s
    WHERE s.user_id = auth.uid() 
    AND s.is_active = true 
    AND (
      (s.tier <> 'free_trial' AND (s.subscription_end_date IS NULL OR s.subscription_end_date > now()))
      OR (s.tier = 'free_trial' AND s.trial_end_date > now())
    )
  ))
  OR public.is_editor_or_admin()
);

-- 5. CATEGORIES table
DROP POLICY IF EXISTS "Editors and admins can manage categories" ON categories;
CREATE POLICY "Editors and admins can manage categories" ON categories
FOR ALL USING (public.is_editor_or_admin());

-- 6. NEWSLETTER_SUBSCRIBERS table
DROP POLICY IF EXISTS "Admins can manage newsletter subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can manage newsletter subscribers" ON newsletter_subscribers
FOR ALL USING (public.is_admin_user());

DROP POLICY IF EXISTS "Only admins can view newsletter subscribers" ON newsletter_subscribers;
CREATE POLICY "Only admins can view newsletter subscribers" ON newsletter_subscribers
FOR SELECT USING (public.is_admin_user());

-- 7. PLANS table
DROP POLICY IF EXISTS "Only admins can manage plans" ON plans;
CREATE POLICY "Only admins can manage plans" ON plans
FOR ALL USING (public.is_admin_user());

-- 8. READING_HISTORY table
DROP POLICY IF EXISTS "Admins can view all reading history" ON reading_history;
CREATE POLICY "Admins can view all reading history" ON reading_history
FOR SELECT USING (public.is_admin_user());

-- 9. ROLE_ARTICLE_RULES table
DROP POLICY IF EXISTS "Only admins can manage access rules" ON role_article_rules;
CREATE POLICY "Only admins can manage access rules" ON role_article_rules
FOR ALL USING (public.is_admin_user());

-- 10. ROLES table
DROP POLICY IF EXISTS "Only admins can manage roles" ON roles;
CREATE POLICY "Only admins can manage roles" ON roles
FOR ALL USING (public.is_admin_user());

-- 11. SUBSCRIPTIONS table
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON subscriptions;
CREATE POLICY "Admins can view all subscriptions" ON subscriptions
FOR ALL USING (public.is_admin_user());