"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

interface PuzzleItem {
  id: string;
  name: string;
  image: string;
  province: string;
  fact: string;
}

const PUZZLE_ITEMS: PuzzleItem[] = [
  {
    id: "wayang",
    name: "Wayang Golek",
    image: "/culture/Miniature_Ondel-ondel_puppets_di._202607021738.jpeg", // Using Ondel-ondel as proxy if no wayang, or we can use local images
    province: "Jawa Barat",
    fact: "Wayang Golek merupakan seni pertunjukan boneka kayu khas Sunda Jawa Barat, yang cerita lakon utamanya bersumber dari kisah Ramayana dan Mahabarata."
  },
  {
    id: "sasando",
    name: "Sasando",
    image: "/culture/Sasando_musical_instrument_displ._202607021745.jpeg",
    province: "Nusa Tenggara Timur",
    fact: "Sasando adalah alat musik petik dawai tradisional dari Pulau Rote, Nusa Tenggara Timur, yang memiliki wadah resonansi terbuat dari anyaman daun lontar."
  },
  {
    id: "tifa",
    name: "Tifa",
    image: "/culture/Tifa_Papua_musical_instrument_di._202607021823.jpeg",
    province: "Papua",
    fact: "Tifa adalah alat musik pukul sejenis kendang kayu panjang berbalut kulit binatang khas Papua dan Maluku, sering dimainkan untuk tarian upacara adat."
  }
];

const TARGET_PROVINCES = [
  "Jawa Barat",
  "Nusa Tenggara Timur",
  "Papua",
  "Sumatera Barat",
  "Bali",
  "Kalimantan Selatan"
];

export default function TebakKerajinanPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctFact, setCorrectFact] = useState<string | null>(null);

  const currentItem = PUZZLE_ITEMS[currentIdx];

  const handleSelectProvince = (prov: string) => {
    if (feedback || gameFinished) return; // Wait for continue
    setSelectedProvince(prov);

    if (prov === currentItem.province) {
      setFeedback("correct");
      setScore((s) => s + 10);
      setCorrectFact(currentItem.fact);
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

      // Clear wrong choice feedback after 1.5 seconds to let them try again
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

    if (currentIdx < PUZZLE_ITEMS.length - 1) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(3);
    setGameFinished(false);
    setSelectedProvince(null);
    setFeedback(null);
    setCorrectFact(null);
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
              <Map className="text-gold" size={28} /> Tebak Asal Kerajinan
            </h1>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2">
              Cocokkan benda seni tradisional yang muncul di sebelah kiri dengan provinsi asal yang tepat di panel kanan.
            </p>
          </div>
          
          {/* Game Stats */}
          <div className="flex items-center gap-6 bg-black/5 dark:bg-white/5 px-6 py-3 rounded-2xl border border-black/10 dark:border-white/10 self-start md:self-auto">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Skor</span>
              <span className="text-base font-extrabold text-gold">{score}</span>
            </div>
            <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Kesempatan</span>
              <span className="text-base font-bold flex items-center gap-0.5 mt-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    size={14} 
                    className={i < lives ? "text-red-500 fill-red-500" : "text-black/20 dark:text-white/20"} 
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
                    Item Ke-{currentIdx + 1} dari {PUZZLE_ITEMS.length}
                  </span>
                  <h3 className="text-xl font-bold">Tebak Asal Daerah</h3>
                </div>

                {/* Main Card */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10 shadow-lg">
                  <Image 
                    src={currentItem.image}
                    alt={currentItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1 block">Benda Seni</span>
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
                      className="absolute inset-0 bg-red-500/10 backdrop-blur-sm flex flex-col items-center justify-center text-red-500 font-bold uppercase z-20 text-center p-6"
                    >
                      <XCircle size={36} className="text-red-500 mb-2" />
                      <span className="text-lg font-extrabold tracking-wide">Daerah Salah!</span>
                      <span className="text-[10px] normal-case font-normal text-red-700 dark:text-red-300 mt-2 max-w-xs leading-relaxed">
                        Kesempatan kamu berkurang satu. Coba cari kaitan sejarah atau bentuk geografisnya!
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
                    {TARGET_PROVINCES.map((prov) => {
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
              <XCircle size={64} className="text-red-500" />
            )}
            <div>
              <h2 className="text-3xl font-extrabold">Permainan Selesai!</h2>
              <p className="text-sm text-black/50 dark:text-white/50 mt-2">
                {lives > 0 
                  ? "Selamat! Kamu berhasil menuntaskan semua kuis dengan wawasan budayamu yang luar biasa." 
                  : "Sayang sekali kesempatan kamu sudah habis. Jangan berkecil hati, ayo coba lagi untuk belajar!"}
              </p>
            </div>

            {/* Score Summary Sheet */}
            <div className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-2xl flex justify-around items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block">Tebakan Benar</span>
                <span className="text-2xl font-extrabold text-gold">{score / 10} / {PUZZLE_ITEMS.length}</span>
              </div>
              <div className="h-10 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <span className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 block">Total Skor</span>
                <span className="text-2xl font-extrabold text-gold">{score}</span>
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
