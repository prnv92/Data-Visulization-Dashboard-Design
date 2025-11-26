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
      <div className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 px-6 py-5 border-b border-cyan-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 shadow-lg">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Top Cities by Funding</h3>
            <p className="text-zinc-400 text-sm">Leading startup hubs</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {topCities.map((city, index) => {
            const percentage = (city.funding / maxFunding) * 100;
            
            return (
              <div key={city.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm w-6 tabular-nums">{index + 1}.</span>
                    <span className="text-white text-sm tracking-wide">{city.name}</span>
                  </div>
                  <span className="text-cyan-400 text-sm tabular-nums">${city.funding}M</span>
                </div>
                <div className="h-3 bg-zinc-800/50 rounded-full overflow-hidden shadow-inner ml-9">
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