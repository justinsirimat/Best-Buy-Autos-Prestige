-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
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

-- Create vehicle_specs table for vehicle specifications
CREATE TABLE IF NOT EXISTS vehicle_specs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
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

-- Create vehicle_features table
CREATE TABLE IF NOT EXISTS vehicle_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vehicle_images table for multiple images per vehicle
CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
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

-- Create favorites table for users to save vehicles
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  inquiry_type TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create test_drives table
CREATE TABLE IF NOT EXISTS test_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
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

-- Sample vehicles data (optional)
INSERT INTO vehicles (title, price, brand, model, year, mileage, bodyType, transmission, exterior_color, interior_color, vin, description, image_main, image_thumbnail)
VALUES
('2023 BMW 5 Series 530i Sedan', 59995.00, 'BMW', '5 Series', 2023, 5420, 'Sedan', 'Automatic', 'Alpine White', 'Black', 'WBA53BJ04PCM92311', 'Low mileage, one owner BMW 5 Series in excellent condition. Loaded with premium features including navigation, heated seats, and premium sound system.', '/images/car-bmw.jpg', '/images/car-bmw.jpg'),
('2022 Mercedes-Benz E-Class E 350 4MATIC', 62900.00, 'Mercedes', 'E-Class', 2022, 12350, 'Sedan', 'Automatic', 'Obsidian Black', 'Macchiato Beige', 'W1KZF8DB8NA121422', 'Certified Pre-Owned Mercedes-Benz E-Class with remaining factory warranty. Features MBUX infotainment system, driver assistance package, and premium Burmester sound system.', '/images/car-mercedes.jpg', '/images/car-mercedes.jpg'),
('2021 Audi A6 Premium Plus', 54995.00, 'Audi', 'A6', 2021, 18750, 'Sedan', 'Automatic', 'Daytona Gray', 'Black', 'WAUL2AF26MN042755', 'Audi A6 with Premium Plus package featuring virtual cockpit, Bang & Olufsen audio, and Audi pre sense safety systems. Powerful and efficient with Quattro all-wheel drive.', '/images/car-audi.jpg', '/images/car-audi.jpg'),
('2023 Porsche 911 Carrera S', 149995.00, 'Porsche', '911', 2023, 3250, 'Coupe', 'PDK', 'GT Silver', 'Black/Bordeaux', 'WP0AB2A93PS227288', 'Nearly new Porsche 911 Carrera S with Sport Chrono Package, PASM sport suspension, and premium interior package. Breathtaking performance with iconic 911 styling.', '/images/car-porsche.jpg', '/images/car-porsche.jpg');

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER vehicles_updated
BEFORE UPDATE ON vehicles
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER vehicle_specs_updated
BEFORE UPDATE ON vehicle_specs
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER vehicle_features_updated
BEFORE UPDATE ON vehicle_features
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER vehicle_images_updated
BEFORE UPDATE ON vehicle_images
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER user_profiles_updated
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER contact_inquiries_updated
BEFORE UPDATE ON contact_inquiries
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER test_drives_updated
BEFORE UPDATE ON test_drives
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER job_applications_updated
BEFORE UPDATE ON job_applications
FOR EACH ROW EXECUTE PROCEDURE update_timestamp(); 