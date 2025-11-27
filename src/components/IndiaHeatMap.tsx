import { MapPin } from 'lucide-react';

interface City {
  name: string;
  startups: number;
  funding: number;
  x: number;
  y: number;
}

interface IndiaHeatMapProps {
  data: City[];
}

export function IndiaHeatMap({ data }: IndiaHeatMapProps) {
  const topCities = data.slice(0, 5);
  const maxFunding = Math.max(...data.map(c => c.funding));

  // Calculate intensity for heat map coloring
  const getIntensity = (funding: number) => {
    return (funding / maxFunding) * 100;
  };

  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex overflow-hidden">
      {/* Map Section */}
      <div className="flex-1 relative bg-[#0E0E0E]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-[#151515] px-5 py-4 border-b border-[#3A3A3A] z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-white tracking-tight text-base font-bold uppercase">Top Selling Location</h3>
              <p className="text-[#808080] text-xs uppercase tracking-wider">Geographic distribution</p>
            </div>
          </div>
        </div>

        {/* Simplified India Map */}
        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-6 px-6">
          <svg viewBox="0 0 400 500" className="w-full h-full">
            {/* Simplified India outline */}
            <path
              d="M200,50 L220,80 L240,90 L260,95 L270,110 L280,140 L285,170 L290,200 L295,230 L298,260 L300,290 L302,320 L300,350 L295,380 L285,410 L270,440 L250,460 L230,470 L210,475 L190,478 L170,475 L150,470 L130,460 L110,440 L95,410 L85,380 L80,350 L78,320 L80,290 L82,260 L85,230 L90,200 L95,170 L105,140 L120,110 L140,90 L160,80 L180,65 Z"
              fill="#1a1a1a"
              stroke="#3A3A3A"
              strokeWidth="2"
            />
            
            {/* Heat map regions (simplified states) */}
            {topCities.map((city, index) => {
              const intensity = getIntensity(city.funding);
              const yellowShade = `hsl(45, 100%, ${Math.max(30, 90 - intensity * 0.6)}%)`;
              
              return (
                <g key={city.name}>
                  {/* City marker */}
                  <circle
                    cx={city.x * 4}
                    cy={city.y * 5}
                    r={Math.max(12, intensity * 0.3)}
                    fill={yellowShade}
                    opacity={0.8}
                  />
                  <circle
                    cx={city.x * 4}
                    cy={city.y * 5}
                    r={6}
                    fill={yellowShade}
                    stroke="#0E0E0E"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#151515] rounded-lg p-3 border border-[#3A3A3A]">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#FFD400]" />
              <span className="text-[#D5D5D5] font-medium">Top Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#FFDF00]" />
              <span className="text-[#808080] font-medium">Strong Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#FFC700]" />
              <span className="text-[#808080] font-medium">Hot Pick</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#FFB800]" />
              <span className="text-[#808080] font-medium">Rising Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="w-56 bg-[#0E0E0E] border-l border-[#3A3A3A] flex flex-col">
        <div className="px-4 py-4 border-b border-[#3A3A3A]">
          <div className="text-[#808080] text-xs uppercase tracking-wider mb-1">Top Cities</div>
          <div className="text-white font-bold text-lg">by Funding</div>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {topCities.map((city, index) => {
            const intensity = getIntensity(city.funding);
            const yellowShade = `hsl(45, 100%, ${Math.max(40, 90 - intensity * 0.6)}%)`;
            
            return (
              <div key={city.name} className="bg-[#151515] rounded-lg p-3 border border-[#3A3A3A]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: yellowShade }}
                    />
                    <span className="text-white text-xs font-bold">{city.name}</span>
                  </div>
                  <span className="text-[#808080] text-xs">{index + 1}</span>
                </div>
                <div className="text-[#FFD400] font-bold text-base">${city.funding}M</div>
                <div className="text-[#808080] text-xs mt-1">{city.startups} startups</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
