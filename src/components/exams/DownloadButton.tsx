"use client";

import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { recordDownload } from "@/lib/data";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  examId: string;
  url: string;
  label: string;
  variant?: "primary" | "secondary";
}

export default function DownloadButton({ examId, url, label, variant = "primary" }: DownloadButtonProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    // We don't preventDefault here because we want the download to trigger natively
    // but we can also handle it manually for better control
    setIsTracking(true);
    
    try {
      // Record download in Supabase
      await recordDownload(examId);
      
      // Success feedback
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
      
      // The browser will handle the <a> tag's href automatically if we don't preventDefault
      // However, to ensure tracking finishes, we can open in new tab manually if needed.
    } catch (err) {
      console.error("Tracking failed:", err);
    } finally {
      setIsTracking(false);
    }
  };

  const baseStyles = "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-3xl text-sm font-black transition-all active:scale-95 shadow-sm min-w-[160px]";
  
  const variants = {
    primary: "bg-gradient-premium text-white hover:shadow-2xl hover:shadow-purple-400/30",
    secondary: "bg-white text-gray-900 border border-gray-100 hover:bg-gray-50",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleDownload}
      className={cn(baseStyles, variants[variant])}
    >
      {isTracking ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : downloaded ? (
        <Check className="w-5 h-5 text-green-300" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      {label}
    </a>
  );
}
