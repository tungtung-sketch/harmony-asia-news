-- Add missing fields to profiles table for the enhanced sign-up flow
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS purpose text;

-- Add missing fields to subscriptions table for better Stripe integration
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'trialing',
ADD COLUMN IF NOT EXISTS start_date timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS current_period_end timestamp with time zone;

-- Update the handle_new_user function to include the new purpose field
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, position, industry, subscription_plan, purpose)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'position', ''),
    COALESCE(NEW.raw_user_meta_data->>'industry', ''),
    COALESCE(NEW.raw_user_meta_data->>'subscription_plan', 'basic'),
    COALESCE(NEW.raw_user_meta_data->>'purpose', '')
  );
  
  -- Create free trial subscription
  INSERT INTO public.subscriptions (user_id, tier, trial_end_date, trial_start_date, status, start_date)
  VALUES (
    NEW.id,
    'free_trial',
    NOW() + INTERVAL '30 days',
    NOW(),
    'trialing',
    NOW()
  );
  
  RETURN NEW;
END;
$function$

-- Create trigger for updating updated_at on subscriptions
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();