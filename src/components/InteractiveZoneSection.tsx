import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function InteractiveZoneSection() {
  const games = [
    {
      id: "kerajinan",
      title: "Tebak Asal Kerajinan",
      image: "/game/A_colorful_educational_adventure_game_202607081942.jpeg",
      color: "from-amber-500/40 to-transparent",
      borderColor: "group-hover:border-amber-500/50",
      layout: "col-span-1 h-[350px] lg:h-[380px]",
    },
    {
      id: "angklung",
      title: "Angklung Virtual",
      image: "/game/Bamboo_angklung_with_musical_notes_202607081941.jpeg",
      color: "from-gold/40 to-transparent",
      borderColor: "group-hover:border-gold/50 shadow-[0_0_30px_rgba(251,191,36,0.15)] group-hover:shadow-[0_0_50px_rgba(251,191,36,0.3)]",
      layout: "col-span-1 h-[350px] lg:h-[380px]",
      isHighlight: true,
    }
  ];

  return (
    <section id="mainkan" className="relative z-20 bg-[#fafafa] dark:bg-[#0a0a0a] text-black dark:text-white py-24 md:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Header Section */}
        <span className="text-gold tracking-[0.2em] uppercase text-xs mb-4 font-medium">
          Zona Interaktif
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
          Belajar Sambil Bermain
        </h2>
        <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-20 max-w-2xl transition-colors duration-300">
          Uji wawasanmu lewat permainan tebak asal kerajinan dan mainkan angklung virtual secara langsung dari browsermu.
        </p>

        {/* Games Grid (Center Highlighted) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl items-center mb-16">
          {games.map((game, index) => {
            const linkHref = 
              game.id === "kerajinan" 
                ? "/mainkan/puzzle-kerajinan" 
                : "/mainkan/angklung";

            return (
              <Link 
                key={game.id}
                href={linkHref}
                className={`group relative rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 hover:-translate-y-4 ${game.borderColor} ${game.layout}`}
              >
                {/* Image Background */}
                {game.image && (
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                )}
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 ${game.color} transition-opacity duration-500`} />
                
                {/* Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white">Main</span>
                </div>
  
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-end w-full h-full pb-2">
                  <h3 className={`${game.isHighlight ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl'} font-medium text-white mb-2 text-center group-hover:text-gold transition-colors duration-300 drop-shadow-lg`}>
                    {game.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link 
          href="/mainkan" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold/90 text-black text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:-translate-y-1"
        >
          Mulai Bermain
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
        
      </div>
    </section>
  );
}
