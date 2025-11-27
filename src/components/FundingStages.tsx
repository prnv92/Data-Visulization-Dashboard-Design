import { Target } from 'lucide-react';

interface FundingStagesProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export function FundingStages({ data }: FundingStagesProps) {
  const total = data.reduce((sum, s) => sum + s.value, 0);
  
  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
            <Target className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Funding Stages</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider">Deal distribution</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5">
        <div className="space-y-3.5">
          {data.map((stage, index) => {
            const percentage = ((stage.value / total) * 100).toFixed(1);
            const isHighlight = index === 0; // Highlight first item
            
            return (
              <div key={stage.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs tracking-wide uppercase font-semibold ${
                    isHighlight ? 'text-white' : 'text-[#D5D5D5]'
                  }`}>
                    {stage.name}
                  </span>
                  <span className={`text-xs tabular-nums font-bold ${
                    isHighlight ? 'text-[#FFD400]' : 'text-[#808080]'
                  }`}>
                    {percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[#0E0E0E] rounded-sm overflow-hidden border border-[#3A3A3A]">
                  <div 
                    className={`h-full transition-all duration-500 relative ${
                      isHighlight ? 'bg-[#FFD400]' : 'bg-[#3A3A3A]'
                    }`}
                    style={{ 
                      width: `${percentage}%`,
                    }}
                  >
                    {/* Diagonal stripes for highlighted bar */}
                    {isHighlight && (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
