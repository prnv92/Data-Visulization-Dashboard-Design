import { useEffect, useState } from 'react';
import { TrendingUp, Building2 } from 'lucide-react';

interface HeroStatsProps {
  totalFunding: number;
  totalStartups: number;
}

export function HeroStats({ totalFunding, totalStartups }: HeroStatsProps) {
  const [animatedFunding, setAnimatedFunding] = useState(0);
  const [animatedStartups, setAnimatedStartups] = useState(0);

  useEffect(() => {
    const fundingDuration = 2500;
    const startupDuration = 2000;
    const steps = 60;

    const fundingIncrement = totalFunding / steps;
    const startupIncrement = totalStartups / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedFunding(Math.floor(fundingIncrement * currentStep));
        setAnimatedStartups(Math.floor(startupIncrement * currentStep));
      } else {
        clearInterval(interval);
        setAnimatedFunding(totalFunding);
        setAnimatedStartups(totalStartups);
      }
    }, Math.max(fundingDuration, startupDuration) / steps);

    return () => clearInterval(interval);
  }, [totalFunding, totalStartups]);

  const formatFunding = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    }
    return `$${(num / 1000000).toFixed(0)}M`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-600 h-full shadow-2xl shadow-cyan-900/30 border border-cyan-500/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-white text-5xl mb-2 tracking-tight">Funding the Future</h1>
          <p className="text-white/90 text-lg">
            Mapping India's Startup Momentum 2020-2024
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/25 hover:bg-white/20 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-white/25 shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/90 text-base tracking-wide">Total Funding</span>
            </div>
            <div className="text-6xl text-white tabular-nums tracking-tight">
              {formatFunding(animatedFunding)}
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/25 hover:bg-white/20 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-white/25 shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/90 text-base tracking-wide">Startups Funded</span>
            </div>
            <div className="text-6xl text-white tabular-nums tracking-tight">
              {animatedStartups.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}