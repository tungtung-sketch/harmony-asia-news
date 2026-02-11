-- Backfill profile for existing user jirawat.sithinamsuwan@gmail.com
INSERT INTO public.profiles (user_id, email, full_name, position, industry, subscription_plan, purpose)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  COALESCE(raw_user_meta_data->>'position', ''),
  COALESCE(raw_user_meta_data->>'industry', ''),
  COALESCE(raw_user_meta_data->>'subscription_plan', 'basic'),
  COALESCE(raw_user_meta_data->>'purpose', '')
FROM auth.users 
WHERE id = '5e4c117f-5fb8-4a15-bba4-25788d5a1117'
ON CONFLICT (email) DO NOTHING;

-- Backfill subscription
INSERT INTO public.subscriptions (user_id, tier, trial_end_date, trial_start_date, status, start_date, is_active)
VALUES (
  '5e4c117f-5fb8-4a15-bba4-25788d5a1117',
  'free_trial',
  NOW() + INTERVAL '30 days',
  NOW(),
  'trialing',
  NOW(),
  true
)
ON CONFLICT DO NOTHING;

-- Also add a unique constraint on profiles.user_id to prevent duplicates in the future
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);