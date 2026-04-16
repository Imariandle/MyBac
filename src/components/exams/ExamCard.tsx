"use client";

import { Exam } from "@/lib/types";
import { FileText, Download, Heart, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExamCardProps {
  exam: Exam;
}

const subjectColors: Record<string, { bg: string, text: string, icon: string }> = {
  "Mathématiques": { bg: "bg-purple-100/50", text: "text-purple-600", icon: "bg-purple-500" },
  "Physique-Chimie": { bg: "bg-blue-100/50", text: "text-blue-600", icon: "bg-blue-500" },
  "SVT": { bg: "bg-green-100/50", text: "text-green-600", icon: "bg-green-500" },
  "Français": { bg: "bg-pink-100/50", text: "text-pink-600", icon: "bg-pink-500" },
  "Philosophie": { bg: "bg-orange-100/50", text: "text-orange-600", icon: "bg-orange-500" },
};

export default function ExamCard({ exam }: ExamCardProps) {
  const styles = subjectColors[exam.subject] ?? { bg: "bg-gray-100/50", text: "text-gray-600", icon: "bg-gray-500" };

  return (
    <Link href={`/exams/${exam.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-3xl p-5 flex flex-col h-full group cursor-pointer border border-white/40"
      >
        <div className="relative mb-6">
          <div className={cn(
            "w-full aspect-[4/3] rounded-2xl flex items-center justify-center transition-all duration-700 overflow-hidden relative",
            styles.bg,
            "group-hover:rounded-[32px] group-hover:scale-[1.02]"
          )}>
            {exam.imageUrl ? (
              <>
                <img 
                  src={exam.imageUrl} 
                  alt={exam.subject}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              </>
            ) : (
              <FileText className={cn("w-12 h-12 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6", styles.text)} />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
          </div>
          <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm hover:scale-110 active:scale-95 z-10">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors group-hover:text-purple-400">
              {exam.year} · {exam.session}
            </p>
            {exam.solutionUrl && (
              <span className="flex items-center gap-1.5 text-[9px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-tighter border border-green-100 shadow-sm transition-transform group-hover:scale-105">
                <Check className="w-2.5 h-2.5" />
                Corrigé
              </span>
            )}
          </div>
          
          <h3 className="font-black text-gray-900 text-sm tracking-tight leading-tight group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
            Examen National {exam.subject} - {exam.year}
          </h3>
          
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
            Matériel d&apos;examen {exam.level} pour la filière {exam.stream[0]}.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={cn("w-2 h-2 rounded-full shadow-sm animate-pulse", styles.icon)} />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{exam.region}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-purple-500 transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black">{exam.downloadCount || 0}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
