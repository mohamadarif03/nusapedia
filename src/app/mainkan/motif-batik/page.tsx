"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Palette, 
  Trash2, 
  ArrowLeft, 
  RotateCw, 
  Maximize, 
  Move, 
  Download, 
  Sparkles,
  LayoutTemplate
} from "lucide-react";

interface BatikElement {
  id: string;
  name: string;
  philosophy: string;
  svgPath: string; // SVG path markup
  viewBox: string;
}

const BATIK_ELEMENTS: BatikElement[] = [
  {
    id: "parang",
    name: "Lidah Parang",
    philosophy: "Garis tajam diagonal melambangkan ombak samudra, menggambarkan semangat perjuangan tak kenal padam, kontinuitas, dan kekuasaan.",
    svgPath: `<path d="M10 90 L50 10 L90 90 L70 90 L50 50 L30 90 Z" fill="currentColor" />`,
    viewBox: "0 0 100 100"
  },
  {
    id: "kawung",
    name: "Kembang Kawung",
    philosophy: "Empat bulatan menyilang melambangkan buah aren yang dibelah, menyimbolkan asal-usul kehidupan, kesucian hati, dan keseimbangan jagat raya.",
    svgPath: `<path d="M50 50 C20 20 20 80 50 50 C80 20 80 80 50 50 C20 80 80 80 50 50 C20 20 80 20 50 50 Z M50 50 C30 50 30 50 50 50" stroke="currentColor" strokeWidth="6" fill="none" />
             <circle cx="50" cy="50" r="8" fill="currentColor" />`,
    viewBox: "0 0 100 100"
  },
  {
    id: "megamendung",
    name: "Awan Mega Mendung",
    philosophy: "Kelokan garis awan melambangkan dunia atas yang membawa kesuburan, hujan pemberi kehidupan, serta kesabaran dan kepala dingin dalam bertindak.",
    svgPath: `<path d="M10 50 C20 30, 40 30, 50 45 C60 30, 80 30, 90 50 C80 70, 20 70, 10 50 Z M25 50 C35 40, 65 40, 75 50" stroke="currentColor" strokeWidth="4" fill="none" />`,
    viewBox: "0 0 100 100"
  },
  {
    id: "truntum",
    name: "Bintang Truntum",
    philosophy: "Bintang-bintang kecil berkelopak delapan melambangkan cinta kasih yang tulus, setia, senantiasa menuntun dan tumbuh kembali (tumaruntum).",
    svgPath: `<path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
             <circle cx="50" cy="50" r="10" fill="currentColor" />`,
    viewBox: "0 0 100 100"
  },
  {
    id: "cecek",
    name: "Isen Cecek",
    philosophy: "Sekumpulan titik-titik kecil sebagai pengisi bidang kosong, melambangkan detail-detail kecil kehidupan yang harus dirawat dengan teliti.",
    svgPath: `<circle cx="30" cy="30" r="4" fill="currentColor" />
             <circle cx="50" cy="30" r="4" fill="currentColor" />
             <circle cx="70" cy="30" r="4" fill="currentColor" />
             <circle cx="40" cy="50" r="4" fill="currentColor" />
             <circle cx="60" cy="50" r="4" fill="currentColor" />
             <circle cx="30" cy="70" r="4" fill="currentColor" />
             <circle cx="50" cy="70" r="4" fill="currentColor" />
             <circle cx="70" cy="70" r="4" fill="currentColor" />`,
    viewBox: "0 0 100 100"
  }
];

interface PlacedElement {
  id: string; // unique instance ID
  type: string; // element ID type
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
}

interface BatikTemplate {
  name: string;
  description: string;
  elements: PlacedElement[];
}

const TEMPLATES: BatikTemplate[] = [
  {
    name: "Lereng Parang Klasik",
    description: "Lidah parang berjajar diagonal melambangkan ombak samudra dan keteguhan hati.",
    elements: [
      { id: "parang_1", type: "parang", x: 100, y: 100, scale: 1.2, rotate: 45, color: "#92400E" },
      { id: "parang_2", type: "parang", x: 180, y: 180, scale: 1.2, rotate: 45, color: "#92400E" },
      { id: "parang_3", type: "parang", x: 260, y: 260, scale: 1.2, rotate: 45, color: "#92400E" },
      { id: "parang_4", type: "parang", x: 340, y: 340, scale: 1.2, rotate: 45, color: "#92400E" },
    ]
  },
  {
    name: "Pola Kawung Geometris",
    description: "4 Kembang Kawung tersusun dalam kotak simetris melambangkan persaudaraan dan kesucian.",
    elements: [
      { id: "kawung_1", type: "kawung", x: 130, y: 130, scale: 1.2, rotate: 0, color: "#D97706" },
      { id: "kawung_2", type: "kawung", x: 270, y: 130, scale: 1.2, rotate: 0, color: "#D97706" },
      { id: "kawung_3", type: "kawung", x: 130, y: 270, scale: 1.2, rotate: 0, color: "#D97706" },
      { id: "kawung_4", type: "kawung", x: 270, y: 270, scale: 1.2, rotate: 0, color: "#D97706" },
    ]
  },
  {
    name: "Awan Mega Mendung",
    description: "Kelokan awan mega mendung berjajar horizontal melambangkan ketenangan jiwa.",
    elements: [
      { id: "mega_1", type: "megamendung", x: 50, y: 200, scale: 1.2, rotate: 0, color: "#1E293B" },
      { id: "mega_2", type: "megamendung", x: 180, y: 200, scale: 1.2, rotate: 0, color: "#1E293B" },
      { id: "mega_3", type: "megamendung", x: 310, y: 200, scale: 1.2, rotate: 0, color: "#1E293B" },
    ]
  }
];

const COLORS = ["#D97706", "#92400E", "#000000", "#1E293B", "#FFFFFF", "#78716C"];

export default function BatikBuilderPage() {
  const [canvasItems, setCanvasItems] = useState<PlacedElement[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string>("#D97706");
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Drag and Drop Ref bindings
  const dragStartRef = useRef<{ x: number; y: number; itemX: number; itemY: number } | null>(null);
  const draggingItemIdRef = useRef<string | null>(null);

  const addElementToCanvas = (type: string) => {
    const newItem: PlacedElement = {
      id: `${type}_${Date.now()}`,
      type,
      x: 200,
      y: 200,
      rotate: 0,
      scale: 1,
      color: activeColor
    };
    setCanvasItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const handleUpdateItem = (property: keyof PlacedElement, value: any) => {
    if (!selectedItemId) return;
    setCanvasItems((prev) =>
      prev.map((item) => (item.id === selectedItemId ? { ...item, [property]: value } : item))
    );
  };

  const selectedItem = canvasItems.find((item) => item.id === selectedItemId);

  const resetCanvas = () => {
    if (confirm("Apakah kamu yakin ingin mengosongkan kanvas?")) {
      setCanvasItems([]);
      setSelectedItemId(null);
    }
  };

  // Apply Prearranged Layout Template
  const applyTemplate = (elements: PlacedElement[]) => {
    if (confirm("Menerapkan pola referensi akan menghapus motif di kanvas saat ini. Lanjutkan?")) {
      const freshElements = elements.map((item) => ({
        ...item,
        id: `${item.type}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
      }));
      setCanvasItems(freshElements);
      setSelectedItemId(null);
    }
  };

  // Drag Handlers
  const handleStartDrag = (itemId: string, e: React.MouseEvent<SVGGElement> | React.TouchEvent<SVGGElement>) => {
    e.stopPropagation();
    setSelectedItemId(itemId);
    draggingItemIdRef.current = itemId;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const item = canvasItems.find((item) => item.id === itemId);
    if (!item) return;

    dragStartRef.current = {
      x: clientX,
      y: clientY,
      itemX: item.x,
      itemY: item.y
    };

    // Attach listeners dynamically
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragStartRef.current || !draggingItemIdRef.current) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    const svgRect = svgRef.current?.getBoundingClientRect();
    const scaleFactor = svgRect ? 500 / svgRect.width : 1;

    const newX = dragStartRef.current.itemX + deltaX * scaleFactor;
    const newY = dragStartRef.current.itemY + deltaY * scaleFactor;

    const constrainedX = Math.max(-50, Math.min(450, newX));
    const constrainedY = Math.max(-50, Math.min(450, newY));

    setCanvasItems((prev) =>
      prev.map((item) =>
        item.id === draggingItemIdRef.current
          ? { ...item, x: constrainedX, y: constrainedY }
          : item
      )
    );
  };

  const handleDragEnd = () => {
    dragStartRef.current = null;
    draggingItemIdRef.current = null;
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleDragMove);
    window.removeEventListener("touchend", handleDragEnd);
  };

  // Cleanup drag listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  const downloadCanvasAsPNG = () => {
    if (!svgRef.current) return;
    
    const svgElement = svgRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);
    
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#F5EBE0";
        context.fillRect(0, 0, 500, 500);
        context.drawImage(image, 0, 0, 500, 500);
        
        const pngURL = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngURL;
        downloadLink.download = "motif_batik_karya_saya.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <nav className="flex text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/mainkan" className="hover:text-amber-500 transition-colors">Mainkan</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Susun Motif Batik</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Palette className="text-gold" size={28} /> Susun Motif Batik
            </h1>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2">
              Klik elemen motif di panel kiri untuk menambahkannya ke kanvas, seret (drag & drop) elemen di kanvas untuk menyusun pola, atau terapkan pola referensi klasik yang sudah jadi.
            </p>
          </div>
        </div>
      </div>

      {/* Main Game Interface */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Panels (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Elements Selector */}
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4">
                Pilih Elemen Motif
              </h3>
              
              <div className="flex flex-col gap-4">
                {BATIK_ELEMENTS.map((el) => (
                  <div 
                    key={el.id}
                    onClick={() => addElementToCanvas(el.id)}
                    className="flex items-center gap-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-2xl cursor-pointer hover:border-gold hover:shadow-md transition-all group"
                  >
                    {/* Element Icon Preview */}
                    <div className="w-14 h-14 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center text-amber-800 dark:text-amber-200">
                      <svg 
                        viewBox={el.viewBox}
                        className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{ __html: el.svgPath }}
                      />
                    </div>
                    
                    {/* Information & Philosophy */}
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold group-hover:text-gold transition-colors">{el.name}</h4>
                      <p className="text-[10px] text-black/50 dark:text-white/50 leading-relaxed mt-1 line-clamp-2">
                        {el.philosophy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
                Warna Aktif Canting
              </h3>
              <div className="flex gap-3">
                {COLORS.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      setActiveColor(col);
                      if (selectedItemId) handleUpdateItem("color", col);
                    }}
                    style={{ backgroundColor: col }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      activeColor === col ? "border-gold scale-110 shadow-md" : "border-transparent hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Reference Designs Panel */}
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4 flex items-center gap-1.5">
                <LayoutTemplate size={16} className="text-gold" /> Pola Referensi Klasik
              </h3>
              
              <div className="flex flex-col gap-4">
                {TEMPLATES.map((temp) => (
                  <div 
                    key={temp.name}
                    onClick={() => applyTemplate(temp.elements)}
                    className="flex gap-4 items-center bg-white dark:bg-black border border-black/10 dark:border-white/10 p-3 rounded-2xl cursor-pointer hover:border-gold hover:shadow-md transition-all group"
                  >
                    {/* Miniature SVG Preview of Template */}
                    <div className="w-16 h-16 bg-[#F5EBE0] dark:bg-[#E3D5CA] rounded-xl flex-shrink-0 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 500 500" className="w-full h-full pointer-events-none">
                        {temp.elements.map((item) => {
                          const elData = BATIK_ELEMENTS.find((e) => e.id === item.type);
                          if (!elData) return null;
                          return (
                            <g
                              key={item.id}
                              transform={`translate(${item.x}, ${item.y}) scale(${item.scale}) rotate(${item.rotate}, 50, 50)`}
                              style={{ color: item.color }}
                            >
                              <g dangerouslySetInnerHTML={{ __html: elData.svgPath }} />
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Template Description */}
                    <div className="flex-grow text-left">
                      <h4 className="text-xs font-bold group-hover:text-gold transition-colors">{temp.name}</h4>
                      <p className="text-[9px] text-black/50 dark:text-white/50 leading-relaxed mt-1">
                        {temp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Canvas & Controls Panel (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Canvas Area Container */}
            <div className="relative border border-amber-900/20 bg-[#F5EBE0] dark:bg-[#E3D5CA] rounded-3xl shadow-inner w-full aspect-square overflow-hidden flex items-center justify-center">
              
              {/* Grid guides watermark */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,26,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,26,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              {/* Dynamic SVG Elements */}
              <svg 
                ref={svgRef}
                viewBox="0 0 500 500" 
                className="w-full h-full select-none relative z-10"
              >
                {canvasItems.map((item) => {
                  const elData = BATIK_ELEMENTS.find((e) => e.id === item.type);
                  if (!elData) return null;
                  
                  return (
                    <g
                      key={item.id}
                      onMouseDown={(e) => handleStartDrag(item.id, e)}
                      onTouchStart={(e) => handleStartDrag(item.id, e)}
                      className="cursor-move group"
                      transform={`translate(${item.x}, ${item.y}) scale(${item.scale}) rotate(${item.rotate}, 50, 50)`}
                      style={{ color: item.color }}
                    >
                      {/* Selection Box border */}
                      {selectedItemId === item.id && (
                        <rect 
                          x="0" y="0" width="100" height="100" 
                          fill="none" stroke="#D97706" strokeWidth="2" 
                          strokeDasharray="4 4" 
                        />
                      )}
                      
                      {/* Render the SVG path */}
                      <g dangerouslySetInnerHTML={{ __html: elData.svgPath }} />
                    </g>
                  );
                })}
              </svg>

              {/* Tap to deselect helper */}
              <div 
                className="absolute inset-0 z-0 pointer-events-auto"
                onClick={() => setSelectedItemId(null)}
              />
            </div>

            {/* Selected Element Transform Controllers */}
            {selectedItem && (
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 flex items-center gap-1.5">
                    <Move size={14} className="text-gold" /> Atur Posisi & Ukuran
                  </h4>
                  <button 
                    onClick={() => {
                      setCanvasItems((prev) => prev.filter((item) => item.id !== selectedItemId));
                      setSelectedItemId(null);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-600 uppercase flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
                
                {/* Sliders grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Rotate Slider */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-black/60 dark:text-white/60 flex justify-between">
                      <span>Rotasi</span>
                      <span className="text-gold">{selectedItem.rotate}°</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <RotateCw size={12} className="opacity-40" />
                      <input 
                        type="range" min="0" max="360" value={selectedItem.rotate}
                        onChange={(e) => handleUpdateItem("rotate", Number(e.target.value))}
                        className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>
                  </div>

                  {/* Scale Slider */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-black/60 dark:text-white/60 flex justify-between">
                      <span>Ukuran</span>
                      <span className="text-gold">{selectedItem.scale.toFixed(1)}x</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Maximize size={12} className="opacity-40" />
                      <input 
                        type="range" min="0.5" max="3.0" step="0.1" value={selectedItem.scale}
                        onChange={(e) => handleUpdateItem("scale", Number(e.target.value))}
                        className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Print Philosophy of selected element */}
                <div className="mt-2 p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-2.5 items-start">
                  <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gold block">Makna Filosofis:</span>
                    <p className="text-[10px] text-amber-800 dark:text-amber-200 leading-relaxed mt-1">
                      {BATIK_ELEMENTS.find((e) => e.id === selectedItem.type)?.philosophy}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Actions Controls */}
            <div className="flex justify-between items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl">
              <button
                onClick={resetCanvas}
                className="px-6 py-3 bg-transparent border border-black/10 dark:border-white/10 text-xs font-bold uppercase rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                Reset Kanvas
              </button>
              
              <button
                onClick={downloadCanvasAsPNG}
                disabled={canvasItems.length === 0}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase rounded-xl hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black transition-all disabled:opacity-30 disabled:pointer-events-none shadow-md shadow-black/5 dark:shadow-white/5 flex items-center gap-1.5"
              >
                <Download size={14} /> Simpan Gambar (PNG)
              </button>
            </div>

            {/* Back Button */}
            <Link 
              href="/mainkan"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 hover:text-gold dark:hover:text-gold transition-colors self-start"
            >
              <ArrowLeft size={12} /> Kembali ke Mainkan
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
}
