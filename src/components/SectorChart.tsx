import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Layers } from 'lucide-react';

interface SectorChartProps {
  data: Array<{ name: string; funding: number; color: string }>;
}

export function SectorChart({ data }: SectorChartProps) {
  // Take top 6 sectors for the donut chart
  const topSectors = data.slice(0, 6);
  
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-6 py-5 border-b border-cyan-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 shadow-lg">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Sector Distribution</h3>
            <p className="text-zinc-400 text-sm">Top sectors by funding</p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topSectors}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              dataKey="funding"
              paddingAngle={2}
            >
              {topSectors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '13px',
                padding: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [`$${value}M`, 'Funding']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3 bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
          {topSectors.map((sector) => (
            <div key={sector.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" 
                style={{ backgroundColor: sector.color }}
              />
              <span className="text-zinc-300 text-xs truncate">{sector.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}