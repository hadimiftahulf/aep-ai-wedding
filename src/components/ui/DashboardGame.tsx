"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Apa kewajiban utama seorang suami terhadap istri dalam rumah tangga?",
    options: ["Memberi nafkah lahir dan batin", "Menjaga kebersihan rumah", "Menyerahkan semua keputusan pada istri"],
    correct: 0,
    explanation: "Suami wajib memberikan nafkah lahir (materi) & batin (kasih sayang) sesuai kemampuannya."
  },
  {
    id: 2,
    question: "Menurut hadits, siapakah orang yang paling baik di antara kalian?",
    options: ["Yang paling banyak hartanya", "Yang paling baik kepada keluarganya", "Yang paling tinggi jabatannya"],
    correct: 1,
    explanation: "Rasulullah SAW bersabda: 'Sebaik-baik kalian adalah yang paling baik kepada keluarganya'."
  },
  {
    id: 3,
    question: "Apa peran utama istri terhadap suami dalam ketaatan kepada Allah?",
    options: ["Memberi izin tanpa syarat", "Mentaati suami dalam kebaikan", "Mengatur keuangan mandiri"],
    correct: 1,
    explanation: "Istri wajib mentaati suami selama perintahnya tidak bertentangan dengan syariat Allah."
  },
  {
    id: 4,
    question: "Apa arti dari prinsip 'Mu'asyarah bil Ma'ruf' dalam pernikahan?",
    options: ["Bersaing dalam karir", "Bergaul dengan cara yang baik dan patut", "Fokus ibadah individual"],
    correct: 1,
    explanation: "Prinsip ini menekankan pergaulan yang harmonis, santun, dan saling menghargai."
  },
  {
    id: 5,
    question: "Siapakah yang ditunjuk sebagai pemimpin (Qawwam) dalam keluarga?",
    options: ["Suami sebagai kepala keluarga", "Istri pengatur rumah tangga", "Anak sulung"],
    correct: 0,
    explanation: "Al-Qur'an (An-Nisa: 34) menyebutkan laki-laki (suami) adalah pemimpin bagi perempuan (istri)."
  },
  {
    id: 6,
    question: "Perbuatan halal apa yang paling dibenci oleh Allah SWT?",
    options: ["Berhutang", "Perceraian (Talak)", "Poligami"],
    correct: 1,
    explanation: "Hadits riwayat Abu Dawud: 'Perkara halal yang paling dibenci Allah adalah perceraian'."
  },
  {
    id: 7,
    question: "Tujuan utama pernikahan dalam Islam sering disebut dengan istilah?",
    options: ["Sakinah, Mawaddah, Warahmah", "Harta, Tahta, Wanita", "Sukses dan Bahagia"],
    correct: 0,
    explanation: "Tujuan pernikahan adalah meraih ketenangan (Sakinah), cinta kasih (Mawaddah), dan rahmat (Warahmah)."
  },
  {
    id: 8,
    question: "Kunci utama penyelesaian konflik suami-istri menurut syariat adalah?",
    options: ["Mendiamkan masalah", "Musyawarah dan saling memaafkan", "Lapor kepada orang tua"],
    correct: 1,
    explanation: "Komunikasi yang baik (musyawarah) dan pemaaf adalah kunci penyelesaian konflik rumah tangga."
  },
  {
    id: 9,
    question: "Di antara hak utama istri yang wajib dipenuhi suami selain materi adalah?",
    options: ["Bebas keluar rumah kapan saja", "Mendapat pendidikan dan bimbingan agama", "Diberi perhiasan mewah"],
    correct: 1,
    explanation: "Suami bertanggung jawab menjaga diri dan keluarganya dari api neraka (At-Tahrim: 6) melalui bimbingan agama."
  },
  {
    id: 10,
    question: "Bagaimana sikap terbaik saat pasangan sedang marah?",
    options: ["Membalas dengan kemarahan", "Diam, mendengarkan, dan meredakan suasana", "Langsung pergi meninggalkan rumah"],
    correct: 1,
    explanation: "Diam saat marah dianjurkan oleh Nabi SAW untuk mencegah perkataan yang menyakiti atau memperkeruh suasana."
  }
];

export function DashboardGame({ onClose }: { onClose?: () => void }) {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("start");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startQuiz = () => {
    setGameState("playing");
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setShowFeedback(false);
  };

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + 10);
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setShowFeedback(false);
      } else {
        setGameState("result");
      }
    }, 2000);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-gold-400/20 shadow-xl overflow-hidden relative flex flex-col">
      {/* Compact Header */}
      <div className="p-4 px-6 border-b border-gold-400/10 flex items-center justify-between bg-gradient-to-r from-navy-950 to-navy-900 text-white relative z-10">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8 bg-gold-400 text-navy-950 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 text-sm">
             📚
           </div>
           <div>
             <h4 className="font-heading text-xs font-black uppercase tracking-widest leading-none mb-1">Sakinah Trivia</h4>
             <p className="text-[7px] text-gold-400/80 uppercase tracking-[0.2em] font-bold leading-none">Wawasan Suami Istri</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           {gameState === "playing" && (
             <div className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 flex items-center">
                <span className="text-[8px] uppercase font-black text-gold-400 mr-2 tracking-wider">Score</span>
                <span className="font-heading font-black text-sm">{score}</span>
             </div>
           )}
           {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
            </button>
           )}
        </div>
      </div>

      <div className="relative p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center min-h-[360px] md:min-h-[380px]">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <Image src="/images/luxury-floral.png" alt="" fill className="object-cover" />
        </div>

        <AnimatePresence mode="wait">
          {gameState === "start" && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="text-center relative z-10"
            >
              <div className="mb-5 relative inline-block">
                 <div className="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full scale-125" />
                 <Image src="/images/couple-chibi.png?v=3" alt="Couple" width={110} height={110} className="relative z-10 drop-shadow-xl" />
              </div>
              <h5 className="font-heading text-xl font-bold text-navy-950 mb-2 uppercase tracking-tight">Kuis Wawasan Sakinah</h5>
              <p className="text-navy-950/40 text-[9px] uppercase tracking-[0.2em] font-black mb-6 leading-relaxed max-w-[250px] mx-auto">
                10 Pertanyaan esensial tentang hak & tanggung jawab rumah tangga impian.
              </p>
              <button 
                onClick={startQuiz}
                className="group relative px-8 py-3 bg-navy-950 text-gold-400 rounded-xl font-heading font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-navy-900 transition-all active:scale-95"
              >
                Mulai Kuis
                <div className="absolute inset-0 border border-gold-400/20 rounded-xl scale-105 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key={`q-${currentIdx}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-full sm:max-w-[420px] relative z-10 flex flex-col"
            >
              <div className="text-center mb-5">
                <span className="text-[9px] font-black text-gold-600 uppercase tracking-[0.3em] mb-2 block">
                  Soal {currentIdx + 1} <span className="opacity-40">/ {QUESTIONS.length}</span>
                </span>
                <h6 className="font-heading text-[15px] sm:text-base md:text-lg font-bold text-navy-950 leading-snug px-2 sm:px-0">
                   {QUESTIONS[currentIdx].question}
                </h6>
              </div>

              <div className="space-y-2.5 flex-1">
                {QUESTIONS[currentIdx].options.map((opt, i) => {
                  const isCorrect = i === QUESTIONS[currentIdx].correct;
                  const isSelected = i === selectedOpt;
                  
                  let bgColor = "bg-white/80 hover:bg-white hover:border-gold-400/40 shadow-sm";
                  if (showFeedback) {
                    if (isCorrect) bgColor = "bg-green-50/80 border-green-500/50 shadow-green-500/10 text-green-900";
                    else if (isSelected) bgColor = "bg-red-50/80 border-red-400/50 text-red-900";
                    else bgColor = "opacity-30 bg-white/40";
                  }

                  return (
                    <button
                      key={i}
                      disabled={showFeedback}
                      onClick={() => handleSelect(i)}
                      className={`w-full p-3 px-4 rounded-xl border border-gold-400/10 transition-all text-left flex items-center gap-3 ${bgColor} ${!showFeedback && 'hover:translate-x-1'}`}
                    >
                      <div className={`h-6 w-6 rounded-lg flex items-center justify-center font-heading font-black text-[10px] shrink-0 transition-colors ${
                        showFeedback && isCorrect ? 'bg-green-500 text-white' : 
                        showFeedback && isSelected ? 'bg-red-500 text-white' : 
                        'bg-navy-950/5 text-navy-950'
                      }`}>
                         {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-body text-[11px] font-bold leading-tight">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Area - Fixed height to prevent layout shift */}
              <div className="h-[70px] mt-4">
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-gold-400/5 rounded-xl border border-gold-400/20 h-full flex flex-col justify-center"
                    >
                      <p className="text-[8px] font-black text-gold-600 uppercase tracking-widest mb-0.5">Penjelasan Singkat</p>
                      <p className="text-[9px] text-navy-950/70 font-medium italic leading-snug line-clamp-2">{QUESTIONS[currentIdx].explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center relative z-10"
            >
              <div className="mb-5 relative inline-block p-6 sm:p-8 bg-white/40 backdrop-blur-md rounded-full shadow-xl border border-gold-400/20">
                 <div className="absolute inset-0 bg-gold-400 animate-pulse-slow blur-[40px] opacity-20" />
                 <span className="text-4xl sm:text-5xl mb-2 sm:mb-3 block drop-shadow-sm">🎓</span>
                 <p className="font-heading text-4xl sm:text-5xl font-black text-navy-950 leading-none">{score}</p>
                 <p className="text-[8px] uppercase tracking-[0.3em] text-navy-950/40 font-black mt-2">Nilai Akhir</p>
              </div>

              <h5 className="font-heading text-lg sm:text-xl font-bold text-navy-950 mb-2 uppercase tracking-tight">Kuis Selesai!</h5>
              <p className="text-navy-950/50 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mb-6 px-2 sm:px-4 leading-relaxed">
                 {score === 100 
                  ? "Sempurna! Anda Sangat Memahami Ilmu Pernikahan." 
                  : score >= 70 
                    ? "Sangat Bagus! Sedikit Tambahan Wawasan Akan Sempurna."
                    : "Mari Belajar Bersama Membangun Rumah Tangga Sakinah."}
              </p>

              <div className="flex gap-3 justify-center">
                <button 
                  onClick={startQuiz}
                  className="px-6 py-2.5 bg-navy-950 text-gold-400 rounded-xl font-heading font-black text-[9px] uppercase tracking-widest shadow-md hover:bg-navy-900 transition-all"
                >
                  Ulangi Kuis
                </button>
                {onClose && (
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gold-400 text-navy-950 rounded-xl font-heading font-black text-[9px] uppercase tracking-widest shadow-md hover:bg-gold-500 transition-all"
                  >
                    Tutup
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
