"use client";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.3 } }
        }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.h2 
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-script text-4xl md:text-5xl text-gold-400 mb-10"
        >
          Terima Kasih
        </motion.h2>
        
        <motion.p 
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
          className="text-sm md:text-base text-white/70 mb-16 leading-loose max-w-2xl text-balance font-body italic"
        >
          Keluarga besar kami sangat berterima kasih atas setiap helai doa dan kehadiran berharga Anda pada hari istimewa ini.
        </motion.p>
        
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
          className="flex items-center gap-6 mb-12"
        >
           <div className="w-16 h-px bg-gold-500/30" />
           <p className="text-xs tracking-[0.4em] uppercase text-gold-500/60 font-body font-bold">
             Kami yang Berbahagia
           </p>
           <div className="w-16 h-px bg-gold-500/30" />
        </motion.div>

        <motion.h3 
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-heading text-3xl md:text-5xl text-white mb-6 tracking-wider font-light flex items-center justify-center gap-4"
        >
          {weddingData.couple.groom.shortName} 
          <span className="text-gold-500 font-light mx-3 text-2xl md:text-4xl">&amp;</span> 
          {weddingData.couple.bride.shortName}
        </motion.h3>

        {weddingData.couple.groom.instagram && (
          <motion.a 
            href={`https://instagram.com/${weddingData.couple.groom.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
            className="text-xs tracking-[0.2em] font-body text-gold-400 hover:text-white transition-colors mb-16 uppercase"
          >
            Instagram: {weddingData.couple.groom.instagram}
          </motion.a>
        )}
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.2em] text-white/30 font-body uppercase"
        >
          Crafted Elegantly by <a href="https://wa.me/6289656012756" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">Saffteen</a>
        </motion.p>
      </motion.div>
    </footer>
  );
}
