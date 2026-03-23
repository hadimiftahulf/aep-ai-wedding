"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardMascots() {
  return (
    <div className="space-y-6">
      <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-gold-400/20 overflow-hidden shadow-xl group">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gold-400/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 bg-teal-800/5 rounded-full blur-2xl" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full scale-150 opacity-50" />
            <Image 
              src="/images/couple-chibi.png" 
              alt="Couple Mascot" 
              width={140} 
              height={140} 
              className="relative z-10 drop-shadow-2xl"
            />
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-heading text-3xl md:text-4xl text-teal-900 font-bold mb-2">
              Bismillah, <span className="text-gold-600 italic">Aep & Saffteen!</span>
            </h1>
            <p className="text-teal-900/60 font-body text-sm lowercase tracking-wider mb-4">
              Selamat datang di ruang kendali hari bahagia Anda. Semua doa terbaik terkumpul di sini. ✨
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <div className="px-3 py-1 bg-teal-900 text-gold-400 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                 Wedding Special
               </div>
               <div className="px-3 py-1 bg-white/50 border border-gold-400/20 text-teal-900 text-[10px] font-black uppercase tracking-widest shadow-sm">
                 Premium Admin
               </div>
            </div>
          </div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-10 right-20 text-xl opacity-20"
        >
          💍
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 text-xl opacity-20"
        >
          ✨
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-gold-400/10 flex items-center gap-4 group hover:bg-white/60 transition-all">
          <Image src="/images/groom-chibi.png" alt="Groom" width={40} height={40} className="group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <p className="text-[8px] uppercase tracking-widest text-teal-900/40 font-black">Groom Sidebar</p>
            <p className="text-[10px] font-bold text-teal-900">Halo Ganteng! 😎</p>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-gold-400/10 flex items-center gap-4 group hover:bg-white/60 transition-all text-right justify-end">
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest text-teal-900/40 font-black">Bride Sidebar</p>
            <p className="text-[10px] font-bold text-teal-900">Cantik Banget! ✨</p>
          </div>
          <Image src="/images/bride-chibi.png" alt="Bride" width={40} height={40} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}
