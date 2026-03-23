"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { weddingData } from "@/data/wedding";

export function WhatsAppGenerator() {
  const [name, setName] = useState("");
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  const generateUrl = () => {
    const encodedName = encodeURIComponent(name);
    return `${baseUrl}?to=${encodedName}`;
  };

  const messageTemplate = `Assalamu'alaikum Warahmatullahi Wabarakatuh. ✨

Tanpa mengurangi rasa hormat, izinkan kami mengundang Bapak/Ibu/Saudara/i *${name || "[Nama Tamu]"}* untuk hadir di hari bahagia kami:

💍 *PERNIKAHAN ${weddingData.couple.groom.shortName.toUpperCase()} & ${weddingData.couple.bride.shortName.toUpperCase()}* 💍

Berikut adalah link undangan digital kami, untuk informasi lengkap mengenai acara silakan kunjungi:

🌐 ${generateUrl()}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. 🙏❤️

Terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh. 🌿`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil disalin!`);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="p-6 bg-white/90 border-gold-200/50 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-9 w-9 bg-teal-900 text-gold-400 rounded-lg flex items-center justify-center shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </div>
        <div>
          <h3 className="font-heading text-xl text-teal-950 font-bold leading-tight">Share Invite</h3>
          <p className="text-[10px] text-teal-800/40 font-body tracking-[0.2em] font-bold uppercase">WhatsApp Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-teal-950/60 mb-1.5 ml-1">Nama Tamu</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ketik nama tamu..."
            className="w-full px-4 py-2.5 rounded-xl border border-teal-900/5 bg-sage-50/30 text-teal-950 focus:ring-2 focus:ring-gold-400/50 outline-none transition-all placeholder:text-teal-950/20 font-body text-sm shadow-sm"
          />
        </div>

        <div className="bg-gradient-to-br from-sage-50 to-white rounded-xl p-4 border border-teal-900/5 shadow-inner">
          <label className="block text-[9px] font-bold uppercase tracking-widest text-teal-950/30 mb-2">Message Preview</label>
          <div className="text-[11px] text-teal-950/70 leading-relaxed font-body whitespace-pre-line max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-900/10 italic">
            {messageTemplate}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button 
            onClick={() => copyToClipboard(generateUrl(), "Link Undangan")}
            className="text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border border-teal-900/10 text-teal-950/60 hover:bg-teal-50 transition-colors"
          >
            Copy Link
          </button>
          <button 
            onClick={() => copyToClipboard(messageTemplate, "Pesan WhatsApp")}
            className="text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border border-teal-900/10 text-teal-950/60 hover:bg-teal-50 transition-colors"
          >
            Copy Text
          </button>
          <Button 
            variant="primary" 
            onClick={shareToWhatsApp}
            className="col-span-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg shadow-green-100 py-3 text-xs font-bold uppercase tracking-widest"
          >
            Send to WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  );
}
