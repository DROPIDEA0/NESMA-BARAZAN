-- Migration: Add username and password fields to users table
-- Date: 2025-12-29

-- Add username column (unique, nullable for existing users)
ALTER TABLE users ADD COLUMN username VARCHAR(100) UNIQUE;

-- Add password column (nullable for OAuth users)
ALTER TABLE users ADD COLUMN password VARCHAR(255);

-- Make openId nullable (since we now support password login)
ALTER TABLE users MODIFY COLUMN openId VARCHAR(64) UNIQUE;

-- Create default admin user if not exists
INSERT INTO users (username, password, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
SELECT 
  'admin',
  '$2a$10$YourHashedPasswordHere', -- This will be replaced by the app
  'Administrator',
  'admin@nesmabarzan.com',
  'admin',
  'password',
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE role = 'admin'
);
