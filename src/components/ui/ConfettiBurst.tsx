"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  speed: number;
  size: number;
}

const CONFETTI = ["🎉", "✨", "💕", "🌸", "🎊", "💖", "⭐", "🤍", "🌟", "🎀"];

export function ConfettiBurst({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      emoji: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
      angle: (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5,
      speed: Math.random() * 300 + 150,
      size: Math.random() * 16 + 12,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  }, []);

  useEffect(() => {
    if (trigger) burst();
  }, [trigger, burst]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ 
            position: "fixed", 
            left: p.x, 
            top: p.y, 
            opacity: 1, 
            scale: 0.5 
          }}
          animate={{
            left: p.x + Math.cos(p.angle) * p.speed,
            top: p.y + Math.sin(p.angle) * p.speed + 200,
            opacity: 0,
            scale: 1.5,
            rotate: Math.random() * 720 - 360,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
          className="pointer-events-none z-[200]"
          style={{ fontSize: p.size, position: "fixed" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
