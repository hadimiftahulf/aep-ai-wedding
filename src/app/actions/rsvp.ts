"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("RSVP Error:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan ucapan" };
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
