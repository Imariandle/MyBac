"use client";

import { Search, Command } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative group max-w-md w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
      </div>
      
      <input
        type="text"
        placeholder="Rechercher un examen, une région..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl py-3.5 pl-11 pr-16 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white/80 transition-all shadow-sm"
      />

      <div className="absolute inset-y-0 right-3 flex items-center gap-1 pointer-events-none">
        <div className="flex items-center gap-0.5 px-2 py-1 bg-white/50 border border-gray-100 rounded-lg text-gray-300">
          <Command className="w-3 h-3" />
          <span className="text-[10px] font-bold">K</span>
        </div>
      </div>
    </div>
  );
}
