"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Jelajahi Budaya", href: "/jelajahi" },
    { name: "Peta Nusantara", href: "/peta" },
    { name: "Mainkan", href: "/mainkan" },
    { name: "Tanya AI", href: "/tanya-ai" },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="NUSAPEDIA Logo" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xl font-medium tracking-widest font-outfit">
            <span className="text-[#4E3325] dark:text-[#f4eae4] transition-colors">NUSA</span>
            <span className="font-light text-[#C99A2E]">PEDIA</span>
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all ${
                  isActive
                    ? "text-black dark:text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-bold border-b border-black/50 dark:border-white/50 pb-1"
                    : "text-black/70 dark:text-white/80 hover:text-black dark:hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <Link href="/jelajahi" className="hidden md:flex px-6 py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 backdrop-blur-md rounded-full text-black dark:text-white text-xs font-medium tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]">
            Mulai Jelajah
          </Link>
          <button className="lg:hidden text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
