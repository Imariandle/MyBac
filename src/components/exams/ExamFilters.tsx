"use client";

import { useState } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "SVT",
  "Français",
  "Philosophie",
  "Histoire-Géographie",
  "Anglais",
  "Arabe",
];

const YEARS = Array.from({ length: 15 }, (_, i) => 2024 - i).map(String);

interface Filters {
  subject: string;
  year: string;
  session: string;
  level: string;
}

interface ExamFiltersProps {
  onChange: (filters: Filters) => void;
}

export default function ExamFilters({ onChange }: ExamFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    subject: "",
    year: "",
    session: "",
    level: "",
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const update = (key: keyof Filters, val: string) => {
    const next = { ...filters, [key]: val };
    setFilters(next);
    onChange(next);
    setActiveDropdown(null);
  };

  const FilterPill = ({ label, value, options, filterKey }: { 
    label: string, 
    value: string, 
    options: string[], 
    filterKey: keyof Filters 
  }) => {
    const isActive = value !== "";
    const isOpen = activeDropdown === filterKey;

    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : filterKey)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all border cursor-pointer",
            "hover:scale-105 active:scale-95",
            isActive 
              ? "bg-purple-100/60 border-purple-200 text-purple-700 shadow-sm" 
              : "bg-white/40 border-white/60 text-gray-500 hover:bg-white/80 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-400/5"
          )}
        >
          {isActive ? value : label}
          <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-10 cursor-default" 
                onClick={() => setActiveDropdown(null)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-56 z-20 glass-card rounded-2xl p-2 shadow-2xl border border-white/80 max-h-64 overflow-y-auto"
              >
                <div 
                  onClick={() => update(filterKey, "")}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  Tout {label.toLowerCase()}
                  {value === "" && <Check className="w-3 h-3" />}
                </div>
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => update(filterKey, opt)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black cursor-pointer transition-all",
                      value === opt 
                        ? "bg-gradient-premium text-white shadow-md scale-[1.02]" 
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:translate-x-1"
                    )}
                  >
                    {opt}
                    {value === opt && <Check className="w-3 h-3" />}
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <div className="flex items-center gap-2 mr-2 text-gray-400 select-none">
        <Filter className="w-3 h-3" />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Filtres</span>
      </div>

      <FilterPill label="Matière" value={filters.subject} options={SUBJECTS} filterKey="subject" />
      <FilterPill label="Année" value={filters.year} options={YEARS} filterKey="year" />
      <FilterPill label="Session" value={filters.session} options={["Normal", "Rattrapage"]} filterKey="session" />
      <FilterPill label="Niveau" value={filters.level} options={["1ère Bac", "2ème Bac"]} filterKey="level" />
      
      {(filters.subject || filters.year || filters.session || filters.level) && (
        <button 
          onClick={() => {
            const reset = { subject: "", year: "", session: "", level: "" };
            setFilters(reset);
            onChange(reset);
          }}
          className="text-[10px] font-black text-purple-400 hover:text-purple-600 hover:scale-110 active:scale-95 px-3 uppercase tracking-tighter cursor-pointer transition-all"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}
