"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  FileText, 
  AlertCircle, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  Eye, 
  EyeOff,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PdfViewerProps {
  url: string;
  title: string;
}

export default function PdfViewer({ url, title }: PdfViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen state with browser events (Esc key, etc.)
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const handlePrint = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.print();
    }
  };

  // Modern URL with toolbar hidden
  const cleanUrl = `${url}#toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full transition-all duration-700 ease-in-out group",
        isFocusMode ? "h-screen fixed inset-0 z-[100] bg-black" : "h-[85vh] bg-white/50 backdrop-blur-sm rounded-[40px] shadow-2xl border border-white/60 overflow-hidden"
      )}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            <div className="relative group perspective-1000">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-24 h-32 bg-gradient-premium rounded-r-xl shadow-2xl relative preserve-3d"
              >
                <div className="absolute inset-y-0 -left-1 w-2 bg-purple-800 rounded-l-sm" />
                <div className="absolute inset-4 border-2 border-white/20 rounded-sm" />
                <FileText className="absolute inset-0 m-auto w-10 h-10 text-white/40" />
              </motion.div>
            </div>
            
            <div className="mt-12 text-center space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                <span className="text-sm font-black text-gray-900 tracking-widest uppercase">
                  Immersive Reader
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium animate-pulse">
                Optimisation du rendu vectoriel...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          scale: isFocusMode ? 0.95 : zoom,
          opacity: loading ? 0 : 1 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="w-full h-full origin-top"
      >
        <iframe
          ref={iframeRef}
          src={cleanUrl}
          className="w-full h-full border-none"
          title={title}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      </motion.div>

        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 p-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl transition-all duration-500",
            isFocusMode 
              ? "opacity-100 translate-y-0" 
              : "opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
          )}
        >
            <div className="flex items-center bg-white/5 rounded-2xl p-1 gap-1">
              <button 
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                className="p-2.5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-90"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-black text-white px-2 min-w-[45px] text-center uppercase tracking-tighter">
                {Math.round(zoom * 100)}%
              </span>
              <button 
                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                className="p-2.5 hover:bg-white/10 rounded-xl text-white transition-all active:scale-90"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={cn(
                  "p-2.5 rounded-xl transition-all active:scale-90 flex items-center gap-2",
                  isFocusMode ? "bg-purple-600 text-white" : "hover:bg-white/10 text-white/70 hover:text-white"
                )}
              >
                {isFocusMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">
                  {isFocusMode ? "Quitter Focus" : "Mode Focus"}
                </span>
              </button>

              <button 
                onClick={handlePrint}
                className="p-2.5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-all active:scale-90"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button 
                onClick={toggleFullscreen}
                className="p-2.5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-all active:scale-90"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none">
              <ChevronUp className="w-4 h-4 text-white/20 animate-bounce" />
            </div>
        </div>

      {isFocusMode && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-[110]">
          <p className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">
            Double-cliquez pour quitter le focus
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 text-red-500 max-w-xs text-center">
            <div className="w-16 h-16 bg-red-50 rounded-[24px] flex items-center justify-center shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black uppercase tracking-widest">Échec du rendu</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Le document n&apos;a pas pu être chargé. Vérifiez votre connexion ou essayez de rafraîchir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Museum Vignette Styling */}
      {!isFocusMode && (
        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/20 rounded-[40px] shadow-inner" />
      )}
    </div>
  );
}
