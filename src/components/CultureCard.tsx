import Link from "next/link";
import Image from "next/image";
import { Culture } from "@/data/cultures";

interface CultureCardProps {
  culture: Culture;
  className?: string;
}

export default function CultureCard({ culture, className = "" }: CultureCardProps) {
  return (
    <Link href={`/jelajahi/${culture.slug}`} className={`group relative block rounded-2xl overflow-hidden cursor-pointer bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10 ${className}`}>
      
      {/* Image Container (Aspect 4:5) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/10 dark:bg-white/10">
        <Image 
          src={culture.image} 
          alt={culture.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm shadow-sm">
            {culture.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-10 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 text-white font-medium text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2">
            Lihat Detail
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
        
        {/* Bottom Gradient for Text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Info Container */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-medium text-white mb-1 drop-shadow-md">
          {culture.name}
        </h3>
        <p className="text-white/70 text-xs flex items-center gap-1.5 uppercase tracking-wider drop-shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          {culture.province}
        </p>
      </div>

    </Link>
  );
}
