-- Create enum for access levels
CREATE TYPE public.access_level AS ENUM ('free', 'basic', 'premium', 'admin_only');

-- Create roles table (separate from user_role enum for more flexibility)
CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create plans table for subscription plans
CREATE TABLE public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price_monthly numeric DEFAULT 0,
  price_yearly numeric DEFAULT 0,
  description text,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create role_article_rules table for access control matrix
CREATE TABLE public.role_article_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  access_level public.access_level NOT NULL,
  can_view_full boolean NOT NULL DEFAULT false,
  can_comment boolean NOT NULL DEFAULT false,
  can_download_pdf boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(role_id, access_level)
);

-- Create article_views table for analytics
CREATE TABLE public.article_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id uuid,
  role_name text,
  viewed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add access_level column to articles table (replacing is_premium)
ALTER TABLE public.articles 
ADD COLUMN access_level public.access_level NOT NULL DEFAULT 'free';

-- Add preview_paragraphs column to articles table
ALTER TABLE public.articles 
ADD COLUMN preview_paragraphs integer NOT NULL DEFAULT 1;

-- Migrate existing is_premium data to access_level
UPDATE public.articles SET access_level = 'premium' WHERE is_premium = true;
UPDATE public.articles SET access_level = 'free' WHERE is_premium = false;

-- Add role_id to profiles table for role assignment
ALTER TABLE public.profiles
ADD COLUMN role_id uuid REFERENCES public.roles(id);

-- Enable RLS on new tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_article_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roles table
CREATE POLICY "Roles are publicly readable" 
ON public.roles FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage roles" 
ON public.roles FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles p 
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

-- RLS Policies for plans table
CREATE POLICY "Plans are publicly readable" 
ON public.plans FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage plans" 
ON public.plans FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles p 
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

-- RLS Policies for role_article_rules table
CREATE POLICY "Access rules are publicly readable" 
ON public.role_article_rules FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage access rules" 
ON public.role_article_rules FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles p 
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

-- RLS Policies for article_views table
CREATE POLICY "Users can insert their own views" 
ON public.article_views FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all article views" 
ON public.article_views FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles p 
  WHERE p.user_id = auth.uid() AND p.role = 'admin'
));

-- Seed roles data
INSERT INTO public.roles (name, description) VALUES
  ('GUEST', 'Non-member, can only view free content previews'),
  ('BASIC', 'Basic subscriber, can view free and basic content'),
  ('PREMIUM', 'Premium subscriber, can view all content except admin-only'),
  ('ADMIN', 'Administrator, full access to all content and features');

-- Seed plans data
INSERT INTO public.plans (name, slug, price_monthly, price_yearly, description, features) VALUES
  ('Free', 'guest', 0, 0, 'Limited access to free content only', '["Access to free articles", "Preview of premium content"]'::jsonb),
  ('Basic', 'basic', 29, 290, 'Essential business intelligence', '["All free content", "Basic analysis articles", "Weekly newsletter", "Email support"]'::jsonb),
  ('Premium', 'premium', 79, 790, 'Complete access to all insights', '["All basic content", "Premium in-depth analysis", "Industry reports", "Priority support", "PDF downloads"]'::jsonb);

-- Seed role_article_rules data (access control matrix)
-- Get role IDs
DO $$
DECLARE
  guest_role_id uuid;
  basic_role_id uuid;
  premium_role_id uuid;
  admin_role_id uuid;
BEGIN
  SELECT id INTO guest_role_id FROM public.roles WHERE name = 'GUEST';
  SELECT id INTO basic_role_id FROM public.roles WHERE name = 'BASIC';
  SELECT id INTO premium_role_id FROM public.roles WHERE name = 'PREMIUM';
  SELECT id INTO admin_role_id FROM public.roles WHERE name = 'ADMIN';

  -- GUEST rules
  INSERT INTO public.role_article_rules (role_id, access_level, can_view_full, can_comment, can_download_pdf) VALUES
    (guest_role_id, 'free', true, false, false),
    (guest_role_id, 'basic', false, false, false),
    (guest_role_id, 'premium', false, false, false),
    (guest_role_id, 'admin_only', false, false, false);

  -- BASIC rules
  INSERT INTO public.role_article_rules (role_id, access_level, can_view_full, can_comment, can_download_pdf) VALUES
    (basic_role_id, 'free', true, true, false),
    (basic_role_id, 'basic', true, true, false),
    (basic_role_id, 'premium', false, false, false),
    (basic_role_id, 'admin_only', false, false, false);

  -- PREMIUM rules
  INSERT INTO public.role_article_rules (role_id, access_level, can_view_full, can_comment, can_download_pdf) VALUES
    (premium_role_id, 'free', true, true, true),
    (premium_role_id, 'basic', true, true, true),
    (premium_role_id, 'premium', true, true, true),
    (premium_role_id, 'admin_only', false, false, false);

  -- ADMIN rules
  INSERT INTO public.role_article_rules (role_id, access_level, can_view_full, can_comment, can_download_pdf) VALUES
    (admin_role_id, 'free', true, true, true),
    (admin_role_id, 'basic', true, true, true),
    (admin_role_id, 'premium', true, true, true),
    (admin_role_id, 'admin_only', true, true, true);

  -- Update existing profiles to assign role_id based on subscription tier
  UPDATE public.profiles p
  SET role_id = guest_role_id
  WHERE role_id IS NULL;
  
END $$;

-- Create function to get user role considering admin override
CREATE OR REPLACE FUNCTION public.get_user_role(user_email text, user_subscription_tier text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Admin override for special email
  IF user_email = 'tungtungtutungtung@gmail.com' THEN
    RETURN 'ADMIN';
  END IF;
  
  -- Map subscription tier to role
  IF user_subscription_tier IS NULL THEN
    RETURN 'GUEST';
  ELSIF user_subscription_tier IN ('starter', 'basic') THEN
    RETURN 'BASIC';
  ELSIF user_subscription_tier IN ('business', 'premium', 'enterprise') THEN
    RETURN 'PREMIUM';
  ELSIF user_subscription_tier = 'free_trial' THEN
    RETURN 'PREMIUM'; -- Free trial gets premium access
  ELSE
    RETURN 'GUEST';
  END IF;
END;
$$;

-- Create function to check if user can view full article
CREATE OR REPLACE FUNCTION public.can_view_full_article(
  user_email text,
  user_subscription_tier text,
  article_access_level public.access_level
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role_name text;
  role_record uuid;
  can_view boolean;
BEGIN
  -- Get user role
  user_role_name := public.get_user_role(user_email, user_subscription_tier);
  
  -- Get role_id
  SELECT id INTO role_record FROM public.roles WHERE name = user_role_name;
  
  -- Check access rules
  SELECT rar.can_view_full INTO can_view
  FROM public.role_article_rules rar
  WHERE rar.role_id = role_record AND rar.access_level = article_access_level;
  
  RETURN COALESCE(can_view, false);
END;
$$;