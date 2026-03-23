"use server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackVisit() {
  try {
    const headersList = headers();
    const xForwardedFor = headersList.get("x-forwarded-for");
    let ip = "unknown";

    if (xForwardedFor) {
      ip = xForwardedFor.split(',')[0].trim();
    } else {
      ip = headersList.get("x-real-ip") || "unknown";
    }

    const userAgent = headersList.get("user-agent") || "unknown";

    // Ignore local/internal IPs
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) return;

    await prisma.visitor.upsert({
      where: { ip },
      update: { visitedAt: new Date() }, // Crucial: Update timestamp on returning visit
      create: {
        ip,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);
  }
}

export async function getVisitorHistory() {
  try {
    // Use Indonesian timezone (GMT+7) for consistent daily buckets
    // We'll calculate the start of the 7-day window
    const startOfWindow = new Date();
    startOfWindow.setDate(startOfWindow.getDate() - 6);
    startOfWindow.setHours(0, 0, 0, 0);

    const visitors = await prisma.visitor.findMany({
      where: {
        visitedAt: {
          gte: startOfWindow,
        },
      },
      select: {
        visitedAt: true,
      },
      orderBy: {
        visitedAt: "asc",
      },
    });

    const history: Record<string, number> = {};
    
    // Initialize the last 7 days (including today)
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      // We use a date string that represents the day in local terms for the grouping
      // but for DB equality, we stick to YYYY-MM-DD
      const dateStr = d.toISOString().split("T")[0];
      history[dateStr] = 0;
    }

    visitors.forEach((v) => {
      const dateStr = v.visitedAt.toISOString().split("T")[0];
      if (history[dateStr] !== undefined) {
        history[dateStr]++;
      }
    });

    return Object.entries(history)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Failed to fetch visitor history:", error);
    return [];
  }
}
