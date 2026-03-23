"use client";
import { useCountdown } from "@/hooks/useCountdown";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const TimeBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center p-4 min-w-[70px] md:min-w-[90px] bg-white rounded-xl shadow-sm border border-sage-200">
      <span className="text-3xl md:text-4xl font-heading font-medium text-teal-900 mb-1">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-teal-700/60 uppercase tracking-[0.2em] font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center gap-3 md:gap-5 animate-fade-in py-6 my-10 max-w-3xl mx-auto">
      <TimeBox label="Hari" value={days} />
      <span className="text-2xl font-serif text-teal-800/30">:</span>
      <TimeBox label="Jam" value={hours} />
      <span className="text-2xl font-serif text-teal-800/30">:</span>
      <TimeBox label="Menit" value={minutes} />
      <span className="text-2xl font-serif text-teal-800/30">:</span>
      <TimeBox label="Detik" value={seconds} />
    </div>
  );
}
