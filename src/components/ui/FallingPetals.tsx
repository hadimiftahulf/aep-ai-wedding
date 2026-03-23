"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PETAL_EMOJIS = ["🌸", "🍃", "✨", "🌿", "💐"];
const PETAL_COUNT = 15;

interface Petal {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      swayAmount: Math.random() * 60 + 20,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, p.swayAmount, -p.swayAmount, p.swayAmount / 2, 0],
            opacity: [0, 0.7, 0.7, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0"
          style={{ left: `${p.left}%`, fontSize: p.size }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
