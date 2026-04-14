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

  // Explicitly mapped to Tailwind theme colors for v4 compiler visibility
  const getLevelClass = (level: number) => {
    if (level === 0) return "bg-[var(--gh-l0)]";
    if (level === 1) return "bg-[var(--gh-l1)]";
    if (level === 2) return "bg-[var(--gh-l2)]";
    if (level === 3) return "bg-[var(--gh-l3)]";
    if (level === 4) return "bg-[var(--gh-l4)]";
    return "bg-[var(--gh-l0)]";
  };

  // Calculate padding for the first week to align with Sunday
  const firstDay = filteredContributions.length > 0 ? new Date(filteredContributions[0].date) : new Date();
  const firstDayOfWeek = firstDay.getDay(); // 0 is Sunday, 6 is Saturday
  
  const paddedContributions: (ContributionDay | { level: 0; count: 0; date: string; isPadding: true })[] = [];
  
  // Add padding for the start of the first week
  for (let i = 0; i < firstDayOfWeek; i++) {
    const d = new Date(firstDay);
    d.setDate(d.getDate() - (firstDayOfWeek - i));
    paddedContributions.push({
      level: 0,
      count: 0,
      date: `padding-start-${i}`,
      isPadding: true
    });
  }
  
  // Add actual contributions
  paddedContributions.push(...filteredContributions);
  
  // Add padding for the end of the last week
  const lastContribution = filteredContributions[filteredContributions.length - 1];
  const lastDay = lastContribution ? new Date(lastContribution.date) : new Date();
  const lastDayOfWeek = lastDay.getDay();
  if (lastDayOfWeek < 6) {
    for (let i = lastDayOfWeek + 1; i <= 6; i++) {
      paddedContributions.push({
        level: 0,
        count: 0,
        date: `padding-end-${i}`,
        isPadding: true
      });
    }
  }

  return (
    <div className="w-full p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all relative overflow-hidden flex flex-col items-center">
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
              className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors"
              aria-label="Previous Period"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-colors"
              aria-label="Next Period"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 w-fit mx-auto">
          <span className="text-xs font-bold text-foreground/70">{monthRange}</span>
          <div className="w-px h-3 bg-foreground/10" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center overflow-x-auto custom-scrollbar pb-6"
            >
              <div className="grid grid-flow-col grid-rows-7 gap-2 md:gap-2.5">
                {paddedContributions.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.002 }}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-[4px] md:rounded-[6px] relative group shrink-0 ${getLevelClass(day.level)} border border-foreground/5`}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    {"isPadding" in day ? null : (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-card border border-foreground/10 text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {day.count} commits on {new Date(day.date).toLocaleDateString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
        <span>Less</span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-[2px] ${getLevelClass(level)}`}
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
