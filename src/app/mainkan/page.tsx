"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Music, 
  Map, 
  Headphones, 
  Lightbulb, 
  Brain,
  ChevronRight
} from "lucide-react";

const FUN_FACTS = [
  "Tahukah kamu? Indonesia memiliki lebih dari 300 jenis kerajinan tradisional yang tersebar dari Sabang hingga Merauke.",
  "Tahukah kamu? Alat musik Angklung telah diakui oleh UNESCO sebagai Warisan Mahakarya Karya Agung Budaya Lisan dan Takbenda Warisan Manusia sejak tahun 2010.",
  "Tahukah kamu? Motif batik Parang merupakan salah satu motif batik tertua di Indonesia yang dahulu hanya boleh dikenakan oleh Raja dan Kesatria Keraton.",
  "Tahukah kamu? Noken, tas tradisional khas Papua yang dirajut dari serat kulit kayu, biasanya dibawa menggunakan dahi kepala oleh perempuan Papua.",
  "Tahukah kamu? Kapal Phinisi dibuat oleh pengrajin Bugis-Makassar tanpa menggunakan paku besi dan tanpa menggunakan gambar cetak biru (blueprint)."
];

export default function PlayHubPage() {
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    // Select a random fun fact on load
    const randomIndex = Math.floor(Math.random() * FUN_FACTS.length);
    setFunFact(FUN_FACTS[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header Halaman */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <nav className="flex justify-center text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Mainkan</span>
        </nav>
        <span className="text-gold tracking-[0.2em] uppercase text-xs mb-4 font-bold block">
          Zona Interaktif
        </span>
        <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
          Belajar Budaya Sambil Bermain
        </h1>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          Rasakan pengalaman budaya nusantara lewat permainan interaktif - dari memainkan alat musik tradisional hingga menebak asal kerajinan nusantara.
        </p>
      </div>

      {/* Grid Kartu Game */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Angklung Virtual */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="flex flex-col h-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5"
          >
            {/* Visual Illustration */}
            <div className="relative h-44 mb-8 bg-gradient-to-br from-amber-500/10 to-gold/10 rounded-2xl flex items-center justify-center overflow-hidden group">
              <motion.div 
                animate={{ rotate: [0, -3, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="filter drop-shadow-md select-none group-hover:scale-110 transition-transform duration-300 text-gold"
              >
                <Music size={56} strokeWidth={1.5} />
              </motion.div>
              {/* Subtle background waves */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">
              Alat Musik
            </span>
            <h3 className="text-2xl font-bold mb-3">Angklung Virtual</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6 flex-grow">
              Mainkan alat musik bambu tradisional Sunda. Pilih mode bebas atau ikuti melodi lagu daerah untuk mengasah insting bermusikmu.
            </p>

            <div className="flex flex-col gap-4 border-t border-black/10 dark:border-white/10 pt-6">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-black/50 dark:text-white/50 font-medium">
                  <Headphones size={14} className="text-gold" /> Butuh suara
                </span>
                <span className="px-2.5 py-1 bg-green-500/10 text-green-500 font-bold uppercase rounded-full text-[10px] tracking-wide">
                  Mudah
                </span>
              </div>
              <Link 
                href="/mainkan/angklung"
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black text-center transition-all shadow-md shadow-black/5 dark:shadow-white/5 flex items-center justify-center gap-1.5"
              >
                Mainkan <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Tebak Asal Kerajinan */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="flex flex-col h-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5"
          >
            {/* Visual Illustration */}
            <div className="relative h-44 mb-8 bg-gradient-to-br from-amber-500/10 to-gold/10 rounded-2xl flex items-center justify-center overflow-hidden group">
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="filter drop-shadow-md select-none group-hover:scale-110 transition-transform duration-300 text-gold"
              >
                <Map size={56} strokeWidth={1.5} />
              </motion.div>
              {/* Map grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)] pointer-events-none" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">
              Wawasan
            </span>
            <h3 className="text-2xl font-bold mb-3">Tebak Asal Kerajinan</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6 flex-grow">
              Cocokkan benda seni tradisional dengan daerah asalnya di peta Indonesia. Uji wawasan dan pengetahuan geografis budayamu.
            </p>

            <div className="flex flex-col gap-4 border-t border-black/10 dark:border-white/10 pt-6">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-black/50 dark:text-white/50 font-medium">
                  <Brain size={14} className="text-gold" /> Uji Otak
                </span>
                <span className="px-2.5 py-1 bg-red-500/10 text-red-500 font-bold uppercase rounded-full text-[10px] tracking-wide">
                  Menantang
                </span>
              </div>
              <Link 
                href="/mainkan/puzzle-kerajinan"
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black text-center transition-all shadow-md shadow-black/5 dark:shadow-white/5 flex items-center justify-center gap-1.5"
              >
                Mainkan <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fun Fact Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-center"
        >
          <Lightbulb size={24} className="text-gold shrink-0" />
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
            {funFact || "Memuat fakta seru nusantara..."}
          </p>
        </motion.div>
      </div>

    </div>
  );
}
