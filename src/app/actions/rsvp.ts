"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { weddingData } from "@/data/wedding";

async function sendWhatsAppNotification(name: string, message: string, attendance: string) {
  const token = process.env.FONNTE_TOKEN;
  if (!token) return;

  const targets = [
    weddingData.couple.groom.phone,
    weddingData.couple.bride.phone,
  ].filter(Boolean).join(",");

  const statusEmoji = attendance === "hadir" ? "✅ Konfirmasi: HADIR" : attendance === "tidak_hadir" ? "❌ Konfirmasi: BERHALANGAN" : "⏳ Konfirmasi: MASIH RAGU";

  const [visitorCount, totalRsvp, attendingCount] = await Promise.all([
    prisma.visitor.count(),
    prisma.guestbook.count(),
    prisma.guestbook.count({ where: { attendance: 'hadir' } })
  ]);

  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;

  const waMessage = `*Alhamdulillah, ada kiriman Doa & RSVP baru!* 💌✨

*Dari:* ${name}
*Status:* ${statusEmoji}

*Pesan/Harapan:*
"${message}"

---
*Update Dashboard Saat Ini:*
👥 Total Pengunjung: ${visitorCount}
📝 Total RSVP Masuk: ${totalRsvp}
✨ Tamu Akan Hadir: ${attendingCount}

Silakan masuk ke Dashboard Admin untuk detail lebih lanjut:
🔗 ${dashboardUrl} 💍✨`;

  try {
    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: new URLSearchParams({
        target: targets,
        message: waMessage,
      }),
    });
  } catch (err) {
    console.error("Fonnte Error:", err);
  }
}

export async function submitRsvp(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const attendance = formData.get("attendance") as string;

    if (!name || !message || !attendance) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    await prisma.guestbook.create({
      data: {
        name,
        message,
        attendance,
      },
    });

    // Send WhatsApp Notification async
    sendWhatsAppNotification(name, message, attendance).catch(console.error);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("RSVP Error:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan ucapan" };
  }
}

export async function deleteGuestbookEntry(id: string) {
  try {
    await prisma.guestbook.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Gagal menghapus pesan" };
  }
}

export async function getGuestbook() {
  try {
    const messages = await prisma.guestbook.findMany({
      orderBy: { createdAt: "desc" },
    });
    return messages;
  } catch (error) {
    console.error("Gagal memuat ucapan:", error);
    return [];
  }
}
