"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";

const DEFAULT_FRAME_COUNT = 60;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';
  const frameCount = isLight ? 100 : 60;

  // Preload images
  useEffect(() => {
    if (!mounted) return;
    
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];
    setIsReady(false);
    setLoadedPercentage(0);
    
    // We only load a subset first to unblock initial render if needed,
    // but for scrollytelling we typically want at least 20-30% loaded.
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      
      const folder = isLight ? 'sequence-light' : 'sequence';
      const prefix = isLight ? 'Cinematic_motion_sequence_star_' : 'Indonesian_archipelago_cultural_…_202606302011_';
      
      img.src = `/${folder}/${prefix}${paddedIndex}.jpg`;
      
      img.onload = () => {
        loaded++;
        loadedImages[i] = img;
        setLoadedPercentage(Math.floor((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setImages(loadedImages);
          setTimeout(() => setIsReady(true), 800);
        }
      };
      
      // Handle error gracefully
      img.onerror = () => {
        loaded++;
        setLoadedPercentage(Math.floor((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setImages(loadedImages);
          setTimeout(() => setIsReady(true), 800);
        }
      }
    }
  }, [isLight, frameCount, mounted]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track the current frame using scroll progress (finishes at 75% scroll)
  const frameIndex = useTransform(scrollYProgress, [0, 0.75], [0, frameCount - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isReady || !canvasRef.current || images.length === 0) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const currentFrame = Math.round(latest);
    const img = images[currentFrame];
    
    if (img) {
      // Use requestAnimationFrame for smooth drawing
      requestAnimationFrame(() => {
        const dpr = window.devicePixelRatio || 1;
        const width = canvasRef.current!.clientWidth;
        const height = canvasRef.current!.clientHeight;
        
        // Ensure canvas physical size matches display size multiplied by DPR
        if (canvasRef.current!.width !== width * dpr || canvasRef.current!.height !== height * dpr) {
          canvasRef.current!.width = width * dpr;
          canvasRef.current!.height = height * dpr;
        }

        // Clear previous frame
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        
        // Calculate aspect ratio to cover canvas without distortion
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = drawWidth / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = drawHeight * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        // Draw with DPR scaling
        ctx.drawImage(
          img, 
          offsetX * dpr, 
          offsetY * dpr, 
          drawWidth * dpr, 
          drawHeight * dpr
        );
      });
    }
  });

  // Setup canvas resolution and initial draw
  useEffect(() => {
    if (!isReady || !canvasRef.current || images.length === 0) return;
    
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      
      // Trigger a redraw
      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame];
      
      if (img) {
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = drawWidth / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = drawHeight * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          img, 
          offsetX * dpr, 
          offsetY * dpr, 
          drawWidth * dpr, 
          drawHeight * dpr
        );
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, images, frameIndex]);

  // Text 1 (Start)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 1], [1, 1, 0, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.25, 1], [0, 0, -40, -40]);

  // Text 2 (Middle)
  const text2Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.45, 0.55, 1], [0, 0, 1, 1, 0, 0]);
  const text2Y = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.45, 0.55, 1], [40, 40, 0, 0, -40, -40]);

  // Text 3 (End)
  const text3Opacity = useTransform(scrollYProgress, [0, 0.55, 0.70, 1], [0, 0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0, 0.55, 0.70, 1], [40, 40, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] md:h-[500vh] bg-white dark:bg-black transition-colors duration-300">
      <AnimatePresence>
        {!isReady && mounted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 flex flex-col items-center justify-center text-black dark:text-white z-[200] bg-white dark:bg-black"
          >
            <div className="w-48 h-1 bg-black/10 dark:bg-white/20 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-amber-500 dark:bg-gold transition-all duration-300" 
                style={{ width: `${loadedPercentage}%` }}
              />
            </div>
            <p className="font-outfit text-sm tracking-widest uppercase text-black/50 dark:text-white/50">
              Loading Experience {loadedPercentage}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Cinematic dark overlay to mask image blurriness and improve text readability */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/60 pointer-events-none transition-colors duration-300" />
        
        {/* Vignette effect for focus and to hide edge blurriness */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none transition-colors duration-300" />
        
        {/* Film grain / noise overlay to add texture and mask low resolution */}
        <div 
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.35] pointer-events-none mix-blend-overlay transition-opacity duration-300"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Text 1 Overlay */}
        <motion.div 
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-4 text-black dark:text-white drop-shadow-lg dark:drop-shadow-2xl transition-colors duration-300">
              Keberagaman
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-gold dark:to-amber-500">
                Nusantara
              </span>
            </h2>
            <p className="text-base md:text-xl text-black/70 dark:text-white/80 max-w-xl mx-auto font-light drop-shadow dark:drop-shadow-lg transition-colors duration-300">
              Ribuan pulau, ratusan bahasa, satu jiwa yang tak tergoyahkan oleh waktu.
            </p>
          </div>
        </motion.div>

        {/* Text 2 Overlay */}
        <motion.div 
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-4 text-black dark:text-white drop-shadow-lg dark:drop-shadow-2xl transition-colors duration-300">
              Harmoni Alam &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-gold dark:to-amber-500">
                Karya
              </span>
            </h2>
            <p className="text-base md:text-xl text-black/70 dark:text-white/80 max-w-xl mx-auto font-light drop-shadow dark:drop-shadow-lg transition-colors duration-300">
              Dari ukiran hingga tarian, setiap mahakarya menyimpan cerita dan makna mendalam.
            </p>
          </div>
        </motion.div>

        {/* Text 3 Overlay (Current Ending) */}
        <motion.div 
          style={{ opacity: text3Opacity, y: text3Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight mb-6 text-black dark:text-white drop-shadow-lg dark:drop-shadow-2xl transition-colors duration-300">
              Jelajahi Warisan
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-gold dark:to-amber-500">
                Budaya Nusantara
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-black/70 dark:text-white/80 max-w-2xl mx-auto mb-10 font-light drop-shadow dark:drop-shadow-lg transition-colors duration-300">
              Sebuah simfoni visual dari keberagaman dan kekayaan tradisi yang hidup di setiap sudut kepulauan Indonesia.
            </p>
            <Link href="/jelajahi">
              <button className="px-8 py-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 backdrop-blur-md rounded-full text-black dark:text-white font-medium transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.1)] dark:shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]">
                Mulai Penjelajahan
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
