-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    year INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    mileage INTEGER,
    vin TEXT UNIQUE,
    status TEXT DEFAULT 'available',
    featured BOOLEAN DEFAULT false,
    sold BOOLEAN DEFAULT false
);

-- Create vehicle_specs table
CREATE TABLE IF NOT EXISTS vehicle_specs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    engine TEXT,
    transmission TEXT,
    drivetrain TEXT,
    exterior_color TEXT,
    interior_color TEXT,
    fuel_type TEXT,
    mpg_city INTEGER,
    mpg_highway INTEGER,
    body_style TEXT,
    condition TEXT
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT DEFAULT 'user',
    avatar_url TEXT
);

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
DROP TRIGGER IF EXISTS update_vehicle_specs_updated_at ON vehicle_specs;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;

-- Add triggers for updated_at
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicle_specs_updated_at
    BEFORE UPDATE ON vehicle_specs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 