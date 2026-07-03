"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

// Paths to the custom physical audio assets
const AUDIO_PATHS = [
  "/suara-angklung/do.mp3",
  "/suara-angklung/re.m4a",
  "/suara-angklung/mi.m4a",
  "/suara-angklung/fa.m4a",
  "/suara-angklung/so.m4a",
  "/suara-angklung/la.m4a",
  "/suara-angklung/si.m4a",
  "/suara-angklung/do'.m4a"
];

interface Note {
  name: string;
  key: string;
}

const NOTES: Note[] = [
  { name: "Do", key: "C" }, // C4
  { name: "Re", key: "D" }, // D4
  { name: "Mi", key: "E" }, // E4
  { name: "Fa", key: "F" }, // F4
  { name: "Sol", key: "G" }, // G4 (so.m4a)
  { name: "La", key: "A" }, // A4
  { name: "Si", key: "B" }, // B4
  { name: "Do'", key: "C'" } // C5 (do'.m4a)
];

interface Song {
  title: string;
  notes: number[]; // index of NOTES
  duration: number[]; // beat duration relative
}

const SONGS: Song[] = [
  {
    title: "Suwe Ora Jamu",
    notes: [2, 2, 4, 5, 6, 7, 6, 4, 2, 3, 2, 0, 1, 2, 2],
    duration: [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2]
  },
  {
    title: "Burung Kakak Tua",
    notes: [4, 4, 6, 5, 4, 2, 4, 3, 2, 0, 2, 1, 0, 4, 4],
    duration: [1, 1, 1.5, 0.5, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2]
  },
  {
    title: "Gundul Pacul",
    notes: [0, 2, 0, 2, 3, 4, 4, 5, 5, 5, 4, 3, 4, 3, 0],
    duration: [1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2]
  },
  {
    title: "Ampar-Ampar Pisang",
    notes: [4, 4, 5, 6, 7, 6, 5, 4, 5, 5, 6, 4, 4, 5, 6],
    duration: [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2]
  }
];

export default function AngklungGamePage() {
  const audioPlayersRef = useRef<HTMLAudioElement[]>([]);
  const [mode, setMode] = useState<"bebas" | "lagu">("bebas");
  const [selectedSongIdx, setSelectedSongIdx] = useState<number>(0);
  const [currentSongStep, setCurrentSongStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shakingIdx, setShakingIdx] = useState<number | null>(null);

  // Initialize audio players on client
  useEffect(() => {
    audioPlayersRef.current = AUDIO_PATHS.map((path) => {
      const audio = new Audio(path);
      audio.preload = "auto";
      return audio;
    });
  }, []);



  const playNote = (index: number) => {
    // Stop all other playing audios so they do not overlap
    audioPlayersRef.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Play the selected note
    const currentAudio = audioPlayersRef.current[index];
    if (currentAudio) {
      currentAudio.play().catch((err) => console.log("Audio play error:", err));
    }
    
    // Trigger shake animation
    setShakingIdx(index);
    setTimeout(() => {
      setShakingIdx(null);
    }, 300);

    // If game mode is "Ikuti Lagu"
    if (mode === "lagu") {
      const currentSong = SONGS[selectedSongIdx];
      const targetNoteIdx = currentSong.notes[currentSongStep];
      
      if (index === targetNoteIdx) {
        setScore((s) => s + 10);
        setFeedback("correct");
        
        // Go to next step or loops
        if (currentSongStep < currentSong.notes.length - 1) {
          setCurrentSongStep((s) => s + 1);
        } else {
          // Finished song!
          alert(`Selamat! Kamu menyelesaikan lagu "${currentSong.title}" dengan skor ${score + 10}!`);
          setCurrentSongStep(0);
          setScore(0);
        }
      } else {
        setFeedback("wrong");
        setScore((s) => Math.max(0, s - 5));
      }

      // Clear feedback after 600ms
      setTimeout(() => {
        setFeedback(null);
      }, 600);
    }
  };

  const playNoteRef = useRef(playNote);
  useEffect(() => {
    playNoteRef.current = playNote;
  });

  // Listen to keyboard shortcuts on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if the user is typing in the mobile keyboard input
      if (document.activeElement?.tagName === "INPUT") {
        return;
      }
      
      const key = e.key.toLowerCase();
      const map: Record<string, number> = {
        "1": 0, "c": 0,
        "2": 1, "d": 1,
        "3": 2, "e": 2,
        "4": 3, "f": 3,
        "5": 4, "g": 4,
        "6": 5, "a": 5,
        "7": 6, "b": 6,
        "8": 7, "h": 7
      };
      if (map[key] !== undefined) {
        e.preventDefault();
        playNoteRef.current(map[key]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleModeChange = (newMode: "bebas" | "lagu") => {
    setMode(newMode);
    setCurrentSongStep(0);
    setScore(0);
  };

  const handleSongChange = (idx: number) => {
    setSelectedSongIdx(idx);
    setCurrentSongStep(0);
    setScore(0);
  };

  const currentSong = SONGS[selectedSongIdx];
  const targetNoteIdx = mode === "lagu" ? currentSong.notes[currentSongStep] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header & Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <nav className="flex text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/mainkan" className="hover:text-amber-500 transition-colors">Mainkan</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Angklung Virtual</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              🌾 Angklung Virtual
            </h1>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2">
              Klik bilah bambu angklung untuk memainkan nadanya menggunakan synthesizer audio real-time.
            </p>
          </div>
          
          {/* Mode Pill Toggle */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/10 dark:border-white/10 self-start md:self-auto">
            <button
              onClick={() => handleModeChange("bebas")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === "bebas" 
                  ? "bg-gold text-black shadow-md shadow-gold/20" 
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              }`}
            >
              Mode Bebas
            </button>
            <button
              onClick={() => handleModeChange("lagu")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === "lagu" 
                  ? "bg-gold text-black shadow-md shadow-gold/20" 
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              }`}
            >
              Ikuti Lagu
            </button>
          </div>
        </div>
      </div>

      {/* Game Area Container */}
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Info Instruction Banner */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 mb-8 flex gap-4 items-start">
          <span className="text-lg">ℹ️</span>
          <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            {mode === "bebas" 
              ? "Klik atau ketuk salah satu tabung angklung di bawah untuk membunyikan nadanya secara bebas. Eksplorasi melodi sesukamu!" 
              : "Di mode Ikuti Lagu, mainkan lagu daerah dengan mengklik angklung yang menyala emas. Kumpulkan skor tertinggimu!"}
          </p>
        </div>

        {/* Interactive Mode Control Bar */}
        {mode === "lagu" && (
          <div className="flex flex-col sm:flex-row justify-between items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl mb-8 gap-4">
            
            {/* Song Picker */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs uppercase tracking-wider font-bold text-black/50 dark:text-white/50">Pilih Lagu:</span>
              <select
                value={selectedSongIdx}
                onChange={(e) => handleSongChange(Number(e.target.value))}
                className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {SONGS.map((song, idx) => (
                  <option key={song.title} value={idx}>{song.title}</option>
                ))}
              </select>
            </div>

            {/* Score & Step Guide */}
            <div className="flex items-center gap-6 justify-between w-full sm:w-auto">
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Langkah</span>
                <span className="text-sm font-bold">{currentSongStep + 1} / {currentSong.notes.length}</span>
              </div>
              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block">Skor</span>
                <span className="text-sm font-extrabold text-gold">{score}</span>
              </div>
            </div>

          </div>
        )}

        {/* Melody Sheet Music Guide Visual */}
        {mode === "lagu" && (
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl mb-12 flex flex-col items-center justify-center min-h-[90px] relative overflow-hidden">
            <span className="text-[9px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40 mb-3 block">Partitur Melodi</span>
            
            {/* Note steps row */}
            <div className="flex gap-2.5 overflow-x-auto max-w-full pb-2 scrollbar-hide">
              {currentSong.notes.map((noteIdx, stepIdx) => {
                const isActive = stepIdx === currentSongStep;
                const isPassed = stepIdx < currentSongStep;
                return (
                  <div 
                    key={stepIdx}
                    className={`flex flex-col items-center justify-center w-11 h-14 rounded-xl border text-xs font-bold uppercase transition-all ${
                      isActive 
                        ? "bg-gold text-black border-gold scale-110 shadow-lg shadow-gold/20" 
                        : isPassed
                          ? "bg-black/10 dark:bg-white/10 text-black/30 dark:text-white/30 border-transparent"
                          : "bg-white dark:bg-black text-black/60 dark:text-white/60 border-black/10 dark:border-white/10"
                    }`}
                  >
                    <span>{NOTES[noteIdx].name}</span>
                    <span className="text-[8px] font-normal opacity-70 mt-1">{NOTES[noteIdx].key}</span>
                  </div>
                );
              })}
            </div>

            {/* Answer Feedback Popup overlay */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm text-lg font-bold uppercase ${
                    feedback === "correct" ? "text-green-500 bg-green-500/5" : "text-red-500 bg-red-500/5"
                  }`}
                >
                  {feedback === "correct" ? "✨ Benar!" : "❌ Salah"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Play Area: The physical Angklung Rack (8 Scaled Instruments) */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10 mb-16 flex flex-col justify-center items-center shadow-inner relative min-h-[460px] overflow-hidden">
          
          {/* Angklung rack hanging horizontal beam */}
          <div className="absolute top-10 inset-x-8 h-2 bg-amber-900/60 dark:bg-amber-950/60 rounded-full border-b border-white/5 shadow-inner z-0" />
          
          {/* Row of 8 Angklungs */}
          <div className="flex gap-2 md:gap-4 items-end justify-center w-full mt-12 mb-10 z-10">
            {NOTES.map((note, index) => {
              const isShaking = shakingIdx === index;
              const isTarget = targetNoteIdx === index;
              
              // Scale down dimensions progressively (lower note is larger, higher note is smaller)
              const widthSize = 80 - index * 5; // from 80px down to 45px
              const heightSize = 160 - index * 9; // from 160px down to 97px

              return (
                <div 
                  key={note.name} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => playNote(index)}
                >
                  {/* Hanging loop line */}
                  <div className="w-0.5 h-6 bg-amber-900/40 dark:bg-amber-950/40 -mb-1" />

                  {/* Individual Angklung Instrument */}
                  <motion.div
                    animate={isShaking ? { rotate: [0, -12, 10, -8, 5, 0], x: [0, -3, 3, -2, 2, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    style={{ width: `${widthSize}px`, height: `${heightSize}px` }}
                    className={`relative select-none transition-colors duration-300 rounded-xl p-1 ${
                      isTarget 
                        ? "bg-gold/10 border border-gold shadow-lg shadow-gold/10" 
                        : "border border-transparent"
                    }`}
                  >
                    <Image 
                      src="/angklung.png" 
                      alt={`Angklung ${note.name}`}
                      fill
                      className="object-contain"
                      priority
                    />

                    {/* Tiny target indicator glow */}
                    {isTarget && (
                      <span className="absolute -top-1 right-0 text-[10px] select-none animate-ping text-gold opacity-85">
                        🌟
                      </span>
                    )}
                  </motion.div>

                  {/* Little note tag right underneath the instrument */}
                  <span className={`text-[8px] font-bold mt-2 px-1.5 py-0.5 rounded transition-all ${
                    isTarget ? "bg-gold text-black" : "text-black/40 dark:text-white/40"
                  }`}>
                    {note.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Do Re Mi Control Buttons Underneath */}
          <div className="flex flex-wrap gap-2.5 md:gap-3 items-center justify-center w-full max-w-2xl border-t border-black/10 dark:border-white/10 pt-8">
            {NOTES.map((note, index) => {
              const isTarget = targetNoteIdx === index;
              const isPlaying = shakingIdx === index;

              return (
                <button
                  key={note.name}
                  onClick={() => playNote(index)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                    isTarget
                      ? "bg-gold text-black shadow-lg shadow-gold/20 scale-105 border border-gold font-extrabold"
                      : isPlaying
                        ? "bg-gold text-black scale-105 border border-gold"
                        : "bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-gold dark:hover:border-gold hover:text-gold dark:hover:text-gold hover:scale-105"
                  }`}
                >
                  {note.name}
                  <span className="text-[9px] font-normal block opacity-60 mt-0.5">{note.key}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Keyboard Trigger Input Helper */}
          <div className="w-full max-w-md mt-6 relative z-10">
            <input
              type="text"
              placeholder="Ketuk di sini untuk memunculkan keyboard HP..."
              onChange={(e) => {
                const val = e.target.value;
                if (val.length === 0) return;
                const char = val[val.length - 1].toLowerCase();
                const map: Record<string, number> = {
                  "1": 0, "c": 0,
                  "2": 1, "d": 1,
                  "3": 2, "e": 2,
                  "4": 3, "f": 3,
                  "5": 4, "g": 4,
                  "6": 5, "a": 5,
                  "7": 6, "b": 6,
                  "8": 7, "h": 7
                };
                if (map[char] !== undefined) {
                  playNote(map[char]);
                }
                e.target.value = "";
              }}
              className="w-full py-3 px-10 text-xs text-center border border-black/10 dark:border-white/10 bg-white dark:bg-black rounded-xl focus:outline-none focus:ring-1 focus:ring-gold font-medium uppercase placeholder-black/30 dark:placeholder-white/30"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-40">⌨️</span>
          </div>

        </div>

        {/* Back Link */}
        <Link 
          href="/mainkan"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors"
        >
          ← Kembali ke Mainkan
        </Link>

      </div>

    </div>
  );
}
