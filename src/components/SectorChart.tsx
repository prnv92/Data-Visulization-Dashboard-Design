import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers } from 'lucide-react';

interface SectorChartProps {
  data: Array<{ name: string; funding: number; color: string }>;
}

export function SectorChart({ data }: SectorChartProps) {
  // Take top 6 sectors and assign yellow shades
  const topSectors = data.slice(0, 6).map((sector, index) => ({
    ...sector,
    color: `hsl(45, 100%, ${90 - index * 10}%)` // Shades of yellow from light to dark
  }));
  
  return (
    <div className="rounded-2xl bg-[#151515] border border-[#3A3A3A] h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#0E0E0E] px-5 py-4 border-b border-[#3A3A3A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-white tracking-tight text-base font-bold uppercase">Sector Distribution</h3>
            <p className="text-[#808080] text-xs uppercase tracking-wider">Top sectors by funding</p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <pattern id="donutStripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
              </pattern>
            </defs>
            <Pie
              data={topSectors}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              dataKey="funding"
              paddingAngle={3}
              strokeWidth={0}
            >
              {topSectors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
              formatter={(value: number) => [`$${value}M`, 'Funding']}
              labelStyle={{ color: '#FFD400', fontWeight: 700 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-2.5 bg-[#0E0E0E] rounded-xl p-4 border border-[#3A3A3A]">
          {topSectors.map((sector) => (
            <div key={sector.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm flex-shrink-0" 
                style={{ backgroundColor: sector.color }}
              />
              <span className="text-[#D5D5D5] text-xs truncate font-medium">{sector.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
