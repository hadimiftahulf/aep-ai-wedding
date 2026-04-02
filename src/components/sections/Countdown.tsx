"use client";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";

export function Countdown() {
  return (
    <SectionWrapper withOrnament variant="alternate" className="py-24 md:py-32 text-center relative z-10 px-4">
      <motion.div variants={fadeUpVariant} className="max-w-4xl mx-auto w-full">
        <Card glass className="flex flex-col items-center justify-center shadow-2xl py-16">
          <h3 className="font-script text-5xl md:text-7xl text-navy-800 mb-6 font-medium drop-shadow-sm">
            Menanti Hari Bahagia
          </h3>
          <p className="max-w-xl mx-auto text-navy-800/70 mb-12 leading-loose font-body text-sm px-6 italic">
            Kehadiran serta doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami.
          </p>
          <CountdownTimer targetDate={weddingData.events.akad.date} />
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}
