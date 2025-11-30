import { TrendingUp, Building2 } from 'lucide-react';

interface Startup {
  name: string;
  industry: string;
  funding: number;
  fundingDisplay: string;
  year: string;
  city: string;
}

interface TopStartupsProps {
  data: Startup[];
}

export function TopStartups({ data }: TopStartupsProps) {
  const topStartups = data.slice(0, 15);
  const maxFunding = Math.max(...topStartups.map(s => s.funding));

  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Top Funded Startups</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider">2015-2020 Total Funding</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-auto">
        <div className="space-y-3">
          {topStartups.map((startup, index) => {
            const percentage = (startup.funding / maxFunding) * 100;
            const isTop3 = index < 3;
            
            return (
              <div key={startup.name} className="flex items-center gap-3">
                <span className={`text-xs w-6 tabular-nums flex-shrink-0 font-bold ${
                  isTop3 ? 'text-[#FFD400]' : 'text-[#808080]'
                }`}>
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className={`text-xs truncate font-bold ${
                        isTop3 ? 'text-white' : 'text-[#D5D5D5]'
                      }`}>
                        {startup.name}
                      </span>
                      <span className="text-[#808080] text-xs flex-shrink-0">•</span>
                      <span className="text-[#808080] text-xs truncate">
                        {startup.industry}
                      </span>
                    </div>
                    <span className={`text-xs tabular-nums ml-2 flex-shrink-0 font-bold ${
                      isTop3 ? 'text-[#FFD400]' : 'text-[#808080]'
                    }`}>
                      {startup.fundingDisplay}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#0E0E0E] rounded-sm overflow-hidden border border-[#3A3A3A]">
                    <div 
                      className={`h-full transition-all duration-500 relative ${
                        isTop3 ? 'bg-[#FFD400]' : 'bg-[#3A3A3A]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    >
                      {/* Diagonal stripes for top 3 */}
                      {isTop3 && (
                        <div 
                          className="absolute inset-0" 
                          style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.15) 12px)'
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {/* City and year info */}
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-3 h-3 text-[#666666]" />
                    <span className="text-[#666666] text-xs">
                      {startup.city}
                    </span>
                    <span className="text-[#666666] text-xs">•</span>
                    <span className="text-[#666666] text-xs">
                      {startup.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
