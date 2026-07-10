"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import CultureCard from "@/components/CultureCard";
import { cultures } from "@/data/cultures";

const CATEGORIES = ["Semua", "Batik", "Alat Musik", "Seni Pertunjukan", "Kerajinan", "Kuliner"];
const ITEMS_PER_PAGE = 12;

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeProvince, setActiveProvince] = useState("Semua Provinsi");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique provinces dynamically from cultures data that have local images
  const provinces = useMemo(() => {
    const uniqueProvinces = Array.from(new Set(cultures.map((c) => c.province)));
    return ["Semua Provinsi", ...uniqueProvinces.sort()];
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeProvince, searchQuery]);

  const filteredCultures = useMemo(() => {
    return cultures.filter((culture) => {

      const matchCategory = activeCategory === "Semua" || culture.category === activeCategory;
      const matchProvince = activeProvince === "Semua Provinsi" || culture.province === activeProvince;
      const matchSearch = culture.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          culture.province.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchProvince && matchSearch;
    });
  }, [activeCategory, activeProvince, searchQuery]);

  // Paginated data
  const totalPages = Math.ceil(filteredCultures.length / ITEMS_PER_PAGE);
  const paginatedCultures = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCultures.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCultures, currentPage]);

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

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-1 sticky top-24 z-30 max-h-[calc(100vh-8rem)] overflow-y-auto flex flex-col gap-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl backdrop-blur-md custom-scrollbar">
            
            {/* Search Bar */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Cari</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input 
                  type="text" 
                  placeholder="Cari nama budaya..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Kategori</label>
              {/* Desktop vertical layout, mobile horizontal scroll */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
                      activeCategory === cat 
                        ? "text-black bg-gold font-bold" 
                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Province Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50">Provinsi</label>
              <div className="relative">
                <select 
                  value={activeProvince}
                  onChange={(e) => setActiveProvince(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs font-medium cursor-pointer focus:outline-none focus:border-gold transition-all"
                >
                  {provinces.map((prov) => (
                    <option key={prov} value={prov} className="bg-white dark:bg-black text-black dark:text-white">{prov}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-black/50 dark:text-white/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

          </div>

          {/* Right Column: Grid Content & Pagination */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Active Filters Summary / Results Count */}
            <div className="flex justify-between items-center text-xs text-black/50 dark:text-white/50 font-medium pb-2 border-b border-black/5 dark:border-white/5">
              <div>
                Menampilkan <span className="text-black dark:text-white font-bold">{filteredCultures.length}</span> Budaya
              </div>
              {filteredCultures.length > 0 && (
                <div>
                  Halaman <span className="text-black dark:text-white font-bold">{currentPage}</span> dari <span className="text-black dark:text-white font-bold">{totalPages}</span>
                </div>
              )}
            </div>

            {/* Grid */}
            {paginatedCultures.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedCultures.map((culture, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      key={culture.id}
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
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 mb-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black/30 dark:text-white/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M9 9h.01"/><path d="M13 13h.01"/></svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Budaya Tidak Ditemukan</h3>
                <p className="text-black/50 dark:text-white/50 text-sm max-w-sm">Belum ada budaya dari daerah atau kategori ini yang terdokumentasi. Coba gunakan kata kunci atau filter lain.</p>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page
                        ? "bg-gold text-black shadow-md shadow-gold/20"
                        : "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
