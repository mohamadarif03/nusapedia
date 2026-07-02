"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

// Web Audio API Sound Synthesizer for Angklung
class AngklungSynth {
  ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(frequency: number) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // We synthesize the sound using multiple oscillators to simulate the wooden tube chime
    // Tube 1: Fundamental Pitch (Triangle wave for hollow wooden sound)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(frequency, now);

    // Tube 2: Octave higher (representing the smaller secondary tube in an angklung)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency * 2, now);

    // Rattling wood sound (High frequency noise burst)
    const noiseNode = this.ctx.createBufferSource();
    const noiseFilter = this.ctx.createBiquadFilter();
    const noiseGain = this.ctx.createGain();
    
    // Create simple noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1; // 0.1 seconds of noise
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    noiseNode.buffer = noiseBuffer;
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 5;

    // Connect nodes
    osc1.connect(gain1);
    osc2.connect(gain2);
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    const masterGain = this.ctx.createGain();
    gain1.connect(masterGain);
    gain2.connect(masterGain);
    noiseGain.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    // Set rattle shake LFO / tremolo effect
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 14; // Shake frequency (Hz)
    lfoGain.gain.value = 0.25; // Depth of volume modulation
    
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    lfo.start(now);
    
    // ENVELOPES
    // Fundamental tube envelope
    gain1.gain.setValueAtTime(0.6, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    // Higher octave tube envelope
    gain2.gain.setValueAtTime(0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    // Noise burst envelope (wood click/shake start)
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // Master volume envelope
    masterGain.gain.setValueAtTime(0.8, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    // Start / Stop oscillators
    osc1.start(now);
    osc2.start(now);
    noiseNode.start(now);

    osc1.stop(now + 1.4);
    osc2.stop(now + 1.4);
    noiseNode.stop(now + 0.2);
    lfo.stop(now + 1.4);
  }
}

interface Note {
  name: string;
  freq: number;
  key: string;
}

const NOTES: Note[] = [
  { name: "Do", freq: 261.63, key: "C" }, // C4
  { name: "Re", freq: 293.66, key: "D" }, // D4
  { name: "Mi", freq: 329.63, key: "E" }, // E4
  { name: "Fa", freq: 349.23, key: "F" }, // F4
  { name: "Sol", freq: 392.00, key: "G" }, // G4
  { name: "La", freq: 440.00, key: "A" }, // A4
  { name: "Si", freq: 493.88, key: "B" }, // B4
  { name: "Do'", freq: 523.25, key: "C'" } // C5
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
  const synthRef = useRef<AngklungSynth | null>(null);
  const [mode, setMode] = useState<"bebas" | "lagu">("bebas");
  const [selectedSongIdx, setSelectedSongIdx] = useState<number>(0);
  const [currentSongStep, setCurrentSongStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shakingIdx, setShakingIdx] = useState<number | null>(null);

  // Initialize synth safely on client
  useEffect(() => {
    synthRef.current = new AngklungSynth();
  }, []);

  const playNote = (index: number) => {
    if (!synthRef.current) return;
    
    // Play sound
    synthRef.current.playNote(NOTES[index].freq);
    
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

        {/* Play Area: The Angklungs Row */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 mb-16 flex flex-col justify-center items-center shadow-inner relative min-h-[400px]">
          
          {/* Angklung hanger horizontal beam */}
          <div className="absolute top-10 inset-x-8 h-2 bg-amber-900/60 dark:bg-amber-950/60 rounded-full border-b border-white/5 shadow-inner" />
          
          <div className="flex gap-4 md:gap-8 items-end justify-center w-full mt-10">
            {NOTES.map((note, index) => {
              const isShaking = shakingIdx === index;
              const isTarget = targetNoteIdx === index;
              
              // Scale height based on frequency (lower frequency = taller angklung)
              const scaleHeight = 220 - index * 14;

              return (
                <div key={note.name} className="flex flex-col items-center">
                  
                  {/* The Angklung Tube Unit */}
                  <motion.div
                    onClick={() => playNote(index)}
                    animate={isShaking ? { rotate: [0, -10, 8, -6, 4, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    style={{ height: `${scaleHeight}px` }}
                    className={`relative w-11 md:w-14 rounded-t-lg cursor-pointer flex justify-center group transition-colors duration-300 ${
                      isTarget 
                        ? "bg-gradient-to-t from-gold/50 to-gold/20 border-2 border-gold shadow-lg shadow-gold/20" 
                        : "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    
                    {/* Hanging rope loop */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-amber-900/50" />
                    
                    {/* Inner wood frame poles (two vertical tubes) */}
                    <div className="absolute left-[25%] bottom-0 w-2.5 bg-amber-800 dark:bg-amber-900 rounded-full shadow-inner h-[85%]" />
                    <div className="absolute right-[25%] bottom-0 w-3 bg-amber-800 dark:bg-amber-900 rounded-full shadow-inner h-full" />
                    
                    {/* Horizontal connector bar */}
                    <div className="absolute bottom-[30%] inset-x-1.5 h-2 bg-amber-700 dark:bg-amber-800 rounded-sm border-t border-b border-black/10" />

                    {/* Glowing target circle in game mode */}
                    {isTarget && (
                      <span className="absolute top-[40%] text-sm select-none animate-ping text-gold pointer-events-none opacity-70">
                        🌟
                      </span>
                    )}

                  </motion.div>

                  {/* Note Label underneath */}
                  <button
                    onClick={() => playNote(index)}
                    className={`mt-4 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      isTarget
                        ? "bg-gold text-black shadow-md shadow-gold/20 scale-115"
                        : "bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black"
                    }`}
                  >
                    {note.name}
                    <span className="text-[9px] font-normal block opacity-60">{note.key}</span>
                  </button>

                </div>
              );
            })}
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
