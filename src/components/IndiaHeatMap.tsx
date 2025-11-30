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
          <svg viewBox="0 0 400 550" className="w-full h-full">
            <defs>
              {/* Define gradient for high-intensity regions */}
              <radialGradient id="bengaluruGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD400" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#E6C200" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#CCB000" stopOpacity="0.5" />
              </radialGradient>
              <radialGradient id="delhiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD400" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#E6C200" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#B39E00" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="mumbaiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD400" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#E6C200" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#B39E00" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            {/* Jammu & Kashmir - North */}
            <path d="M 180,35 L 195,30 L 210,28 L 220,32 L 225,40 L 222,50 L 215,58 L 205,62 L 192,60 L 185,52 L 180,45 Z" 
              fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Himachal Pradesh */}
            <path d="M 185,52 L 192,60 L 205,62 L 210,68 L 208,75 L 200,78 L 188,76 L 182,70 L 180,62 Z" 
              fill="#333333" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Punjab & Haryana - Delhi NCR Region (High Activity) */}
            <path d="M 180,62 L 188,76 L 200,78 L 208,75 L 215,82 L 220,92 L 218,102 L 210,110 L 198,112 L 185,108 L 178,98 L 175,85 Z" 
              fill="url(#delhiGlow)" stroke="#FFD400" strokeWidth="1.5" opacity="0.95">
              <title>Delhi NCR: New Delhi, Gurgaon, Noida - $9.3B</title>
            </path>

            {/* Uttarakhand */}
            <path d="M 210,68 L 220,70 L 228,75 L 230,85 L 225,92 L 220,92 L 215,82 L 210,75 Z" 
              fill="#2D2D2D" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Rajasthan */}
            <path d="M 160,95 L 175,85 L 185,108 L 198,112 L 202,128 L 198,145 L 188,158 L 175,165 L 162,168 L 150,165 L 145,155 L 148,135 L 152,115 Z" 
              fill="#3A3A3A" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Uttar Pradesh */}
            <path d="M 210,110 L 230,115 L 245,118 L 255,125 L 258,135 L 252,148 L 242,158 L 228,165 L 215,168 L 205,165 L 198,155 L 198,145 L 202,128 L 198,112 Z" 
              fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1" opacity="0.85">
              <title>Uttar Pradesh: Noida - $236M</title>
            </path>

            {/* Bihar */}
            <path d="M 255,125 L 268,128 L 278,135 L 280,145 L 275,155 L 265,162 L 252,165 L 242,158 L 252,148 L 258,135 Z" 
              fill="#2D2D2D" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* West Bengal - Kolkata */}
            <path d="M 280,145 L 292,148 L 302,155 L 305,168 L 302,180 L 292,188 L 280,185 L 272,178 L 268,168 L 270,158 L 275,155 Z" 
              fill="#5A5A4A" stroke="#1A1A1A" strokeWidth="1" opacity="0.85">
              <title>West Bengal: Kolkata - $114M</title>
            </path>

            {/* Gujarat - Ahmedabad */}
            <path d="M 105,165 L 120,158 L 145,155 L 150,165 L 148,178 L 145,192 L 138,205 L 125,212 L 112,215 L 100,212 L 92,202 L 90,188 L 95,175 Z" 
              fill="#4D4D3D" stroke="#1A1A1A" strokeWidth="1" opacity="0.85">
              <title>Gujarat: Ahmedabad - $139M</title>
            </path>

            {/* Madhya Pradesh */}
            <path d="M 162,168 L 175,165 L 188,158 L 198,165 L 215,168 L 220,182 L 218,198 L 210,215 L 198,228 L 182,232 L 168,228 L 158,218 L 152,202 L 155,185 Z" 
              fill="#353535" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Chhattisgarh */}
            <path d="M 220,182 L 232,185 L 242,192 L 248,205 L 245,218 L 235,228 L 220,232 L 210,228 L 205,215 L 210,200 L 215,188 Z" 
              fill="#2D2D2D" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Maharashtra - Mumbai & Pune (High Activity) */}
            <path d="M 125,212 L 138,205 L 152,202 L 168,228 L 182,232 L 185,248 L 180,265 L 168,282 L 152,292 L 135,295 L 120,288 L 108,275 L 102,258 L 105,238 L 112,225 Z" 
              fill="url(#mumbaiGlow)" stroke="#FFD400" strokeWidth="1.5" opacity="0.95">
              <title>Maharashtra: Mumbai, Pune - $6.5B</title>
            </path>

            {/* Telangana - Hyderabad */}
            <path d="M 220,232 L 235,228 L 248,235 L 255,248 L 252,262 L 242,275 L 228,282 L 215,280 L 208,270 L 205,255 L 210,242 L 215,235 Z" 
              fill="#6A6A4A" stroke="#FFD400" strokeWidth="1" opacity="0.88">
              <title>Telangana: Hyderabad - $659M</title>
            </path>

            {/* Karnataka - Bengaluru (Highest Activity) */}
            <path d="M 180,265 L 185,248 L 205,255 L 215,280 L 218,298 L 212,315 L 198,328 L 182,335 L 165,335 L 152,325 L 145,310 L 148,292 L 158,278 L 168,270 Z" 
              fill="url(#bengaluruGlow)" stroke="#FFD400" strokeWidth="2" opacity="1">
              <title>Karnataka: Bengaluru - $16.2B</title>
            </path>

            {/* Andhra Pradesh */}
            <path d="M 228,282 L 242,275 L 255,282 L 262,295 L 260,312 L 250,328 L 235,338 L 220,340 L 210,332 L 208,318 L 212,302 L 218,288 Z" 
              fill="#454540" stroke="#1A1A1A" strokeWidth="1" opacity="0.82" />

            {/* Tamil Nadu - Chennai */}
            <path d="M 198,328 L 212,315 L 220,340 L 225,358 L 222,375 L 212,392 L 198,405 L 182,410 L 168,408 L 158,398 L 155,382 L 158,365 L 168,348 L 182,335 Z" 
              fill="#5D5D45" stroke="#FFD400" strokeWidth="1" opacity="0.86">
              <title>Tamil Nadu: Chennai - $714M</title>
            </path>

            {/* Kerala */}
            <path d="M 152,325 L 165,335 L 168,348 L 165,365 L 158,382 L 148,395 L 135,405 L 125,408 L 118,402 L 115,388 L 118,372 L 125,355 L 135,340 L 145,330 Z" 
              fill="#3D3D35" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Goa */}
            <path d="M 120,288 L 128,285 L 135,288 L 138,298 L 135,308 L 128,312 L 120,310 L 115,302 L 115,292 Z" 
              fill="#353530" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* Odisha */}
            <path d="M 245,218 L 260,222 L 272,232 L 278,248 L 275,265 L 265,280 L 252,288 L 242,285 L 235,272 L 238,255 L 242,238 Z" 
              fill="#323232" stroke="#1A1A1A" strokeWidth="1" opacity="0.8" />

            {/* City markers with glow effect */}
            {topCities.slice(0, 10).map((city) => {
              const intensity = getIntensity(city.funding);
              const size = Math.log(city.funding + 1) * 1.5;
              const glowSize = size * 2;
              
              return (
                <g key={city.name}>
                  {/* Outer glow */}
                  <circle
                    cx={city.x * 4}
                    cy={city.y * 5}
                    r={glowSize}
                    fill="#FFD400"
                    opacity={Math.min(intensity / 100, 0.3)}
                  />
                  {/* Main marker */}
                  <circle
                    cx={city.x * 4}
                    cy={city.y * 5}
                    r={size}
                    fill="#FFD400"
                    stroke="#0E0E0E"
                    strokeWidth="1.5"
                    opacity="0.95"
                  />
                  {/* Center dot */}
                  <circle
                    cx={city.x * 4}
                    cy={city.y * 5}
                    r={size * 0.4}
                    fill="#FFFFFF"
                    opacity="0.8"
                  />
                </g>
              );
            })}

            {/* Legend overlay */}
            <g transform="translate(10, 480)">
              <text x="0" y="0" fill="#808080" fontSize="10" fontWeight="600">FUNDING INTENSITY</text>
              <rect x="0" y="8" width="30" height="8" fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="0.5" />
              <rect x="32" y="8" width="30" height="8" fill="#4A4A3A" stroke="#1A1A1A" strokeWidth="0.5" />
              <rect x="64" y="8" width="30" height="8" fill="#CCB000" stroke="#1A1A1A" strokeWidth="0.5" />
              <rect x="96" y="8" width="30" height="8" fill="#FFD400" stroke="#1A1A1A" strokeWidth="0.5" />
              <text x="0" y="28" fill="#666666" fontSize="8">Low</text>
              <text x="105" y="28" fill="#666666" fontSize="8">High</text>
            </g>
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
