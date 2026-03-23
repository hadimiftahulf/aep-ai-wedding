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
    options: [
      "Memberi nafkah lahir dan batin",
      "Hanya menjaga kebersihan rumah",
      "Menyerahkan seluruh keputusan pada istri"
    ],
    correct: 0,
    explanation: "Suami wajib memberikan nafkah lahir (materi) dan batin (kasih sayang & perhatian) sesuai kemampuannya."
  },
  {
    id: 2,
    question: "Menurut hadits, siapakah orang yang paling baik di antara kalian?",
    options: [
      "Yang paling banyak hartanya",
      "Yang paling baik kepada keluarganya",
      "Yang paling tinggi jabatannya"
    ],
    correct: 1,
    explanation: "Rasulullah SAW bersabda: 'Sebaik-baik kalian adalah yang paling baik kepada keluarganya'."
  },
  {
    id: 3,
    question: "Apa peran utama istri terhadap suami dalam ketaatan kepada Allah?",
    options: [
      "Memberikan izin untuk semua hal tanpa syarat",
      "Mentaati dan menghormati suami dalam kebaikan",
      "Mengatur seluruh keuangan tanpa diskusi"
    ],
    correct: 1,
    explanation: "Istri wajib mentaati suami selama perintahnya tidak bertentangan dengan syariat Allah."
  },
  {
    id: 4,
    question: "Apa arti dari prinsip 'Mu'asyarah bil Ma'ruf' dalam pernikahan?",
    options: [
      "Bersaing dalam meraih prestasi",
      "Bergaul dengan cara yang baik dan patut",
      "Hanya peduli pada kepentingan sendiri"
    ],
    correct: 1,
    explanation: "Prinsip ini menekankan pergaulan yang harmonis, santun, dan saling menghargai antara suami-istri."
  },
  {
    id: 5,
    question: "Siapakah yang ditunjuk sebagai pemimpin (Qawwam) dalam keluarga?",
    options: [
      "Suami sebagai kepala keluarga",
      "Istri sebagai pengatur rumah tangga",
      "Anak yang paling dewasa"
    ],
    correct: 0,
    explanation: "Al-Qur'an (An-Nisa: 34) menyebutkan laki-laki (suami) adalah pemimpin bagi perempuan (istri) dalam keluarga."
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
      setScore(s => s + 20);
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setShowFeedback(false);
      } else {
        setGameState("result");
      }
    }, 3000);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-gold-400/20 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gold-400/10 flex items-center justify-between bg-gradient-to-r from-teal-950 to-teal-900 text-white relative z-10">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-gold-400 text-teal-950 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 text-xl">
             📚
           </div>
           <div>
             <h4 className="font-heading text-sm font-black uppercase tracking-widest">Sakinah Trivia</h4>
             <p className="text-[8px] text-gold-400/80 uppercase tracking-[0.3em] font-bold">Wawasan Peran Suami & Istri</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           {gameState === "playing" && (
             <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-black text-gold-400 mr-2">Score</span>
                <span className="font-heading font-black">{score}</span>
             </div>
           )}
           {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
            </button>
           )}
        </div>
      </div>

      <div className="flex-1 relative p-8 flex flex-col items-center justify-center">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/luxury-floral.png" alt="" fill className="object-cover" />
        </div>

        <AnimatePresence mode="wait">
          {gameState === "start" && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center relative z-10"
            >
              <div className="mb-8 relative inline-block">
                 <div className="absolute inset-0 bg-gold-400/20 blur-3xl rounded-full scale-150" />
                 <Image src="/images/couple-chibi.png" alt="Couple" width={160} height={160} className="relative z-10 drop-shadow-2xl" />
              </div>
              <h5 className="font-heading text-2xl font-bold text-teal-950 mb-3 uppercase tracking-tight">Kuis Wawasan Sakinah</h5>
              <p className="text-teal-950/40 text-[10px] uppercase tracking-[0.3em] font-black mb-8 leading-relaxed max-w-xs mx-auto">
                Uji pemahaman Anda tentang peran dan tanggung jawab dalam rumah tangga impian.
              </p>
              <button 
                onClick={startQuiz}
                className="group relative px-10 py-4 bg-teal-950 text-gold-400 rounded-2xl font-heading font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-teal-900 transition-all active:scale-95"
              >
                Mulai Kuis
                <div className="absolute inset-0 border border-gold-400/20 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              key={`q-${currentIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-lg relative z-10"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] font-black text-gold-600 uppercase tracking-[0.4em] mb-4 block">Pertanyaan {currentIdx + 1}/{QUESTIONS.length}</span>
                <h6 className="font-heading text-xl font-bold text-teal-950 leading-tight">
                   {QUESTIONS[currentIdx].question}
                </h6>
              </div>

              <div className="space-y-4">
                {QUESTIONS[currentIdx].options.map((opt, i) => {
                  const isCorrect = i === QUESTIONS[currentIdx].correct;
                  const isSelected = i === selectedOpt;
                  
                  let bgColor = "bg-white/80 hover:bg-white hover:border-gold-400/50 shadow-sm";
                  if (showFeedback) {
                    if (isCorrect) bgColor = "bg-green-100 border-green-500 shadow-green-500/20 text-green-900";
                    else if (isSelected) bgColor = "bg-red-50 border-red-400 text-red-900";
                    else bgColor = "opacity-40 bg-white/50";
                  }

                  return (
                    <button
                      key={i}
                      disabled={showFeedback}
                      onClick={() => handleSelect(i)}
                      className={`w-full p-5 rounded-2xl border border-gold-400/10 transition-all text-left flex items-center gap-4 ${bgColor} ${!showFeedback && 'hover:translate-x-2'}`}
                    >
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-heading font-black text-[12px] shrink-0 ${
                        showFeedback && isCorrect ? 'bg-green-500 text-white' : 
                        showFeedback && isSelected ? 'bg-red-500 text-white' : 
                        'bg-teal-950/5 text-teal-950'
                      }`}>
                         {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-body text-xs font-bold leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 bg-gold-400/10 rounded-2xl border border-gold-400/20"
                  >
                    <p className="text-[9px] font-black text-gold-600 uppercase tracking-widest mb-1">Kenapa ini benar?</p>
                    <p className="text-[10px] text-teal-950/70 font-medium italic">{QUESTIONS[currentIdx].explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative z-10"
            >
              <div className="mb-8 relative inline-block p-10 bg-white/40 backdrop-blur-md rounded-full shadow-2xl border border-gold-400/20">
                 <div className="absolute inset-0 bg-gold-400 animate-pulse-slow blur-3xl opacity-20" />
                 <span className="text-6xl mb-4 block">🎓</span>
                 <p className="font-heading text-5xl font-black text-teal-950">{score}</p>
                 <p className="text-[9px] uppercase tracking-[0.4em] text-teal-950/40 font-black mt-2">Total Score</p>
              </div>

              <h5 className="font-heading text-2xl font-bold text-teal-950 mb-3 uppercase tracking-tight">Kuis Selesai!</h5>
              <p className="text-teal-950/50 text-[10px] font-bold uppercase tracking-widest mb-8">
                 {score === 100 ? "Luar Biasa! Anda Sangat Siap Sakinah." : "Bagus! Mari Saling Menguatkan Pemahaman."}
              </p>

              <div className="flex gap-4 justify-center">
                <button 
                  onClick={startQuiz}
                  className="px-8 py-3 bg-teal-950 text-gold-400 rounded-2xl font-heading font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-teal-900 transition-all"
                >
                  Main Lagi
                </button>
                {onClose && (
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-gold-400 text-teal-950 rounded-2xl font-heading font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold-500 transition-all"
                  >
                    Tutup
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-teal-950/5 border-t border-gold-400/10 flex items-center justify-center">
        <p className="text-[8px] text-teal-950/40 uppercase font-black tracking-widest">Digital Marriage Education Module 1.0</p>
      </div>
    </div>
  );
}
