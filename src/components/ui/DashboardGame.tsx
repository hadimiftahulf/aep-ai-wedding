"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GameItem {
  id: number;
  x: number;
  y: number;
  type: "heart" | "flower" | "ring" | "bomb";
  speed: number;
}

export function DashboardGame({ onClose }: { onClose?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [items, setItems] = useState<GameItem[]>([]);
  const [basketX, setBasketX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const spawnItem = useCallback(() => {
    const types: ("heart" | "flower" | "ring" | "bomb")[] = ["heart", "flower", "ring", "heart", "bomb"];
    const type = types[Math.floor(Math.random() * types.length)];
    const newItem: GameItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5,
      y: -10,
      type,
      speed: Math.random() * 2 + 1.5,
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const updateGame = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;

    if (deltaTime > 800) {
      spawnItem();
      lastTimeRef.current = time;
    }

    setItems((prev) => {
      const updated = prev
        .map((item) => ({ ...item, y: item.y + item.speed }))
        .filter((item) => item.y < 110);

      updated.forEach((item, index) => {
        if (item.y > 80 && item.y < 95 && Math.abs(item.x - basketX) < 12) {
          if (item.type === "bomb") {
            setIsPlaying(false);
            setItems([]);
          } else {
            const points = item.type === "ring" ? 20 : item.type === "heart" ? 10 : 5;
            setScore((s) => s + points);
            updated.splice(index, 1);
          }
        }
      });

      return updated;
    });

    gameLoopRef.current = requestAnimationFrame(updateGame);
  }, [basketX, spawnItem]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = requestAnimationFrame(updateGame);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (score > highScore) setHighScore(score);
    }
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, updateGame, score, highScore]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, x)));
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-gold-400/20 shadow-2xl overflow-hidden relative group">
      <div className="p-4 border-b border-gold-400/10 flex items-center justify-between bg-gradient-to-r from-teal-950 to-teal-900 text-white">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8 bg-gold-400 text-teal-950 rounded-xl flex items-center justify-center shadow-lg rotate-3 text-lg">
             💘
           </div>
           <div>
             <h4 className="font-heading text-xs font-black uppercase tracking-tighter">Wedding Love Catch</h4>
             <p className="text-[7px] text-gold-400/80 uppercase tracking-widest font-bold">Tangkap Berkahnya!</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
              title="Tutup Game"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div className="text-right p-2 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[6px] uppercase tracking-widest text-gold-400 font-black">Score</p>
            <p className="text-sm font-heading font-black">{score}</p>
          </div>
          <div className="text-right p-2 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[6px] uppercase tracking-widest text-white/40 font-black">Best</p>
            <p className="text-sm font-heading font-black">{highScore}</p>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="h-[300px] bg-[#fcfbf7] relative cursor-none touch-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {/* Animated Background Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/luxury-floral.png" alt="" fill className="object-contain" />
        </div>

        {!isPlaying ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-teal-950/90 backdrop-blur-md text-center px-6">
            <div className="absolute inset-0 opacity-10">
               <Image src="/images/luxury-floral.png" alt="" fill className="object-cover" />
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gold-400/20 blur-3xl rounded-full scale-150" />
              <Image 
                src="/images/couple-chibi.png" 
                alt="Couple" 
                width={120} 
                height={120} 
                className="relative z-10 drop-shadow-2xl"
              />
            </motion.div>

            <h5 className="text-gold-400 font-heading text-xl font-bold mb-1 tracking-tight">Main Bentar Yuk?</h5>
            <p className="text-white/60 text-[8px] leading-relaxed uppercase tracking-[0.3em] font-black mb-6">Tangkap Berkah Cinta & Bunga</p>
            
            <button 
              onClick={() => { setScore(0); setIsPlaying(true); }}
              className="px-8 py-3 bg-gold-400 text-teal-950 rounded-2xl font-heading font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {score > 0 ? "COBA LAGI" : "MULAI MAIN"}
            </button>
          </div>
        ) : (
          <>
            {/* Falling Items */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="absolute pointer-events-none"
                  style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
                >
                  {item.type === "heart" ? (
                    <span className="text-2xl drop-shadow-md">❤️</span>
                  ) : item.type === "flower" ? (
                    <span className="text-2xl drop-shadow-md">🌸</span>
                  ) : item.type === "ring" ? (
                    <span className="text-2xl drop-shadow-lg scale-125">💍</span>
                  ) : (
                    <span className="text-2xl drop-shadow-md filter grayscale">💣</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Platform / Mascot Catching */}
            <motion.div 
              className="absolute bottom-6 flex flex-col items-center pointer-events-none"
              style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
               <div className="relative">
                  <div className="absolute -inset-4 bg-gold-400/30 blur-xl rounded-full animate-pulse" />
                  <Image 
                    src="/images/couple-chibi.png" 
                    alt="Couple" 
                    width={80} 
                    height={80} 
                    className="relative z-10 drop-shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-2 text-xl animate-bounce">✨</div>
               </div>
            </motion.div>
          </>
        )}
      </div>

      <div className="p-4 bg-teal-950/5 border-t border-gold-400/10 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <p className="text-[8px] text-teal-950/40 uppercase font-black tracking-widest">
            Arahkan Kursor / Jari Untuk Menangkap
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
