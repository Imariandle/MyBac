<div align="center">

# 🎓 BAC Maroc

**A premium, minimalist exam discovery portal for Moroccan Baccalaureate students**

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

</div>

-----

## ✨ Features

- **Secure Document Viewing** — Access protected PDF exams via time-limited signed URLs
- **Professional Reader** — Custom-built viewer with **Ultra-Zoom**, **Focus Mode**, and **Immersive transitions**
- **Premium Discovery** — Advanced global search with debounced typing and interactive filter pills
- **Real-time Stats** — Live download counter tracked safely on the server side
- **Fast Performance** — Built with Next.js Turbopack for near-instant rendering
- **Minimalist Aesthetic** — High-end glassmorphic UI with smooth Framer Motion animations

-----

## 📸 Preview

| Home Dashboard (Glassmorphism) | Document Pro Viewer (Focus Mode) |
|-------------------------------|-------------------------------|
| ![Dashboard Preview](https://github.com/user-attachments/assets/placeholder-dashboard) | ![Viewer Preview](https://github.com/user-attachments/assets/placeholder-viewer) |

> *Note: These are visual representations of the premium UI components.*

-----

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `^18.x` or higher
- A [Supabase](https://supabase.com/) project (Free tier works perfectly)

### Installation

1. **Clone the repo**
   
   ```bash
   git clone https://github.com/Imariandle/MyBac.git
   cd MyBac
   ```

2. **Set up Environment Variables**
   
   Copy the example template:
   
   ```bash
   cp .env.example .env.local
   ```
   
   Open `.env.local` and add your project keys:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Initialize Database**
   
   Go to your Supabase SQL Editor and run the scripts provided in the `/supabase` folder:
   - `supabase_setup.sql` (Tables & Storage)
   - `increment_downloads.sql` (RPC functions)
   - `add_image_column.sql` (Advanced metadata)

4. **Run the Portal**
   
   ```bash
   npm install
   npm run dev
   ```

-----

## 🏗 Project Structure

```
src/
├── app/
│   ├── exams/
│   │   └── [id]/page.tsx      # Immersive detail & PDF view
│   ├── globals.css            # 3D utilities & Glass-theme
│   └── page.tsx               # Main discovery dashboard
├── components/
│   ├── exams/
│   │   ├── ExamCard.tsx       # Interactive metadata card
│   │   ├── ExamFilters.tsx    # Filter pills & dropdowns
│   │   ├── PdfViewer.tsx      # "Document Pro" logic
│   │   └── SearchBar.tsx      # Debounced search logic
│   └── ui/                    # Reusable primitive components
└── lib/
    ├── data.ts                # Supabase Data Access Layer
    ├── supabase.ts            # Client & Backend signing
    └── utils.ts               # Shared Tailwind merging
```

-----

## 📦 Core Dependencies

| Package | Purpose |
|---------------------------------------------------|-------------------------------|
| [`supabase-js`](https://supabase.com/docs)         | Real-time Database & Secure Storage |
| [`framer-motion`](https://www.framer.com/motion/) | Premium Physics-based animations |
| [`lucide-react`](https://lucide.dev/)             | Modern Vector Iconography |
| [`clsx`](https://github.com/lukeed/clsx)          | Conditional class merging |

-----

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn and inspire.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

<div align="center">
Made with ☕ and Code
</div>
