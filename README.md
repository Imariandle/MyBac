# BAC Maroc - Exam Discovery Portal

A minimalist web portal for accessing Moroccan Baccalaureate exams. Built with Next.js, Supabase, and Framer Motion.

## Core Features

- **Secure PDF Viewing**: Temporary signed URLs for protected documents.
- **Custom Reader**: Immersive PDF viewer with zoom, print, and focus mode.
- **Fast Search**: Debounced search and category filtering.
- **Usage Tracking**: Download counter for popular exams.
- **Modern UI**: Clean, glassmorphic design and smooth animations.

## Tech Stack

- Next.js 16 (App Router)
- Supabase (Database & Storage)
- Framer Motion (Animations)
- Tailwind CSS

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Create a `.env.local` file with your credentials (see `.env.example`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

3. **Database**:
   Run the SQL scripts in `/supabase` to set up the tables and RPC functions.

4. **Run development server**:
   ```bash
   npm run dev
   ```

## License

MIT
