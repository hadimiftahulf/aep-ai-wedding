"use server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackVisit() {
  try {
    const headersList = headers();
    // Vercel routes specific IP headers
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Skip if localhost or unknown (optional, but good for dev)
    // if (ip === "::1" || ip === "127.0.0.1") return;

    // Use upsert to track unique IPs (only creates if not exists)
    await prisma.visitor.upsert({
      where: { ip },
      update: {
        // Optional: update visitedAt or userAgent if they return
        // visitedAt: new Date() 
      },
      create: {
        ip,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);
  }
}
