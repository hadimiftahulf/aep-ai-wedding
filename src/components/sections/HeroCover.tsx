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
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpening(true);
    onOpen(); // Trigger instantly to render background during gate split
    setTimeout(() => {
      setIsOpen(true);
    }, 2000);
  };

  const handleCoupleClick = useCallback(() => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2500);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.5 } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-navy-900 bg-paper"
        >
          {/* Left Gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpening ? "-50vw" : 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.76, 0, 0.24, 1] }} 
            className="absolute inset-0 bg-paper z-0"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          >
             <motion.div 
              initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ duration: 3, ease: "easeOut" }}
              className="absolute inset-0 bg-watercolor-gradient pointer-events-none" 
             />
             <motion.div 
              initial={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 0.9, filter: "blur(0px)" }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute inset-0 bg-luxury-floral bg-cover bg-center bg-no-repeat mix-blend-multiply opacity-50 pointer-events-none"
             />
             <div className="absolute top-0 bottom-0 right-[50%] w-[1px] bg-gold-400/40 shadow-[0_0_15px_rgba(206,159,53,0.5)]" />
          </motion.div>

          {/* Right Gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpening ? "50vw" : 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.76, 0, 0.24, 1] }} 
            className="absolute inset-0 bg-paper z-0"
            style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
          >
             <motion.div 
              initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ duration: 3, ease: "easeOut" }}
              className="absolute inset-0 bg-watercolor-gradient pointer-events-none" 
             />
             <motion.div 
              initial={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 0.9, filter: "blur(0px)" }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute inset-0 bg-luxury-floral bg-cover bg-center bg-no-repeat mix-blend-multiply opacity-50 pointer-events-none"
             />
             <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gold-400/40 shadow-[0_0_15px_rgba(206,159,53,0.5)]" />
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={isOpening ? "exit" : "show"}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
              exit: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeIn" } }
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
                  className="bg-white/95 backdrop-blur-md border border-gold-300 text-navy-900 font-body text-sm px-5 py-2.5 rounded-2xl shadow-lg mb-4 z-50"
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
              className="w-64 h-[22rem] md:w-80 md:h-[28rem] flex flex-col items-center justify-center mb-16 drop-shadow-[0_25px_35px_rgba(20,30,60,0.15)] relative cursor-pointer select-none isolate"
            >
              <div className="w-full h-full relative flex items-center justify-center rounded-[4rem] rounded-b-xl overflow-hidden bg-transparent">
                {/* Slow sweeping light */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-20 pointer-events-none rounded-[4rem] rounded-b-xl"
                />
                
                {/* Idle couple */}
                <motion.div
                  animate={{ opacity: isWaving ? 0 : 1, scale: isWaving ? 0.95 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                >
                  <Image 
                    src="/images/couple-chibi.png?v=3" 
                    alt="Couple Illustration"
                    fill
                    className="object-contain object-bottom animate-float priority"
                  />
                </motion.div>

                {/* Waving couple */}
                <motion.div
                  animate={{ 
                    opacity: isWaving ? 1 : 0, 
                    scale: isWaving ? 1 : 1.05,
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
                    src="/images/couple-wave.png?v=3" 
                    alt="Couple Waving"
                    fill
                    className="object-contain object-bottom priority"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.p 
              variants={fadeUpVariant} 
              className="font-body text-[10px] tracking-widest text-navy-700/30 uppercase mb-8"
            >
              ✨ Tap foto untuk sapa mereka
            </motion.p>

            <motion.p variants={fadeUpVariant} className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-navy-700/60 mb-10 font-bold mix-blend-multiply">
              The Wedding Celebration
            </motion.p>
            
            <motion.p variants={fadeUpVariant} className="font-heading text-lg md:text-xl text-gold-600 mb-4 italic">
              Kpd. Yth. Bapak/Ibu/Saudara/i
            </motion.p>

            {guestName && (
              <motion.p 
                variants={fadeUpVariant}
                className="font-heading text-2xl md:text-3xl text-navy-900 font-bold mb-12 tracking-wide"
              >
                {decodeURIComponent(guestName)}
              </motion.p>
            )}

            {!guestName && <div className="mb-8" />}

            <motion.button
              variants={fadeUpVariant}
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center px-12 py-4 font-body text-xs md:text-sm tracking-[0.2em] uppercase text-white bg-navy-800 transition-all hover:bg-navy-700 shadow-lg hover:shadow-2xl rounded-full duration-700 ease-out overflow-hidden"
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
