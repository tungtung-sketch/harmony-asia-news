UPDATE subscriptions
SET tier = 'business', 
    status = 'active', 
    is_active = true, 
    subscription_end_date = '2027-02-08T00:00:00+00:00',
    start_date = now(),
    trial_end_date = NULL, 
    trial_start_date = NULL
WHERE user_id = '308d3fad-19d4-45cb-b4ed-c4bc00e58801';