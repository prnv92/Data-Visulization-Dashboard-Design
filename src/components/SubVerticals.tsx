import { Activity } from 'lucide-react';

interface SubVertical {
  name: string;
  parent: string;
  deals: number;
}

interface SubVerticalsProps {
  data: SubVertical[];
}

export function SubVerticals({ data }: SubVerticalsProps) {
  const topSectors = data.slice(0, 10);
  const maxDeals = Math.max(...topSectors.map(s => s.deals));

  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Top 10 Sectors</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider">By deal count</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-auto">
        <div className="space-y-3">
          {topSectors.map((subvertical, index) => {
            const percentage = (subvertical.deals / maxDeals) * 100;
            const isTop3 = index < 3;
            
            return (
              <div key={subvertical.name} className="flex items-center gap-3">
                <span className={`text-xs w-6 tabular-nums flex-shrink-0 font-bold ${
                  isTop3 ? 'text-[#FFD400]' : 'text-[#808080]'
                }`}>
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs truncate uppercase font-semibold ${
                      isTop3 ? 'text-white' : 'text-[#D5D5D5]'
                    }`}>
                      {subvertical.name}
                    </span>
                    <span className={`text-xs tabular-nums ml-2 flex-shrink-0 font-bold ${
                      isTop3 ? 'text-[#FFD400]' : 'text-[#808080]'
                    }`}>
                      {subvertical.deals}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
