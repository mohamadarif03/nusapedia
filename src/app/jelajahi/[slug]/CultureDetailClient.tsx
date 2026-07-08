"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Culture } from "@/data/cultures";
import CultureCard from "@/components/CultureCard";

interface Props {
  culture: Culture;
  relatedCultures: Culture[];
}

export default function CultureDetailClient({ culture, relatedCultures }: Props) {
  const [activeImage, setActiveImage] = useState(culture.image);
  const [activeTab, setActiveTab] = useState("Sejarah");

  const tabs = [
    { id: "Sejarah", content: culture.history },
    { id: "Filosofi & Makna", content: culture.philosophy },
    { id: "Cara Pembuatan", content: culture.makingProcess },
  ].filter(t => t.content);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex text-xs font-medium tracking-widest uppercase mb-10 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/jelajahi" className="hover:text-amber-500 transition-colors">Jelajahi Budaya</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">{culture.name}</span>
        </nav>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          
          {/* Left Column: Visuals (40%) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            <motion.div 
              layoutId={`image-${culture.id}`}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={activeImage}
                    alt={culture.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Right Column: Info (60%) */}
          <div className="w-full lg:w-7/12 py-4">
            <span className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 text-black dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              {culture.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 leading-tight">
              {culture.name}
            </h1>
            
            <div className="flex items-center gap-2 text-black/60 dark:text-white/60 mb-10 text-sm font-medium tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {culture.province}
            </div>

            <p className="text-lg md:text-xl text-black/80 dark:text-white/80 leading-relaxed mb-12 font-light">
              {culture.description}
            </p>

            {/* Tabs */}
            <div className="mb-8 border-b border-black/10 dark:border-white/10 flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                    activeTab === tab.id ? "text-gold" : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {tab.id}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-black/70 dark:text-white/70 leading-relaxed space-y-4 whitespace-pre-line"
                >
                  {tabs.find(t => t.id === activeTab)?.content}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Related Cultures */}
        {relatedCultures.length > 0 && (
          <div className="pt-16 border-t border-black/10 dark:border-white/10">
            <h2 className="text-2xl font-medium mb-10">Budaya Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCultures.map((item) => (
                <CultureCard key={item.id} culture={item} />
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
