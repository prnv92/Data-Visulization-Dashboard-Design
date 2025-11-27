import { Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import sequoiaLogo from 'figma:asset/9b7e42d302fd16cb067b30bb12a64d4ef1282ca7.png';
import oriosLogo from 'figma:asset/589e41de9d326e01546dc374a2ebbc422468b1ee.png';
import tigerGlobalLogo from 'figma:asset/23d199f592e7eb955b2a55e5f76e1a317f6135a5.png';

interface Investor {
  name: string;
  deals: number;
  amount: number;
}

interface InvestorNetworkProps {
  data: Investor[];
}

// Map investor names to their logos
const investorLogos: Record<string, string> = {
  'Sequoia Capital': sequoiaLogo,
  'Tiger Global': tigerGlobalLogo,
  'Accel': oriosLogo,
};

export function InvestorNetwork({ data }: InvestorNetworkProps) {
  const topInvestors = data.slice(0, 3);
  
  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
            <Users className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Top Investors</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider">Most active</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="flex items-center justify-around w-full gap-4">
          {topInvestors.map((investor) => {
            const logo = investorLogos[investor.name];
            
            return (
              <div key={investor.name} className="flex flex-col items-center gap-3 group cursor-pointer">
                <div 
                  className="w-20 h-20 rounded-xl bg-white flex items-center justify-center border-2 border-[#3A3A3A] transition-all duration-300 group-hover:border-[#FFD400] overflow-hidden p-3"
                >
                  {logo ? (
                    <ImageWithFallback 
                      src={logo} 
                      alt={investor.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[#0E0E0E] text-xs text-center font-bold">{investor.name}</div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-[#FFD400] text-sm mb-1 font-bold">${investor.amount}M</div>
                  <div className="text-[#808080] text-xs uppercase tracking-wider">{investor.deals} deals</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
