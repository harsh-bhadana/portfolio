"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { getGitHubContributions } from "@/app/actions/github";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface ContributionDay {
  count: number;
  date: string;
  level: number;
}

export default function GitHubContribution() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchContributions = useCallback(async (year: number) => {
    setLoading(true);
    setError(null);

    const { data: result, error: fetchError } = await getGitHubContributions("harsh-bhadana", year);

    if (fetchError) {
      setError(fetchError);
    } else {
      setData(result);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchContributions(currentDate.getFullYear());
  }, [currentDate.getFullYear(), fetchContributions]);

  const nextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prev);
  };

  if (!mounted) return null;

  const monthRange = `${new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1).toLocaleString("default", { month: "short" })} - ${currentDate.toLocaleString("default", { month: "short", year: "numeric" })}`;

  // Filter contributions for the last 3 months
  const filteredContributions = data.filter(day => {
    const d = new Date(day.date);
    const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
    const endOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return d >= threeMonthsAgo && d <= endOfCurrentMonth;
  });

  const totalCommits = filteredContributions.reduce((sum, day) => sum + day.count, 0);

  const getLevelColor = (level: number) => {
    const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    return colors[level] || colors[0];
  };

  // Group by weeks for the grid
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  filteredContributions.forEach((day, index) => {
    currentWeek.push(day);
    const date = new Date(day.date);
    if (date.getDay() === 6 || index === filteredContributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="w-full p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="mb-8 text-center w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <span className="text-accent font-black tracking-widest uppercase text-[10px] mb-2 block">
              Quarterly Activity
            </span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase">
              GitHub <span className="animate-gradient">Pulse</span>
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Previous Period"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Next Period"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit mx-auto">
          <span className="text-xs font-bold text-foreground/70">{monthRange}</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">
            {totalCommits} Commits
          </span>
        </div>
      </div>

      <div className="w-full relative min-h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-3 h-3 rounded-full bg-accent"
                  />
                ))}
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-md"
            >
              <Info className="text-red-500" size={32} />
              <div>
                <p className="text-sm font-bold text-red-500 mb-1">Failed to Sync</p>
                <p className="text-xs text-foreground/50 leading-relaxed">{error}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={monthRange}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex justify-center overflow-x-auto custom-scrollbar pb-6"
            >
              <div className="grid grid-flow-col grid-rows-7 gap-2 md:gap-2.5">
                {weeks.map((week, wIndex) =>
                  week.map((day, dIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (wIndex * 7 + dIndex) * 0.003 }}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-[4px] md:rounded-[6px] relative group shrink-0"
                      style={{ backgroundColor: getLevelColor(day.level) }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black border border-white/10 text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {day.count} commits on {new Date(day.date).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
        <span>Less</span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-[2px]"
              style={{ backgroundColor: getLevelColor(level) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      <style jsx global>{`
        .animate-gradient {
          background: linear-gradient(to right, #39d353, #26a641, #39d353);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
