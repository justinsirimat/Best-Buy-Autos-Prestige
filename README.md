# Best Buy Autos Prestige

A modern, responsive luxury auto dealership website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. Features a sleek design, smooth animations, and comprehensive vehicle management system.

## 👨‍🏫 Simple Guide to Run the Website (For Teachers)

Follow these easy steps to view the website on your computer:

### Step 1: Install Node.js
1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the big "Download" button on the left (LTS version)
3. Open the downloaded file
4. Follow the installation steps (click "Next" through the installer)
5. Click "Finish" when done

### Step 2: Get the Website Files
1. Download this project:
   - Look for the green "Code" button at the top of this page
   - Click it and select "Download ZIP"
2. Find the downloaded ZIP file in your Downloads folder
3. Right-click the ZIP file and select "Extract All"
4. Choose an easy-to-find location (like Desktop)
5. Click "Extract"

### Step 3: Prepare the Website
1. Open Command Prompt (Windows) or Terminal (Mac):
   - Windows: Press Windows key, type "cmd", press Enter
   - Mac: Press Command + Space, type "Terminal", press Enter

2. Go to the website folder (type these commands):
   ```bash
   cd Desktop
   cd Best-Buy-Autos-Prestige
   ```

3. Install the website's requirements:
   ```bash
   npm install
   ```
   (This will take a few minutes - don't worry!)

4. Create the settings file:
   - Create a new file named exactly `.env.local`
   - Put these two lines in it:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Step 4: Start the Website
1. In the same Command Prompt/Terminal window, type:
   ```bash
   npm run dev
   ```

2. Open your web browser (Chrome, Firefox, etc.)
3. Type this address: http://localhost:3000
4. You should see the website!

### ❓ Common Issues & Solutions
- If you see "command not found":
  - Make sure you installed Node.js
  - Try closing and reopening Command Prompt/Terminal
- If you see "cannot find folder":
  - Make sure you're in the right folder
  - Check if you extracted the ZIP file
- If you see other errors:
  - Check that `.env.local` exists and has the correct information
  - Try the installation steps again from the beginning

### 🛑 To Stop the Website
1. Go back to Command Prompt/Terminal
2. Press Control+C (or Command+C on Mac)
3. Close the window

## 📸 Supabase Setup Guide with Screenshots

### 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up with your GitHub account (fastest method)

![Supabase Sign Up](docs/images/supabase-signup.png)

### 2. Create a New Project
1. Click "New Project" in your Supabase dashboard
2. Fill in the project details:
   - Name: "best-buy-autos" (or any name you prefer)
   - Database Password: Create a secure password
   - Region: Choose the closest to you
3. Click "Create new project" and wait for setup (about 1 minute)

![Create New Project](docs/images/create-project.png)

### 3. Get Your Project Keys
1. Once your project is ready, go to Project Settings (gear icon) ⚙️
2. Click on "API" in the left sidebar
3. You'll see two important values:
   - Project URL (copy this for `NEXT_PUBLIC_SUPABASE_URL`)
   - anon/public key (copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

![Project API Keys](docs/images/api-keys.png)

### 4. Run the Database Setup
1. In your project, click "SQL Editor" in the left sidebar
2. Copy and paste each of these scripts (one at a time):

![SQL Editor](docs/images/sql-editor.png)

```sql
-- First, run create_tables.sql:
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mileage INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Then run create_rpc.sql:
CREATE OR REPLACE FUNCTION check_tables_exist()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  result = jsonb_build_object(
    'vehicles', EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vehicles'),
    'vehicle_specs', EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vehicle_specs'),
    'vehicle_images', EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'vehicle_images')
  );
  RETURN result;
END;
$$;

-- Finally, run public_access.sql:
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON vehicles FOR SELECT USING (true);
```

3. Click "Run" after pasting each script

### 5. Enable Email Authentication
1. Go to "Authentication" in the left sidebar
2. Click "Providers"
3. Enable "Email" provider
4. Save changes

![Enable Email Auth](docs/images/enable-email.png)

### 6. Set Up URL Configuration
1. Still in Authentication, click "URL Configuration"
2. Add your site URL: `http://localhost:3000`
3. Add redirect URL: `http://localhost:3000/auth/callback`
4. Save changes

![URL Configuration](docs/images/url-config.png)

### 7. Verify Setup
1. Go back to your website
2. Visit `/admin/database-test`
3. You should see all connection tests passing

![Database Test](docs/images/database-test.png)

💡 **Note**: The actual screens might look slightly different as Supabase updates their interface, but the general layout and options will be similar.

If you need help at any step, please ask your teacher or refer to [Supabase Documentation](https://supabase.com/docs).

## Key Features

### For Customers
- 🚗 Browse extensive vehicle inventory with advanced filtering
- 🔍 Smart search functionality with real-time results
- 📱 Fully responsive design for all devices
- ⚡ Fast page loads with Next.js 14 App Router
- 💫 Smooth scroll animations using Framer Motion
- 📸 High-quality image handling with fallbacks
- 💰 Detailed vehicle specifications and pricing
- 📝 Easy inquiry submission system

### For Administrators
- 🔐 Secure admin dashboard
- 📊 Database connection monitoring
- 🛠️ Supabase diagnostic tools
- 📝 User management system
- 🔄 Real-time inventory updates
- 📨 Inquiry management system

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Radix UI Components
  - Lucide Icons

- **Backend:**
  - Supabase (Database & Auth)
  - PostgreSQL
  - Row Level Security
  - Stored Procedures

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/justinsirimat/Best-Buy-Autos-Prestige.git
cd Best-Buy-Autos-Prestige
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup

1. **Database Setup:**
   - Execute the SQL scripts in order:
     ```bash
     supabase/migrations/create_tables.sql
     supabase/migrations/create_rpc.sql
     supabase/migrations/public_access.sql
     ```

2. **Authentication Setup:**
   - Enable Email provider in Auth > Providers
   - Configure redirect URLs in Auth > URL Configuration:
     - Add your domain (or http://localhost:3000 for development)
     - Add /auth/registration-success as a redirect URL

3. **Row Level Security:**
   - RLS is configured for:
     - Public read access to vehicles
     - Authenticated user access to favorites
     - Admin access to all tables

4. **Verify Setup:**
   - Visit /admin/database-test to verify connection
   - Check table existence and permissions

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── inventory/         # Vehicle listings
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── sections/         # Page sections
├── lib/                  # Utilities and configurations
└── styles/               # Global styles
```




