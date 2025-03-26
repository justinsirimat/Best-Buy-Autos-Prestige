# Auto Dealership Website

A modern, responsive website for a luxury auto dealership, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Responsive design for all device sizes
- Vehicle inventory browsing with filters and search
- Vehicle detail pages with specifications and features
- Contact forms with inquiry submission
- User authentication (signup, login, password reset)
- Career opportunities page
- Service center information and appointment scheduling
- Financing calculator and options
- Admin dashboard for monitoring inquiries and inventory

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auto-dealership
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

This project uses Supabase for the database and authentication. Follow these steps to set up your Supabase project:

1. Create a new project on [Supabase](https://supabase.com/).

2. Get your project URL and anon key from the API settings page.

3. Set up the database schema by executing the SQL in `scripts/supabase-setup.sql` using the Supabase SQL Editor.

4. Configure authentication in the Supabase dashboard:
   - Enable Email Auth in Auth > Providers
   - Set up email templates in Auth > Email Templates
   - Configure site URL in Auth > URL Configuration

5. Set up storage buckets for vehicle images:
   - Create a new bucket named "vehicle-images" in Storage
   - Adjust the bucket permissions for public access

6. Test the connection by visiting the admin page at `/admin` after setting up your `.env.local` file.

## Deployment

The project can be deployed to any platform that supports Next.js applications. Here are some recommended options:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

Remember to add your environment variables to your hosting platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
