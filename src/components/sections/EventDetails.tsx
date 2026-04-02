"use client";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { weddingData } from "@/data/wedding";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { AddToCalendar } from "@/components/ui/AddToCalendar";

export function EventDetails() {
  return (
    <SectionWrapper withOrnament className="py-16 md:py-32 text-center relative z-10">
      <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center mb-12 md:mb-24 relative z-10">
         <div className="w-1.5 h-1.5 rounded-full bg-navy-800 mb-6" />
        <h3 className="font-heading text-4xl md:text-5xl text-navy-900 font-bold tracking-wide uppercase">
          Rangkaian Acara
        </h3>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 px-4 max-w-6xl mx-auto relative z-10">
        <motion.div variants={fadeUpVariant} className="flex-1">
          <Card glass className="h-full flex flex-col hover:-translate-y-2 transition-transform duration-700 hover:shadow-2xl">
             <div className="mb-10 text-center">
               <h4 className="font-script text-4xl md:text-5xl text-gold-600 mb-4">{weddingData.events.akad.name}</h4>
               <p className="font-body text-navy-800/80 tracking-[0.2em] text-sm font-medium uppercase">{formatDate(weddingData.events.akad.date)}</p>
             </div>
             
             <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-[1px] w-full bg-navy-800/10" />
                <div className="w-2 h-2 rotate-45 bg-gold-400" />
                <div className="h-[1px] w-full bg-navy-800/10" />
             </div>

             <div className="space-y-8 mb-12 text-navy-900/80 text-center flex-1">
               <div className="flex flex-col items-center">
                 <span className="text-xs uppercase tracking-[0.2em] text-navy-800/50 mb-1 font-bold">Pukul</span>
                 <p className="text-xl font-heading italic">{weddingData.events.akad.time}</p>
               </div>
               <div className="flex flex-col items-center px-6">
                 <span className="text-xs uppercase tracking-[0.2em] text-navy-800/50 mb-2 font-bold">Lokasi</span>
                 <p className="text-lg font-heading text-navy-900 font-medium">{weddingData.events.akad.location}</p>
                 <p className="text-sm font-body text-navy-900/60 mt-2 text-balance leading-relaxed px-4">{weddingData.events.akad.address}</p>
               </div>
             </div>
             
             <Button 
               variant="primary" 
               className="w-full flex items-center justify-center gap-2 mt-auto"
               onClick={() => window.open(weddingData.events.akad.mapUrl, "_blank")}
             >
               Buka Peta Lokasi
             </Button>
          </Card>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="flex-1">
          <Card glass className="h-full flex flex-col hover:-translate-y-2 transition-transform duration-700 hover:shadow-2xl">
             <div className="mb-10 text-center">
               <h4 className="font-script text-4xl md:text-5xl text-gold-600 mb-4">{weddingData.events.resepsi.name}</h4>
               <p className="font-body text-navy-800/80 tracking-[0.2em] text-sm font-medium uppercase">{formatDate(weddingData.events.resepsi.date)}</p>
             </div>
             
             <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-[1px] w-full bg-navy-800/10" />
                <div className="w-2 h-2 rotate-45 bg-gold-400" />
                <div className="h-[1px] w-full bg-navy-800/10" />
             </div>

             <div className="space-y-8 mb-12 text-navy-900/80 text-center flex-1">
               <div className="flex flex-col items-center">
                 <span className="text-xs uppercase tracking-[0.2em] text-navy-800/50 mb-1 font-bold">Pukul</span>
                 <p className="text-xl font-heading italic">{weddingData.events.resepsi.time}</p>
               </div>
               <div className="flex flex-col items-center px-6">
                 <span className="text-xs uppercase tracking-[0.2em] text-navy-800/50 mb-2 font-bold">Lokasi</span>
                 <p className="text-lg font-heading text-navy-900 font-medium">{weddingData.events.resepsi.location}</p>
                 <p className="text-sm font-body text-navy-900/60 mt-2 text-balance leading-relaxed px-4">{weddingData.events.resepsi.address}</p>
               </div>
             </div>
             
             <Button 
               variant="outline" 
               className="w-full flex items-center justify-center gap-2 mt-auto"
               onClick={() => window.open(weddingData.events.resepsi.mapUrl, "_blank")}
             >
               Buka Peta Lokasi
             </Button>
          </Card>
        </motion.div>
      </div>

      {/* Add to Calendar */}
      <motion.div variants={fadeUpVariant} className="relative z-10 mt-16 text-center">
        <p className="font-body text-sm text-navy-800/50 italic mb-4">Simpan tanggal di kalender Anda</p>
        <AddToCalendar />
      </motion.div>
    </SectionWrapper>
  );
}
