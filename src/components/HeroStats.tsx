import { useEffect, useState } from 'react';
import { TrendingUp, Building2, ArrowUpRight } from 'lucide-react';

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
    <div className="relative overflow-hidden rounded-2xl bg-[#151515] h-full border border-[#3A3A3A]">
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-white mb-2 tracking-tight font-bold uppercase text-[48px]">
            Funding the Future
          </h1>
          <p className="text-[#808080] text-base uppercase tracking-wider">
            Mapping India's Startup Momentum 2015-2020
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 h-28">
          {/* Total Funding KPI */}
          <div className="bg-[#0E0E0E] rounded-xl p-4 border border-[#3A3A3A] relative overflow-hidden">
            <div className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#FFD400] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0E0E0E]" strokeWidth={2.5} />
            </div>
            <div className="pt-1">
              <div className="text-[#808080] text-xs uppercase tracking-wider mb-2">Total Funding</div>
              <div className="text-white text-3xl tabular-nums tracking-tight font-bold">
                {formatFunding(animatedFunding)}
              </div>
            </div>
          </div>

          {/* Startups Funded KPI */}
          <div className="bg-[#0E0E0E] rounded-xl p-4 border border-[#3A3A3A] relative overflow-hidden">
            <div className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#FFD400] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0E0E0E]" strokeWidth={2.5} />
            </div>
            <div className="pt-1">
              <div className="text-[#808080] text-xs uppercase tracking-wider mb-2">Startups Funded</div>
              <div className="text-white text-3xl tabular-nums tracking-tight font-bold">
                {animatedStartups.toLocaleString()}
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
}
