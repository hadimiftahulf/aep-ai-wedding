import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { WhatsAppGenerator } from "@/components/sections/WhatsAppGenerator";

// Make the dashboard dynamically rendered
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch all stats in parallel
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
    <div className="min-h-screen bg-[#f8f9f5] font-body">
      {/* Premium Header Decoration */}
      <div className="h-2 bg-gradient-to-r from-teal-800 via-gold-500 to-teal-800" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 lg:py-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div className="relative">
            <div className="absolute -top-10 -left-6 text-gold-200/50 font-heading text-8xl pointer-events-none select-none">Admin</div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold-600 font-bold mb-3 relative z-10">Management Suite</p>
            <h1 className="font-heading text-5xl md:text-6xl text-teal-950 font-bold relative z-10 tracking-tight">
              Wedding <span className="text-gold-600 italic font-medium">Analytics</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 border-l-2 border-gold-200 pl-6 h-fit">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-teal-800/40 font-bold">Total Guest</p>
              <p className="text-2xl font-heading text-teal-950 font-bold">{stats.totalRsvp}</p>
            </div>
            <div className="h-8 w-px bg-gold-200 mx-2" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-teal-800/40 font-bold">Unique Views</p>
              <p className="text-2xl font-heading text-teal-950 font-bold">{stats.views}</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-8 border border-sage-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-32 group-hover:h-32" />
                <span className="text-[10px] uppercase tracking-widest text-teal-800/50 font-bold mb-4 block relative z-10">Peserta Hadir</span>
                <span className="text-6xl font-heading text-green-600 font-bold relative z-10 tracking-tighter">{stats.attending}</span>
                <p className="text-xs text-teal-800/40 mt-4 font-medium uppercase tracking-widest">Tamu Terkonfirmasi</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-sage-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-32 group-hover:h-32" />
                <span className="text-[10px] uppercase tracking-widest text-teal-800/50 font-bold mb-4 block relative z-10">Tidak Hadir</span>
                <span className="text-6xl font-heading text-red-500 font-bold relative z-10 tracking-tighter">{stats.notAttending}</span>
                <p className="text-xs text-teal-800/40 mt-4 font-medium uppercase tracking-widest">Berhalangan</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-sage-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:w-32 group-hover:h-32" />
                <span className="text-[10px] uppercase tracking-widest text-teal-800/50 font-bold mb-4 block relative z-10">Masih Ragu</span>
                <span className="text-6xl font-heading text-orange-400 font-bold relative z-10 tracking-tighter">{stats.tentative}</span>
                <p className="text-xs text-teal-800/40 mt-4 font-medium uppercase tracking-widest">Tentatif</p>
              </div>
            </div>

            {/* RSVP Table Card */}
            <div className="bg-white rounded-[2.5rem] border border-sage-200 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-sage-100 flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-3xl text-teal-950 font-bold tracking-tight">Daftar Kehadiran</h2>
                  <p className="text-xs text-teal-800/40 font-medium uppercase tracking-[0.2em] mt-1">Live Updates from Rsvp</p>
                </div>
                <div className="h-10 w-10 border border-gold-200 rounded-full flex items-center justify-center text-gold-600 italic font-heading text-xl">
                  {stats.totalRsvp}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-sage-50/30">
                      <th className="p-5 px-8 text-[10px] uppercase tracking-[0.3em] text-teal-800/50 font-bold border-b border-sage-100">Waktu</th>
                      <th className="p-5 px-8 text-[10px] uppercase tracking-[0.3em] text-teal-800/50 font-bold border-b border-sage-100">Nama Lengkap</th>
                      <th className="p-5 px-8 text-[10px] uppercase tracking-[0.3em] text-teal-800/50 font-bold border-b border-sage-100 text-center">Status</th>
                      <th className="p-5 px-8 text-[10px] uppercase tracking-[0.3em] text-teal-800/50 font-bold border-b border-sage-100">Pesan & Doa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sage-50">
                    {guests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-20 text-center text-teal-800/30 italic font-body">
                          <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 bg-sage-50 rounded-full flex items-center justify-center border border-sage-100">
                               <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            </div>
                            <p>Belum ada data RSVP yang masuk.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      guests.map(guest => (
                        <tr key={guest.id} className="hover:bg-sage-50/40 transition-all duration-300 group">
                          <td className="p-6 px-8 text-xs text-teal-900/40 align-top pt-8">
                            <div className="flex flex-col">
                              <span className="font-bold text-teal-900/60 uppercase tracking-tighter letter-spacing-1">{formatDate(guest.createdAt.toISOString()).split(" ")[0]}</span>
                              <span className="text-[10px]">{guest.createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                            </div>
                          </td>
                          <td className="p-6 px-8 align-top pt-8">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 flex-shrink-0 bg-sage-50 border border-gold-100 rounded-full flex items-center justify-center text-gold-700 font-heading text-lg font-medium">
                                {guest.name.charAt(0)}
                              </div>
                              <span className="text-sm text-teal-950 font-bold tracking-tight group-hover:text-gold-600 transition-colors underline-offset-4 decoration-gold-300/30">{guest.name}</span>
                            </div>
                          </td>
                          <td className="p-6 px-8 align-top pt-8 text-center">
                            <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                              guest.attendance === "hadir" ? "bg-green-50 text-green-700 border-green-100" :
                              guest.attendance === "tidak_hadir" ? "bg-red-50 text-red-700 border-red-100" :
                              "bg-orange-50 text-orange-700 border-orange-100"
                            }`}>
                              {guest.attendance.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-6 px-8 text-sm text-teal-950/70 italic leading-relaxed font-body align-top pt-8 max-w-sm">
                            <div className="relative">
                              <span className="absolute -left-4 -top-1 text-gold-300/40 text-2xl font-serif">“</span>
                              {guest.message}
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

          {/* Sidebar Area */}
          <div className="space-y-8">
            <WhatsAppGenerator />
            
            <div className="bg-teal-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -mr-16 -mt-16 blur-2xl font-heading" />
               <h4 className="font-heading text-xl mb-4 text-gold-400 font-bold">Quick Tips</h4>
               <ul className="space-y-4 text-sm text-teal-50/70 leading-relaxed font-body">
                 <li className="flex gap-3 items-start">
                   <div className="h-5 w-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-[10px] mt-0.5">•</div>
                   Gunakan link <b>?to=[Nama]</b> untuk personalisasi nama tamu di halaman Cover.
                 </li>
                 <li className="flex gap-3 items-start">
                   <div className="h-5 w-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-[10px] mt-0.5">•</div>
                   Data RSVP akan terupdate secara realtime tanpa perlu refresh halaman dashboard.
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Footer Decoration */}
      <footer className="py-12 text-center opacity-30">
        <p className="font-heading text-lg text-teal-950">A&P Wedding Admin Suite</p>
        <p className="text-[10px] uppercase tracking-[0.5em] text-teal-800 mt-2">Luxury Digital Presence</p>
      </footer>
    </div>
  );
}
