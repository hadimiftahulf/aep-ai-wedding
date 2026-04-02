import { prisma } from "@/lib/prisma";
import { PWAInstallButton } from "@/components/ui/PWAInstallButton";
import { DashboardMascots } from "@/components/ui/DashboardMascots";
import { DashboardContent } from "@/components/ui/DashboardContent";
import Image from "next/image";

import { getVisitorHistory } from "@/app/actions/visitor";

export const dynamic = "force-dynamic";

interface Guest {
  id: string;
  name: string;
  message: string;
  attendance: string;
  createdAt: Date;
}

export default async function DashboardPage() {
  const [visitors, guestsRaw, visitorHistory] = await Promise.all([
    prisma.visitor.count(),
    prisma.guestbook.findMany({
      orderBy: { createdAt: "desc" },
    }),
    getVisitorHistory(),
  ]);

  const guests = guestsRaw as Guest[];

  const stats = {
    views: visitors,
    totalRsvp: guests.length,
    attending: guests.filter((g: Guest) => g.attendance === "hadir").length,
    notAttending: guests.filter((g: Guest) => g.attendance === "tidak_hadir").length,
    tentative: guests.filter((g: Guest) => g.attendance === "ragu").length,
    history: visitorHistory,
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] font-body text-navy-950 selection:bg-gold-200 relative overflow-hidden pb-12">
      {/* Premium Background Ornaments */}
      <div className="absolute top-0 right-0 w-full h-[600px] pointer-events-none opacity-[0.04]">
        <Image src="/images/luxury-floral.png" alt="" fill className="object-cover" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none opacity-[0.04] rotate-180">
        <Image src="/images/luxury-floral.png" alt="" fill className="object-cover" />
      </div>

      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-navy-950 via-gold-500 to-navy-950 relative z-20" />

      <div className="max-w-[1400px] mx-auto px-4 py-8 lg:px-10 lg:py-12 relative z-10">
        {/* Relocated PWA Button & Mascots Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex-1">
            <DashboardMascots />
          </div>
          <div className="md:mb-6 shrink-0">
            <div className="bg-navy-950/5 p-4 rounded-3xl border border-gold-400/20 backdrop-blur-sm shadow-xl animate-bounce-slow">
              <PWAInstallButton />
              <p className="text-[7px] text-navy-950/30 uppercase font-black tracking-[0.3em] mt-3 text-center">Install Admin App for Best XP</p>
            </div>
          </div>
        </div>

        {/* Unified Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-gold-400/10 shadow-sm group hover:scale-[1.02] transition-all cursor-default">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] lowercase tracking-[0.2em] text-navy-950/40 font-black">Confirmed</p>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-black text-navy-950 leading-none">{stats.attending}</span>
              <span className="text-[10px] font-bold text-navy-950/40 uppercase tracking-widest pl-1">Guest</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-gold-400/10 shadow-sm group hover:scale-[1.02] transition-all cursor-default">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] lowercase tracking-[0.2em] text-navy-950/40 font-black">Unable</p>
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 opacity-60" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-black text-gold-600 leading-none">{stats.notAttending}</span>
              <span className="text-[10px] font-bold text-navy-950/40 uppercase tracking-widest pl-1">Guest</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-gold-400/10 shadow-sm group hover:scale-[1.02] transition-all cursor-default">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] lowercase tracking-[0.2em] text-navy-950/40 font-black">Pending</p>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 opacity-60" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-black text-navy-950/60 leading-none">{stats.tentative}</span>
              <span className="text-[10px] font-bold text-navy-950/40 uppercase tracking-widest pl-1">Guest</span>
            </div>
          </div>
        </div>

        {/* Tabbed Content Area */}
        <DashboardContent guests={guests} stats={stats} />

        {/* System Info Footer Section */}
        <div className="mt-16 bg-[#121b18] rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full -mr-32 -mt-32 blur-[100px] transition-all group-hover:bg-gold-400/10" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6 text-gold-400">
                <div className="h-10 w-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-heading text-xl font-bold tracking-tight uppercase">System Information & Guide</h4>
              </div>
              <ul className="space-y-5 text-[11px] lg:text-[12px] text-white/40 leading-relaxed font-body font-medium uppercase tracking-[0.1em]">
                <li className="flex gap-4 items-start pb-5 border-b border-white/5">
                  <span className="text-gold-500 font-bold opacity-30 shrink-0">01</span>
                  <span>Gunakan parameter <b>?to=Nama+Tamu</b> untuk personalisasi greeting instan di halaman utama.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-gold-500 font-bold opacity-30 shrink-0">02</span>
                  <span>Dashboard ini sudah teroptimasi sebagai <b>PWA</b>. Tambahkan ke Layar Utama (Add to Home Screen) untuk akses cepat tanpa browser.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">Digital Signature</p>
              <p className="font-heading text-2xl font-black text-white leading-none">Aep-Ai Wedding</p>
              <p className="text-gold-500/40 text-[9px] uppercase tracking-widest font-bold">Premium Admin Suite v2.5</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-16 text-center mt-8 opacity-40">
        <p className="text-[10px] tracking-[0.4em] text-navy-950 font-black uppercase">Crafted with Elegance by Saffteen</p>
        <p className="text-[8px] tracking-[0.2em] text-navy-950/40 mt-2 uppercase">© 2026 Digital Hospitality Perfection</p>
      </footer>
    </div>
  );
}
