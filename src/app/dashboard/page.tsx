import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

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
    <div className="min-h-screen bg-sage-50 font-body p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-gold-500 font-bold mb-2">Admin Panel</p>
          <h1 className="font-heading text-4xl text-teal-900 font-bold">Wedding Dashboard</h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Card: Unique Views */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest text-teal-800/50 font-bold mb-2">Pengunjung Web</span>
            <span className="text-5xl font-heading text-teal-900 font-bold">{stats.views}</span>
            <span className="text-xs text-teal-800/40 mt-2">Unique IP Addresses</span>
          </div>

          {/* Card: Attending */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest text-teal-800/50 font-bold mb-2">Hadir</span>
            <span className="text-5xl font-heading text-green-600 font-bold">{stats.attending}</span>
            <span className="text-xs text-teal-800/40 mt-2">Tamu</span>
          </div>

          {/* Card: Not Attending */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest text-teal-800/50 font-bold mb-2">Tidak Hadir</span>
            <span className="text-5xl font-heading text-red-500 font-bold">{stats.notAttending}</span>
            <span className="text-xs text-teal-800/40 mt-2">Tamu</span>
          </div>

          {/* Card: Tentative */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest text-teal-800/50 font-bold mb-2">Masih Ragu</span>
            <span className="text-5xl font-heading text-orange-400 font-bold">{stats.tentative}</span>
            <span className="text-xs text-teal-800/40 mt-2">Tamu</span>
          </div>
        </div>

        {/* Table: RSVP Data */}
        <div className="bg-white rounded-3xl border border-sage-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-sage-200 bg-sage-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-heading text-2xl text-teal-900 font-bold">Daftar Reservasi Kehadiran</h2>
            <span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-teal-800 border border-sage-200 shadow-sm">
              Total: {stats.totalRsvp} Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-sage-50/20">
                  <th className="p-4 px-6 text-xs uppercase tracking-widest text-teal-800/50 font-bold border-b border-sage-200">Waktu</th>
                  <th className="p-4 px-6 text-xs uppercase tracking-widest text-teal-800/50 font-bold border-b border-sage-200">Nama Tamu</th>
                  <th className="p-4 px-6 text-xs uppercase tracking-widest text-teal-800/50 font-bold border-b border-sage-200">Status</th>
                  <th className="p-4 px-6 text-xs uppercase tracking-widest text-teal-800/50 font-bold border-b border-sage-200">Ucapan / Doa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {guests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-teal-800/40 italic">Belum ada tamu yang mengisi RSVP.</td>
                  </tr>
                ) : (
                  guests.map(guest => (
                    <tr key={guest.id} className="hover:bg-sage-50/30 transition-colors">
                      <td className="p-4 px-6 text-xs text-teal-900/60 whitespace-nowrap align-top pt-5">
                        {formatDate(guest.createdAt.toISOString()).split(" ")[0]} 
                        <span className="block text-[10px] mt-1">{guest.createdAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                      </td>
                      <td className="p-4 px-6 text-sm text-teal-900 font-bold align-top pt-5">
                        {guest.name}
                      </td>
                      <td className="p-4 px-6 align-top pt-5">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          guest.attendance === "hadir" ? "bg-green-100 text-green-700 border border-green-200" :
                          guest.attendance === "tidak_hadir" ? "bg-red-100 text-red-700 border border-red-200" :
                          "bg-orange-100 text-orange-700 border border-orange-200"
                        }`}>
                          {guest.attendance.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 px-6 text-sm text-teal-800/80 italic leading-relaxed min-w-[300px]">
                        &quot;{guest.message}&quot;
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
