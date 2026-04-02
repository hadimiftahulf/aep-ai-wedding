"use client";
import { useState } from "react";
import { DashboardGame } from "./DashboardGame";
import { motion, AnimatePresence } from "framer-motion";

export function GameModalController() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-md rounded-2xl border border-gold-400/20 shadow-lg hover:bg-white/60 transition-all w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="h-10 w-10 bg-navy-950 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-xl">
           🎮
        </div>
        <div className="text-left flex-1">
          <p className="text-[8px] uppercase tracking-[0.3em] text-navy-950/40 font-black mb-0.5">Mini Game Break</p>
          <p className="text-[11px] font-bold text-navy-950 uppercase tracking-widest">Istirahat Sejenak?</p>
        </div>
        <div className="h-6 w-6 rounded-full bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-gold-600">
             <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
           </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl z-10"
            >
              <DashboardGame onClose={() => setIsOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
