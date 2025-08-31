-- Fix security warnings by setting search_path on functions

-- Update the handle_new_user function to be security compliant
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
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

-- Update the update_updated_at_column function to be security compliant
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;