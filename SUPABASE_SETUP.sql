-- Supabase SQL Setup
-- Run this in the Supabase SQL Editor to create the email_signups table

CREATE TABLE IF NOT EXISTS email_signups (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  resend_id TEXT,
  error_message TEXT,
  test BOOLEAN DEFAULT FALSE,
  unsubscribed BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_status ON email_signups(status);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_signups_unsubscribed ON email_signups(unsubscribed);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy allowing public inserts (since the API key is public)
CREATE POLICY "Allow public inserts" ON email_signups
  FOR INSERT
  WITH CHECK (true);

-- Create a policy allowing public updates for unsubscribe (optional but helps with unsubscribe functionality)
CREATE POLICY "Allow public updates" ON email_signups
  FOR UPDATE
  USING (true);

-- Create a policy allowing reads (optional)
CREATE POLICY "Allow public reads" ON email_signups
  FOR SELECT
  USING (true);

-- MIGRATION: If you have an existing email_signups table, run these commands to add the new columns:
-- ALTER TABLE email_signups ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN DEFAULT FALSE;
-- ALTER TABLE email_signups ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE;
-- CREATE INDEX IF NOT EXISTS idx_email_signups_unsubscribed ON email_signups(unsubscribed);

-- Optional: Show recent signups
-- SELECT * FROM email_signups ORDER BY created_at DESC LIMIT 10;
