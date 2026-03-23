"use server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackVisit() {
  try {
    const headersList = headers();
    const xForwardedFor = headersList.get("x-forwarded-for");
    let ip = "unknown";

    if (xForwardedFor) {
      // x-forwarded-for can be a comma-separated list of IPs, the first one is the client
      ip = xForwardedFor.split(',')[0].trim();
    } else {
      ip = headersList.get("x-real-ip") || "unknown";
    }

    const userAgent = headersList.get("user-agent") || "unknown";

    // Stop if localhost or common development IPs
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) return;

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
