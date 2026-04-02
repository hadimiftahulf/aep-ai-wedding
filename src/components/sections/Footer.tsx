"use client";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-24 px-6 text-center relative overflow-hidden">
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

        {(weddingData.couple.groom.instagram || weddingData.couple.bride.instagram) && (
          <div className="flex flex-col md:flex-row gap-4 mb-16">
            {weddingData.couple.groom.instagram && (
              <motion.a 
                href={`https://instagram.com/${weddingData.couple.groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-xs tracking-[0.2em] font-body text-gold-400 hover:text-white transition-colors uppercase"
              >
                Groom IG: {weddingData.couple.groom.instagram}
              </motion.a>
            )}
            {weddingData.couple.bride.instagram && (
              <motion.a 
                href={`https://instagram.com/${weddingData.couple.bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-xs tracking-[0.2em] font-body text-gold-400 hover:text-white transition-colors uppercase"
              >
                Bride IG: {weddingData.couple.bride.instagram}
              </motion.a>
            )}
          </div>
        )}
        
        {/* Marketing CTA - Saffteen */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-10 mb-4 px-4 flex flex-col items-center gap-3"
        >
          {/* Label konteks */}
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 font-body">
            Undangan ini dibuat dengan
          </p>

          {/* Tombol utama */}
          <a
            href={`https://wa.me/6289656012756?text=${encodeURIComponent("Halo Saffteen 👋\n\nSaya baru melihat undangan digital pernikahan yang sangat mewah dan tertarik untuk membuat yang serupa.\n\nBoleh minta info lebih lanjut mengenai paket & harga undangan digitalnya? 🙏")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full overflow-hidden
              bg-gradient-to-r from-gold-600/30 via-gold-500/20 to-gold-600/30
              border border-gold-400/60 hover:border-gold-300/90
              transition-all duration-500 hover:scale-[1.04]
              hover:shadow-[0_0_32px_rgba(212,175,55,0.35)]
              cursor-pointer"
          >
            {/* Shimmer sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full
                bg-gradient-to-r from-transparent via-gold-400/15 to-transparent
                transition-transform duration-700 ease-in-out"
            />

            {/* Konten tombol */}
            <span className="relative flex flex-col items-start gap-0.5 leading-none">
              <span className="text-[10px] text-white/70 tracking-[0.3em] uppercase font-body">
                Buat undangan serupa
              </span>
              <span className="text-base md:text-lg text-gold-300 font-heading tracking-widest uppercase flex items-center gap-2">
                <span className="font-bold">Saffteen</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>

            {/* Badge "Gratis Konsultasi" */}
            <span className="relative flex-shrink-0 text-[9px] tracking-wide font-body uppercase
              bg-gold-500/30 text-gold-200 border border-gold-400/50 rounded-full px-2.5 py-1
              group-hover:bg-gold-500/50 group-hover:text-white transition-colors duration-300">
              Gratis Konsultasi
            </span>
          </a>

          {/* Social proof micro-copy */}
          <p className="text-[10px] text-white/50 tracking-widest font-body italic">
            ✦ Sudah dipercaya ratusan pasangan ✦
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
          className="text-[9px] tracking-[0.3em] text-white/20 font-body uppercase"
        >
          © {new Date().getFullYear()} AEP & AI • EXCLUSIVE DIGITAL INVITATION
        </motion.p>
      </motion.div>
    </footer>
  );
}
