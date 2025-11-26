import { Users } from 'lucide-react';

interface Investor {
  name: string;
  deals: number;
  amount: number;
}

interface InvestorNetworkProps {
  data: Investor[];
}

export function InvestorNetwork({ data }: InvestorNetworkProps) {
  const topInvestors = data.slice(0, 3);
  const maxAmount = Math.max(...topInvestors.map(i => i.amount));
  
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-6 py-5 border-b border-purple-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 shadow-lg">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Top Investors</h3>
            <p className="text-zinc-400 text-sm">Most active</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex items-center justify-around w-full gap-4">
          {topInvestors.map((investor, index) => {
            const size = 60 + ((investor.amount / maxAmount) * 30);
            
            return (
              <div key={investor.name} className="flex flex-col items-center gap-3 group cursor-pointer">
                <div 
                  className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white border-3 border-purple-400 shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    width: `${size}px`, 
                    height: `${size}px`,
                    fontSize: `${size / 2.5}px`,
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  <div className="text-white text-sm truncate max-w-[100px] mb-1">{investor.name}</div>
                  <div className="text-purple-400 text-xs tabular-nums">${investor.amount}M</div>
                  <div className="text-zinc-500 text-xs">{investor.deals} deals</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}