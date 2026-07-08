"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Sparkles, 
  Lightbulb, 
  User, 
  Globe, 
  CheckCircle2, 
  Palette,
  Flag
} from "lucide-react";
import { cultures } from "@/data/cultures";

interface ProvinceSidePanelProps {
  activeProvince: string | null;
  stampedProvinces: string[];
  showStampAnim: boolean;
  onUnlockStamp: (province: string) => void;
  onResetPassport: () => void;
}

export default function ProvinceSidePanel({ activeProvince, stampedProvinces = [], showStampAnim, onUnlockStamp, onResetPassport }: ProvinceSidePanelProps) {
  const [activeTab, setActiveTab] = useState<"culture" | "passport">("culture");

  // AI Chat Guide states
  const [chatMessages, setChatMessages] = useState<{ sender: "guide" | "user"; text: string }[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    // Reset guide chat when province changes
    setUserQuestion("");
    setIsSending(false);
    setCanClaim(false);
    
    if (activeProvince) {
      let greeting = "Halo! ";
      if (activeProvince === "Jawa Barat") greeting = "Sampurasun! ";
      else if (activeProvince === "Aceh") greeting = "Assalamu'alaikum! ";
      else if (activeProvince === "Sumatera Utara") greeting = "Horas! ";
      else if (activeProvince === "Sumatera Barat") greeting = "Assalamu'alaikum! ";
      else if (activeProvince === "Bali") greeting = "Om Swastyastu! ";
      
      // Find cultures matching the active province to generate a relevant initial question
      const provinceCultures = cultures.filter((c) => c.province === activeProvince);
      let testQuestion = `Boleh ceritakan sedikit kebudayaan menarik apa yang paling kamu sukai atau ketahui dari daerah ${activeProvince}?`;
      
      if (provinceCultures.length > 0) {
        const picked = provinceCultures[Math.floor(Math.random() * provinceCultures.length)];
        if (picked.category === "Batik") {
          testQuestion = `Apakah kamu sudah tahu apa motif batik terkenal dari daerah kita "${picked.name}" beserta makna filosofis indahnya secara singkat?`;
        } else if (picked.category === "Alat Musik") {
          testQuestion = `Apakah kamu tahu bagaimana keunikan cara memainkan alat musik tradisional khas daerah kita yang bernama "${picked.name}"?`;
        } else {
          testQuestion = `Apakah kamu tahu keunikan menarik atau ciri khas penting dari "${picked.name}" yang menjadi kebanggaan daerah kita?`;
        }
      }
      
      setChatMessages([
        {
          sender: "guide",
          text: `${greeting}Selamat datang di ${activeProvince}! Saya senang sekali bisa menyambut kunjungan Anda di sini. Biar petualangan kita makin akrab, yuk kita ngobrol santai seputar kebudayaan setempat! \n\nOh ya, kalau boleh tahu, ${testQuestion.charAt(0).toLowerCase() + testQuestion.slice(1)}`
        }
      ]);
    }
  }, [activeProvince]);

  const sendQuestion = async () => {
    if (!activeProvince || !userQuestion.trim() || isSending) return;
    
    const question = userQuestion.trim();
    setUserQuestion("");
    setChatMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsSending(true);

    const historyText = chatMessages
      .map((m) => `${m.sender === "user" ? "Wisatawan" : "Pemandu Adat"}: ${m.text}`)
      .join("\n");

    try {
      const promptText = `Kamu adalah pemandu adat setempat yang sangat ramah, hangat, dan berpengetahuan dari provinsi ${activeProvince}.
Di sini, Anda sedang memandu seorang wisatawan untuk membantu mereka mengenal budaya daerah Anda dan mendapatkan stempel paspor digital kunjungan.

Tugas Anda:
1. Jawab pertanyaan wisatawan secara hangat dan mendidik (maksimal 2-3 kalimat).
2. Jika wisatawan mengajukan pertanyaan biasa/awal, setelah menjawab pertanyaan tersebut, ajukan 1 pertanyaan kuis/uji pemahaman sederhana di akhir respons Anda untuk menguji apakah wisatawan paham/tertarik dengan budaya daerah Anda.
3. Jika wisatawan sedang membalas pertanyaan kuis/menguji kemampuan Anda sebelumnya:
   - Evaluasi jawaban mereka. Jika jawaban mereka mendekati benar atau menunjukkan mereka memiliki pemahaman dasar, puji mereka dan tawarkan apakah mereka ingin mengklaim stempel paspor mereka sekarang atau lanjut mengobrol untuk menguji kemampuan lebih lanjut.
   - PENTING: Jika mereka menjawab dengan baik/paham, tambahkan tag "[CLAIM_READY]" di akhir teks respons Anda agar sistem kami dapat menampilkan tombol klaim stempel kepada mereka.
   - Jika jawaban mereka masih salah atau kurang tepat, beritahu mereka secara lembut dan sopan bahwa jawabannya kurang tepat. Berikan penjelasan singkat tentang jawaban yang benar (1-2 kalimat), lalu ajukan pertanyaan kuis baru yang didasarkan langsung pada penjelasan yang baru saja Anda berikan tadi. Ini bertujuan untuk menguji dan membuktikan bahwa wisatawan tersebut benar-benar membaca penjelasan yang Anda berikan.

Berikut adalah riwayat percakapan sejauh ini:
${historyText}
Wisatawan: ${question}

Pemandu Adat:`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText })
      });

      if (!response.ok) throw new Error("Gagal menghubungi pemandu adat");
      const data = await response.json();
      
      let responseText = data.text || "";
      if (responseText.includes("[CLAIM_READY]")) {
        setCanClaim(true);
        responseText = responseText.replace("[CLAIM_READY]", "").trim();
      }
      
      setChatMessages((prev) => [...prev, { sender: "guide", text: responseText }]);
      
    } catch (e) {
      console.error(e);
      setChatMessages((prev) => [
        ...prev, 
        { 
          sender: "guide", 
          text: "Waduh, sepertinya koneksi saya sedang terganggu nih. Tolong coba kirim jawabanmu sekali lagi ya!" 
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Find cultures matching the active province
  const provinceCultures = cultures.filter((c) => c.province === activeProvince);

  // Group by category
  const groupedCultures = provinceCultures.reduce((acc, culture) => {
    if (!acc[culture.category]) acc[culture.category] = [];
    acc[culture.category].push(culture);
    return acc;
  }, {} as Record<string, typeof cultures>);



  return (
    <div className="w-full min-h-[600px] bg-white/70 dark:bg-zinc-950/80 rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden relative shadow-xl backdrop-blur-md">
      
      {/* Background Stylized Text / Watermark (Transparent with thin outline to prevent collision) */}
      {activeProvince && (
        <div className="absolute right-0 bottom-0 select-none pointer-events-none overflow-hidden leading-none font-bold text-[8vw] translate-y-6 translate-x-4 uppercase font-outfit text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.03)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.02)]">
          {activeProvince}
        </div>
      )}

      {/* Passport Stamp Notification Overlay */}
      <AnimatePresence>
        {showStampAnim && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50 text-white p-6"
          >
            <div className="w-32 h-32 rounded-full border-4 border-gold bg-zinc-950 flex flex-col items-center justify-center p-4 animate-bounce shadow-[0_0_30px_rgba(251,191,36,0.6)]">
              <Sparkles className="w-10 h-10 text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mt-2">STEMPEL</span>
              <span className="text-[9px] font-bold text-white text-center truncate w-full mt-0.5">{activeProvince}</span>
            </div>
            <h4 className="text-xl font-medium mt-6 text-center text-gold">Passport Terisi Stempel!</h4>
            <p className="text-sm text-zinc-300 mt-2 text-center max-w-[240px]">
              Kunjungan budaya ke {activeProvince} telah tercatat di paspor digital Anda.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!activeProvince ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-24 h-24 mb-6 text-amber-500/30 dark:text-gold/20 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">Silakan Pilih Daerah</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[280px]">
              Klik area di peta interaktif untuk mengeksplorasi cerita rakyat, ragam budaya, dan mengisi stempel paspor Anda.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeProvince}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-4 border-b border-black/5 dark:border-white/5 bg-gradient-to-r from-amber-500/10 to-gold/5 dark:from-amber-500/5 dark:to-zinc-950">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-1 block">
                    Penjelajahan Nusantara
                  </span>
                  <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white flex items-center gap-2">
                    {activeProvince}
                    <svg className="w-5 h-5 text-amber-500/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </h2>
                </div>
                {/* Stamp indicator badge */}
                <div className="flex items-center gap-1.5 bg-gold/20 text-amber-600 dark:text-gold px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {stampedProvinces.includes(activeProvince) ? "Terstempel" : "Baru Dilihat"}
                </div>
              </div>

              {/* Multi-Tab Navigation */}
              <div className="flex gap-2 mt-6 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("culture")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    activeTab === "culture"
                      ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm"
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" /> Budaya
                </button>
                <button
                  onClick={() => setActiveTab("passport")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    activeTab === "passport"
                      ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm"
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> Paspor
                </button>
              </div>
            </div>

            {/* Scrollable Content Pane */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              
              {/* Tab 1: Cultures & Traditions */}
              {activeTab === "culture" && (
                <div className="space-y-6">
                  {provinceCultures.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm flex flex-col items-center">
                      <Palette className="w-10 h-10 text-zinc-400 mb-2" />
                      Belum ada data objek budaya terdaftar untuk provinsi ini.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {Object.entries(groupedCultures).map(([category, items]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 border-l-2 border-amber-500 pl-2.5">
                            {category}
                          </h3>
                          <div className="grid gap-3 grid-cols-1">
                            {items.map((item) => (
                              <div 
                                key={item.id} 
                                className="group flex gap-4 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-transparent hover:border-gold/30 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                              >
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/10 flex-shrink-0">
                                  <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                  />
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                  <h4 className="font-semibold text-base leading-tight mb-1 truncate text-zinc-800 dark:text-zinc-200">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">
                                    {item.description}
                                  </p>
                                  <Link 
                                    href={`/jelajahi/${item.slug}`}
                                    className="text-[10px] font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                                  >
                                    Selengkapnya
                                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ask AI & Action CTA */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/tanya-ai?prompt=Ceritakan kisah sejarah, ragam budaya, dan pakaian adat dari daerah ${activeProvince}`}
                      className="flex-1 py-3 px-4 rounded-xl text-center bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" /> Tanya AI tentang {activeProvince}
                    </Link>
                  </div>
                </div>
              )}



              {/* Tab 3: Digital Passport Stamp list & AI Missions */}
              {activeTab === "passport" && (
                <div className="space-y-6">
                  {stampedProvinces.includes(activeProvince) ? (
                    <>
                      {/* Passport Visual Mock */}
                      <div className="bg-gradient-to-br from-emerald-800 to-teal-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border border-emerald-700">
                        {/* Security background textures */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:16px_16px]"></div>
                        
                        <div className="relative flex flex-col h-full justify-between gap-8">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-400">PASPOR NUSANTARA</p>
                              <h4 className="text-lg font-bold tracking-wider font-outfit uppercase">INDONESIA</h4>
                            </div>
                            <Globe className="w-8 h-8 text-emerald-400" />
                          </div>

                          {/* User's Passport Stamp summary */}
                          <div className="border-t border-white/20 pt-4 mt-2">
                            <p className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1.5">STATISTIK PERJALANAN</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="block text-2xl font-bold font-outfit">{stampedProvinces.length}</span>
                                <span className="text-[9px] text-white/60">Stempel Provinsi</span>
                              </div>
                              <div>
                                <span className="block text-2xl font-bold font-outfit">
                                  {Math.round((stampedProvinces.length / 34) * 100)}%
                                </span>
                                <span className="text-[9px] text-white/60">Eksplorasi Nasional</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stamp Collection */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">Stempel Koleksi Anda</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {stampedProvinces.map((prov) => (
                            <div 
                              key={prov} 
                              className="bg-black/5 dark:bg-white/5 p-2 rounded-xl flex flex-col items-center justify-center text-center border border-black/5 dark:border-white/5 relative overflow-hidden"
                            >
                              <Flag className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                              <span className="text-[9px] font-bold text-zinc-800 dark:text-zinc-200 truncate w-full">{prov}</span>
                              <span className="text-[7px] text-zinc-500 dark:text-zinc-400 mt-0.5">TERVALIDASI</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Reset Passport Stamps */}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={onResetPassport}
                            className="text-[9px] font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors uppercase tracking-widest flex items-center gap-1"
                          >
                            🗑️ Reset Paspor
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* AI Local Guide Chat Mission Section */
                    <div className="space-y-4">
                      <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-2xl relative overflow-hidden flex flex-col min-h-[300px]">
                        <div className="flex items-center justify-between gap-2 mb-2 text-amber-500 pb-2 border-b border-black/5 dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] block">
                              Pemandu Adat {activeProvince}
                            </span>
                          </div>
                          <span className="text-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Misi Aktif
                          </span>
                        </div>

                        {/* Concept Info */}
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
                          💬 <strong>Mengapa harus ngobrol?</strong> Jawab kuis atau diskusikan keunikan budaya setempat bersama pemandu kami untuk membuktikan ketertarikan Anda dan mendapatkan <strong>Stempel Paspor {activeProvince}</strong> resmi!
                        </p>

                        {/* Scrollable Conversation Bubbles */}
                        <div className="flex-1 overflow-y-auto space-y-3 max-h-[220px] pr-1.5 custom-scrollbar mb-4 text-xs">
                          {chatMessages.map((msg, idx) => (
                            <div
                              key={idx}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                                  msg.sender === "user"
                                    ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-tr-none font-medium"
                                    : "bg-amber-500/10 border border-amber-500/10 text-zinc-800 dark:text-zinc-200 rounded-tl-none font-light"
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}

                          {isSending && (
                            <div className="flex justify-start">
                              <div className="bg-amber-500/10 border border-amber-500/10 rounded-2xl rounded-tl-none p-3 max-w-[85%] flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Claim Button */}
                        {canClaim && (
                          <div className="mb-3 animate-pulse">
                            <button
                              onClick={() => {
                                onUnlockStamp(activeProvince!);
                                setCanClaim(false);
                              }}
                              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 border border-emerald-500 cursor-pointer"
                            >
                              🔑 Klaim Stempel Paspor {activeProvince}
                            </button>
                          </div>
                        )}

                        {/* Input Box */}
                        <div className="flex gap-2 border-t border-black/5 dark:border-white/5 pt-3">
                          <input
                            type="text"
                            placeholder="Tanyakan kuliner, adat, alat musik, atau seni setempat..."
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
                            disabled={isSending}
                            className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium disabled:opacity-50"
                          />
                          <button
                            onClick={sendQuestion}
                            disabled={isSending || !userQuestion.trim()}
                            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            Kirim
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Passport Info Benefits Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/5 to-gold/5 border border-amber-500/10 space-y-2 mt-4">
                    <h5 className="text-[10px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Kenapa Mengumpulkan Stempel Paspor?
                    </h5>
                    <ul className="text-[10px] text-zinc-600 dark:text-zinc-400 space-y-1.5 pl-3.5 list-disc leading-relaxed">
                      <li><strong>Jurnal Kunjungan Digital:</strong> Melacak daerah mana saja yang sudah Anda kunjungi dan pelajari budayanya secara interaktif.</li>
                      <li><strong>Pemandu Adat AI (Konsep):</strong> Diskusi interaktif dua arah mengenai tradisi lokal, kuliner, dan musik khas daerah secara langsung dan dinamis.</li>
                      <li><strong>Uji Pemahaman (Benefit):</strong> Menguji pemahaman Anda melalui kuis kontekstual yang diajukan pemandu untuk membuka stempel paspor secara resmi.</li>
                      <li><strong>Gelar Penjelajah Agung:</strong> Kumpulkan stempel dari seluruh provinsi di Indonesia untuk meraih predikat tertinggi *Penjelajah Agung Nusantara*!</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
