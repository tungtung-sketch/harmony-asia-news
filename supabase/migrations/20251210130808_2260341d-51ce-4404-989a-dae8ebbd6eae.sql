-- Add missing columns to newsletter_subscribers table
ALTER TABLE newsletter_subscribers 
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS segment text DEFAULT 'general',
ADD COLUMN IF NOT EXISTS company text;

-- Rename columns for consistency (if needed)
-- is_active -> status mapping will be handled in the API

-- Create newsletter_sends table
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id uuid REFERENCES newsletter_subscribers(id),
  email text NOT NULL,
  article_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  tracking_id text NOT NULL UNIQUE,
  sent_at timestamp with time zone NOT NULL DEFAULT now(),
  provider text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create newsletter_opens table
CREATE TABLE IF NOT EXISTS newsletter_opens (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  send_id uuid REFERENCES newsletter_sends(id),
  opened_at timestamp with time zone NOT NULL DEFAULT now(),
  user_agent text,
  ip_hash text
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_tracking_id ON newsletter_sends(tracking_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber_id ON newsletter_sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_opens_send_id ON newsletter_opens(send_id);

-- Enable RLS
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_opens ENABLE ROW LEVEL SECURITY;

-- RLS policies for newsletter_sends (allow public insert for n8n, admin read)
CREATE POLICY "Allow public insert for newsletter sends" ON newsletter_sends FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletter sends" ON newsletter_sends FOR SELECT USING (is_admin_user());

-- RLS policies for newsletter_opens (allow public insert for tracking pixel, admin read)
CREATE POLICY "Allow public insert for newsletter opens" ON newsletter_opens FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletter opens" ON newsletter_opens FOR SELECT USING (is_admin_user());