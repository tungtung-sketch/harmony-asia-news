-- Backfill missing profile for jirawat.sithinamsuwan@gmail.com
INSERT INTO public.profiles (user_id, email, full_name, position, industry, subscription_plan, purpose)
VALUES (
  '5e4c117f-5fb8-4a15-bba4-25788d5a1117',
  'jirawat.sithinamsuwan@gmail.com',
  'Tungie',
  'analyst',
  'logistics',
  'basic',
  'strategic_decisions'
);

-- Reset the subscription trial to 30 days from now
UPDATE public.subscriptions
SET trial_start_date = NOW(),
    trial_end_date = NOW() + INTERVAL '30 days',
    start_date = NOW(),
    status = 'trialing',
    is_active = true,
    updated_at = NOW()
WHERE user_id = '5e4c117f-5fb8-4a15-bba4-25788d5a1117';
