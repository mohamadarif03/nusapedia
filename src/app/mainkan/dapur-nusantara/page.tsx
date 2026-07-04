"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Pause, 
  Play,
  RotateCw, 
  ArrowLeft, 
  HelpCircle, 
  ChefHat, 
  Flame, 
  ChevronRight,
  UtensilsCrossed,
  Sparkles
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  color: string;
  isPlaced: boolean;
  svgIcon: React.ReactNode;
}

export default function CookingGamePage() {
  const [score, setScore] = useState(150);
  const [lives, setLives] = useState(3);
  const [step, setStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Cooking state
  const [doneness, setDoneness] = useState(0);
  const [isCooking, setIsCooking] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Vegetable elements with custom high-fidelity SVG drawings
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "wortel",
      name: "Wortel",
      color: "bg-orange-500",
      isPlaced: false,
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          {/* Carrot Root */}
          <path d="M12 44 C 18 50, 42 26, 48 20 C 52 16, 48 12, 44 12 C 38 12, 14 38, 12 44 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          {/* Ridges */}
          <path d="M22 36 L26 38 M28 30 L32 32 M34 24 L38 26" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M48 20 C 54 16, 56 8, 54 6 C 48 8, 48 14, 46 16" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 12 C 48 8, 46 2, 42 4 C 40 8, 42 12, 44 12" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "tauge",
      name: "Tauge",
      color: "bg-yellow-100",
      isPlaced: false,
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          {/* Sprout Tail */}
          <path d="M20 44 C 24 38, 30 36, 38 28 C 42 24, 44 18, 42 12" fill="none" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          {/* Yellow Head */}
          <path d="M38 14 C 36 10, 42 6, 44 10 C 46 12, 42 16, 38 14 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Rootlet */}
          <path d="M20 44 C 18 46, 19 48, 17 49" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "kacang",
      name: "Kacang Panjang",
      color: "bg-green-600",
      isPlaced: false,
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          {/* Long green beans curled */}
          <path d="M12 28 C 16 12, 48 12, 52 28 C 54 40, 40 52, 28 52 C 16 52, 14 44, 20 38" fill="none" stroke="#166534" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M16 28 C 19 16, 45 16, 48 28 C 50 38, 38 48, 28 48" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "kentang",
      name: "Kentang",
      color: "bg-amber-600",
      isPlaced: false,
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          {/* Potato Body */}
          <path d="M14 36 C 12 24, 26 14, 38 16 C 50 18, 52 30, 48 40 C 44 48, 20 48, 14 36 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          {/* Eyes/Dots */}
          <circle cx="24" cy="26" r="1.5" fill="#78350f" />
          <circle cx="38" cy="24" r="1.5" fill="#78350f" />
          <circle cx="32" cy="38" r="1.5" fill="#78350f" />
          <circle cx="20" cy="38" r="1.5" fill="#78350f" />
        </svg>
      )
    },
    {
      id: "bayam",
      name: "Bayam",
      color: "bg-emerald-500",
      isPlaced: false,
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12">
          {/* Spinach Leaves */}
          <path d="M32 46 L32 14 M32 26 C 24 20, 16 24, 18 34 C 19 38, 26 40, 32 42 C 38 40, 45 38, 46 34 C 48 24, 40 20, 32 26" fill="#10b981" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 14 C 26 6, 12 10, 16 22 C 20 28, 28 32, 32 34 C 36 32, 44 28, 48 22 C 52 10, 38 6, 32 14 Z" fill="#059669" stroke="#047857" strokeWidth="2" />
        </svg>
      )
    }
  ]);

  // Handle ingredient drag/drop triggers
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
  };

  const handleDropOnPot = () => {
    if (!activeDragId || isPaused) return;

    setIngredients((prev) =>
      prev.map((ing) => (ing.id === activeDragId ? { ...ing, isPlaced: true } : ing))
    );
    setActiveDragId(null);
  };

  // Check if all ingredients have been placed inside the pot
  const allPlaced = ingredients.every((ing) => ing.isPlaced);

  useEffect(() => {
    if (allPlaced && !isCooking && !isFinished) {
      setIsCooking(true);
    }
  }, [allPlaced, isCooking, isFinished]);

  // Doneness simulation timer loop
  useEffect(() => {
    let interval: any;
    if (isCooking && doneness < 100 && !isPaused) {
      interval = setInterval(() => {
        setDoneness((prev) => {
          const next = prev + 4; // Increases doneness
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

  // Reset function to play step again
  const handleRestart = () => {
    setDoneness(0);
    setIsCooking(false);
    setIsFinished(false);
    setIngredients((prev) => prev.map((ing) => ({ ...ing, isPlaced: false })));
  };

  return (
    <div className="min-h-screen bg-[#140b08] dark:bg-[#070302] text-white pt-10 md:pt-16 pb-20 relative overflow-hidden transition-colors duration-500">
      
      {/* Background decoration - subtle bamboo lattice pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#854d0e_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col min-h-[85vh] justify-between">
        
        {/* ================= HEADER GAME ================= */}
        <header className="flex justify-between items-center bg-white/5 dark:bg-white/5 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-md text-white">
          {/* Kiri: Tombol Back, Nyawa & Skor */}
          <div className="flex items-center gap-4">
            <Link 
              href="/mainkan"
              className="px-3 py-2 bg-white/5 hover:bg-gold hover:text-black border border-white/10 rounded-xl transition-all flex items-center gap-1.5 font-bold text-xs uppercase"
            >
              <ArrowLeft size={14} /> Keluar Game
            </Link>
            <div className="flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  size={15} 
                  className={i < lives ? "text-red-500 fill-red-500 animate-pulse" : "text-white/20"} 
                />
              ))}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[9px] uppercase tracking-wider text-white/50 block leading-none">Skor</span>
              <span className="text-sm font-extrabold text-gold leading-none">{score}</span>
            </div>
          </div>

          {/* Tengah: Nama makanan, step progress */}
          <div className="flex-grow text-center max-w-xs mx-4">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gold tracking-wider mb-1">
              <span>Gado-Gado</span>
              <span>Step {step} dari 5</span>
            </div>
            {/* Progress Bar Step */}
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <div 
                className="h-full bg-gold rounded-full transition-all duration-500" 
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Kanan: Tombol Pause */}
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2.5 bg-white/5 hover:bg-gold hover:text-black border border-white/10 rounded-xl transition-all"
          >
            {isPaused ? <Play size={14} className="fill-current" /> : <Pause size={14} className="fill-current" />}
          </button>
        </header>

        {/* ================= AREA ORDER / INSTRUKSI (ATAS TENGAH) ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
          {/* Box Instruksi */}
          <div className="md:col-span-8 bg-white text-black p-4 rounded-2xl flex items-center gap-4 shadow-xl border border-amber-200">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
              <ChefHat size={20} />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 block">Instruksi Koki</span>
              <h2 className="text-sm md:text-base font-extrabold">Rebus sayuran hingga matang!</h2>
            </div>
          </div>

          {/* Box Target Hasil */}
          <div className="md:col-span-4 bg-amber-950/40 border border-amber-500/20 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm">
            <div className="w-12 h-12 bg-black/30 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center shrink-0">
              {/* Target result: boiled layout */}
              <svg viewBox="0 0 64 64" className="w-9 h-9">
                <path d="M12 48 C 12 36, 52 36, 52 48 Z" fill="#166534" opacity="0.6" />
                <path d="M22 42 C 26 38, 38 38, 42 42" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="32" cy="46" r="3.5" fill="#d97706" />
                <path d="M24 48 C 26 44, 38 44, 40 48" stroke="#10b981" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-[8px] font-bold uppercase tracking-widest text-gold block">Target Hasil</span>
              <span className="text-[11px] font-semibold text-white/80 block leading-tight">Sayur Rebus Matang</span>
            </div>
          </div>
        </section>

        {/* ================= AREA MEMASAK UTAMA (TENGAH) ================= */}
        <section className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 py-8">
          
          {/* Interactive Cooking Zone */}
          <div className="relative flex flex-col items-center">
            
            {/* Traditional Clay Pot (Panci Kuali) on Traditional Clay Stove (Tungku) */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnPot}
              onClick={activeDragId ? handleDropOnPot : undefined}
              className={`relative cursor-pointer transition-all duration-300 ${
                activeDragId ? "scale-105 ring-2 ring-gold/40 rounded-full" : ""
              }`}
            >
              {/* Boiling steam clouds */}
              {isCooking && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                  <motion.div animate={{ y: [-10, -40], opacity: [0, 0.8, 0], scale: [1, 1.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }} className="w-5 h-5 bg-white/20 rounded-full blur-sm" />
                  <motion.div animate={{ y: [-10, -40], opacity: [0, 0.8, 0], scale: [1, 1.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="w-6 h-6 bg-white/25 rounded-full blur-sm" />
                  <motion.div animate={{ y: [-10, -40], opacity: [0, 0.8, 0], scale: [1, 1.4] }} transition={{ repeat: Infinity, duration: 2, delay: 1.2 }} className="w-4 h-4 bg-white/15 rounded-full blur-sm" />
                </div>
              )}

              {/* traditional pot overlay details (inside boiling veggies) */}
              <div className="absolute inset-x-6 top-6 bottom-16 z-20 flex flex-wrap gap-1.5 items-center justify-center p-4 pointer-events-none">
                {ingredients.filter(ing => ing.isPlaced).map((ing) => (
                  <motion.div 
                    key={ing.id}
                    initial={{ scale: 0, y: -20, rotate: Math.random() * 360 }}
                    animate={isCooking ? {
                      scale: 0.9,
                      y: [0, -4, 2, -2, 0],
                      rotate: [0, 5, -5, 0],
                    } : { scale: 0.9, y: 0 }}
                    transition={isCooking ? {
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      ease: "easeInOut"
                    } : {}}
                    className="w-8 h-8 flex items-center justify-center bg-black/20 rounded-full p-1"
                  >
                    {ing.svgIcon}
                  </motion.div>
                ))}
              </div>

              {/* The Traditional Black Pot Drawing */}
              <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] relative z-10">
                {/* Handles */}
                <path d="M25 50 C 5 50, 5 70, 25 70 Z" fill="#2d1a12" stroke="#1c100b" strokeWidth="3" />
                <path d="M215 50 C 235 50, 235 70, 215 70 Z" fill="#2d1a12" stroke="#1c100b" strokeWidth="3" />
                
                {/* Boiling Water (Inner Surface) */}
                <ellipse cx="120" cy="55" rx="90" ry="20" fill={allPlaced ? "#166534" : "#a8a29e"} className="transition-colors duration-1000" />
                {isCooking && (
                  <>
                    {/* Boiling water bubbles */}
                    <circle cx="70" cy="52" r="3" fill="#ffffff" opacity="0.6" />
                    <circle cx="100" cy="56" r="4.5" fill="#ffffff" opacity="0.7" />
                    <circle cx="140" cy="48" r="2.5" fill="#ffffff" opacity="0.6" />
                    <circle cx="170" cy="54" r="3.5" fill="#ffffff" opacity="0.8" />
                    <circle cx="120" cy="52" r="4" fill="#ffffff" opacity="0.5" />
                  </>
                )}

                {/* Pot Rim */}
                <ellipse cx="120" cy="50" rx="95" ry="12" fill="#44403c" stroke="#1c1917" strokeWidth="2.5" />
                
                {/* Pot Belly */}
                <path d="M25 50 C 25 105, 55 135, 120 135 C 185 135, 215 105, 215 50 Z" fill="#292524" stroke="#1c1917" strokeWidth="3" />
                {/* Ashy soot marks */}
                <path d="M50 110 C 80 130, 160 130, 190 110 C 150 120, 90 120, 50 110 Z" fill="#171717" />
              </svg>

              {/* The Clay Stove (Tungku Tanah Liat) */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-0">
                <svg width="180" height="100" viewBox="0 0 180 100">
                  {/* Stove Body */}
                  <path d="M10 90 L170 90 L150 10 L30 10 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
                  {/* Soot Cave Chamber */}
                  <path d="M50 90 C 50 45, 130 45, 130 90 Z" fill="#270e00" stroke="#451a03" strokeWidth="2" />
                  {/* Ash Bed */}
                  <ellipse cx="90" cy="85" rx="35" ry="8" fill="#52525b" />
                </svg>

                {/* Fire Animation */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none">
                  {/* Active bright fire flames */}
                  <motion.div 
                    animate={isCooking ? {
                      scale: [1, 1.25, 0.95, 1.15, 1],
                      y: [0, -8, 2, -5, 0],
                    } : {
                      scale: [1, 1.08, 0.95, 1.03, 1],
                      y: 0
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-orange-500 drop-shadow-[0_-5px_10px_rgba(249,115,22,0.8)]"
                  >
                    <Flame size={isCooking ? 52 : 36} className="fill-current text-orange-500" />
                  </motion.div>
                  <motion.div 
                    animate={isCooking ? {
                      scale: [1, 1.4, 0.9, 1.2, 1],
                      y: [0, -12, 1, -6, 0],
                    } : {
                      scale: [1, 1.05, 0.95, 1],
                      y: 0
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                    className="absolute text-yellow-400 opacity-90 scale-75"
                  >
                    <Flame size={isCooking ? 44 : 28} className="fill-current" />
                  </motion.div>
                </div>
              </div>

            </div>

            {/* Click-to-Add message on Mobile/Tablet */}
            <span className="text-[10px] text-white/40 block mt-12 text-center pointer-events-none">
              * Seret bahan ke dalam panci atau klik bahan untuk memasukkannya
            </span>
          </div>

          {/* Temperature/Doneness Progress Bar Gauge (Right Side) */}
          <div className="flex flex-col items-center bg-black/30 border border-white/10 p-5 rounded-2xl w-44 shrink-0 text-center backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold mb-3 block">
              Indikator Kematangan
            </span>
            
            {/* Thermometer scale body */}
            <div className="relative w-7 h-48 bg-black/40 rounded-full border border-white/10 flex flex-col justify-end p-[2px] overflow-hidden shadow-inner">
              <div 
                className={`w-full rounded-full transition-all duration-300 ${
                  doneness >= 100 
                    ? "bg-green-500" 
                    : doneness > 50 
                      ? "bg-yellow-500" 
                      : "bg-orange-500"
                }`}
                style={{ height: `${doneness}%` }}
              />
              
              {/* Small temperature tick markings */}
              <div className="absolute inset-y-4 right-1.5 flex flex-col justify-between opacity-30 text-[8px] font-mono pointer-events-none">
                <span>- 100°C</span>
                <span>- 75°C</span>
                <span>- 50°C</span>
                <span>- 25°C</span>
              </div>
            </div>

            <span className="text-xl font-black mt-4 font-mono text-gold">
              {doneness}%
            </span>
            <span className="text-[9px] uppercase font-bold text-white/50 mt-1">
              {isCooking ? "Merebus..." : isFinished ? "Sempurna!" : "Belum Dimasak"}
            </span>

            {isFinished && (
              <button 
                onClick={handleRestart}
                className="mt-3 p-1.5 bg-white/10 hover:bg-gold hover:text-black rounded-lg transition-all text-xs font-bold flex items-center gap-1"
              >
                <RotateCw size={12} /> Ulangi
              </button>
            )}
          </div>

        </section>

        {/* ================= AREA BAHAN (TRAY KAYU BAWAH) ================= */}
        <section className="bg-[#5c3a21] border-4 border-[#3e2723] rounded-3xl p-6 shadow-2xl relative">
          
          {/* Wood Tray Texture Label */}
          <div className="absolute -top-3.5 left-6 bg-[#3e2723] border border-amber-500/20 px-4 py-1 rounded-full">
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-gold flex items-center gap-1">
              <UtensilsCrossed size={10} /> Tampah Sayuran Mentah
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3 md:gap-4 mt-2">
            {ingredients.map((ing) => {
              return (
                <div key={ing.id} className="flex flex-col items-center">
                  <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.8}
                    onDragStart={() => handleDragStart(ing.id)}
                    onDragEnd={handleDropOnPot}
                    onClick={() => {
                      if (!ing.isPlaced && !isPaused) {
                        setIngredients((prev) =>
                          prev.map((i) => (i.id === ing.id ? { ...i, isPlaced: true } : i))
                        );
                      }
                    }}
                    whileDrag={{ scale: 1.15, zIndex: 50 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center relative cursor-grab active:cursor-grabbing transition-all select-none shadow-md ${
                      ing.isPlaced 
                        ? "bg-black/40 border border-white/5 opacity-20 pointer-events-none" 
                        : "bg-amber-900/30 border border-amber-500/10 hover:border-gold hover:bg-amber-900/50"
                    }`}
                  >
                    {ing.svgIcon}
                  </motion.div>
                  
                  <span className="text-[10px] font-bold text-white/70 mt-2 text-center">
                    {ing.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= CONTROLS & TRIVIA (PALING BAWAH) ================= */}
        <footer className="mt-8 flex flex-col gap-4 items-center">
          
          {/* Next Button or Lanjut ke Step 2 */}
          <Link
            href="/mainkan" // Redirect to play hub or keep here for demo
            onClick={(e) => {
              if (!isFinished) e.preventDefault();
            }}
            className={`w-full max-w-md py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md ${
              isFinished 
                ? "bg-gold text-black hover:bg-amber-500 shadow-gold/20" 
                : "bg-white/10 text-white/30 border border-white/5 pointer-events-none cursor-not-allowed"
            }`}
          >
            Lanjut ke Step 2 <ChevronRight size={14} />
          </Link>

          {/* Educational Trivia Box */}
          <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl max-w-xl text-center flex items-start gap-2.5">
            <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
            <p className="text-[10.5px] text-amber-200/90 leading-relaxed font-medium">
              &ldquo;Dalam resep tradisional, sayuran direbus tidak terlalu lama agar tetap renyah dan kandungan vitamin serta gizinya tetap terjaga dengan utuh.&rdquo;
            </p>
          </div>

        </footer>

      </div>

    </div>
  );
}
