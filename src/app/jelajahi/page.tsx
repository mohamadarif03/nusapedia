"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import CultureCard from "@/components/CultureCard";
import { cultures } from "@/data/cultures";

const CATEGORIES = ["Semua", "Batik", "Alat Musik", "Seni Pertunjukan", "Kerajinan", "Kuliner"];
const PROVINCES = ["Semua Provinsi", "Yogyakarta", "Jawa Tengah", "Jawa Barat", "Sumatra Barat", "Papua"];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeProvince, setActiveProvince] = useState("Semua Provinsi");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCultures = useMemo(() => {
    return cultures.filter((culture) => {
      const matchCategory = activeCategory === "Semua" || culture.category === activeCategory;
      const matchProvince = activeProvince === "Semua Provinsi" || culture.province === activeProvince;
      const matchSearch = culture.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          culture.province.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchProvince && matchSearch;
    });
  }, [activeCategory, activeProvince, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <nav className="flex justify-center text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Jelajahi Budaya</span>
        </nav>
        <span className="text-gold tracking-[0.2em] uppercase text-xs mb-4 font-medium block">
          Eksplorasi
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
          Jelajahi Kekayaan <br className="hidden md:block" /> Budaya Nusantara
        </h1>
        <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Temukan cerita, sejarah, dan filosofi di balik kekayaan budaya Indonesia dari Sabang sampai Merauke.
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 sticky top-20 z-40">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/5 flex flex-col gap-6">
          
          {/* Top Row: Categories & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                    activeCategory === cat 
                      ? "text-black" 
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gold rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-64 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Cari budaya..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
          </div>

          {/* Bottom Row: Extra Filters (Province) */}
          <div className="flex justify-start border-t border-black/5 dark:border-white/5 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50 font-medium">Filter Provinsi:</span>
              <div className="relative">
                <select 
                  value={activeProvince}
                  onChange={(e) => setActiveProvince(e.target.value)}
                  className="appearance-none bg-transparent border border-black/20 dark:border-white/20 rounded-full pl-4 pr-10 py-1.5 text-xs font-medium cursor-pointer focus:outline-none focus:border-gold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {PROVINCES.map((prov) => (
                    <option key={prov} value={prov} className="bg-white dark:bg-black text-black dark:text-white">{prov}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-black/50 dark:text-white/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {filteredCultures.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCultures.map((culture, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={culture.id}
                  className={index === 0 && activeCategory === "Semua" ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  <CultureCard culture={culture} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-black/30 dark:text-white/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M9 9h.01"/><path d="M13 13h.01"/></svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Budaya Tidak Ditemukan</h3>
            <p className="text-black/50 dark:text-white/50 text-sm max-w-md">Belum ada budaya dari daerah atau kategori ini yang terdokumentasi. Coba gunakan kata kunci atau filter lain.</p>
          </motion.div>
        )}
      </div>
      
    </div>
  );
}
