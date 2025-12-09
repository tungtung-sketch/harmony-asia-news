UPDATE subscriptions 
SET 
  tier = 'business',
  status = 'active',
  is_active = true,
  trial_end_date = NULL,
  trial_start_date = NULL,
  start_date = NOW(),
  subscription_end_date = NOW() + INTERVAL '1 year',
  updated_at = NOW()
WHERE user_id = '6a3d69b1-9ef6-4d0d-a996-d7ea071dc6f6'