import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { WhatsAppGenerator } from "@/components/sections/WhatsAppGenerator";
import { PWAInstallButton } from "@/components/ui/PWAInstallButton";
import { DeleteGuestbookButton } from "@/components/ui/DeleteGuestbookButton";
import { DashboardGame } from "@/components/ui/DashboardGame";

export const dynamic = "force-dynamic";

interface Guest {
  id: string;
  name: string;
  message: string;
  attendance: string;
  createdAt: Date;
}

export default async function DashboardPage() {
  const [visitors, guestsRaw] = await Promise.all([
    prisma.visitor.count(),
    prisma.guestbook.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const guests = guestsRaw as Guest[];

  const stats = {
    views: visitors,
    totalRsvp: guests.length,
    attending: guests.filter((g: Guest) => g.attendance === "hadir").length,
    notAttending: guests.filter((g: Guest) => g.attendance === "tidak_hadir").length,
    tentative: guests.filter((g: Guest) => g.attendance === "ragu").length,
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] font-body text-teal-950 selection:bg-gold-200">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-teal-950 via-gold-500 to-teal-950" />
      
      <div className="max-w-[1400px] mx-auto px-4 py-8 lg:px-12 lg:py-14">
        {/* Compact Modern Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 border-b border-teal-900/5 pb-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-teal-950 flex items-center justify-center shadow-2xl rotate-3">
               <span className="font-heading text-xl md:text-2xl text-gold-400 font-bold italic">A</span>
            </div>
            <div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold tracking-tight">
                Control <span className="text-gold-600 italic font-medium">Center</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[0.4em] text-teal-950/40 font-bold mt-1">Management Suite v2.1</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-teal-900/5 w-full sm:w-auto overflow-x-auto">
             <div className="px-4 py-2 bg-sage-50 rounded-lg flex flex-col items-center min-w-[80px]">
               <span className="text-[8px] uppercase tracking-widest text-teal-950/40 font-bold">Views</span>
               <span className="text-lg font-heading font-bold text-teal-950">{stats.views}</span>
             </div>
             <div className="px-4 py-2 bg-teal-950 rounded-lg flex flex-col items-center min-w-[80px] shadow-lg shadow-teal-900/10">
               <span className="text-[8px] uppercase tracking-widest text-gold-300 font-bold">RSVPs</span>
               <span className="text-lg font-heading font-bold text-white">{stats.totalRsvp}</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Table Content - Column Span 8 */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Ultra Compact Stats Row */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4">
              <div className="bg-white rounded-[1rem] lg:rounded-[1.25rem] p-4 lg:p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Confirmed</span>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-heading font-bold text-green-600">{stats.attending}</span>
                  <span className="text-[9px] text-teal-950/30 uppercase font-bold tracking-tighter">Guest</span>
                </div>
              </div>

              <div className="bg-white rounded-[1rem] lg:rounded-[1.25rem] p-4 lg:p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Unable</span>
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-heading font-bold text-red-500">{stats.notAttending}</span>
                  <span className="text-[9px] text-teal-950/30 uppercase font-bold tracking-tighter">Guest</span>
                </div>
              </div>

              <div className="bg-white rounded-[1rem] lg:rounded-[1.25rem] p-4 lg:p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Pending</span>
                  <div className="h-2 w-2 rounded-full bg-orange-300" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-heading font-bold text-orange-400">{stats.tentative}</span>
                  <span className="text-[9px] text-teal-950/30 uppercase font-bold tracking-tighter">Guest</span>
                </div>
              </div>
            </div>

            {/* RSVP Container */}
            <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] border border-teal-900/5 shadow-2xl overflow-hidden">
              <div className="px-6 lg:px-8 py-5 lg:py-6 border-b border-teal-900/5 flex items-center justify-between bg-[#fdfdfd]">
                <h2 className="font-heading text-lg lg:text-xl font-bold tracking-tight">Guestbook Entries</h2>
                <div className="px-3 py-1 bg-sage-50 rounded-full border border-teal-900/5 text-[9px] font-bold text-teal-900/40 uppercase tracking-widest">Live</div>
              </div>

              {/* Desktop View: Table */}
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
                        <td colSpan={4} className="p-24 text-center text-teal-950/20 italic text-sm">No entries found yet.</td>
                      </tr>
                    ) : (
                      guests.map((guest: Guest) => (
                        <tr key={guest.id} className="hover:bg-sage-50/30 transition-all group">
                          <td className="p-3 px-6 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="h-7 w-7 bg-teal-950 rounded-lg flex items-center justify-center text-gold-400 font-heading font-black text-[10px] shadow-lg shadow-teal-950/10 transition-transform group-hover:-rotate-3">
                                {guest.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-[13px] font-bold tracking-tight text-teal-950 group-hover:text-gold-600 transition-colors uppercase whitespace-nowrap">{guest.name}</span>
                            </div>
                          </td>
                          <td className="p-3 px-6 text-center align-middle">
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest border border-transparent shadow-sm ${
                              guest.attendance === "hadir" ? "bg-green-100/50 text-green-700 font-bold" :
                              guest.attendance === "tidak_hadir" ? "bg-red-100/50 text-red-600 font-bold" :
                              "bg-orange-100/50 text-orange-600 font-bold"
                            }`}>
                              {guest.attendance.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-3 px-6 align-middle text-[12px] text-teal-950/60 italic leading-snug max-w-sm">
                             {guest.message}
                          </td>
                          <td className="p-3 px-6 align-middle text-right">
                            <div className="flex flex-col text-[10px] text-teal-950/30 font-bold uppercase tracking-widest">
                              <span>{formatDate(guest.createdAt.toISOString()).split(" ")[0]}</span>
                              <span className="mt-0.5 opacity-50">{guest.createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </td>
                          <td className="p-3 px-6 align-middle text-right">
                             <div className="transition-opacity">
                               <DeleteGuestbookButton id={guest.id} />
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile View: Cards */}
              <div className="md:hidden divide-y divide-teal-900/5">
                 {guests.length === 0 ? (
                   <div className="p-12 text-center text-teal-950/20 italic text-sm">No entries yet.</div>
                 ) : (
                   guests.map((guest: Guest) => (
                      <div key={guest.id} className="p-4 hover:bg-sage-50/20 transition-colors group">
                        <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center gap-2">
                              <div className="h-6 w-6 bg-teal-950 rounded-lg flex items-center justify-center text-gold-400 font-heading font-black text-[9px] shadow-sm">
                                {guest.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-[11px] font-bold tracking-tight text-teal-950 uppercase">{guest.name}</span>
                           </div>
                           <div className="flex items-center gap-3">
                             <span className={`px-1.5 py-0.5 rounded-md text-[7px] font-bold uppercase tracking-widest ${
                                guest.attendance === "hadir" ? "bg-green-100/50 text-green-700" :
                                guest.attendance === "tidak_hadir" ? "bg-red-100/50 text-red-600" :
                                "bg-orange-100/50 text-orange-600"
                              }`}>
                                {guest.attendance.replace("_", " ")}
                             </span>
                             <DeleteGuestbookButton id={guest.id} />
                           </div>
                        </div>
                        <p className="text-[11px] text-teal-950/70 italic leading-relaxed mb-3">&quot;{guest.message}&quot;</p>
                        <div className="flex justify-between items-center text-[8px] text-teal-950/30 font-bold uppercase tracking-[0.2em]">
                           <span>{formatDate(guest.createdAt.toISOString()).split(" ")[0]}</span>
                           <span>{guest.createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                   ))
                 )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <DashboardGame />
            <WhatsAppGenerator />
            
            <div className="bg-[#121b18] rounded-[1.5rem] p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-gold-400/20" />
               
               <div className="mb-8">
                  <PWAInstallButton />
               </div>

               <div className="flex items-center gap-2 mb-5 text-gold-400">
                  <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h4 className="font-heading text-lg font-bold tracking-tight">System Intel</h4>
               </div>
               <ul className="space-y-4 text-[10px] lg:text-[11px] text-white/50 leading-relaxed font-body font-medium uppercase tracking-widest">
                 <li className="flex gap-4 items-start pb-4 border-b border-white/5">
                   <span className="text-gold-500 font-bold opacity-50">01</span>
                   <span>Link personalisasi: <b>?to=[Nama]</b> akan mengaktifkan greeting khusus di Hero Cover secara instan.</span>
                 </li>
                 <li className="flex gap-4 items-start">
                   <span className="text-gold-500 font-bold opacity-50">02</span>
                   <span>Aplikasi mendukung **PWA**—Dapat diinstal melalui browser di HP sebagai Aplikasi Undangan resmi.</span>
                 </li>
               </ul>
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/20">Protocol Secured</div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-12 border-t border-teal-900/5 text-center mt-12 bg-white/50">
        <p className="font-heading text-lg font-bold tracking-tight text-teal-950">AEP-WEDDING <span className="text-gold-600 italic">Admin Suite</span></p>
        <p className="text-[8px] tracking-[0.6em] text-teal-950/30 mt-2 font-bold uppercase transition-all hover:tracking-[0.8em] cursor-default mb-4">Digital Hospitality Perfection</p>
        <p className="text-[10px] tracking-[0.2em] text-teal-950/20 font-body uppercase transition-colors">
          Crafted Elegantly by <a href="https://wa.me/6289656012756" target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors font-bold">Saffteen</a>
        </p>
      </footer>
    </div>
  );
}
