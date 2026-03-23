"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppGenerator } from "@/components/sections/WhatsAppGenerator";
import { DashboardGame } from "./DashboardGame";
import { DeleteGuestbookButton } from "./DeleteGuestbookButton";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface Guest {
  id: string;
  name: string;
  message: string;
  attendance: string;
  createdAt: Date;
}

interface DashboardContentProps {
  guests: Guest[];
  stats: {
    views: number;
    totalRsvp: number;
    attending: number;
    notAttending: number;
    tentative: number;
  };
}

export function DashboardContent({ guests, stats }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<"guests" | "whatsapp" | "game">("guests");

  const tabs = [
    { id: "guests", label: "Guest List", icon: "📋" },
    { id: "whatsapp", label: "WA Engine", icon: "💬" },
    { id: "game", label: "Break Time", icon: "🎮" },
  ] as const;

  return (
    <div className="space-y-8 mt-10">
      {/* Premium Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 p-2 bg-white/40 backdrop-blur-md rounded-[2rem] border border-gold-400/20 shadow-xl max-w-2xl mx-auto sm:mx-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-heading font-black text-[10px] uppercase tracking-widest ${
              activeTab === tab.id 
                ? "text-teal-950" 
                : "text-teal-950/40 hover:text-teal-950/60"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-gold-400 rounded-2xl shadow-lg shadow-gold-500/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 text-base">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-[500px]"
        >
          {activeTab === "guests" && (
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gold-400/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
                 <Image src="/images/luxury-floral.png" alt="" width={150} height={150} />
              </div>
              
              <div className="p-6 lg:p-10 space-y-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-teal-950 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                       <span className="font-heading text-lg text-gold-400 font-bold italic">G</span>
                    </div>
                    <div>
                      <h2 className="font-heading text-xl lg:text-3xl font-bold tracking-tight">
                        Guestbook <span className="text-gold-600 italic font-medium">Entries</span>
                      </h2>
                      <p className="text-[8px] uppercase tracking-[0.4em] text-teal-950/30 font-bold mt-1">Total {stats.totalRsvp} Response</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-950/5 p-1 rounded-full px-3 py-1">
                     <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-950/40">Live Status</span>
                  </div>
                </div>

                {/* Table Content (Moved from page.tsx) */}
                <div className="overflow-x-auto lg:overflow-visible">
                   {/* We'll inject the table content here or pass it as children */}
                   <div className="hidden md:block overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-teal-900/5">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10">
                        <tr className="border-b border-teal-900/5">
                          <th className="p-3 px-6 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold">Guest</th>
                          <th className="p-3 px-6 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold text-center">RSVP</th>
                          <th className="p-3 px-6 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold">Message</th>
                          <th className="p-3 px-6 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold text-right">Time</th>
                          <th className="p-3 px-6 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-teal-900/5">
                        {guests.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-24 text-center text-teal-950/20 italic text-sm">No entries found yet.</td>
                          </tr>
                        ) : (
                          guests.map((guest: Guest) => (
                            <tr key={guest.id} className="hover:bg-sage-50/30 transition-all group">
                              <td className="p-3 px-6 align-middle">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-teal-950/80 flex items-center justify-center text-[10px] font-black text-gold-400 group-hover:rotate-12 transition-transform">
                                    {guest.name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="font-heading font-black text-teal-950 uppercase text-[11px] tracking-widest">{guest.name}</span>
                                </div>
                              </td>
                              <td className="p-3 px-6 text-center align-middle">
                                <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                  guest.attendance === "hadir" ? "bg-green-100 text-green-700" :
                                  guest.attendance === "tidak_hadir" ? "bg-red-100 text-red-700" :
                                  "bg-orange-100 text-orange-700"
                                }`}>
                                  {guest.attendance.replace("_", " ")}
                                </span>
                              </td>
                              <td className="p-3 px-6 align-middle">
                                <p className="text-teal-950/50 italic text-[11px] font-body max-w-[250px] truncate leading-relaxed group-hover:text-teal-950 transition-colors">
                                  {guest.message || "-"}
                                </p>
                              </td>
                              <td className="p-3 px-6 text-right text-[10px] whitespace-nowrap align-middle">
                                <span className="font-heading font-black text-teal-950/40 uppercase tracking-widest">{formatDate(guest.createdAt.toISOString())}</span>
                              </td>
                              <td className="p-3 px-6 text-right align-middle opacity-0 group-hover:opacity-100 transition-opacity">
                                <DeleteGuestbookButton id={guest.id} />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4 pt-4">
                    {guests.length === 0 ? (
                      <div className="p-10 text-center text-teal-950/20 italic text-xs uppercase tracking-widest">No entries found.</div>
                    ) : (
                      guests.map((guest: Guest) => (
                        <div key={guest.id} className="bg-white/50 border border-teal-900/5 p-4 rounded-2xl relative">
                           <div className="flex items-center justify-between mb-3 border-b border-teal-900/5 pb-2">
                             <div className="flex items-center gap-2">
                               <div className="h-6 w-6 rounded bg-teal-950 flex items-center justify-center text-[8px] font-black text-gold-400">
                                 {guest.name.charAt(0).toUpperCase()}
                               </div>
                               <span className="font-heading font-black text-teal-950 text-[10px] tracking-wider uppercase">{guest.name}</span>
                             </div>
                             <DeleteGuestbookButton id={guest.id} />
                           </div>
                           <p className="text-teal-950/60 italic text-[10px] font-body mb-3">{guest.message || "-"}</p>
                           <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${
                                guest.attendance === "hadir" ? "bg-green-100 text-green-700" :
                                guest.attendance === "tidak_hadir" ? "bg-red-100 text-red-700" :
                                "bg-orange-100 text-orange-700"
                              }`}>
                                {guest.attendance.replace("_", " ")}
                              </span>
                              <span className="text-[8px] font-bold text-teal-950/20 uppercase tracking-widest">{formatDate(guest.createdAt.toISOString())}</span>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="max-w-2xl mx-auto">
               <WhatsAppGenerator />
            </div>
          )}

          {activeTab === "game" && (
            <div className="max-w-2xl mx-auto">
               <DashboardGame />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
