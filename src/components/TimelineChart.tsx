import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface TimelineChartProps {
  data: Array<{ year: string; funding: number; deals: number }>;
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 h-full flex flex-col overflow-hidden">
      {/* Header Section with distinct background */}
      <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 px-6 py-5 border-b border-teal-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/20 shadow-lg">
            <TrendingUp className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-white text-lg tracking-tight">Funding Momentum</h3>
            <p className="text-zinc-400 text-sm">Yearly funding trends ($M)</p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              stroke="#71717a" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#3f3f46' }}
            />
            <YAxis 
              stroke="#71717a" 
              fontSize={12} 
              width={50}
              tickLine={false}
              axisLine={{ stroke: '#3f3f46' }}
            />
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
              formatter={(value: number, name: string) => {
                if (name === 'funding') return [`$${value}M`, 'Funding'];
                return [value, 'Deals'];
              }}
            />
            <Area
              type="monotone"
              dataKey="funding"
              stroke="#14b8a6"
              strokeWidth={3}
              fill="url(#fundingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
          <div className="text-center">
            <div className="text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">Peak Year</div>
            <div className="text-white text-lg">2022</div>
          </div>
          <div className="text-center border-x border-zinc-800/50">
            <div className="text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">Total Deals</div>
            <div className="text-white text-lg">{data.reduce((sum, d) => sum + d.deals, 0)}</div>
          </div>
          <div className="text-center">
            <div className="text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">Avg/Year</div>
            <div className="text-white text-lg">$25.5B</div>
          </div>
        </div>
      </div>
    </div>
  );
}