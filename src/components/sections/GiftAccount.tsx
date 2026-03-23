"use client";
import { useState } from "react";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/data/wedding";
import { motion } from "framer-motion";

export function GiftAccount() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <SectionWrapper withOrnament className="py-32 bg-sage-50">
      <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center mb-20 relative z-10 text-center">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-800 mb-6" />
        <h3 className="font-heading text-4xl md:text-5xl text-teal-900 font-bold tracking-wide uppercase">
          Tanda Kasih
        </h3>
        <p className="max-w-xl mx-auto text-teal-800/70 mt-8 leading-relaxed px-6 text-sm font-body italic">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat melalui rekening berikut:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10 w-full px-4">
        {weddingData.banks.map((bank, i) => (
          <motion.div variants={fadeUpVariant} key={i}>
            <div className="bg-gradient-to-br from-white to-sage-100/50 rounded-[2rem] p-8 shadow-lg border border-white/60 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              
              {/* Top Header Row (Logo + Bank Info) */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-sage-200 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl text-teal-800 font-bold tracking-wide">{bank.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xl text-teal-900 font-bold tracking-wider">{bank.name}</span>
                  <span className="font-body text-sm text-teal-700/80">A.n. {bank.owner}</span>
                </div>
              </div>

              {/* NAMA Label & Short Name */}
              <div className="mb-6">
                <p className="font-body text-[10px] text-teal-800/40 uppercase tracking-[0.2em] font-bold mb-1">Nama</p>
                <p className="font-body text-base text-teal-900 font-medium">{bank.owner.split(' ')[0]}</p>
              </div>

              {/* Account Number & Button */}
              <div className="flex items-center justify-between gap-4 mb-6">
                 <p className="font-body text-2xl md:text-3xl tracking-widest text-teal-900">
                   {bank.account.replace(/(\d{4})/g, '$1 ').trim()}
                 </p>
                 
                 <button
                   onClick={() => handleCopy(bank.account)}
                   className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-colors ${
                     copied === bank.account 
                     ? 'bg-gold-50 border-gold-400 text-gold-600' 
                     : 'bg-transparent border-teal-800/20 text-teal-800 hover:border-gold-400 hover:text-gold-600'
                   }`}
                 >
                   {copied === bank.account ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                   ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.336c0 .864-.697 1.564-1.562 1.564H4.562C3.697 22.15 3 21.45 3 20.586V9.414c0-.865.697-1.564 1.562-1.564h3.336M15.75 17.25a3 3 0 003-3V6.375c0-.864-.697-1.564-1.562-1.564H11.625c-.864 0-1.562.697-1.562 1.564V12m4.125 5.625A3.375 3.375 0 0018.75 14.25" />
                      </svg>
                   )}
                   <span className="font-body text-sm font-medium">{copied === bank.account ? "Disalin" : "Salin"}</span>
                 </button>
              </div>

              {/* Bottom Instructions */}
              <p className="font-body text-[11px] text-teal-900/40 italic mt-6 border-t border-teal-800/5 pt-4">
                Tekan Salin untuk menyalin nomor rekening.
              </p>

              {/* QR Code */}
              <div className="flex flex-col items-center mt-6 pt-4 border-t border-teal-800/5">
                <p className="font-body text-[10px] text-teal-800/30 uppercase tracking-[0.15em] mb-3 font-bold">Scan QR Code</p>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(bank.account)}&bgcolor=FCFDFD&color=1A4441&margin=8`}
                  alt={`QR ${bank.name}`}
                  width={100}
                  height={100}
                  className="rounded-xl border border-sage-200 shadow-sm"
                />
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
