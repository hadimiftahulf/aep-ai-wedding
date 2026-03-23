"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/data/wedding";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import Image from "next/image";

/* Card entrance */
const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(12px)", y: 60 },
  show: {
    opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* Floating heart particle */
function FloatingHeart({ id, onDone }: { id: number; onDone: (id: number) => void }) {
  const left = Math.random() * 80 + 10; // 10-90%
  const size = Math.random() * 12 + 10; // 10-22px
  const dur = Math.random() * 1.5 + 1.5; // 1.5-3s

  useEffect(() => {
    const t = setTimeout(() => onDone(id), dur * 1000);
    return () => clearTimeout(t);
  }, [id, onDone, dur]);

  return (
    <motion.span
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -120, scale: 1, x: (Math.random() - 0.5) * 40 }}
      transition={{ duration: dur, ease: "easeOut" }}
      className="absolute pointer-events-none z-50"
      style={{ left: `${left}%`, bottom: "20%", fontSize: size }}
    >
      {["💕", "❤️", "🌸", "✨", "💖", "🤍"][Math.floor(Math.random() * 6)]}
    </motion.span>
  );
}

/* Reactions */
const reactions = [
  "Assalamualaikum! 👋",
  "Halo! Selamat datang! 💕",
  "Senang bertemu kamu! ✨",
  "Jazakallah Khairan! 🤲",
  "Terima kasih sudah hadir! 🌸",
  "Barakallahu lakuma! 💖",
];

function PortraitCard({
  idleSrc, waveSrc, name, parents, delay,
}: {
  idleSrc: string; waveSrc: string; name: string; parents: string; delay: number;
}) {
  const [isWaving, setIsWaving] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);
  const [hasAutoWaved, setHasAutoWaved] = useState(false);
  const heartId = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  // Auto-wave when scrolled into view for the first time
  useEffect(() => {
    if (isInView && !hasAutoWaved) {
      const timer = setTimeout(() => {
        triggerWave();
        setHasAutoWaved(true);
      }, delay * 1000 + 800);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, hasAutoWaved]);

  // Periodic idle wave every ~8 seconds when in view
  useEffect(() => {
    if (!isInView || !hasAutoWaved) return;
    const interval = setInterval(() => {
      if (!isWaving) triggerWave();
    }, 8000 + Math.random() * 4000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, hasAutoWaved, isWaving]);

  const triggerWave = useCallback(() => {
    setIsWaving(true);
    setTapCount(p => p + 1);
    // Burst hearts
    const newHearts = Array.from({ length: 3 }, () => heartId.current++);
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => setIsWaving(false), 2500);
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h !== id));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardReveal}
      transition={{ delay }}
      className="flex flex-col items-center flex-1 w-full max-w-sm"
    >
      {/* Reaction bubble */}
      <AnimatePresence>
        {isWaving && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/95 backdrop-blur-md border border-gold-300 text-teal-900 font-body text-sm px-5 py-2.5 rounded-2xl rounded-bl-sm shadow-lg mb-4 relative z-50"
          >
            {reactions[tapCount % reactions.length]}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white/95 border-b border-r border-gold-300 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Portrait */}
      <motion.div
        onClick={triggerWave}
        onHoverStart={triggerWave}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04, boxShadow: "0 25px 60px -15px rgba(0,0,0,0.15)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-48 h-64 md:w-64 md:h-[22rem] rounded-[2rem] overflow-hidden border border-sage-200 shadow-xl bg-white mb-6 relative cursor-pointer group select-none"
      >
        {/* Gold inner border */}
        <div className="absolute top-2 bottom-2 left-2 right-2 border border-gold-300 pointer-events-none rounded-[1.5rem] z-20" />

        {/* Sparkle particles */}
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-4 right-4 w-2 h-2 bg-gold-400 rounded-full z-30" />
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-gold-300 rounded-full z-30" />
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
          className="absolute top-1/3 left-5 w-1 h-1 bg-gold-400 rounded-full z-30" />

        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map(hid => (
            <FloatingHeart key={hid} id={hid} onDone={removeHeart} />
          ))}
        </AnimatePresence>

        {/* Image container */}
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-paper to-sage-50">
          {/* Idle pose - gentle breathing */}
          <motion.div
            animate={{
              opacity: isWaving ? 0 : 1,
              scale: isWaving ? 0.9 : 1,
              y: isWaving ? 0 : [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <Image src={idleSrc} alt={name} fill className="object-cover object-center mix-blend-multiply opacity-90" />
          </motion.div>

          {/* Waving pose - wiggle */}
          <motion.div
            animate={{
              opacity: isWaving ? 1 : 0,
              scale: isWaving ? 1 : 1.1,
              rotate: isWaving ? [0, -4, 4, -3, 3, -1, 0] : 0,
              y: isWaving ? [0, -8, 0, -4, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotate: { duration: 1, delay: 0.1 },
              y: { duration: 1.2, delay: 0.1 },
            }}
            className="absolute inset-0"
          >
            <Image src={waveSrc} alt={`${name} waving`} fill className="object-cover object-center mix-blend-multiply opacity-90" />
          </motion.div>
        </div>

        {/* Hover shimmer */}
        <motion.div
          initial={{ x: "-110%" }}
          whileHover={{ x: "110%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-20 pointer-events-none"
        />
      </motion.div>

      {/* Tap hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 1 }}
        className="text-[10px] font-body text-teal-800/30 tracking-widest uppercase mb-6 animate-pulse"
      >
        ✨ Tap / Hover untuk sapa
      </motion.p>

      {/* Name */}
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        viewport={{ once: true }}
        className="font-heading text-2xl md:text-3xl text-teal-900 font-bold mb-3 tracking-wide"
      >
        {name}
      </motion.h4>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.5 }}
        viewport={{ once: true }}
        className="text-sm font-body text-teal-800/70 tracking-wide text-balance leading-relaxed px-4 italic"
      >
        {parents}
      </motion.p>
    </motion.div>
  );
}

export function CoupleProfile() {
  return (
    <SectionWrapper withOrnament className="text-center py-16 md:py-32 bg-paper">
      <motion.div variants={fadeUpVariant} className="flex flex-col items-center mb-16 md:mb-24 relative z-10">
        <p className="text-xs md:text-sm font-body uppercase tracking-[0.3em] text-gold-500 mb-6 font-medium">Sang Mempelai</p>
        <h3 className="font-script text-5xl md:text-7xl text-teal-800 font-medium tracking-wide">Ikatan Suci</h3>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-24 relative z-10">
        <PortraitCard
          idleSrc="/images/groom-chibi.png?v=2"
          waveSrc="/images/groom-wave.png"
          name={weddingData.couple.groom.name}
          parents={weddingData.couple.groom.parents}
          delay={0}
        />

        <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center relative z-10 my-4 md:my-0 md:mt-[-4rem]">
          <motion.span
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-script text-5xl md:text-8xl text-gold-500 drop-shadow-sm"
          >
            &amp;
          </motion.span>
        </motion.div>

        <PortraitCard
          idleSrc="/images/bride-chibi.png?v=2"
          waveSrc="/images/bride-wave.png"
          name={weddingData.couple.bride.name}
          parents={weddingData.couple.bride.parents}
          delay={0.3}
        />
      </div>
    </SectionWrapper>
  );
}
