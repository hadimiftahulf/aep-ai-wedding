"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Pose {
  src: string;
  messages: string[];
}

const POSES: Pose[] = [
  {
    src: "/images/couple-wave.png?v=3",
    messages: [
      "Hai! Jangan lupa datang ya! 👋",
      "Halo! Senang kamu buka undangan ini! 😊",
      "Assalamualaikum! Kami tunggu ya! 💕",
    ],
  },
  {
    src: "/images/couple-heart.png?v=3",
    messages: [
      "Doa kalian sangat berarti bagi kami 💖",
      "Jazakallahu Khairan! 🤲",
      "Semoga Allah memberkahi pernikahan ini 🌸",
    ],
  },
  {
    src: "/images/couple-pray.png?v=3",
    messages: [
      "Mohon doanya ya! 🤲",
      "Bismillah, semoga lancar! ✨",
      "Doakan kami selalu bahagia 💕",
    ],
  },
  {
    src: "/images/couple-chibi.png?v=3",
    messages: [
      "Scroll terus ya, jangan lupa RSVP! 📝",
      "Sudah save tanggalnya belum? 📅",
      "Yuk kirim ucapan dan doa 💌",
    ],
  },
];

export function FloatingMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPose, setCurrentPose] = useState(0);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Show mascot 2 seconds after mount
  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2500);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle poses & messages every 5s
  useEffect(() => {
    if (!isVisible) return;
    timerRef.current = setInterval(() => {
      setCurrentPose(p => (p + 1) % POSES.length);
      setCurrentMsg(m => m + 1);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible]);

  // Click triggers instant skip
  const handleTap = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentPose(p => (p + 1) % POSES.length);
        setCurrentMsg(m => m + 1);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 4000);
      }, 5000);
    }
    
    setCurrentPose(p => (p + 1) % POSES.length);
    setCurrentMsg(m => m + 1);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 4000);
  }, []);

  const pose = POSES[currentPose];
  const msg = pose.messages[currentMsg % pose.messages.length];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 right-3 md:bottom-8 md:right-8 z-[90]">
      {/* Mascot avatar with Absolute Bubble inside for safe positioning */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        onClick={handleTap}
        className="relative cursor-pointer select-none group"
      >
        {/* Speech bubble - Anchored to right edge of mascot to prevent screen-cutting */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="absolute bottom-[calc(100%+15px)] right-0 bg-white/95 backdrop-blur-lg border border-gold-300 rounded-2xl shadow-xl px-4 py-3 min-w-[160px] max-w-[200px] md:max-w-[240px] z-[100]"
            >
              <p className="font-body text-xs md:text-sm text-navy-900 leading-relaxed font-bold text-center">{msg}</p>
              {/* Bubble tail on the right side over the mascot */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gold-300 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing ring centered on avatar */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-gold-400"
        />

        {/* Avatar container */}
        <motion.div
          animate={{ width: 64, height: 88 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="drop-shadow-2xl relative rounded-t-full rounded-b border border-gold-300/30 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPose}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <Image
                src={pose.src}
                alt="Mascot"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gentle bounce */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
