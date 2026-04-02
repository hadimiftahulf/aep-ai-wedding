"use client";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/data/wedding";
import { motion, Variants } from "framer-motion";

const customFadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)", scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 } 
  },
};

const customLine: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { 
    opacity: 1, 
    scaleX: 1, 
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1.0 } 
  },
};

export function BismillahVerse() {
  return (
    <SectionWrapper withOrnament className="text-center pt-40 pb-20 bg-watercolor-gradient shadow-inner relative overflow-hidden">
      <motion.div variants={customFadeUp} className="mb-12 w-full mx-auto flex flex-col items-center relative z-10">
        <h2 className="font-script text-4xl md:text-5xl text-gold-500 mb-6 drop-shadow-sm">
          Bismillah
        </h2>
        <motion.div variants={customLine} className="flex items-center gap-4">
           <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-400" />
           <div className="w-1.5 h-1.5 rounded-full bg-navy-800" />
           <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-400" />
        </motion.div>
      </motion.div>
      
      <motion.div variants={customFadeUp} className="max-w-3xl mx-auto space-y-8 md:space-y-10 px-6 relative z-10">
        <p className="text-2xl md:text-5xl lg:text-5xl leading-relaxed text-navy-800 font-medium" dir="rtl">
          {weddingData.quranVerse.arabic}
        </p>
        
        <p className="text-base md:text-lg font-heading leading-loose text-balance text-navy-900/80 max-w-2xl mx-auto italic">
          &quot;{weddingData.quranVerse.translation}&quot;
        </p>
        <p className="text-xs md:text-sm font-body text-gold-600 tracking-[0.2em] font-medium uppercase mt-8 mix-blend-multiply">
          {weddingData.quranVerse.surah}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
