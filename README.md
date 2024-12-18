# Testimonial Platform

This is a Next.js project bootstrapped with TypeScript, Tailwind CSS, and NextAuth.js for authentication. It uses PostgreSQL as the database with the help of the `pg` library and `dotenv` for handling environment variables.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/testimonial-platform.git
cd testimonial-platform
```

Then, install the dependencies:

```bash
npm install
```

Next, create a `.env` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a reference.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required for the project:

- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `GITHUB_ID`: The client ID for GitHub authentication.
- `GITHUB_SECRET`: The client secret for GitHub authentication.
- `GOOGLE_ID`: The client ID for Google authentication.
- `GOOGLE_SECRET`: The client secret for Google authentication.

## Project Structure

The project has the following structure:

```
/components
  /auth
    LoginButton.tsx
    LogoutButton.tsx
  /dashboard
    TestimonialForm.tsx
    TestimonialsTable.tsx
  /layout
    /dashboard
      Header.tsx
      SideNavigation.tsx
      MainArea.tsx
/pages
  /api
    /auth
      [...nextauth].ts
    /testimonials
      index.ts
  /dashboard
    index.tsx
  _app.tsx
  index.tsx
/styles
  globals.css
/utils
  db.ts
```

## Usage

- The home page (`/`) provides links to login and the dashboard.
- The dashboard page (`/dashboard`) displays a table of testimonials and a form to add new testimonials. Only logged-in users can access the dashboard.
- The API endpoints for authentication and testimonials are located in the `/api` folder.

## Authentication

The project uses NextAuth.js for authentication with GitHub and Google providers. The authentication configuration is located in `pages/api/auth/[...nextauth].ts`.

## Database

The project uses PostgreSQL as the database. The database configuration and client are set up in `utils/db.ts`. The `testimonials` table schema is defined with the following columns:

- `id`: SERIAL PRIMARY KEY
- `author`: TEXT
- `text`: TEXT
- `videoUrl`: TEXT
- `createdAt`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `userId`: UUID

The necessary server code for basic CRUD operations on testimonials is also included in `utils/db.ts`.

## Styling

The project uses Tailwind CSS for styling. The global styles are defined in `styles/globals.css`.

## Forms

The project uses `react-hook-form` for handling forms. The testimonial form is located in `components/dashboard/TestimonialForm.tsx`.

## Deployment

To deploy the project, you can use any platform that supports Next.js, such as Vercel or Netlify. Make sure to set the environment variables in the deployment platform.

## License

This project is licensed under the MIT License.
