-- Update handle_new_user to handle re-signups via upsert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Upsert profile: if email already exists (re-signup), update with new user_id and data
  INSERT INTO public.profiles (user_id, email, full_name, position, industry, subscription_plan, purpose)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'position', ''),
    COALESCE(NEW.raw_user_meta_data->>'industry', ''),
    COALESCE(NEW.raw_user_meta_data->>'subscription_plan', 'basic'),
    COALESCE(NEW.raw_user_meta_data->>'purpose', '')
  )
  ON CONFLICT (email) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    full_name = EXCLUDED.full_name,
    position = EXCLUDED.position,
    industry = EXCLUDED.industry,
    subscription_plan = EXCLUDED.subscription_plan,
    purpose = EXCLUDED.purpose,
    updated_at = NOW();

  -- Upsert subscription: if user_id already exists, reset trial
  INSERT INTO public.subscriptions (user_id, tier, trial_end_date, trial_start_date, status, start_date, is_active)
  VALUES (
    NEW.id,
    'free_trial',
    NOW() + INTERVAL '30 days',
    NOW(),
    'trialing',
    NOW(),
    true
  )
  ON CONFLICT (user_id) DO UPDATE SET
    tier = 'free_trial',
    trial_start_date = NOW(),
    trial_end_date = NOW() + INTERVAL '30 days',
    start_date = NOW(),
    status = 'trialing',
    is_active = true,
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Add unique constraint on subscriptions.user_id if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'subscriptions_user_id_key'
  ) THEN
    ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_user_id_key UNIQUE (user_id);
  END IF;
END $$;