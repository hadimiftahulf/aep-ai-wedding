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
    src: "/images/couple-wave.png",
    messages: [
      "Hai! Jangan lupa datang ya! 👋",
      "Halo! Senang kamu buka undangan ini! 😊",
      "Assalamualaikum! Kami tunggu ya! 💕",
    ],
  },
  {
    src: "/images/couple-heart.png",
    messages: [
      "Doa kalian sangat berarti bagi kami 💖",
      "Jazakallahu Khairan! 🤲",
      "Semoga Allah memberkahi pernikahan ini 🌸",
    ],
  },
  {
    src: "/images/couple-pray.png",
    messages: [
      "Mohon doanya ya! 🤲",
      "Bismillah, semoga lancar! ✨",
      "Doakan kami selalu bahagia 💕",
    ],
  },
  {
    src: "/images/couple-chibi.png?v=2",
    messages: [
      "Scroll terus ya, jangan lupa RSVP! 📝",
      "Sudah save tanggalnya belum? 📅",
      "Yuk kirim ucapan dan doa 💌",
    ],
  },
];

export function FloatingMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPose, setCurrentPose] = useState(0);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Show mascot 3 seconds after mount
  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      // Auto-show first bubble after appearing
      setTimeout(() => {
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 4000);
      }, 1500);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle poses & messages every ~10s
  useEffect(() => {
    if (!isVisible) return;
    timerRef.current = setInterval(() => {
      setCurrentPose(p => (p + 1) % POSES.length);
      setCurrentMsg(m => m + 1);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 10000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible]);

  const handleTap = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    } else {
      // Cycle to next pose on tap
      setCurrentPose(p => (p + 1) % POSES.length);
      setCurrentMsg(m => m + 1);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }
  }, [isExpanded]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setShowBubble(false);
  }, []);

  const pose = POSES[currentPose];
  const msg = pose.messages[currentMsg % pose.messages.length];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 right-3 md:bottom-8 md:right-8 z-[90] flex flex-col items-end gap-2">
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-white/95 backdrop-blur-lg border border-gold-300 rounded-2xl rounded-br-sm shadow-xl px-4 py-3 max-w-[200px] md:max-w-[240px] mr-2"
          >
            <p className="font-body text-xs md:text-sm text-teal-900 leading-relaxed">{msg}</p>
            {/* Bubble tail */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/95 border-b border-r border-gold-300 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        onClick={handleTap}
        className="relative cursor-pointer select-none"
      >
        {/* Close button when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleClose}
              className="absolute -top-1 -left-1 w-5 h-5 bg-teal-800/80 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-30 hover:bg-teal-700"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>

        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-gold-400"
        />

        {/* Avatar container */}
        <motion.div
          animate={isExpanded ? { width: 80, height: 80 } : { width: 56, height: 56 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-full overflow-hidden border-2 border-gold-400 shadow-lg bg-white relative"
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
                className="object-cover scale-125"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gentle bounce */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
