"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import IndonesiaMap from "@/components/IndonesiaMap";
import ProvinceSidePanel from "@/components/ProvinceSidePanel";
import UnescoTimeline from "@/components/UnescoTimeline";
import { cultures } from "@/data/cultures";
import { MapPin } from "lucide-react";

export default function PetaPage() {
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stampedProvinces, setStampedProvinces] = useState<string[]>([]);
  const [newStampAnimProvince, setNewStampAnimProvince] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Load stamped provinces on mount
  useEffect(() => {
    const saved = localStorage.getItem("passport_stamps");
    if (saved) {
      try {
        setStampedProvinces(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stamps", e);
      }
    } else {
      setStampedProvinces([]);
    }
  }, []);

  // Extract unique provinces that actually have cultural data
  const availableProvinces = Array.from(new Set(cultures.map(c => c.province)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Auto highlight if exact or very close match
    if (query.length > 3) {
      const match = availableProvinces.find(p => p.toLowerCase().includes(query.toLowerCase()));
      if (match) {
        handleProvinceSelect(match);
      }
    }
  };

  const handleProvinceSelect = (province: string) => {
    setActiveProvince(province);
    
    // Smooth scroll down to the detailed cultural dashboard
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleUnlockStamp = (province: string) => {
    if (!stampedProvinces.includes(province)) {
      const next = [...stampedProvinces, province];
      setStampedProvinces(next);
      localStorage.setItem("passport_stamps", JSON.stringify(next));
      
      // Trigger animation specifically for this newly visited province
      setNewStampAnimProvince(province);
      setTimeout(() => {
        setNewStampAnimProvince(null);
      }, 2000);
    }
  };

  const handleResetPassport = () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh stempel paspor Anda?")) {
      setStampedProvinces([]);
      localStorage.removeItem("passport_stamps");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white pt-28 pb-20 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10">
        <nav className="flex justify-center text-xs font-semibold tracking-widest uppercase mb-4 text-black/40 dark:text-white/40">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Peta Nusantara</span>
        </nav>
        <span className="text-amber-500 tracking-[0.25em] uppercase text-xs mb-3 font-bold block">
          Eksplorasi Kebudayaan
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-5 leading-tight font-outfit">
          Peta Interaktif Budaya
        </h1>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Klik kepulauan utama atau cari provinsi Anda untuk mendalami warisan leluhur, seni tradisional, dan musik nusantara.
        </p>
      </div>

      {/* Main Map Area (Hero Grid) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col gap-6">
          
          {/* Map Top Header & Search Control */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
            <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Menampilkan data budaya terlengkap di 34 Provinsi
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Cari provinsi (misal: Jawa Barat)..." 
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Large Map Container */}
          <div className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-zinc-950">
            <IndonesiaMap 
              activeProvince={activeProvince} 
              stampedProvinces={stampedProvinces}
              onProvinceClick={handleProvinceSelect}
              onHover={setHoveredProvince}
            />
          </div>

        </div>
      </div>

      {/* Detailed Immersive Dashboard Section Below Map */}
      <div 
        ref={dashboardRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20 scroll-mt-28"
      >
        <div className="text-center sm:text-left mb-8">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
            Dasbor Penjelajah
          </span>
          <h2 className="text-2xl md:text-3xl font-medium font-outfit">
            Eksplorasi Wilayah Terpilih
          </h2>
        </div>

        <div className="w-full">
          <ProvinceSidePanel 
            activeProvince={activeProvince} 
            stampedProvinces={stampedProvinces}
            showStampAnim={newStampAnimProvince === activeProvince}
            onUnlockStamp={handleUnlockStamp}
            onResetPassport={handleResetPassport}
          />
        </div>
      </div>

      {/* UNESCO Timeline Section */}
      <div className="bg-black/5 dark:bg-white/5 border-y border-black/10 dark:border-white/10">
        <UnescoTimeline />
      </div>

    </div>
  );
}
