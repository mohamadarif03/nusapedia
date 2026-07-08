"use client";

import React, { memo, useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { normalizeProvinceName } from "@/data/provinceMapping";
import { MapPin } from "lucide-react";

interface IndonesiaMapProps {
  activeProvince: string | null;
  stampedProvinces: string[];
  onProvinceClick: (province: string) => void;
  onHover: (province: string | null) => void;
}

const geoUrl = "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json";

const tinyProvinces = [
  { name: "DI Yogyakarta", coordinates: [110.375, -7.88] },
  { name: "DKI Jakarta", coordinates: [106.845, -6.21] }
];


interface Ripple {
  x: number;
  y: number;
  id: number;
}

const IndonesiaMap = ({ activeProvince, stampedProvinces = [], onProvinceClick, onHover }: IndonesiaMapProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [localHover, setLocalHover] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleMapClick}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[450px] md:h-[550px] bg-gradient-to-b from-blue-50/50 to-amber-50/20 dark:from-zinc-950 dark:to-zinc-900/60 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 flex items-center justify-center shadow-2xl group/map"
    >
      {/* Animated subtle background ocean waves (ocean texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] animate-pulse"></div>

      {/* Ripple Animation Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none bg-amber-400/40 dark:bg-gold/30 border border-gold/60 animate-ping"
          style={{
            left: `${ripple.x - 30}px`,
            top: `${ripple.y - 30}px`,
            width: "60px",
            height: "60px",
            animationDuration: "1s"
          }}
        />
      ))}

      {/* Embedded CSS for 3D hover and glow effects */}
      <style jsx global>{`
        .map-geography {
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), fill 0.3s ease, stroke 0.3s ease, filter 0.4s ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .map-geography:hover {
          filter: drop-shadow(0 8px 16px rgba(251, 191, 36, 0.4));
          transform: translateY(-5px) scale(1.02);
          stroke: #fbbf24 !important;
          stroke-width: 1px !important;
          z-index: 50;
        }
        .map-geography-active {
          filter: drop-shadow(0 10px 20px rgba(245, 158, 11, 0.5));
          stroke: #f59e0b !important;
          stroke-width: 1.5px !important;
          transform: translateY(-8px) scale(1.03);
          z-index: 51;
        }

      `}</style>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1100, // scaled up for more immersive view
          center: [118, -2.5]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup 
          center={[118, -2.5]} 
          zoom={zoom} 
          minZoom={1} 
          maxZoom={5}
          onMoveEnd={({ zoom }) => setZoom(zoom)}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Sort to ensure tiny provinces (DI Yogyakarta & DKI Jakarta) are drawn last (on top of Central Java/West Java)
              const sortedGeographies = [...geographies].sort((a, b) => {
                const nameA = normalizeProvinceName(a.properties.Propinsi || a.properties.NAME_1 || a.properties.name || "");
                const nameB = normalizeProvinceName(b.properties.Propinsi || b.properties.NAME_1 || b.properties.name || "");
                const isTinyA = nameA === "DI Yogyakarta" || nameA === "DKI Jakarta";
                const isTinyB = nameB === "DI Yogyakarta" || nameB === "DKI Jakarta";
                if (isTinyA && !isTinyB) return 1;
                if (!isTinyA && isTinyB) return -1;
                return 0;
              });

              return sortedGeographies.map((geo) => {
                const rawName = geo.properties.Propinsi || geo.properties.NAME_1 || geo.properties.name || "Unknown";
                const provinceName = normalizeProvinceName(rawName);
                const isActive = activeProvince === provinceName;
                const isStamped = stampedProvinces.includes(provinceName);
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProvinceClick(provinceName);
                    }}
                    onMouseEnter={() => {
                      onHover(provinceName);
                      setLocalHover(provinceName);
                    }}
                    onMouseLeave={() => {
                      onHover(null);
                      setLocalHover(null);
                    }}
                    className={`map-geography ${isActive ? "map-geography-active" : ""}`}
                    style={{
                      default: {
                        fill: isActive 
                           ? "#fbbf24" 
                          : isStamped 
                            ? "rgba(16, 185, 129, 0.4)" // Green with opacity
                            : "var(--map-fill, #e2e8f0)",
                        stroke: isActive 
                          ? "#fbbf24" 
                          : isStamped 
                            ? "#10b981" 
                            : "#ffffff",
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                      hover: {
                        fill: "#fcd34d",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#f59e0b",
                        outline: "none",
                      }
                    }}
                  />
                );
              })
            }}
          </Geographies>


        </ZoomableGroup>
      </ComposableMap>

      {/* Floating Cursor Tooltip */}
      {localHover && (
        <div 
          className="absolute pointer-events-none bg-black/95 dark:bg-white/95 text-white dark:text-zinc-950 px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-xl border border-gold/30 tracking-wider uppercase animate-fade-in flex items-center gap-1.5 z-[100] transition-all duration-75"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 35}px`,
            transform: "translateX(-50%)"
          }}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-500" /> {localHover}
        </div>
      )}

      {/* Ambient Legend & Zoom Indicators */}
      <div className="absolute top-6 left-6 pointer-events-none select-none flex flex-col gap-1">
        <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase">Interactive Map</span>
        <h3 className="text-xl font-medium text-black dark:text-white flex items-center gap-2">
          Peta Kebudayaan
          {zoom > 1 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
              {zoom.toFixed(1)}x Zoom
            </span>
          )}
        </h3>
      </div>

      {/* Manual Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white/80 dark:bg-black/85 p-2 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg">
        <button 
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev + 0.5, 5)); }}
          className="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center font-bold text-lg transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev - 0.5, 1)); }}
          className="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center font-bold text-lg transition-colors"
          title="Zoom Out"
        >
          −
        </button>
      </div>

      {/* Helper text overlay */}
      <div className="absolute bottom-6 left-6 text-[10px] text-black/50 dark:text-white/40 max-w-[250px] pointer-events-none bg-white/85 dark:bg-zinc-900/90 p-2.5 rounded-xl border border-black/5 dark:border-white/5 backdrop-blur-md shadow-md">
        <span className="font-bold block text-black/80 dark:text-white/80 mb-0.5">💡 Navigasi Peta</span>
        Klik provinsi pada peta. Gunakan mouse scroll atau cubit layar untuk zoom & geser.
      </div>
    </div>
  );
};

export default memo(IndonesiaMap);
