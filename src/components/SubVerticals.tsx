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
  const topSectors = data.slice(0, 8);
  const maxDeals = Math.max(...topSectors.map(s => s.deals));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 px-6 py-5 border-b border-teal-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/20 shadow-lg">
            <Activity className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Top 10 Sectors</h3>
            <p className="text-zinc-400 text-sm">By deal count</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-3">
          {topSectors.map((subvertical, index) => {
            const percentage = (subvertical.deals / maxDeals) * 100;
            
            return (
              <div key={subvertical.name} className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm w-6 tabular-nums flex-shrink-0">{index + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white text-sm">{subvertical.name}</span>
                    <span className="text-teal-400 text-xs tabular-nums">{subvertical.deals}</span>
                  </div>
                  <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500 shadow-lg"
                      style={{ 
                        width: `${percentage}%`,
                        boxShadow: '0 0 8px rgba(20, 184, 166, 0.5)'
                      }}
                    />
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