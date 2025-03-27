-- Wrap the entire script in a transaction
BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  bodyType TEXT NOT NULL,
  transmission TEXT NOT NULL,
  exterior_color TEXT NOT NULL,
  interior_color TEXT NOT NULL,
  vin TEXT,
  description TEXT,
  image_main TEXT,
  image_thumbnail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint on VIN to prevent duplicates
ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS vehicles_vin_unique;
ALTER TABLE public.vehicles ADD CONSTRAINT vehicles_vin_unique UNIQUE (vin);

-- Enable Row Level Security on vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access 
CREATE POLICY "Allow anonymous read access" 
  ON public.vehicles
  FOR SELECT 
  TO anon
  USING (true);

-- Create vehicle_specs table for vehicle specifications
CREATE TABLE IF NOT EXISTS public.vehicle_specs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  engine TEXT,
  horsepower INTEGER,
  torque INTEGER,
  fuelType TEXT,
  mpgCity DECIMAL(5,1),
  mpgHighway DECIMAL(5,1),
  drivetrain TEXT,
  seats INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on vehicle_specs
ALTER TABLE public.vehicle_specs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access 
CREATE POLICY "Allow anonymous read access" 
  ON public.vehicle_specs
  FOR SELECT 
  TO anon
  USING (true);

-- Create vehicle_features table
CREATE TABLE IF NOT EXISTS public.vehicle_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on vehicle_features
ALTER TABLE public.vehicle_features ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access 
CREATE POLICY "Allow anonymous read access" 
  ON public.vehicle_features
  FOR SELECT 
  TO anon
  USING (true);

-- Create vehicle_images table for multiple images per vehicle
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on vehicle_images
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access 
CREATE POLICY "Allow anonymous read access" 
  ON public.vehicle_images
  FOR SELECT 
  TO anon
  USING (true);

-- Create users table (extends Supabase auth.users)
-- Note: auth.users is a built-in table in Supabase
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to access only their own profile
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create favorites table for users to save vehicles
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);

-- Enable Row Level Security on favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own favorites
CREATE POLICY "Users can view their own favorites"
  ON public.favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own favorites
CREATE POLICY "Users can add their own favorites"
  ON public.favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON public.favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  inquiry_type TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on contact_inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert inquiries
CREATE POLICY "Allow anonymous insert access"
  ON public.contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create test_drives table
CREATE TABLE IF NOT EXISTS public.test_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on test_drives
ALTER TABLE public.test_drives ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own test drives
CREATE POLICY "Users can view their own test drives"
  ON public.test_drives
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to schedule test drives
CREATE POLICY "Users can schedule test drives"
  ON public.test_drives
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'received',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to submit job applications
CREATE POLICY "Allow anonymous insert access"
  ON public.job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Sample vehicles data (optional)
INSERT INTO public.vehicles (title, price, brand, model, year, mileage, bodyType, transmission, exterior_color, interior_color, vin, description, image_main, image_thumbnail)
VALUES
('2023 BMW 5 Series 530i Sedan', 59995.00, 'BMW', '5 Series', 2023, 5420, 'Sedan', 'Automatic', 'Alpine White', 'Black', 'WBA53BJ04PCM92311', 'Low mileage, one owner BMW 5 Series in excellent condition. Loaded with premium features including navigation, heated seats, and premium sound system.', '/images/car-bmw.jpg', '/images/car-bmw.jpg'),
('2022 Mercedes-Benz E-Class E 350 4MATIC', 62900.00, 'Mercedes', 'E-Class', 2022, 12350, 'Sedan', 'Automatic', 'Obsidian Black', 'Macchiato Beige', 'W1KZF8DB8NA121422', 'Certified Pre-Owned Mercedes-Benz E-Class with remaining factory warranty. Features MBUX infotainment system, driver assistance package, and premium Burmester sound system.', '/images/car-mercedes.jpg', '/images/car-mercedes.jpg'),
('2021 Audi A6 Premium Plus', 54995.00, 'Audi', 'A6', 2021, 18750, 'Sedan', 'Automatic', 'Daytona Gray', 'Black', 'WAUL2AF26MN042755', 'Audi A6 with Premium Plus package featuring virtual cockpit, Bang & Olufsen audio, and Audi pre sense safety systems. Powerful and efficient with Quattro all-wheel drive.', '/images/car-audi.jpg', '/images/car-audi.jpg'),
('2023 Porsche 911 Carrera S', 149995.00, 'Porsche', '911', 2023, 3250, 'Coupe', 'PDK', 'GT Silver', 'Black/Bordeaux', 'WP0AB2A93PS227288', 'Nearly new Porsche 911 Carrera S with Sport Chrono Package, PASM sport suspension, and premium interior package. Breathtaking performance with iconic 911 styling.', '/images/car-porsche.jpg', '/images/car-porsche.jpg');

-- Add vehicle specs for the sample vehicles - using LIMIT 1 to avoid multiple rows
INSERT INTO public.vehicle_specs (vehicle_id, engine, horsepower, torque, fuelType, mpgCity, mpgHighway, drivetrain, seats)
VALUES
((SELECT id FROM public.vehicles WHERE vin = 'WBA53BJ04PCM92311' LIMIT 1), '2.0L Turbo Inline-4', 248, 258, 'Petrol', 25.0, 33.0, 'RWD', 5),
((SELECT id FROM public.vehicles WHERE vin = 'W1KZF8DB8NA121422' LIMIT 1), '2.0L Turbo Inline-4', 255, 273, 'Petrol', 22.0, 31.0, 'AWD', 5),
((SELECT id FROM public.vehicles WHERE vin = 'WAUL2AF26MN042755' LIMIT 1), '3.0L Turbo V6', 335, 369, 'Petrol', 23.0, 31.0, 'AWD', 5),
((SELECT id FROM public.vehicles WHERE vin = 'WP0AB2A93PS227288' LIMIT 1), '3.0L Twin-Turbo Flat-6', 443, 390, 'Petrol', 18.0, 25.0, 'RWD', 4);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers first to avoid "already exists" errors
DROP TRIGGER IF EXISTS vehicles_updated ON public.vehicles;
DROP TRIGGER IF EXISTS vehicle_specs_updated ON public.vehicle_specs;
DROP TRIGGER IF EXISTS vehicle_features_updated ON public.vehicle_features;
DROP TRIGGER IF EXISTS vehicle_images_updated ON public.vehicle_images;
DROP TRIGGER IF EXISTS user_profiles_updated ON public.user_profiles;
DROP TRIGGER IF EXISTS contact_inquiries_updated ON public.contact_inquiries;
DROP TRIGGER IF EXISTS test_drives_updated ON public.test_drives;
DROP TRIGGER IF EXISTS job_applications_updated ON public.job_applications;

-- Create triggers for updated_at
CREATE TRIGGER vehicles_updated
BEFORE UPDATE ON public.vehicles
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER vehicle_specs_updated
BEFORE UPDATE ON public.vehicle_specs
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER vehicle_features_updated
BEFORE UPDATE ON public.vehicle_features
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER vehicle_images_updated
BEFORE UPDATE ON public.vehicle_images
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER user_profiles_updated
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER contact_inquiries_updated
BEFORE UPDATE ON public.contact_inquiries
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER test_drives_updated
BEFORE UPDATE ON public.test_drives
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

CREATE TRIGGER job_applications_updated
BEFORE UPDATE ON public.job_applications
FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

-- Final COMMIT to save all changes
COMMIT; 