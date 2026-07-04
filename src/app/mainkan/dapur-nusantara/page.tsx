"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Pause, 
  Play,
  RotateCw, 
  ArrowLeft, 
  ChefHat, 
  Flame, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  isPlaced: boolean;
  // Percentage coordinates relative to full viewport
  left: string;
  top: string;
  width: string;
  height: string;
  svgIcon: React.ReactNode;
}

export default function CookingGamePage() {
  const [score, setScore] = useState(150);
  const [lives, setLives] = useState(3);
  const [step, setStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Cooking states
  const [doneness, setDoneness] = useState(0);
  const [isCooking, setIsCooking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Responsive full-page board ref
  const boardRef = useRef<HTMLDivElement | null>(null);

  // Vegetable assets precisely aligned with the background tray slots (percentage-based)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "wortel",
      name: "Wortel",
      isPlaced: false,
      left: "14.5%",
      top: "73.8%",
      width: "12.5%",
      height: "11.5%",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md select-none">
          <path d="M16 44 C 20 48, 42 28, 46 22 C 49 18, 46 14, 42 14 C 36 14, 18 38, 16 44 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
          <path d="M24 36 L28 38 M29 30 L33 32 M34 24 L38 26" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 22 C 51 18, 54 12, 52 10 C 47 11, 46 16, 44 18" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M42 14 C 45 10, 44 4, 40 6 C 39 10, 40 13, 42 14" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "tauge",
      name: "Tauge",
      isPlaced: false,
      left: "27.2%",
      top: "73.8%",
      width: "12.5%",
      height: "11.5%",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md select-none">
          <path d="M22 42 C 26 36, 32 34, 38 26 C 42 22, 44 16, 42 10" fill="none" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M38 12 C 36 8, 42 4, 44 8 C 46 10, 42 14, 38 12 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <path d="M22 42 C 20 44, 21 46, 19 47" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "kacang",
      name: "Kacang P.",
      isPlaced: false,
      left: "39.8%",
      top: "73.8%",
      width: "12.5%",
      height: "11.5%",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md select-none">
          <path d="M14 26 C 18 10, 46 10, 50 26 C 52 38, 38 48, 28 48 C 18 48, 16 40, 22 34" fill="none" stroke="#15803d" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M18 26 C 21 14, 43 14, 46 26 C 48 36, 36 44, 28 44" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "kentang",
      name: "Kentang",
      isPlaced: false,
      left: "52.3%",
      top: "73.8%",
      width: "12.5%",
      height: "11.5%",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md select-none">
          <path d="M16 36 C 14 24, 26 14, 38 16 C 50 18, 52 30, 48 40 C 44 48, 22 48, 16 36 Z" fill="#d97706" stroke="#b45309" strokeWidth="3" />
          <circle cx="24" cy="26" r="2" fill="#78350f" />
          <circle cx="38" cy="24" r="2" fill="#78350f" />
          <circle cx="32" cy="38" r="2" fill="#78350f" />
        </svg>
      )
    },
    {
      id: "bayam",
      name: "Bayam",
      isPlaced: false,
      left: "64.8%",
      top: "73.8%",
      width: "12.5%",
      height: "11.5%",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md select-none">
          <path d="M32 46 L32 14 M32 26 C 24 20, 16 24, 18 34 C 19 38, 26 40, 32 42 C 38 40, 45 38, 46 34 C 48 24, 40 20, 32 26" fill="#10b981" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 14 C 26 6, 12 10, 16 22 C 20 28, 28 32, 32 34 C 36 32, 44 28, 48 22 C 52 10, 38 6, 32 14 Z" fill="#059669" stroke="#047857" strokeWidth="2.5" />
        </svg>
      )
    }
  ]);

  // Handle Drag Events
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
  };

  const handleDragEnd = (id: string, info: any) => {
    if (!boardRef.current) return;
    
    // Get board layout details
    const rect = boardRef.current.getBoundingClientRect();
    
    // Convert drag drop coordinates to percentage of board
    const dropX = ((info.point.x - rect.left) / rect.width) * 100;
    const dropY = ((info.point.y - rect.top) / rect.height) * 100;

    // Check if the drop is within the Wok area (approx: X: 35% - 65%, Y: 30% - 58%)
    const inWokZone = dropX >= 34 && dropX <= 66 && dropY >= 28 && dropY <= 60;

    if (inWokZone && !isPaused) {
      setIngredients((prev) =>
        prev.map((ing) => (ing.id === id ? { ...ing, isPlaced: true } : ing))
      );
      setScore((s) => s + 10);
    }
    setActiveDragId(null);
  };

  // Check if all items are inside the wok
  const allPlaced = ingredients.every((ing) => ing.isPlaced);

  useEffect(() => {
    if (allPlaced && !isCooking && !isFinished) {
      setIsCooking(true);
    }
  }, [allPlaced, isCooking, isFinished]);

  // Cooking doneness timer
  useEffect(() => {
    let interval: any;
    if (isCooking && doneness < 100 && !isPaused) {
      interval = setInterval(() => {
        setDoneness((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            setIsCooking(false);
            setIsFinished(true);
            setScore((s) => s + 50);
            return 100;
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isCooking, doneness, isPaused]);

  const handleRestart = () => {
    setDoneness(0);
    setIsCooking(false);
    setIsFinished(false);
    setIngredients((prev) => prev.map((ing) => ({ ...ing, isPlaced: false })));
  };

  return (
    <div 
      ref={boardRef}
      className="w-screen h-screen overflow-hidden relative select-none flex flex-col justify-between items-center p-4 md:p-6"
    >
      {/* 1. Full Page Background Image (Taking 100% Viewport width and height) */}
      <Image 
        src="/cooking/gado-gado/step1/bg.jpeg"
        alt="Dapur Nusantara Background"
        fill
        className="object-cover pointer-events-none select-none z-0"
        priority
      />

      {/* ================= HEADER HUB (HUD) ================= */}
      <header className="w-full max-w-5xl px-4 flex justify-between items-center mb-4 z-20">
        {/* Keluar Button */}
        <Link 
          href="/mainkan"
          className="px-4 py-2.5 bg-white hover:bg-gold text-black hover:text-black border border-black/10 rounded-xl transition-all flex items-center gap-2 font-bold text-xs uppercase shadow-md"
        >
          <ArrowLeft size={14} /> Keluar Game
        </Link>

        {/* Lives Counter & Score */}
        <div className="flex items-center gap-6 bg-white border border-black/10 px-5 py-2 rounded-2xl shadow-md text-black">
          <div className="flex items-center gap-1.5 border-r border-black/10 pr-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} 
                size={14} 
                className={i < lives ? "text-red-500 fill-red-500 animate-pulse" : "text-black/20"} 
              />
            ))}
          </div>
          <div className="text-left">
            <span className="text-[9px] uppercase tracking-wider text-black/50 block leading-none">Skor</span>
            <span className="text-sm font-extrabold text-gold leading-none">{score}</span>
          </div>
        </div>

        {/* Step Progress Display */}
        <div className="flex items-center gap-4 bg-white border border-black/10 px-5 py-2 rounded-2xl shadow-md text-black">
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-gold block leading-none">Gado-Gado</span>
            <span className="text-[11px] font-bold text-black/80 block mt-0.5 leading-none">Step {step} dari 5</span>
          </div>
          <div className="w-20 h-2 bg-black/10 rounded-full overflow-hidden border border-black/5 p-[1px]">
            <div 
              className="h-full bg-gold rounded-full transition-all duration-500" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Pause Button */}
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="p-2.5 bg-white hover:bg-gold text-black hover:text-black border border-black/10 rounded-xl transition-all shadow-md"
        >
          {isPaused ? <Play size={14} className="fill-current" /> : <Pause size={14} className="fill-current" />}
        </button>
      </header>

      {/* ================= MIDDLE GAME AREA LAYOUT OVERLAYS ================= */}
      <div className="relative flex-grow w-full max-w-5xl z-10 pointer-events-none">
        
        {/* 1. Instruction Card Floating Overlay (Top Left) */}
        <div className="absolute top-[4%] left-[4%] bg-white/95 text-black p-3.5 rounded-2xl flex items-center gap-3 shadow-lg border border-amber-200 max-w-[40%] pointer-events-auto select-none z-20">
          <div className="w-9 h-9 bg-amber-500/10 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
            <ChefHat size={18} />
          </div>
          <div>
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-700 block">Langkah 1</span>
            <h2 className="text-xs md:text-sm font-extrabold text-amber-950 leading-tight">Rebus sayuran hingga matang!</h2>
          </div>
        </div>

        {/* 2. Doneness Indicator Gauge Floating Overlay (Center Right) */}
        <div className="absolute top-[28%] right-[4%] bg-white text-black border border-black/10 p-3 rounded-2xl flex flex-col items-center text-center shadow-md w-24 pointer-events-auto select-none z-20">
          <span className="text-[8px] font-bold uppercase tracking-wider text-gold mb-2 block leading-none">
            Kematangan
          </span>
          {/* Tiny thermometer column */}
          <div className="relative w-4 h-24 bg-black/10 rounded-full border border-black/5 flex flex-col justify-end p-[1px] overflow-hidden shadow-inner">
            <div 
              className={`w-full rounded-full transition-all duration-300 ${
                doneness >= 100 ? "bg-green-500" : "bg-orange-500"
              }`}
              style={{ height: `${doneness}%` }}
            />
          </div>
          <span className="text-xs font-black mt-2 font-mono text-gold leading-none">
            {doneness}%
          </span>
          <span className="text-[8px] uppercase tracking-wider text-black/50 mt-1 leading-none">
            {isCooking ? "Merebus" : isFinished ? "Matang!" : "Tunggu"}
          </span>
        </div>

        {/* 3. Drop Target indicator overlay inside the wok */}
        <AnimatePresence>
          {activeDragId && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[34%] top-[28%] w-[32%] h-[32%] border-2 border-dashed border-gold/75 bg-gold/10 rounded-full flex flex-col items-center justify-center pointer-events-none select-none z-10"
            >
              <Flame className="text-gold animate-bounce" size={24} />
              <span className="text-[9px] uppercase font-bold text-gold mt-1 tracking-wider">Cemplungkan Ke Sini</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Boiling Veggies rendering inside Wok once dropped */}
        <div className="absolute left-[38%] top-[34%] w-[24%] h-[20%] z-20 flex flex-wrap gap-1 items-center justify-center p-2 pointer-events-none select-none">
          {/* Vegetables removed as requested */}
        </div>

        {/* 5. Boiling Bubbles/Steam particles overlaying the wok */}
        {isCooking && (
          <div className="absolute left-[44%] top-[25%] w-[12%] h-[6%] pointer-events-none z-20 flex gap-1 justify-center">
            <motion.div animate={{ y: [0, -25], opacity: [0, 0.7, 0], scale: [1, 1.3] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0 }} className="w-3 h-3 bg-white/20 rounded-full blur-xs" />
            <motion.div animate={{ y: [0, -25], opacity: [0, 0.7, 0], scale: [1, 1.3] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }} className="w-4 h-4 bg-white/20 rounded-full blur-xs" />
            <motion.div animate={{ y: [0, -25], opacity: [0, 0.7, 0], scale: [1, 1.3] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1 }} className="w-3 h-3 bg-white/15 rounded-full blur-xs" />
          </div>
        )}

      </div>

      {/* ================= FOOTER / TRIVIA / NEXT CONTROLS ================= */}
      <footer className="w-full max-w-5xl px-4 flex flex-col md:flex-row gap-4 justify-between items-center mt-4 z-20">
        {/* Educational Info box */}
        <div className="bg-white border border-black/10 p-3.5 rounded-xl max-w-xl text-left flex items-start gap-2.5 shadow-md">
          <Sparkles size={16} className="text-gold shrink-0 mt-0.5 animate-pulse" />
          <p className="text-[10px] text-amber-950 leading-relaxed font-semibold">
            &ldquo;Dalam resep tradisional Gado-Gado, sayuran direbus tidak terlalu lama (al dente) agar teksturnya tetap renyah saat dinikmati dan kandungan vitamin serta mineralnya tetap terjaga utuh.&rdquo;
          </p>
        </div>

        {/* Action button container */}
        <div className="flex gap-3">
          {isFinished && (
            <button 
              onClick={handleRestart}
              className="px-4 py-3 bg-white hover:bg-gold text-black hover:text-black border border-black/10 rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <RotateCw size={12} /> Ulangi
            </button>
          )}

          <Link
            href="/mainkan"
            onClick={(e) => {
              if (!isFinished) e.preventDefault();
            }}
            className={`px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md ${
              isFinished 
                ? "bg-gold text-black hover:bg-amber-500 shadow-gold/20" 
                : "bg-white/10 text-white/30 border border-white/5 pointer-events-none cursor-not-allowed"
            }`}
          >
            Lanjut ke Step 2 <ChevronRight size={14} />
          </Link>
        </div>
      </footer>

    </div>
  );
}
