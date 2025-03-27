-- First, enable RLS on the user_profiles table
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert the admin user profile (replace 'USER-UUID-HERE' with the actual UUID from Supabase dashboard)
INSERT INTO user_profiles (id, user_id, full_name, email, role)
VALUES (
  gen_random_uuid(),
  'USER-UUID-HERE', -- Replace this with the UUID from the Supabase dashboard
  'Admin User',
  'your-email@example.com', -- Replace with your email
  'admin'
); 