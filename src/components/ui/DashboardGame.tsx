"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GameItem {
  id: number;
  x: number;
  y: number;
  type: "heart" | "flower" | "bomb";
  speed: number;
}

export function DashboardGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [items, setItems] = useState<GameItem[]>([]);
  const [basketX, setBasketX] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const spawnItem = useCallback(() => {
    const types: ("heart" | "flower" | "bomb")[] = ["heart", "flower", "heart", "flower", "bomb"];
    const type = types[Math.floor(Math.random() * types.length)];
    const newItem: GameItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5,
      y: -10,
      type,
      speed: Math.random() * 2 + 1,
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const updateGame = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;

    if (deltaTime > 1000) {
      spawnItem();
      lastTimeRef.current = time;
    }

    setItems((prev) => {
      const updated = prev
        .map((item) => ({ ...item, y: item.y + item.speed }))
        .filter((item) => item.y < 110);

      // Check collision
      updated.forEach((item, index) => {
        if (item.y > 85 && item.y < 95 && Math.abs(item.x - basketX) < 15) {
          if (item.type === "bomb") {
            setIsPlaying(false);
            setItems([]);
          } else {
            setScore((s) => s + (item.type === "heart" ? 10 : 5));
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
    <div className="bg-white rounded-3xl border border-teal-900/5 shadow-xl overflow-hidden relative group">
      <div className="p-5 border-b border-teal-900/5 flex items-center justify-between bg-teal-950 text-white">
        <div className="flex items-center gap-2">
           <div className="h-6 w-6 bg-gold-400 rounded-lg flex items-center justify-center text-teal-950 shadow-sm">
             🎮
           </div>
           <h4 className="font-heading text-sm font-bold tracking-tight">Wedding Catch</h4>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[7px] uppercase tracking-widest text-gold-400 font-bold">Score</p>
            <p className="text-sm font-heading font-black">{score}</p>
          </div>
          <div className="text-right opacity-50">
            <p className="text-[7px] uppercase tracking-widest text-white font-bold">Best</p>
            <p className="text-xs font-heading font-black">{highScore}</p>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="h-64 bg-slate-50 relative cursor-none touch-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        {!isPlaying ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-teal-950/80 backdrop-blur-sm text-center px-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-4"
            >
              <h5 className="text-gold-400 font-heading text-lg font-bold mb-1 tracking-tight">Boring nunggu RSVP?</h5>
              <p className="text-white/60 text-[10px] leading-relaxed uppercase tracking-widest font-bold">Tangkap Bunga & Love buat skor tinggi!</p>
            </motion.div>
            <button 
              onClick={() => { setScore(0); setIsPlaying(true); }}
              className="px-6 py-2 bg-gold-400 text-teal-950 rounded-full font-heading font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              {score > 0 ? "Main Lagi" : "Mulai Bermain"}
            </button>
          </div>
        ) : (
          <>
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center font-heading text-[80px] font-black text-teal-900/10 scale-150 rotate-12">
              WEDDING
            </div>

            {/* Falling Items */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="absolute text-xl pointer-events-none"
                  style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
                >
                  {item.type === "heart" ? "❤️" : item.type === "flower" ? "🌸" : "💣"}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Basket (The Mascot/Icon) */}
            <motion.div 
              className="absolute bottom-4 h-12 w-12 flex items-center justify-center text-3xl pointer-events-none"
              style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💍
            </motion.div>
          </>
        )}
      </div>

      <div className="p-3 bg-teal-950/5 text-center">
        <p className="text-[8px] text-teal-950/30 uppercase font-black tracking-[0.3em]">
          Move your mouse / finger to catch
        </p>
      </div>
    </div>
  );
}
