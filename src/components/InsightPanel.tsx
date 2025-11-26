import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface InsightPanelProps {
  insights: string[];
}

export function InsightPanel({ insights }: InsightPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-blue-900/40 via-zinc-900 to-indigo-900/40 border border-blue-700/50 h-full relative overflow-hidden shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent blur-2xl" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 px-6 py-5 border-b border-blue-700/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/30 shadow-lg animate-pulse">
              <Lightbulb className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-white text-lg tracking-tight">Key Insight</h3>
              <p className="text-zinc-400 text-sm">Data highlights</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-between p-6">
          <div className="flex-1 flex items-center">
            <p 
              className={`text-white text-base leading-relaxed transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {insights[currentIndex]}
            </p>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2 mt-4">
            {insights.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg shadow-blue-500/50' 
                    : 'bg-zinc-800/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}