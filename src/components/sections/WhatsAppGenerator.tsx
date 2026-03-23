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

  const messageTemplate = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Tanpa mengurangi rasa hormat, izinkan kami mengundang Bapak/Ibu/Saudara/i *${name || "[Nama Tamu]"}* untuk hadir di acara pernikahan kami:

*${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}*

Berikut adalah link undangan digital kami, untuk informasi lengkap mengenai acara silakan kunjungi:

${generateUrl()}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil disalin!`);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="p-8 bg-white/80 border-gold-200/50 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-teal-800 text-white rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </div>
        <div>
          <h3 className="font-heading text-2xl text-teal-900 font-bold">WhatsApp Invitation</h3>
          <p className="text-xs text-teal-800/60 font-body tracking-wider uppercase">Generator Link & Pesan</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-teal-800/70 mb-2 ml-1">Nama Tamu</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Bpk. Heru & Keluarga"
            className="w-full px-5 py-3 rounded-xl border border-teal-800/10 bg-white text-teal-900 focus:ring-2 focus:ring-gold-400 outline-none transition-all placeholder:text-teal-900/20 font-body text-sm"
          />
        </div>

        <div className="bg-sage-50/50 rounded-2xl p-5 border border-teal-800/5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-teal-800/40 mb-3">Preview Pesan</label>
          <div className="text-xs text-teal-900/80 leading-relaxed font-body whitespace-pre-line max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-800/20">
            {messageTemplate}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={() => copyToClipboard(generateUrl(), "Link Undangan")}
            className="border-teal-800/20 text-teal-800 hover:bg-teal-50"
          >
            Salin Link
          </Button>
          <Button 
            variant="outline" 
            onClick={() => copyToClipboard(messageTemplate, "Pesan WhatsApp")}
            className="border-teal-800/20 text-teal-800 hover:bg-teal-50"
          >
            Salin Pesan
          </Button>
          <Button 
            variant="primary" 
            onClick={shareToWhatsApp}
            className="sm:col-span-2 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200"
          >
            Kirim ke WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  );
}
