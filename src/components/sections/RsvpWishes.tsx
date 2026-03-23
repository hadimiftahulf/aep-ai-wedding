"use client";
import { useState, useEffect } from "react";
import { SectionWrapper, fadeUpVariant } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { submitRsvp, getGuestbook } from "@/app/actions/rsvp";
import { motion, AnimatePresence } from "framer-motion";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  attendance: string;
  createdAt: Date;
}

export function RsvpWishes() {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getGuestbook();
    setMessages(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitRsvp(formData);

    if (result.success) {
      setStatus({ type: 'success', text: 'Terima kasih atas doa restu dan konfirmasinya.' });
      (e.target as HTMLFormElement).reset();
      await fetchMessages();
    } else {
      setStatus({ type: 'error', text: result.error || 'Terjadi kesalahan. Silakan coba lagi.' });
    }
    setLoading(false);
  };

  return (
    <SectionWrapper withOrnament className="py-32 text-center max-w-6xl mx-auto w-full bg-sage-50">
      <motion.div variants={fadeUpVariant} className="flex flex-col items-center justify-center mb-20 relative z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-800 mb-6" />
        <h3 className="font-heading text-4xl md:text-5xl text-teal-900 font-bold tracking-wide uppercase">
          Kehadiran & Doa
        </h3>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 text-left px-4 relative z-10">
        {/* Form */}
        <motion.div variants={fadeUpVariant} className="self-start">
          <Card glass className="shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-body uppercase tracking-[0.2em] text-teal-800/80 font-bold mb-2 ml-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-5 py-3 rounded-xl border border-teal-800/20 bg-white/50 text-teal-900 focus:ring-1 focus:ring-teal-800 focus:border-teal-800 outline-none transition-all placeholder:text-teal-900/30 font-body text-sm"
                  placeholder="Tuliskan nama Anda"
                />
              </div>
              
              <div>
                <label htmlFor="attendance" className="block text-xs font-body uppercase tracking-[0.2em] text-teal-800/80 font-bold mb-2 ml-1">Konfirmasi Kehadiran</label>
                <select 
                  id="attendance" 
                  name="attendance" 
                  required 
                  className="w-full px-5 py-3 rounded-xl border border-teal-800/20 bg-white/50 text-teal-900 focus:ring-1 focus:ring-teal-800 focus:border-teal-800 outline-none transition-all font-body text-sm"
                >
                  <option value="hadir">Berkenan Hadir</option>
                  <option value="tidak_hadir">Maaf, Tidak Bisa Hadir</option>
                  <option value="ragu">Masih Tentatif / Ragu</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-body uppercase tracking-[0.2em] text-teal-800/80 font-bold mb-2 ml-1">Kirim Doa & Harapan</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4}
                  className="w-full px-5 py-3 rounded-xl border border-teal-800/20 bg-white/50 text-teal-900 focus:ring-1 focus:ring-teal-800 focus:border-teal-800 outline-none transition-all placeholder:text-teal-900/30 resize-none font-body text-sm leading-relaxed"
                  placeholder="Tuliskan harapan baik Anda..."
                />
              </div>

              {status && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl text-xs font-body tracking-wider items-center flex justify-center gap-3 animate-fade-in ${status.type === 'success' ? 'bg-sage-100 text-teal-800 border border-teal-800/20' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {status.text}
                </motion.div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Konfirmasi"}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Messages List */}
        <motion.div variants={fadeUpVariant} className="flex flex-col relative bg-white/80 p-6 md:p-10 rounded-3xl border border-sage-200 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-teal-800/10">
             <h4 className="font-heading text-3xl text-gold-600 font-medium italic">
               Ucapan Masuk
             </h4>
             <span className="text-teal-800/50 font-body text-xs uppercase tracking-[0.2em] font-bold">
               {messages.length} Pesan
             </span>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[500px] pr-4 space-y-6">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-teal-900/30 font-body text-sm italic">
                  <p>Belum ada doa yang terkirim.</p>
                </motion.div>
              ) : (
                messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-sage-50/50 p-6 rounded-2xl border border-teal-800/5 hover:bg-sage-100/50 transition-colors duration-500"
                  >
                    <div className="flex items-start gap-5 mb-3">
                      <div className="h-10 w-10 bg-white border border-gold-300 text-teal-800 rounded-full flex items-center justify-center font-heading font-medium text-lg shadow-sm">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-heading text-lg text-teal-900 font-medium tracking-wide">{msg.name}</p>
                        <p className="text-[10px] text-teal-800/50 font-body uppercase tracking-[0.2em] mt-1 font-bold">
                          {msg.attendance === 'hadir' ? 'Akan Hadir' : msg.attendance === 'tidak_hadir' ? 'Tidak Hadir' : 'Tentatif'}
                        </p>
                      </div>
                    </div>
                    <p className="text-teal-900/70 text-sm leading-relaxed whitespace-pre-line font-body italic pl-14">
                      &quot;{msg.message}&quot;
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
