"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { weddingData } from "@/data/wedding";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppGenerator() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [name, setName] = useState("");
  const [bulkNames, setBulkNames] = useState("");
  const [mounted, setMounted] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const generateUrl = (targetName: string) => {
    const encodedName = encodeURIComponent(targetName);
    return `${baseUrl}?to=${encodedName}`;
  };

  const getMessageTemplate = (targetName: string) => `Assalamu'alaikum Warahmatullahi Wabarakatuh. ✨

Yth *${targetName || "[Nama Tamu]"}*
ditempat

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara Resepsi Pernikahan Kami yang berbahagia:

💍 * ${weddingData.couple.groom.shortName.toUpperCase()} & ${weddingData.couple.bride.shortName.toUpperCase()}* 💍
Hari/Tanggal: Sabtu, 18 April 2026
Waktu: 12.00 WIB - 19.00 WIB
Tempat: Kp. Sukaresmi Rt. 03 Rw. 01 Desa. Selagedang Kec. Pagelaran Kab. Cianjur

Berikut adalah link undangan digital kami, untuk informasi lengkap mengenai acara silakan kunjungi:

🌐 ${generateUrl(targetName)}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. 🙏

Kami yang berbahagia
Keluarga Kedua Mempelai

Mohon maaf, perihal undangan hanya dibagikan melalui pesan ini. 

Terima kasih banyak atas perhatiannya.

Terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh. 🌿
Hormat kami, 
Ai Rosita & Aep Saepudin
_____`    
    ;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    // Using a subtle toast-like alert would be better, but sticking to built-in for now
    alert(`${label} berhasil disalin!`);
  };

  const shareToWhatsApp = (targetName: string) => {
    const message = getMessageTemplate(targetName);
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!mounted) return (
    <Card className="p-6 bg-white/90 border-gold-200/50 shadow-2xl backdrop-blur-md animate-pulse">
      <div className="h-40 flex items-center justify-center text-navy-950/20 italic text-xs">
        Loading generator...
      </div>
    </Card>
  );

  const bulkNamesList = bulkNames.split("\n").map(n => n.trim()).filter(n => n !== "");

  return (
    <Card className="p-6 bg-white/90 border-gold-200/50 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-navy-900 text-gold-400 rounded-lg flex items-center justify-center shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div>
            <h3 className="font-heading text-xl text-navy-950 font-bold leading-tight">WA Engine</h3>
            <p className="text-[10px] text-navy-800/40 font-body tracking-[0.2em] font-bold uppercase">Invitation Generator</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-navy-950/5 p-1 rounded-xl border border-navy-900/5 self-start sm:self-center">
          <button 
            onClick={() => setMode("single")}
            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === "single" ? "bg-white text-navy-950 shadow-sm" : "text-navy-950/40 hover:text-navy-950/60"}`}
          >
            Single
          </button>
          <button 
            onClick={() => setMode("bulk")}
            className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === "bulk" ? "bg-white text-navy-950 shadow-sm" : "text-navy-950/40 hover:text-navy-950/60"}`}
          >
            Bulk List
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === "single" ? (
          <motion.div 
            key="single"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-navy-950/60 mb-1.5 ml-1">Nama Tamu</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ketik nama tamu..."
                className="w-full px-4 py-2.5 rounded-xl border border-navy-900/5 bg-slate-50/30 text-navy-950 focus:ring-2 focus:ring-gold-400/50 outline-none transition-all placeholder:text-navy-950/20 font-body text-sm shadow-sm"
              />
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-navy-900/5 shadow-inner">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-navy-950/30 mb-2">Message Preview</label>
              <div className="text-[11px] text-navy-950/70 leading-relaxed font-body whitespace-pre-line max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-900/10 italic">
                {getMessageTemplate(name)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                onClick={() => copyToClipboard(generateUrl(name), "Link Undangan")}
                className="text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border border-navy-900/10 text-navy-950/60 hover:bg-navy-50 transition-colors"
              >
                Copy Link
              </button>
              <button 
                onClick={() => copyToClipboard(getMessageTemplate(name), "Pesan WhatsApp")}
                className="text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border border-navy-900/10 text-navy-950/60 hover:bg-navy-50 transition-colors"
              >
                Copy Text
              </button>
              <Button 
                variant="primary" 
                onClick={() => shareToWhatsApp(name)}
                className="col-span-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg shadow-green-100 py-3 text-xs font-bold uppercase tracking-widest"
              >
                Send to WhatsApp
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="bulk"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-navy-950/60 mb-1.5 ml-1">Daftar Nama (Satu baris satu nama)</label>
              <textarea 
                rows={5}
                value={bulkNames}
                onChange={(e) => setBulkNames(e.target.value)}
                placeholder="Contoh:&#10;Budi Santoso&#10;Siti Aminah&#10;Agus Pratama"
                className="w-full px-4 py-2.5 rounded-xl border border-navy-900/5 bg-slate-50/30 text-navy-950 focus:ring-2 focus:ring-gold-400/50 outline-none transition-all placeholder:text-navy-950/20 font-body text-sm shadow-sm resize-none"
              />
            </div>

            {bulkNamesList.length > 0 && (
              <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-900/10">
                <p className="text-[9px] font-black uppercase tracking-widest text-navy-950/30 mb-2 ml-1">Generated Links ({bulkNamesList.length})</p>
                {bulkNamesList.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-navy-900/5 rounded-xl hover:border-gold-400/30 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-heading font-black text-navy-950 uppercase tracking-wider">{n}</span>
                      <span className="text-[8px] text-navy-950/30 font-bold truncate max-w-[150px]">{generateUrl(n)}</span>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => copyToClipboard(generateUrl(n), `Link untuk ${n}`)}
                        className="p-2 bg-navy-950/5 text-navy-950/40 rounded-lg hover:text-navy-950 hover:bg-gold-400/20 transition-all"
                        title="Copy Link"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </button>
                      <button 
                        onClick={() => shareToWhatsApp(n)}
                        className="p-2 bg-[#25D366]/10 text-[#128C7E] rounded-lg hover:bg-[#25D366] hover:text-white transition-all"
                        title="Share to WhatsApp"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-4 border-t border-navy-950/5 flex items-center justify-between">
        <p className="text-[8px] text-navy-950/20 uppercase font-black tracking-widest">Aep-Ai Messaging System v2.0</p>
        <div className="flex gap-1">
           <span className="h-1 w-1 rounded-full bg-gold-400" />
           <span className="h-1 w-1 rounded-full bg-gold-400 opacity-40" />
           <span className="h-1 w-1 rounded-full bg-gold-400 opacity-20" />
        </div>
      </div>
    </Card>
  );
}
