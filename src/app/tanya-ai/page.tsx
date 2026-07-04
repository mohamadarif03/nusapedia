"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

// Simple local smart dictionary responder for Indonesian culture
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("parang")) {
    return "Motif Batik Parang adalah salah satu motif batik tertua di Indonesia. Melambangkan ombak samudra yang tidak pernah putus, motif ini membawa filosofi perjuangan tanpa henti, kontinuitas kehidupan, serta kewibawaan dan kekuasaan para kesatria Jawa.";
  }
  if (q.includes("angklung")) {
    return "Angklung adalah alat musik tradisional Sunda (Jawa Barat) yang terbuat dari bambu. Angklung diakui oleh UNESCO sejak tahun 2010. Filosofi angklung sangat mendalam: keindahan nadanya hanya tercipta jika dimainkan secara bersama-sama secara harmonis, melambangkan gotong royong dan keselarasan sosial.";
  }
  if (q.includes("tulis") || q.includes("cap")) {
    return "Perbedaan utama Batik Tulis dan Batik Cap terletak pada cara pembuatan dan presisinya:\n- **Batik Tulis**: Dibuat manual menggunakan canting dan lilin (malam). Polanya tidak 100% simetris sempurna karena buatan tangan manusia, warna tembus ke kedua sisi kain secara merata, dan harganya relatif mahal.\n- **Batik Cap**: Dibuat menggunakan stempel tembaga besar yang sudah bermotif. Polanya sangat simetris dan berulang presisi, prosesnya cepat, dan harganya lebih terjangkau.";
  }
  if (q.includes("kalimantan")) {
    return "Kalimantan memiliki kekayaan budaya kerajinan yang luar biasa, di antaranya:\n1. **Kain Sasirangan** khas suku Banjar di Kalimantan Selatan yang dibuat dengan teknik jumputan adat.\n2. **Tenun Ulap Doyo** dari Kalimantan Timur yang terbuat dari serat tanaman daun doyo.\n3. **Kerajinan Anyaman rotan dan manik-manik** suku Dayak.\n4. **Senjata Mandau** dengan ukiran sarung kayu berhiaskan bulu burung enggang.";
  }
  if (q.includes("wayang") || q.includes("unesco")) {
    return "Wayang Kulit diakui oleh UNESCO sebagai Warisan Mahakarya Dunia pada tahun 2003 karena memiliki kedalaman seni tutur cerita (storytelling) yang tinggi, keindahan kriya tatah kulit, serta nilai filosofis moral spiritual yang kuat yang memadukan kebaikan (kanan) dan keburukan (kiri) dalam lakon kehidupan.";
  }
  if (q.includes("sulawesi")) {
    return "Sulawesi kaya akan beragam kuliner khas yang lezat:\n1. **Coto Makassar** (Sulawesi Selatan): Sup daging dan jeroan kaya rempah dengan campuran kuah kacang.\n2. **Tinutuan / Bubur Manado** (Sulawesi Utara): Bubur sayur sehat dari labu kuning, jagung, bayam, dan kemangi.\n3. **Kaledo** (Sulawesi Tengah): Sup tulang kaki sapi berkuah asam pedas gurih.\n4. **Gohu Ikan** (Maluku Utara/Sulawesi): Sashimi khas timur berbumbu kenari jeruk nipis segar.";
  }
  if (q.includes("halo") || q.includes("hai") || q.includes("pagi") || q.includes("siang") || q.includes("sore")) {
    return "Halo! Ada yang bisa saya bantu seputar kekayaan budaya Nusantara hari ini? Silakan ajukan pertanyaan Anda!";
  }

  // Fallback response
  return "Pertanyaan yang sangat menarik! Kekayaan budaya Nusantara memang sangat luas dan mendalam. Sebagai Asisten Budaya AI, saya merekomendasikan Anda menjelajahi data budaya di menu utama kita, atau spesifikasi pertanyaan Anda ke tema batik, alat musik, kerajinan daerah, maupun kuliner nusantara.";
};

// Mock recognition models for batik recognition
interface BatikAnalysisResult {
  motifName: string;
  philosophy: string;
  visualTraits: string[];
  region: string;
  slug: string;
}

const MOCK_ANALYSES: Record<string, BatikAnalysisResult> = {
  kawung: {
    motifName: "Motif Kawung",
    philosophy: "Buah aren menyilang melambangkan kesucian hati, keadilan, serta keseimbangan jagat raya.",
    visualTraits: [
      "Struktur geometris berbentuk empat lingkaran menyilang.",
      "Terdapat titik pusat (cecek) di bagian tengah persilangan.",
      "Garis melengkung yang simetris dan berulang secara diagonal."
    ],
    region: "DI Yogyakarta / Jawa Tengah",
    slug: "batik-parang" // redirect to gallery
  },
  parang: {
    motifName: "Motif Parang",
    philosophy: "Garis diagonal berlekuk tajam melambangkan ombak samudra, menggambarkan semangat perjuangan tak padam dan kontinuitas generasi.",
    visualTraits: [
      "Garis jalin-menjalin miring diagonal bersudut 45 derajat.",
      "Elemen menyerupai parang atau huruf S yang berulang secara rapat.",
      "Batas pemisah berupa garis tipis (mrinis) di antara lajur motif."
    ],
    region: "Jawa Tengah / DI Yogyakarta",
    slug: "batik-parang"
  },
  megamendung: {
    motifName: "Motif Mega Mendung",
    philosophy: "Awan kelokan bergradasi melambangkan dunia atas pembawa hujan kesuburan, kesabaran kepala dingin, serta sifat mengayomi.",
    visualTraits: [
      "Lengkukan awan meliuk yang bergradasi warna dari gelap ke terang.",
      "Garis lengkung organik halus yang berulang secara horizontal.",
      "Elemen lengkung dinamis berciri khas pesisiran."
    ],
    region: "Cirebon, Jawa Barat",
    slug: "batik-parang"
  }
};

export default function TanyaAIPage() {
  const [activeTab, setActiveTab] = useState<"chatbot" | "batik">("chatbot");
  
  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Halo! Saya asisten budaya Culture Verse 👋 Tanyakan apa saja seputar kekayaan budaya Nusantara, saya siap membantu!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Batik Upload State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<BatikAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Chat Submission Handler
  const handleSendChat = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: textToSend
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponseText = getAIResponse(textToSend);
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: aiResponseText
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  // Chat Suggestion click
  const handleSuggestionClick = (query: string) => {
    handleSendChat(query);
  };

  // Image Upload Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysisResult(null); // Reset previous result
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysisResult(null);
    }
  };

  const runBatikAnalysis = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Select mock analysis results randomly (or based on file name if match found)
      const keys = Object.keys(MOCK_ANALYSES);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setAnalysisResult(MOCK_ANALYSES[randomKey]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <nav className="flex justify-center text-xs font-medium tracking-widest uppercase mb-6 text-black/50 dark:text-white/50">
          <Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white">Tanya AI</span>
        </nav>
        <span className="text-gold tracking-[0.2em] uppercase text-xs mb-4 font-bold block">
          Asisten Budaya
        </span>
        <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
          Tanya Apa Saja Soal Budaya Nusantara
        </h1>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-10">
          Didukung kecerdasan buatan, asisten kami siap menjawab pertanyaanmu seputar batik, alat musik, kerajinan, kuliner, dan warisan budaya Indonesia lainnya.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/10 dark:border-white/10">
          <button
            onClick={() => setActiveTab("chatbot")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "chatbot" 
                ? "bg-gold text-black shadow-md shadow-gold/20" 
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            💬 Tanya Asisten
          </button>
          <button
            onClick={() => setActiveTab("batik")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "batik" 
                ? "bg-gold text-black shadow-md shadow-gold/20" 
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            🔍 Kenali Motif Batik
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        
        {/* Tab 1: Chatbot */}
        {activeTab === "chatbot" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Suggestions */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4">
                    Coba Tanyakan...
                  </h3>
                  <div className="flex flex-col gap-3">
                    {[
                      "Apa makna motif batik parang?",
                      "Darimana asal usul angklung?",
                      "Apa perbedaan batik tulis dan batik cap?",
                      "Kerajinan khas apa yang berasal dari Kalimantan?",
                      "Mengapa wayang diakui UNESCO?",
                      "Apa saja kuliner khas Sulawesi?"
                    ].map((query) => (
                      <button
                        key={query}
                        onClick={() => handleSuggestionClick(query)}
                        className="w-full p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-gold dark:hover:border-gold hover:text-gold dark:hover:text-gold rounded-xl text-left text-xs font-medium leading-relaxed transition-all transform active:scale-98"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex gap-3 items-start text-[10px] text-black/45 dark:text-white/45 leading-relaxed">
                  <span className="text-xs">⚠️</span>
                  <p>
                    Jawaban dihasilkan oleh AI dan bersifat edukatif. Selalu verifikasi ke sumber terpercaya untuk informasi lebih lanjut.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Chat Box Area */}
            <div className="lg:col-span-8">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl flex flex-col h-[520px]">
                
                {/* Chat Feed */}
                <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex items-start gap-3 max-w-[85%] ${
                        msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                      }`}
                    >
                      {/* Avatar */}
                      {msg.sender === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center text-xs font-bold shrink-0 select-none">
                          🏺
                        </div>
                      )}
                      
                      {/* Bubble Text */}
                      <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
                        msg.sender === "user" 
                          ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30 text-black dark:text-white" 
                          : "bg-white dark:bg-black border-black/5 dark:border-white/5 text-black dark:text-white"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3 self-start">
                      <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center text-xs font-bold shrink-0 select-none animate-pulse">
                        🏺
                      </div>
                      <div className="p-4 bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-2xl flex gap-1 items-center justify-center min-w-[60px]">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input Controls */}
                <div className="p-4 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-b-3xl">
                  <div className="flex gap-3 items-end">
                    <textarea
                      rows={1}
                      placeholder="Tanyakan sesuatu tentang budaya Indonesia..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-grow py-3 px-4 text-xs bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    <button
                      onClick={() => handleSendChat(inputText)}
                      className="p-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black rounded-xl transition-all shadow-md active:scale-95"
                    >
                      ✈️
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Batik Analyzer */}
        {activeTab === "batik" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Image Upload Area */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl flex flex-col h-full">
                
                {/* Upload Target Box */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="flex-grow border-2 border-dashed border-black/20 dark:border-white/20 hover:border-gold dark:hover:border-gold rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-black relative overflow-hidden transition-colors min-h-[280px]"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />

                  {selectedImage ? (
                    <div className="relative w-full h-full min-h-[220px]">
                      <Image 
                        src={selectedImage}
                        alt="Preview Motif"
                        fill
                        className="object-contain rounded-xl"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                          setAnalysisResult(null);
                        }}
                        className="absolute top-2 right-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-[9px] font-bold uppercase shadow hover:bg-red-700 transition-colors"
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center pointer-events-none">
                      <span className="text-4xl mb-4 select-none">📤</span>
                      <span className="text-xs font-bold uppercase tracking-wider mb-2">Unggah Foto Kain Batik</span>
                      <span className="text-[10px] text-black/50 dark:text-white/50 mb-6">Format JPG, PNG, maksimal 5MB</span>
                      <button 
                        onClick={triggerFileSelect}
                        className="pointer-events-auto px-4 py-2 border border-black/10 dark:border-white/10 hover:border-gold dark:hover:border-gold rounded-lg text-[10px] font-bold uppercase tracking-wider"
                      >
                        Pilih Foto
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Trigger Analysis button */}
                <button
                  onClick={runBatikAnalysis}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full mt-6 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow disabled:opacity-30 disabled:pointer-events-none hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black"
                >
                  {isAnalyzing ? "AI sedang menganalisis motif..." : "Analisis Motif →"}
                </button>

              </div>
            </div>

            {/* Right Column: AI Analysis Result Panel */}
            <div className="lg:col-span-7">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 rounded-3xl h-full flex flex-col justify-center min-h-[350px]">
                
                {isAnalyzing ? (
                  <div className="text-center flex flex-col items-center gap-4 py-12">
                    <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-black/60 dark:text-white/60">
                      Mengidentifikasi bentuk garis, kelukan awan, cecek, dan mengompilasi filosofi...
                    </p>
                  </div>
                ) : analysisResult ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6 text-left"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gold tracking-widest block mb-1">Analisis Berhasil</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold">{analysisResult.motifName}</h2>
                    </div>

                    {/* Visual characteristics bullet points */}
                    <div className="border-t border-black/10 dark:border-white/10 pt-4">
                      <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block mb-2">Karakteristik Visual yang Terdeteksi</span>
                      <ul className="flex flex-col gap-1.5 text-xs text-black/80 dark:text-white/80 list-disc pl-4 leading-relaxed">
                        {analysisResult.visualTraits.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Motif philosophy */}
                    <div className="border-t border-black/10 dark:border-white/10 pt-4">
                      <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block mb-1">Filosofi Batik</span>
                      <p className="text-xs leading-relaxed italic text-black/60 dark:text-white/60">
                        &ldquo;{analysisResult.philosophy}&rdquo;
                      </p>
                    </div>

                    {/* Region match */}
                    <div className="border-t border-black/10 dark:border-white/10 pt-4">
                      <span className="text-[10px] uppercase font-bold text-black/50 dark:text-white/50 block mb-1">Perkiraan Asal Daerah</span>
                      <span className="text-sm font-bold text-gold">{analysisResult.region}</span>
                    </div>

                    <div className="border-t border-black/10 dark:border-white/10 pt-6 flex gap-4">
                      <Link
                        href={`/jelajahi?search=${analysisResult.motifName.replace("Motif ", "")}`}
                        className="px-5 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black"
                      >
                        Cari di Galeri →
                      </Link>
                    </div>

                  </motion.div>
                ) : (
                  <div className="text-center flex flex-col items-center gap-4 py-12 max-w-sm mx-auto">
                    <span className="text-5xl select-none opacity-40">🖼️</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
                      Hasil Analisis AI
                    </h3>
                    <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">
                      Unggah foto motif batik di panel kiri lalu tekan tombol Analisis untuk mengidentifikasi corak, arti filosofis, dan asal daerahnya di sini.
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* Tips section footer banner */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-3xl mt-12">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-4 text-center md:text-left">
            Tips Agar Hasil Lebih Akurat
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3 items-start">
              <span className="text-lg">📷</span>
              <div>
                <h5 className="text-xs font-bold">Pencahayaan Cukup</h5>
                <p className="text-[10px] text-black/50 dark:text-white/50 mt-1 leading-relaxed">Foto motif batik dari jarak dekat dengan pencahayaan yang merata agar garis terdeteksi jelas.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-lg">✂️</span>
              <div>
                <h5 className="text-xs font-bold">Pastikan Motif Jelas</h5>
                <p className="text-[10px] text-black/50 dark:text-white/50 mt-1 leading-relaxed">Hindari lipatan kain berlebih atau sudut pengambilan foto yang terpotong terlalu banyak.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-lg">❓</span>
              <div>
                <h5 className="text-xs font-bold">Tanya Lebih Spesifik</h5>
                <p className="text-[10px] text-black/50 dark:text-white/50 mt-1 leading-relaxed">Pada asisten chatbot, semakin detail pertanyaan Anda, semakin dalam informasi edukatif yang diberikan.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
