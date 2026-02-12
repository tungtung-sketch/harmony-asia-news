-- Update the subscription record for jirawat.sithinamsuwan@gmail.com to reflect their active Stripe premium subscription
UPDATE public.subscriptions SET 
  stripe_customer_id = 'cus_TxsDFpc91xqsfT',
  stripe_subscription_id = 'sub_1SzwTCEvHfeMPWfkBomDvnwW',
  stripe_price_id = 'price_1S2W4oEvHfeMPWfkhgTOAtVb',
  tier = 'enterprise',
  status = 'active',
  is_active = true,
  current_period_end = '2026-03-10T05:05:55+00:00',
  subscription_end_date = '2026-03-10T05:05:55+00:00',
  updated_at = NOW()
WHERE user_id = '45e57b66-d85c-4add-a2d0-388bab31191c';