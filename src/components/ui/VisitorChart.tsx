"use client";
import { motion } from "framer-motion";

interface VisitorHistory {
  date: string;
  count: number;
}

interface VisitorChartProps {
  history: VisitorHistory[];
}

export function VisitorChart({ history }: VisitorChartProps) {
  const maxCount = Math.max(...history.map(d => d.count), 5); // Fallback to 5 if all 0

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-gold-400/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] lowercase tracking-[0.2em] text-navy-950/40 font-black">Visitor Analytics</p>
          <h4 className="font-heading text-sm font-bold text-navy-950">Daily Unique Hits</h4>
        </div>
        <div className="h-8 w-8 bg-navy-900/5 rounded-xl flex items-center justify-center text-[10px]">
          📈
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1 sm:gap-4 h-[120px] mb-4 overflow-hidden px-2">
        {history.map((day, i) => {
          const height = (day.count / maxCount) * 100;
          const displayDate = new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short' });

          return (
            <div key={day.date} className="flex-1 group relative flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy-950 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                {day.count} Hits
              </div>
              
              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="w-full max-w-[12px] sm:max-w-[24px] bg-gradient-to-t from-navy-900 to-navy-800/60 rounded-t-lg relative group-hover:from-gold-600 group-hover:to-gold-400 transition-all shadow-lg"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
              </motion.div>

              {/* Day Label */}
              <p className="text-[8px] font-black uppercase tracking-widest text-navy-950/20 mt-3 group-hover:text-navy-950/60 transition-colors">
                {displayDate}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-navy-900/5 flex items-center justify-between text-[8px] font-black text-navy-950/30 uppercase tracking-[0.2em]">
        <span>7-Day Trend</span>
        <span className="text-navy-950/10">● ● ●</span>
      </div>
    </div>
  );
}
