"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative bg-[#fff8f0] dark:bg-[#0d0804] text-black dark:text-white pt-20 pb-8 overflow-hidden transition-colors duration-300">
      {/* Decorative top border - thin subtle pattern */}
      <div className="absolute top-0 left-0 w-full h-[3px] opacity-30" style={{ backgroundImage: "linear-gradient(90deg, #fbbf24 0%, transparent 25%, #fbbf24 50%, transparent 75%, #fbbf24 100%)", backgroundSize: "40px 100%" }} />
      
      {/* Corner decorative element */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 text-gold/5 pointer-events-none transform rotate-12">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand */}
          <div className="w-full lg:w-2/5 pr-0 lg:pr-12">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-medium tracking-widest text-black dark:text-white transition-colors duration-300">
                CULTURE<span className="font-light text-black/50 dark:text-white/50">VERSE</span>
              </span>
            </Link>
            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-6 max-w-sm transition-colors duration-300">
              Melestarikan warisan budaya Nusantara untuk generasi masa kini dan masa depan melalui eksplorasi digital interaktif.
            </p>
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/60 dark:text-white/60 hover:bg-gold hover:text-black transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/60 dark:text-white/60 hover:bg-gold hover:text-black transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/60 dark:text-white/60 hover:bg-gold hover:text-black transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="w-full sm:w-1/2 lg:w-1/5">
            <h4 className="text-black dark:text-white font-medium mb-6 uppercase tracking-widest text-xs transition-colors duration-300">Jelajahi</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Beranda</Link></li>
              <li><Link href="/#jelajahi" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Jelajahi Budaya</Link></li>
              <li><Link href="/#peta" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Peta Nusantara</Link></li>
              <li><Link href="/#mainkan" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Mainkan</Link></li>
              <li><Link href="/#tanya-ai" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Tanya AI</Link></li>
            </ul>
          </div>

          {/* Col 3: About */}
          <div className="w-full sm:w-1/2 lg:w-1/5">
            <h4 className="text-black dark:text-white font-medium mb-6 uppercase tracking-widest text-xs transition-colors duration-300">Tentang</h4>
            <ul className="space-y-4">
              <li><Link href="#tentang" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Tentang Proyek</Link></li>
              <li><Link href="#sumber" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Sumber Data</Link></li>
              <li><Link href="#kontak" className="text-black/60 dark:text-white/60 hover:text-gold text-sm transition-colors duration-300">Kontak</Link></li>
            </ul>
          </div>

          {/* Col 4: Credits & SDG */}
          <div className="w-full lg:w-1/5">
            <h4 className="text-black dark:text-white font-medium mb-6 uppercase tracking-widest text-xs transition-colors duration-300">Kredit</h4>
            <p className="text-black/50 dark:text-white/50 text-xs leading-relaxed mb-6 transition-colors duration-300">
              Data warisan budaya merujuk pada direktori resmi Kemdikbud dan UNESCO demi menghindari isu hak cipta.
            </p>
            <div className="inline-flex items-center gap-3 px-3 py-2 bg-[#f9aa33]/10 border border-[#f9aa33]/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f9aa33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
              <div className="flex flex-col">
                <span className="text-[#f9aa33] font-bold text-[9px] tracking-wider leading-none">SDG 11</span>
                <span className="text-black/80 dark:text-white/80 text-[10px] leading-tight mt-1 transition-colors duration-300">Sustainable Cities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 dark:border-white/10 gap-4 transition-colors duration-300">
          <p className="text-black/40 dark:text-white/40 text-xs text-center md:text-left transition-colors duration-300">
            &copy; 2026 Culture Verse. Dibuat untuk Kompetisi Web Inovasi Digital.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white text-xs transition-colors duration-300">Privacy Policy</Link>
            <Link href="#terms" className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white text-xs transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
