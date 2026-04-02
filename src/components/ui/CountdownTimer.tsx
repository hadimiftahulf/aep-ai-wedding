"use client";
import { useCountdown } from "@/hooks/useCountdown";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const TimeBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center p-3 md:p-4 min-w-[65px] md:min-w-[90px] bg-white rounded-xl shadow-sm border border-slate-200">
      <span className="text-2xl md:text-4xl font-heading font-bold text-navy-900 mb-1">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[8px] md:text-[10px] text-navy-700/60 uppercase tracking-[0.2em] font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-5 py-6 my-6 md:my-10 max-w-4xl mx-auto px-2">
      <TimeBox label="Hari" value={days} />
      <span className="hidden sm:block text-2xl font-serif text-navy-800/30">:</span>
      <TimeBox label="Jam" value={hours} />
      <span className="hidden md:block text-2xl font-serif text-navy-800/30">:</span>
      <TimeBox label="Menit" value={minutes} />
      <span className="hidden sm:block text-2xl font-serif text-navy-800/30">:</span>
      <TimeBox label="Detik" value={seconds} />
    </div>
  );
}
