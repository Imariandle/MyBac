import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAC Maroc — Examens Nationaux",
  description: "Tous les examens nationaux du baccalauréat marocain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geist.className} bg-[#fdf4ff] text-gray-900 min-h-screen overflow-x-hidden`}>
        <div className="max-w-6xl mx-auto min-h-screen flex flex-col relative px-4 sm:px-6 lg:px-8">
          {/* Subtle background glow */}
          <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-pink-100/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
          
          <main className="flex-1 py-12 scroll-smooth">
            {children}
          </main>

          <footer className="py-8 border-t border-gray-100/50 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} BAC Maroc — Examens Nationaux
          </footer>
        </div>
      </body>
    </html>
  );
}
