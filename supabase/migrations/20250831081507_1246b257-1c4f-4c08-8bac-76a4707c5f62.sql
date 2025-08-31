-- Ensure the database is properly set up for membership system

-- Check if the profiles table has the right columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Ensure the subscriptions table has the right structure
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;