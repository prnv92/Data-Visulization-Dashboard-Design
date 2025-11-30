import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { sectorTimelineData } from '../data/mockData';

interface TimelineChartProps {
  data?: Array<{ year: string; funding: number; deals: number }>;
}

// Custom bar shape with diagonal stripes
const DiagonalStripeBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  
  return (
    <g>
      {/* Main bar */}
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />
      {/* Diagonal stripes overlay */}
      <defs>
        <pattern id={`stripes-${x}`} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(0,0,0,0.15)" strokeWidth="6" />
        </pattern>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={`url(#stripes-${x})`} rx={4} />
    </g>
  );
};

export function TimelineChart({ data = [] }: TimelineChartProps) {
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sectors = Object.keys(sectorTimelineData);
  const displayData = sectorTimelineData[selectedSector] || data;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!displayData || displayData.length === 0) {
    return (
      <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex items-center justify-center">
        <p className="text-[#808080]">No data available</p>
      </div>
    );
  }
  
  const maxValue = Math.max(...displayData.map(d => d.funding));
  
  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Sales Performance</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider mt-0.5">Yearly funding trends</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 rounded-lg border border-[#3A3A3A] hover:border-[#FFD400] transition-colors cursor-pointer"
            >
              <span className="text-[#FFD400] text-sm font-medium">{selectedSector}</span>
              <ChevronDown className={`w-4 h-4 text-[#FFD400] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#151515] border border-[#3A3A3A] rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => {
                      setSelectedSector(sector);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedSector === sector
                        ? 'bg-[#FFD400] text-[#0E0E0E] font-bold'
                        : 'text-[#D5D5D5] hover:bg-[#0E0E0E] hover:text-[#FFD400]'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-5 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ left: 0, right: 0, top: 20, bottom: 0 }}>
            <defs>
              <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(0,0,0,0.15)" strokeWidth="6" />
              </pattern>
            </defs>
            <XAxis 
              dataKey="year" 
              stroke="#808080" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#808080', fontWeight: 600 }}
            />
            <YAxis 
              stroke="#808080" 
              fontSize={11} 
              width={50}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#808080', fontWeight: 600 }}
              domain={[0, maxValue * 1.2]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151515',
                border: '2px solid #FFD400',
                borderRadius: '8px',
                fontSize: '12px',
                padding: '12px',
                fontWeight: 600
              }}
              itemStyle={{
                color: '#ffffff'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'funding') return [`$${value}M`, 'Funding'];
                return [value, 'Deals'];
              }}
              labelStyle={{ color: '#FFD400', fontWeight: 700 }}
            />
            <Bar
              dataKey="funding"
              radius={[6, 6, 0, 0]}
              maxBarSize={80}
              shape={DiagonalStripeBar}
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#FFD400" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-3 gap-3 bg-[#0E0E0E] rounded-xl p-4 border border-[#3A3A3A]">
          <div className="text-center">
            <div className="text-[#808080] text-xs mb-1 uppercase tracking-wider">Peak Year</div>
            <div className="text-white font-bold text-base">
              {displayData.reduce((max, d) => d.funding > max.funding ? d : max, displayData[0]).year}
            </div>
          </div>
          <div className="text-center border-x border-[#3A3A3A]">
            <div className="text-[#808080] text-xs mb-1 uppercase tracking-wider">Total Deals</div>
            <div className="text-white font-bold text-base">{displayData.reduce((sum, d) => sum + d.deals, 0)}</div>
          </div>
          <div className="text-center">
            <div className="text-[#808080] text-xs mb-1 uppercase tracking-wider">Avg/Year</div>
            <div className="text-white font-bold text-base">
              ${(displayData.reduce((sum, d) => sum + d.funding, 0) / displayData.length / 1000).toFixed(1)}B
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
