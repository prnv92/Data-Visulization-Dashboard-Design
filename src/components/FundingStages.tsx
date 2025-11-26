import { Target } from 'lucide-react';

interface FundingStagesProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export function FundingStages({ data }: FundingStagesProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 px-6 py-5 border-b border-blue-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 shadow-lg">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Funding Stages</h3>
            <p className="text-zinc-400 text-sm">Deal distribution</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {data.map((stage, index) => {
            const total = data.reduce((sum, s) => sum + s.value, 0);
            const percentage = ((stage.value / total) * 100).toFixed(1);
            
            return (
              <div key={stage.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm tracking-wide">{stage.name}</span>
                  <span className="text-zinc-400 text-sm tabular-nums">{percentage}%</span>
                </div>
                <div className="h-3 bg-zinc-800/50 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full rounded-full transition-all duration-500 shadow-lg"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: stage.color,
                      boxShadow: `0 0 10px ${stage.color}50`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}