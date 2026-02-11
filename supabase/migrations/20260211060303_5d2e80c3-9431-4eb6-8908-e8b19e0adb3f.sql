
-- Create the trigger that was missing
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert missing profile for gunt7590@gmail.com
INSERT INTO public.profiles (user_id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', '')
FROM auth.users 
WHERE email = 'gunt7590@gmail.com'
  AND id NOT IN (SELECT user_id FROM public.profiles)
ON CONFLICT DO NOTHING;

-- Insert missing subscription for gunt7590@gmail.com
INSERT INTO public.subscriptions (user_id, tier, trial_end_date, trial_start_date, status, start_date)
SELECT id, 'free_trial', NOW() + INTERVAL '30 days', NOW(), 'trialing', NOW()
FROM auth.users
WHERE email = 'gunt7590@gmail.com'
  AND id NOT IN (SELECT user_id FROM public.subscriptions)
ON CONFLICT DO NOTHING;
