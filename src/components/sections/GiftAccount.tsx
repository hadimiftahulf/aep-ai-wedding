"use client";
import { useState } from "react";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";
import Image from "next/image";

export function GiftAccount() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <SectionWrapper withOrnament className="py-24 md:py-32 bg-sage-50/50">
      <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center mb-16 md:mb-20 relative z-10 text-center px-4">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-800 mb-6" />
        <h3 className="font-heading text-4xl md:text-5xl text-teal-900 font-bold tracking-wide uppercase">
          Tanda Kasih
        </h3>
        <p className="max-w-xl mx-auto text-teal-800/70 mt-6 md:mt-8 leading-relaxed font-body text-sm italic px-4">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat melalui rekening berikut:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto relative z-10 w-full px-6">
        {weddingData.banks.map((bank, i) => (
          <motion.div variants={fadeUpVariant} key={i} className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-white/60 relative overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
              
              {/* Subtle Luxury Pattern Overlays */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-gold-400/10 transition-colors" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-900/5 rounded-full -ml-12 -mb-12 blur-xl" />

              {/* Bank Identity */}
              <div className="mb-10 relative flex flex-col items-center">
                <div className="h-16 w-16 mb-4 rounded-2xl bg-teal-950 flex items-center justify-center text-gold-400 font-heading font-black text-2xl shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  {bank.name.charAt(0)}
                </div>
                <h4 className="font-heading text-xl text-teal-950 font-bold uppercase tracking-widest">{bank.name}</h4>
                <div className="h-[1px] w-12 bg-gold-400/30 mt-2" />
              </div>

              {/* Content Box */}
              <div className="w-full space-y-6 flex-1">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-teal-950/30 font-bold mb-1">Pemilik Rekening</p>
                  <p className="text-lg font-heading text-teal-950 font-medium tracking-wide">
                    {bank.owner}
                  </p>
                </div>

                <div className="relative pt-4">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-teal-950/30 font-bold mb-3">Nomor Rekening</p>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-2xl md:text-3xl font-heading font-bold text-teal-950 tracking-wider">
                      {bank.account}
                    </p>
                    <button
                      onClick={() => handleCopy(bank.account)}
                      className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                        copied === bank.account 
                        ? 'bg-gold-600 text-white shadow-lg' 
                        : 'bg-teal-950 text-gold-400 hover:bg-teal-900 shadow-md'
                      }`}
                    >
                      {copied === bank.account ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                          </svg>
                          Disalin
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.336c0 .864-.697 1.564-1.562 1.564H4.562C3.697 22.15 3 21.45 3 20.586V9.414c0-.865.697-1.564 1.562-1.564h3.336M15.75 17.25a3 3 0 003-3V6.375c0-.864-.697-1.564-1.562-1.564H11.625c-.864 0-1.562.697-1.562 1.564V12m4.125 5.625A3.375 3.375 0 0018.75 14.25" />
                          </svg>
                          Salin
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code Frame */}
              <div className="mt-12 pt-10 border-t border-teal-900/5 w-full flex flex-col items-center">
                 <div className="relative p-4 bg-white rounded-[2rem] shadow-inner mb-4 overflow-hidden group/qr">
                    <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                    <Image 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(bank.account)}&bgcolor=FFFFFF&color=1A4441&margin=4`}
                      alt={`QR ${bank.name}`}
                      width={120}
                      height={120}
                      className="relative z-10 mix-blend-multiply transition-transform duration-500 group-hover/qr:scale-110"
                    />
                 </div>
                 <p className="text-[10px] uppercase tracking-[0.2em] text-teal-950/20 font-bold italic">Simpan QR Code</p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
