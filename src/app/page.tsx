"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchExams } from "@/lib/data";
import { Exam } from "@/lib/types";
import ExamGrid from "@/components/exams/ExamGrid";
import ExamFilters from "@/components/exams/ExamFilters";
import SearchBar from "@/components/exams/SearchBar";
import { Library, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: "",
    year: "",
    session: "",
    level: "",
    query: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await fetchExams(filters);
    setExams(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = useCallback((q: string) => {
    setFilters(f => ({ ...f, query: q }));
  }, []);

  const handleFilterChange = useCallback((f: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...f }));
  }, []);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      <section className="text-center space-y-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-gradient-premium shadow-2xl shadow-purple-200 mb-4 group"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-[32px]" />
          <Library className="w-10 h-10 text-white" />
          <div className="absolute -top-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-purple-50">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-6">
            Votre Portail <span className="text-gradient">BAC Pro</span>
          </h1>
          <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            Trouvez instantanément vos examens nationaux sécurisés. 
            Design minimaliste, performance maximale.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>
      </section>

      <section className="space-y-10">
        <div className="flex flex-col gap-8 relative z-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-5 rounded-[32px] border-white/80 shadow-sm">
            <ExamFilters onChange={handleFilterChange} />
            <div className="px-5 py-2.5 bg-purple-50 text-purple-600 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border border-purple-100 shadow-sm">
              {loading ? "CHARGEMENT..." : `${exams.length} EXAMENS RÉSEAUX`}
            </div>
          </div>
        </div>
        
        <div className="min-h-[500px] relative z-10">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Calcul des archives...</p>
              </div>
            </div>
          ) : (
            <ExamGrid exams={exams} />
          )}
        </div>
      </section>
    </div>
  );
}
