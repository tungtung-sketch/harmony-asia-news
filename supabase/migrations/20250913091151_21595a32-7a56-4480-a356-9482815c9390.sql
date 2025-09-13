-- Add additional fields to profiles table for user information
ALTER TABLE public.profiles 
ADD COLUMN position TEXT,
ADD COLUMN industry TEXT,
ADD COLUMN subscription_plan TEXT DEFAULT 'basic';

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, position, industry, subscription_plan)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'position', ''),
    COALESCE(NEW.raw_user_meta_data->>'industry', ''),
    COALESCE(NEW.raw_user_meta_data->>'subscription_plan', 'basic')
  );
  
  -- Create free trial subscription
  INSERT INTO public.subscriptions (user_id, tier, trial_end_date, trial_start_date)
  VALUES (
    NEW.id,
    'free_trial',
    NOW() + INTERVAL '30 days',
    NOW()
  );
  
  RETURN NEW;
END;
$function$;