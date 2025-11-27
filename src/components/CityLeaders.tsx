import { BarChart3 } from 'lucide-react';

interface City {
  name: string;
  startups: number;
  funding: number;
  x: number;
  y: number;
}

interface CityLeadersProps {
  data: City[];
}

export function CityLeaders({ data }: CityLeadersProps) {
  const maxFunding = Math.max(...data.map(c => c.funding));
  const topCities = data.slice(0, 5);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 px-4 py-3 border-b border-cyan-700/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 shadow-lg">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white tracking-tight">Top Cities by Funding</h3>
            <p className="text-zinc-400 text-xs">Leading startup hubs</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {topCities.map((city, index) => {
            const percentage = (city.funding / maxFunding) * 100;
            
            return (
              <div key={city.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-xs w-5 tabular-nums">{index + 1}.</span>
                    <span className="text-white text-xs tracking-wide">{city.name}</span>
                  </div>
                  <span className="text-cyan-400 text-xs tabular-nums">${city.funding}M</span>
                </div>
                <div className="h-2.5 bg-zinc-800/50 rounded-full overflow-hidden shadow-inner ml-7">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 shadow-lg"
                    style={{ 
                      width: `${percentage}%`,
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
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