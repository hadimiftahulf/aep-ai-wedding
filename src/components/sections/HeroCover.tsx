"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant } from "@/components/ui/SectionWrapper";
import Image from "next/image";

interface HeroCoverProps {
  onOpen: () => void;
  guestName?: string;
}

export function HeroCover({ onOpen, guestName }: HeroCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleCoupleClick = useCallback(() => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2500);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper text-teal-900"
        >
          {/* Very slow ambient background zoom */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 bg-watercolor-gradient flex items-center justify-center" 
          />

          {/* Hyper-detailed photorealistic floral frame */}
          <motion.div 
            initial={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 0.9, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute inset-0 bg-luxury-floral bg-cover bg-center bg-no-repeat mix-blend-multiply opacity-50"
          />

          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
            }}
            className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-lg mb-12"
          >
            
            {/* Speech bubble */}
            <AnimatePresence>
              {isWaving && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white/95 backdrop-blur-md border border-gold-300 text-teal-900 font-body text-sm px-5 py-2.5 rounded-2xl shadow-lg mb-4 z-50"
                >
                  Assalamualaikum! 👋💕
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ornate Frame Mimic — now interactive */}
            <motion.div 
              variants={fadeUpVariant} 
              onClick={handleCoupleClick}
              whileTap={{ scale: 0.96 }}
              className="vintage-frame w-64 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center mb-16 shadow-2xl relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-teal-800/20 mix-blend-overlay pointer-events-none" />
              <div className="vintage-frame-inner w-56 h-72 md:w-64 md:h-80 flex flex-col items-center justify-center relative overflow-hidden bg-white/50 backdrop-blur-md">
                {/* Slow sweeping light */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
                />
                
                {/* Idle couple */}
                <motion.div
                  animate={{ opacity: isWaving ? 0 : 1, scale: isWaving ? 0.9 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                >
                  <Image 
                    src="/images/couple-chibi.png?v=2" 
                    alt="Couple Illustration"
                    width={300}
                    height={380}
                    className="w-[90%] h-[90%] object-contain mix-blend-multiply opacity-95 animate-float"
                    priority
                  />
                </motion.div>

                {/* Waving couple */}
                <motion.div
                  animate={{ 
                    opacity: isWaving ? 1 : 0, 
                    scale: isWaving ? 1 : 1.1,
                    rotate: isWaving ? [0, -3, 3, -2, 2, 0] : 0,
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.8, delay: 0.1 },
                  }}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                >
                  <Image 
                    src="/images/couple-wave.png" 
                    alt="Couple Waving"
                    width={300}
                    height={380}
                    className="w-[90%] h-[90%] object-contain mix-blend-multiply opacity-95"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.p 
              variants={fadeUpVariant} 
              className="font-body text-[10px] tracking-widest text-teal-700/30 uppercase mb-8"
            >
              ✨ Tap foto untuk sapa mereka
            </motion.p>

            <motion.p variants={fadeUpVariant} className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-teal-700/60 mb-10 font-bold mix-blend-multiply">
              The Wedding Celebration
            </motion.p>
            
            <motion.p variants={fadeUpVariant} className="font-heading text-lg md:text-xl text-gold-600 mb-4 italic">
              Kpd. Yth. Bapak/Ibu/Saudara/i
            </motion.p>

            {guestName && (
              <motion.p 
                variants={fadeUpVariant}
                className="font-heading text-2xl md:text-3xl text-teal-900 font-bold mb-12 tracking-wide"
              >
                {decodeURIComponent(guestName)}
              </motion.p>
            )}

            {!guestName && <div className="mb-8" />}

            <motion.button
              variants={fadeUpVariant}
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center px-12 py-4 font-body text-xs md:text-sm tracking-[0.2em] uppercase text-white bg-teal-800 transition-all hover:bg-teal-700 shadow-lg hover:shadow-2xl rounded-full duration-700 ease-out overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1] bg-gold-600" />
              <span className="relative z-10 font-bold flex items-center gap-3">
                 Buka Undangan
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
