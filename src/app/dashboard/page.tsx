import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { WhatsAppGenerator } from "@/components/sections/WhatsAppGenerator";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [visitors, guests] = await Promise.all([
    prisma.visitor.count(),
    prisma.guestbook.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = {
    views: visitors,
    totalRsvp: guests.length,
    attending: guests.filter(g => g.attendance === "hadir").length,
    notAttending: guests.filter(g => g.attendance === "tidak_hadir").length,
    tentative: guests.filter(g => g.attendance === "ragu").length,
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] font-body text-teal-950 selection:bg-gold-200">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-teal-950 via-gold-500 to-teal-950" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-10 lg:px-12 lg:py-14">
        {/* Compact Modern Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-teal-900/5 pb-10">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-teal-950 flex items-center justify-center shadow-2xl rotate-3">
               <span className="font-heading text-2xl text-gold-400 font-bold italic">A</span>
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                Control <span className="text-gold-600 italic font-medium">Center</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-teal-950/40 font-bold mt-1">A&P Wedding Management Suite v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-teal-900/5">
             <div className="px-5 py-2.5 bg-sage-50 rounded-xl flex flex-col items-center min-w-[100px]">
               <span className="text-[9px] uppercase tracking-widest text-teal-950/40 font-bold mb-0.5">Live Views</span>
               <span className="text-xl font-heading font-bold text-teal-950">{stats.views}</span>
             </div>
             <div className="px-5 py-2.5 bg-teal-950 rounded-xl flex flex-col items-center min-w-[100px] shadow-lg shadow-teal-900/10">
               <span className="text-[9px] uppercase tracking-widest text-gold-300 font-bold mb-0.5">RSVPs</span>
               <span className="text-xl font-heading font-bold text-white">{stats.totalRsvp}</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Table Content - Column Span 8 */}
          <div className="lg:col-span-8 space-y-8">
            {/* Ultra Compact Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-[1.25rem] p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Confirmed</span>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold text-green-600">{stats.attending}</span>
                  <span className="text-[10px] text-teal-950/30 uppercase font-bold tracking-tighter">Guests</span>
                </div>
              </div>

              <div className="bg-white rounded-[1.25rem] p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Unable</span>
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold text-red-500">{stats.notAttending}</span>
                  <span className="text-[10px] text-teal-950/30 uppercase font-bold tracking-tighter">Guests</span>
                </div>
              </div>

              <div className="bg-white rounded-[1.25rem] p-5 border border-teal-900/5 shadow-sm group hover:scale-[1.02] transition-transform cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-widest text-teal-950/40 font-bold">Pending</span>
                  <div className="h-2 w-2 rounded-full bg-orange-300" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold text-orange-400">{stats.tentative}</span>
                  <span className="text-[10px] text-teal-950/30 uppercase font-bold tracking-tighter">Guests</span>
                </div>
              </div>
            </div>

            {/* RSVP Table Container */}
            <div className="bg-white rounded-[2rem] border border-teal-900/5 shadow-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-teal-900/5 flex items-center justify-between bg-[#fdfdfd]">
                <h2 className="font-heading text-xl font-bold tracking-tight">Guestbook Entries</h2>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-lg bg-sage-50 flex items-center justify-center border border-teal-900/5 text-teal-900/40 hover:text-teal-900 transition-colors cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                   </div>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-teal-900/5">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10">
                    <tr className="border-b border-teal-900/5">
                      <th className="p-4 px-8 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold">Guest</th>
                      <th className="p-4 px-8 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold text-center">RSVP</th>
                      <th className="p-4 px-8 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold">Message</th>
                      <th className="p-4 px-8 text-[9px] uppercase tracking-[0.25em] text-teal-950/30 font-bold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-900/5">
                    {guests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-24 text-center text-teal-950/20 italic text-sm">No entries found yet.</td>
                      </tr>
                    ) : (
                      guests.map(guest => (
                        <tr key={guest.id} className="hover:bg-sage-50/20 transition-all group">
                          <td className="p-5 px-8 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 bg-teal-950 rounded-xl flex items-center justify-center text-gold-400 font-heading font-bold text-sm shadow-lg shadow-teal-950/10 transition-transform group-hover:-rotate-3">
                                {guest.name.charAt(0)}
                              </div>
                              <span className="text-sm font-bold tracking-tight text-teal-950 group-hover:text-gold-600 transition-colors">{guest.name}</span>
                            </div>
                          </td>
                          <td className="p-5 px-8 text-center align-middle">
                            <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-transparent shadow-sm ${
                              guest.attendance === "hadir" ? "bg-green-100/50 text-green-700 font-bold" :
                              guest.attendance === "tidak_hadir" ? "bg-red-100/50 text-red-600 font-bold" :
                              "bg-orange-100/50 text-orange-600 font-bold"
                            }`}>
                              {guest.attendance.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-5 px-8 align-middle text-xs text-teal-950/70 italic leading-relaxed max-w-sm">
                             {guest.message}
                          </td>
                          <td className="p-5 px-8 align-middle whitespace-nowrap">
                            <div className="flex flex-col text-[10px] text-teal-950/30 font-bold uppercase tracking-widest">
                              <span>{formatDate(guest.createdAt.toISOString()).split(" ")[0]}</span>
                              <span className="mt-0.5">{guest.createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area - Column Span 4 */}
          <div className="lg:col-span-4 space-y-6">
            <WhatsAppGenerator />
            
            <div className="bg-[#121b18] rounded-[1.75rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-gold-400/20" />
               <div className="flex items-center gap-2 mb-6 text-gold-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h4 className="font-heading text-lg font-bold tracking-tight">System Intel</h4>
               </div>
               <ul className="space-y-4 text-[11px] text-white/50 leading-relaxed font-body font-medium uppercase tracking-widest">
                 <li className="flex gap-4 items-start pb-4 border-b border-white/5">
                   <span className="text-gold-500 font-bold">01</span>
                   <span>Gunakan parameter <b>?to=</b> untuk aktivasi personalisasi undangan otomatis.</span>
                 </li>
                 <li className="flex gap-4 items-start pb-0 border-none">
                   <span className="text-gold-500 font-bold">02</span>
                   <span>Tabel RSVP sinkron otomatis dengan PostgreSQL realtime database.</span>
                 </li>
               </ul>
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/20">Auth Verified</div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-12 border-t border-teal-900/5 text-center mt-12 bg-white/50">
        <p className="font-heading text-lg font-bold tracking-tight text-teal-950">AEP-WEDDING <span className="text-gold-600">v2.1</span></p>
        <p className="text-[9px] uppercase tracking-[0.5em] text-teal-950/30 mt-2 font-bold italic">Boutique Digital Hospitality</p>
      </footer>
    </div>
  );
}
