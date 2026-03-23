"use client";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";

export function Countdown() {
  return (
    <SectionWrapper withOrnament className="py-40 text-center mx-4 my-24 w-[calc(100%-2rem)] max-w-4xl rounded-3xl bg-white relative overflow-hidden shadow-xl border border-sage-200">
      
      {/* Decorative inner border simulating premium cardstock */}
      <div className="absolute top-3 bottom-3 left-3 right-3 border border-gold-400/30 rounded-2xl pointer-events-none" />

      <motion.div variants={fadeUpVariant} className="relative z-10 flex flex-col items-center">
        <h3 className="font-script text-5xl md:text-7xl text-teal-800 mb-6 font-medium drop-shadow-sm">
          Menanti Hari Bahagia
        </h3>
        <p className="max-w-xl mx-auto text-teal-800/70 mb-12 leading-loose font-body text-sm px-6 italic">
          Kehadiran serta doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami.
        </p>
        <CountdownTimer targetDate={weddingData.events.akad.date} />
      </motion.div>
    </SectionWrapper>
  );
}
