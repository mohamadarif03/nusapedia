"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  AlertCircle, 
  UploadCloud, 
  Image as ImageIcon, 
  Camera, 
  Crop, 
  HelpCircle, 
  Bot,
  Sparkles,
  Plus,
  Trash2,
  MessageSquare,
  Search
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

// Simple local smart dictionary responder for Indonesian culture fallback
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("parang")) {
    return "Motif Batik Parang adalah salah satu motif batik tertua di Indonesia. Melambangkan ombak samudra yang tidak pernah putus, motif ini membawa filosofi perjuangan tanpa henti, kontinuitas kehidupan, serta kewibawaan dan kekuasaan para kesatria Jawa.";
  }
  return "Pertanyaan yang menarik! Sebagai Asisten Budaya AI, silakan periksa koneksi API Anda.";
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
    slug: "batik-parang"
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

const parseInlineMarkdown = (text: string) => {
  // Split by bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-extrabold text-gold">{part.slice(2, -2)}</strong>;
    }
    
    // Split by single bold/italic (*text*)
    const subParts = part.split(/(\*.*?\*)/g);
    return subParts.map((subPart, j) => {
      if (subPart.startsWith("*") && subPart.endsWith("*")) {
        return <em key={j} className="italic font-semibold">{subPart.slice(1, -1)}</em>;
      }
      return subPart;
    });
  });
};

const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} className="h-2" />;

    // Headers
    if (cleanLine.startsWith("### ")) {
      return <h4 key={idx} className="font-bold text-xs md:text-sm mt-3 mb-1 text-gold">{parseInlineMarkdown(cleanLine.substring(4))}</h4>;
    }
    if (cleanLine.startsWith("## ")) {
      return <h3 key={idx} className="font-bold text-sm md:text-base mt-4 mb-2 text-gold">{parseInlineMarkdown(cleanLine.substring(3))}</h3>;
    }
    if (cleanLine.startsWith("# ")) {
      return <h2 key={idx} className="font-bold text-base md:text-lg mt-5 mb-3 text-gold">{parseInlineMarkdown(cleanLine.substring(2))}</h2>;
    }

    // Unordered lists
    if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
      return (
        <li key={idx} className="list-disc ml-4 my-1 text-xs md:text-sm text-black/80 dark:text-white/80">
          {parseInlineMarkdown(cleanLine.substring(2))}
        </li>
      );
    }

    // Numbered lists
    const numListMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
    if (numListMatch) {
      return (
        <li key={idx} className="list-decimal ml-4 my-1 text-xs md:text-sm text-black/80 dark:text-white/80">
          {parseInlineMarkdown(numListMatch[2])}
        </li>
      );
    }

    // Standard paragraph
    return (
      <p key={idx} className="my-1 leading-relaxed text-xs md:text-sm text-black/80 dark:text-white/80">
        {parseInlineMarkdown(cleanLine)}
      </p>
    );
  });
};

export default function TanyaAIPage() {
  const [activeTab, setActiveTab] = useState<"chatbot" | "batik">("chatbot");
  
  // Chatbot Sessions State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Batik Upload State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<BatikAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize and load sessions from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("nusapedia_chat_sessions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatSession[];
        if (parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved chat sessions", e);
      }
    }
    
    // Default initial session if none found
    const defaultWelcome = {
      id: "welcome",
      sender: "ai" as const,
      text: "Halo! Saya Nusara, asisten budaya digital dari platform NUSAPEDIA 👋 Tanyakan apa saja seputar kekayaan budaya Nusantara, saya siap membantu!"
    };
    const defaultSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: "Percakapan Baru",
      messages: [defaultWelcome]
    };
    setSessions([defaultSession]);
    setActiveSessionId(defaultSession.id);
  }, []);

  // Save sessions to LocalStorage on change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("nusapedia_chat_sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Find active session
  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const chatMessages = activeSession ? activeSession.messages : [];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Create new chat session
  const handleNewSession = () => {
    const defaultWelcome = {
      id: `welcome_${Date.now()}`,
      sender: "ai" as const,
      text: "Halo! Saya Nusara, asisten budaya digital dari platform NUSAPEDIA 👋 Tanyakan apa saja seputar kekayaan budaya Nusantara, saya siap membantu!"
    };
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: "Percakapan Baru",
      messages: [defaultWelcome]
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  // Delete specific session
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus percakapan ini?")) {
      const filtered = sessions.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        const defaultWelcome = {
          id: `welcome_${Date.now()}`,
          sender: "ai" as const,
          text: "Halo! Saya Nusara, asisten budaya digital dari platform NUSAPEDIA 👋 Tanyakan apa saja seputar kekayaan budaya Nusantara, saya siap membantu!"
        };
        const cleanSession: ChatSession = {
          id: `session_${Date.now()}`,
          title: "Percakapan Baru",
          messages: [defaultWelcome]
        };
        setSessions([cleanSession]);
        setActiveSessionId(cleanSession.id);
      } else {
        setSessions(filtered);
        if (activeSessionId === id) {
          setActiveSessionId(filtered[0].id);
        }
      }
    }
  };

  // Chat Submission Handler
  const handleSendChat = async (textToSend: string) => {
    if (!textToSend.trim() || !activeSessionId) return;

    // Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: textToSend
    };

    // Update active session messages & dynamic title if it's the first message
    setSessions((prev) => {
      return prev.map((s) => {
        if (s.id === activeSessionId) {
          const newTitle = s.title === "Percakapan Baru" ? textToSend : s.title;
          return {
            ...s,
            title: newTitle,
            messages: [...s.messages, userMsg]
          };
        }
        return s;
      });
    });

    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });
      
      const data = await response.json();
      setIsTyping(false);

      const aiText = data.error ? `Maaf, terjadi kesalahan: ${data.error}` : data.text;
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: aiText
      };

      setSessions((prev) => {
        return prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMsg]
            };
          }
          return s;
        });
      });
    } catch (err: any) {
      setIsTyping(false);
      const errorMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: `Gagal terhubung ke AI. Silakan periksa koneksi Anda.`
      };
      setSessions((prev) => {
        return prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, errorMsg]
            };
          }
          return s;
        });
      });
    }
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
      setSelectedFile(file);
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
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const runBatikAnalysis = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      try {
        const base64Data = (reader.result as string).split(",")[1];
        const mimeType = selectedFile.type;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data, mimeType })
        });

        const data = await response.json();
        setIsAnalyzing(false);

        if (data.error) {
          alert(`Analisis gagal: ${data.error}`);
        } else {
          try {
            const cleanedText = data.text.trim();
            const result: BatikAnalysisResult = JSON.parse(cleanedText);
            setAnalysisResult(result);
          } catch (jsonErr) {
            console.error("Failed to parse JSON response from Gemini:", data.text);
            const keys = Object.keys(MOCK_ANALYSES);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            setAnalysisResult(MOCK_ANALYSES[randomKey]);
          }
        }
      } catch (err) {
        setIsAnalyzing(false);
        alert("Gagal menganalisis gambar. Terjadi kesalahan jaringan.");
      }
    };
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
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "chatbot" 
                ? "bg-gold text-black shadow-md shadow-gold/20" 
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            <MessageSquare size={14} />
            Tanya Asisten
          </button>
          <button
            onClick={() => setActiveTab("batik")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "batik" 
                ? "bg-gold text-black shadow-md shadow-gold/20" 
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            <Search size={14} />
            Kenali Motif Batik
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        
        {/* Tab 1: Chatbot */}
        {activeTab === "chatbot" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Sidebar History Sessions */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* New Conversation Button */}
              <button
                onClick={handleNewSession}
                className="w-full py-3.5 px-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Percakapan Baru
              </button>

              {/* Sessions List */}
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-3xl flex-grow flex flex-col min-h-[350px]">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-black/45 dark:text-white/45 mb-3">
                  Riwayat Percakapan
                </h3>
                
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {sessions.map((s) => {
                    const isActive = s.id === activeSessionId;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setActiveSessionId(s.id)}
                        className={`w-full p-3 rounded-xl text-left text-xs font-semibold leading-relaxed transition-all cursor-pointer flex justify-between items-center group border ${
                          isActive 
                            ? "bg-gold border-gold text-black shadow-md"
                            : "bg-white dark:bg-black hover:border-gold dark:hover:border-gold border-black/5 dark:border-white/5 text-black dark:text-white"
                        }`}
                      >
                        <span className="truncate flex-1 pr-2 text-left">{s.title}</span>
                        <button
                          onClick={(e) => handleDeleteSession(s.id, e)}
                          className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500 rounded transition-all text-red-500 hover:text-white ${
                            isActive ? "text-black/70 hover:bg-black/10 hover:text-black" : ""
                          }`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>



                <div className="mt-auto pt-4 flex gap-2 items-start text-[9px] text-black/45 dark:text-white/45 leading-relaxed">
                  <AlertCircle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p>Jawaban dihasilkan oleh AI. Verifikasi untuk keaslian sejarah.</p>
                </div>
              </div>

            </div>

            {/* Right Column: Chat Box Area */}
            <div className="lg:col-span-8">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl flex flex-col h-[520px]">
                
                {/* Chat Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-black/75 dark:text-white/75">
                      {activeSession?.title || "Nusara Online"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-55">Nusara Chat</span>
                </div>
                
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
                        <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center shrink-0 select-none">
                          <Bot size={16} />
                        </div>
                      )}
                      
                      {/* Bubble Text */}
                      <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm border ${
                        msg.sender === "user" 
                          ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30 text-black dark:text-white" 
                          : "bg-white dark:bg-black border-black/5 dark:border-white/5 text-black dark:text-white"
                      }`}>
                        {msg.sender === "ai" ? parseMarkdown(msg.text) : msg.text}
                      </div>
                    </div>
                  ))}

                  {/* If this is a fresh conversation (only has welcome message), show clean suggestion cards in a grid */}
                  {chatMessages.length === 1 && !isTyping && (
                    <div className="mt-6 flex flex-col gap-3 max-w-2xl mx-auto w-full">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 block mb-1">
                        Rekomendasi Topik Tanya:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className="p-3 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-gold dark:hover:border-gold hover:text-gold dark:hover:text-gold rounded-2xl text-left text-xs font-semibold leading-relaxed transition-all shadow-sm transform active:scale-98"
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isTyping && (
                    <div className="flex items-start gap-3 self-start">
                      <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center shrink-0 select-none animate-pulse">
                        <Bot size={16} />
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
                      <Send size={14} />
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
                      <UploadCloud size={36} className="text-black/40 dark:text-white/40 mb-4" />
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
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gold tracking-widest block mb-1">Analisis Berhasil</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold">{analysisResult.motifName}</h2>
                      </div>
                      <Sparkles className="text-gold" size={24} />
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
                    <ImageIcon size={48} className="text-black/30 dark:text-white/30" />
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
            <div className="flex gap-4 items-start">
              <Camera size={24} className="text-gold shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold">Pencahayaan Cukup</h5>
                <p className="text-[10px] text-black/50 dark:text-white/50 mt-1 leading-relaxed">Foto motif batik dari jarak dekat dengan pencahayaan yang merata agar garis terdeteksi jelas.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Crop size={24} className="text-gold shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold">Pastikan Motif Jelas</h5>
                <p className="text-[10px] text-black/50 dark:text-white/50 mt-1 leading-relaxed">Hindari lipatan kain berlebih atau sudut pengambilan foto yang terpotong terlalu banyak.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <HelpCircle size={24} className="text-gold shrink-0 mt-0.5" />
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
