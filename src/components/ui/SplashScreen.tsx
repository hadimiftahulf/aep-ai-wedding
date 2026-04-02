"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen({ timeout = 2500 }: { timeout?: number }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling while splash is active
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, timeout);
    return () => clearTimeout(t);
  }, [timeout]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#FAFAF8] flex flex-col items-center justify-center isolate overflow-hidden"
        >
          {/* Global Botanical Texture Wallpaper matched seamlessly to layout */}
          <div className="absolute inset-0 w-full h-full opacity-[0.12] mix-blend-multiply bg-[url('/images/luxury-floral.png?v=3')] bg-cover bg-center bg-no-repeat pointer-events-none" />

          {/* Massive 3D Space Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-20 w-[60vw] h-[60vw] rounded-full bg-gold-400/[0.08] blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-20 w-[70vw] h-[70vw] rounded-full bg-navy-900/[0.05] blur-[120px] pointer-events-none" 
          />

          {/* Premium Logo & Typography */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 relative mb-6 drop-shadow-[0_15px_25px_rgba(206,159,53,0.3)]">
              <Image 
                src="/icon.png?v=7" 
                alt="A & A Logo" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
            
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <h1 className="font-script text-5xl md:text-6xl text-navy-900 font-bold drop-shadow-sm tracking-wide">
                Aep <span className="text-gold-500 mx-2">&amp;</span> Ai
              </h1>
              <p className="font-body text-[9px] md:text-xs tracking-[0.4em] uppercase text-navy-800/40 mt-5 font-bold">
                The Wedding Celebration
              </p>
            </motion.div>
          </motion.div>

          {/* Premium Loader line with Central Spark */}
          <div className="absolute bottom-24 md:bottom-32 w-56 flex justify-center">
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            />
            {/* Glowing core spark */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white blur-[2px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
