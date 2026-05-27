# Library Management App

This is a modern library management application built with React, TypeScript, Vite, and Tailwind CSS. It features authentication, book catalog, admin dashboard, and integration with Supabase.

## Features
- User authentication (login/signup)
- Book catalog and search
- Admin dashboard for managing books and users
- Responsive UI with Tailwind CSS
- Supabase integration for backend services

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Library
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up Supabase:
   - Follow the instructions in `SUPABASE_SETUP.md` to configure your Supabase project and environment variables.

### Running the App
```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure
- `src/components/` — Reusable UI components
- `src/pages/` — Application pages (Home, Dashboard, Catalog, etc.)
- `src/services/` — API and business logic
- `src/context/` — React context providers
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility libraries (e.g., Supabase client)

## License
MIT
