"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map, 
  Heart, 
  Trophy, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { cultures } from "@/data/cultures";

interface PuzzleItem {
  id: string;
  name: string;
  image: string;
  province: string;
  fact: string;
}

export default function TebakKerajinanPage() {
  const [questions, setQuestions] = useState<PuzzleItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctFact, setCorrectFact] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [highScore, setHighScore] = useState(0);

  // Helper to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Extract all unique provinces from data
  const allProvinces = Array.from(new Set(cultures.map((c) => c.province)));

  // Generate dynamic multiple choice options (1 correct + 5 random distractors)
  const generateOptions = (correctProvince: string) => {
    const distractors = allProvinces.filter((p) => p !== correctProvince);
    const shuffledDistractors = shuffleArray(distractors);
    const selectedDistractors = shuffledDistractors.slice(0, 5);
    const rawOptions = [correctProvince, ...selectedDistractors];
    return shuffleArray(rawOptions);
  };

  // Initialize the game
  useEffect(() => {
    const ALL_ITEMS: PuzzleItem[] = cultures.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      province: c.province,
      fact: c.description
    }));

    const shuffled = shuffleArray(ALL_ITEMS);
    setQuestions(shuffled);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0].province));
    }

    const saved = localStorage.getItem("tebak_asal_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center pt-32">
        <div className="text-center">
          <RefreshCw className="animate-spin text-gold mx-auto mb-4" size={32} />
          <p className="text-sm font-medium">Menyiapkan Kuis Kebudayaan...</p>
        </div>
      </div>
    );
  }

  const currentItem = questions[currentIdx];

  const handleSelectProvince = (prov: string) => {
    if (feedback || gameFinished) return;
    setSelectedProvince(prov);

    if (prov === currentItem.province) {
      setFeedback("correct");
      const newScore = score + 10;
      setScore(newScore);
      setCorrectFact(currentItem.fact);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("tebak_asal_highscore", newScore.toString());
      }
    } else {
      setFeedback("wrong");
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setTimeout(() => {
            setGameFinished(true);
          }, 1500);
        }
        return newLives;
      });

      // Reset selection after a short delay so they can try again if lives remain
      setTimeout(() => {
        setFeedback(null);
        setSelectedProvince(null);
      }, 1500);
    }
  };

  const handleNextStep = () => {
    setFeedback(null);
    setSelectedProvince(null);
    setCorrectFact(null);

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setOptions(generateOptions(questions[nextIdx].province));
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    const ALL_ITEMS: PuzzleItem[] = cultures.map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      province: c.province,
      fact: c.description
    }));

    const shuffled = shuffleArray(ALL_ITEMS);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setLives(3);
    setGameFinished(false);
    setSelectedProvince(null);
    setFeedback(null);
    setCorrectFact(null);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0].province));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <nav className="flex text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/mainkan" className="hover:text-amber-500 transition-colors">Mainkan</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Tebak Asal Kerajinan</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Map className="text-gold" size={28} /> Tebak Asal Kebudayaan
            </h1>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2">
              Uji wawasan Anda dengan menebak asal provinsi dari berbagai mahakarya seni, kuliner, dan kriya tradisional Nusantara.
            </p>
          </div>
          
          {/* Game Stats */}
          <div className="flex items-center gap-6 bg-black/5 dark:bg-white/5 px-6 py-3 rounded-2xl border border-black/10 dark:border-white/10 self-start md:self-auto">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Skor</span>
              <span className="text-base font-extrabold text-gold">{score}</span>
            </div>
            <div className="h-8 w-px bg-black/10 dark:border-white/10" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Highscore</span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">{highScore}</span>
            </div>
            <div className="h-8 w-px bg-black/10 dark:border-white/10" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Nyawa</span>
              <span className="text-base font-bold flex items-center gap-0.5 mt-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    size={14} 
                    className={i < lives ? "text-red-500 fill-red-500 animate-pulse" : "text-black/20 dark:text-white/20"} 
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interface Layout */}
      <div className="max-w-6xl mx-auto px-6">
        
        {!gameFinished ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Craft card stack (col-span-5) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl relative overflow-hidden">
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block mb-1">
                    Soal Ke-{currentIdx + 1} dari {questions.length}
                  </span>
                  <h3 className="text-xl font-bold">Tebak Asal Daerah</h3>
                </div>

                {/* Main Card */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10 shadow-lg">
                  <img 
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1 block">Nama Karya</span>
                    <h4 className="text-2xl font-bold text-white">{currentItem.name}</h4>
                  </div>
                </div>

                {/* Feedback popups */}
                <AnimatePresence>
                  {feedback === "wrong" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-500/15 backdrop-blur-sm flex flex-col items-center justify-center text-red-500 font-bold uppercase z-20 text-center p-6"
                    >
                      <XCircle size={48} className="text-red-500 mb-2 animate-bounce" />
                      <span className="text-xl font-extrabold tracking-wide">Pilihan Salah!</span>
                      <span className="text-xs normal-case font-normal text-red-700 dark:text-red-300 mt-2 max-w-xs leading-relaxed">
                        Sayang sekali, itu bukan asal provinsi yang tepat. Nyawa Anda berkurang 1. Coba lagi!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Back Link */}
              <Link 
                href="/mainkan"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors"
              >
                <ArrowLeft size={12} /> Kembali ke Mainkan
              </Link>

            </div>

            {/* Right Side: Map drop zone buttons (col-span-7) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* Fact Card panel */}
              {correctFact ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/5 border border-green-500/20 rounded-3xl p-6 flex flex-col gap-4 text-center md:text-left"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Sparkles size={32} className="text-green-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 justify-center md:justify-start">
                        <CheckCircle2 size={16} /> JAWABAN BENAR!
                      </h4>
                      <p className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 mt-1">
                        {currentItem.name} berasal dari provinsi <span className="text-black dark:text-white font-extrabold">{currentItem.province}</span>
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs md:text-sm text-green-800 dark:text-green-200 leading-relaxed italic mt-2 border-t border-green-500/10 pt-3">
                    &ldquo;{correctFact}&rdquo;
                  </p>

                  <button
                    onClick={handleNextStep}
                    className="w-full mt-2 py-3 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md shadow-green-500/20 flex items-center justify-center gap-1.5"
                  >
                    Lanjutkan <ChevronRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-6">
                    Pilih Provinsi Asal yang Tepat:
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {options.map((prov) => {
                      const isWrongChoice = selectedProvince === prov && feedback === "wrong";
                      const isCorrectChoice = selectedProvince === prov && feedback === "correct";

                      return (
                        <button
                          key={prov}
                          onClick={() => handleSelectProvince(prov)}
                          className={`w-full py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider border text-left flex justify-between items-center transition-all ${
                            isCorrectChoice 
                              ? "bg-green-500/10 border-green-500 text-green-500 shadow-md shadow-green-500/10" 
                              : isWrongChoice
                                ? "bg-red-500/10 border-red-500 text-red-500 shadow-md shadow-red-500/10 scale-95"
                                : "bg-white dark:bg-black border-black/10 dark:border-white/10 hover:border-gold dark:hover:border-gold hover:text-gold dark:hover:text-gold"
                          }`}
                        >
                          <span>{prov}</span>
                          {isCorrectChoice && <CheckCircle2 size={14} className="text-green-500" />}
                          {isWrongChoice && <XCircle size={14} className="text-red-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>
        ) : (
          /* Game Finished Results Sheet */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 text-center shadow-xl flex flex-col items-center gap-6"
          >
            {lives > 0 ? (
              <Trophy size={64} className="text-gold animate-bounce" />
            ) : (
              <XCircle size={64} className="text-red-500 animate-pulse" />
            )}
            <div>
              <h2 className="text-3xl font-extrabold">Permainan Selesai!</h2>
              <p className="text-sm text-black/50 dark:text-white/50 mt-2">
                {lives > 0 
                  ? `Luar biasa! Anda berhasil menebak semua ${questions.length} kebudayaan tanpa kalah! Anda adalah Empu Kebudayaan Nusantara sejati.` 
                  : "Sayang sekali nyawa Anda sudah habis. Jangan menyerah, mari asah wawasan Anda dan coba lagi!"}
              </p>
            </div>

            {/* Score Summary Sheet */}
            <div className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl flex justify-around items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block">Tebakan Benar</span>
                <span className="text-2xl font-extrabold text-gold">{score / 10} / {questions.length}</span>
              </div>
              <div className="h-10 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block">Total Skor</span>
                <span className="text-2xl font-extrabold text-gold">{score}</span>
              </div>
              <div className="h-10 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block">Highscore</span>
                <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{highScore}</span>
              </div>
            </div>

            {/* Reset CTA */}
            <button
              onClick={restartGame}
              className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black transition-all flex items-center gap-2 shadow"
            >
              <RefreshCw size={14} /> Main Lagi
            </button>
          </motion.div>
        )}

      </div>

    </div>
  );
}
