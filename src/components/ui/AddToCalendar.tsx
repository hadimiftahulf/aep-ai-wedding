"use client";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/components/ui/SectionWrapper";
import { weddingData } from "@/data/wedding";

function formatGoogleCalDate(dateStr: string, time?: string): string {
  // Format: 20260418T090000Z
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  if (time && time !== "Waktu menyusul") {
    const hour = time.split(":")[0].padStart(2, "0");
    return `${y}${m}${day}T${hour}0000`;
  }
  return `${y}${m}${day}T080000`;
}

export function AddToCalendar() {
  const event = weddingData.events.resepsi;
  const startDate = formatGoogleCalDate(event.date, event.time);
  // End date = +3 hours
  const endNum = parseInt(startDate.slice(9, 11)) + 3;
  const endDate = startDate.slice(0, 9) + String(endNum).padStart(2, "0") + startDate.slice(11);

  const title = encodeURIComponent(`Pernikahan ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`);
  const details = encodeURIComponent(`Akad Nikah & Resepsi Pernikahan\n${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}\n\nLokasi: ${event.location}\n${event.address}`);
  const location = encodeURIComponent(event.location);

  const googleUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

  // Generate .ics file content for Apple Calendar
  const handleICS = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:Pernikahan ${weddingData.couple.groom.shortName} & ${weddingData.couple.bride.shortName}`,
      `DESCRIPTION:Akad Nikah & Resepsi Pernikahan`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-${weddingData.couple.groom.shortName.toLowerCase()}-${weddingData.couple.bride.shortName.toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white border border-sage-200 rounded-2xl shadow-md hover:shadow-xl hover:border-gold-400 transition-all duration-500 font-body text-sm text-teal-900"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-800 group-hover:text-gold-500 transition-colors" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
        </svg>
        Google Calendar
      </a>
      <button
        onClick={handleICS}
        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white border border-sage-200 rounded-2xl shadow-md hover:shadow-xl hover:border-gold-400 transition-all duration-500 font-body text-sm text-teal-900"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-800 group-hover:text-gold-500 transition-colors" fill="currentColor">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
        </svg>
        Apple / iCal
      </button>
    </motion.div>
  );
}
