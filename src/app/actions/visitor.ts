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

    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) return;

    await prisma.visitor.upsert({
      where: { ip },
      update: {},
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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const visitors = await prisma.visitor.findMany({
      where: {
        visitedAt: {
          gte: sevenDaysAgo,
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
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      history[dateStr] = 0;
    }

    visitors.forEach((v: { visitedAt: Date }) => {
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
