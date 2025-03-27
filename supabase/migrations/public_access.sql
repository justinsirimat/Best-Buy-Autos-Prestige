-- Enable RLS on all tables
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow public read access to vehicles" ON vehicles;
DROP POLICY IF EXISTS "Allow public read access to vehicle specs" ON vehicle_specs;
DROP POLICY IF EXISTS "Allow public read access to vehicle images" ON vehicle_images;
DROP POLICY IF EXISTS "Users can create their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can read their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
DROP POLICY IF EXISTS "Allow public to create contact inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Users can view their own inquiries" ON contact_inquiries;

-- Public read access for vehicles
CREATE POLICY "Allow public read access to vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

-- Public read access for vehicle specs
CREATE POLICY "Allow public read access to vehicle specs"
  ON vehicle_specs
  FOR SELECT
  TO public
  USING (true);

-- Public read access for vehicle images
CREATE POLICY "Allow public read access to vehicle images"
  ON vehicle_images
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create favorites
CREATE POLICY "Users can create their own favorites"
  ON favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own favorites
CREATE POLICY "Users can read their own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Anyone can create contact inquiries
CREATE POLICY "Allow public to create contact inquiries"
  ON contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Users can view their own contact inquiries
CREATE POLICY "Users can view their own inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email); 