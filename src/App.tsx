import { HeroStats } from './components/HeroStats';
import { SectorChart } from './components/SectorChart';
import { TimelineChart } from './components/TimelineChart';
import { CityLeaders } from './components/CityLeaders';
import { InvestorNetwork } from './components/InvestorNetwork';
import { FundingStages } from './components/FundingStages';
import { FeaturedStartup } from './components/FeaturedStartup';
import { InsightPanel } from './components/InsightPanel';
import { SubVerticals } from './components/SubVerticals';
import {
  totalFunding,
  totalStartups,
  sectorData,
  timelineData,
  cityData,
  investorData,
  fundingStages,
  featuredStartups,
  insights,
  subVerticals,
} from './data/mockData';

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col p-6 gap-4">
        {/* Hero - spans full width with increased prominence */}
        <div className="h-[200px] flex-shrink-0">
          <HeroStats totalFunding={totalFunding} totalStartups={totalStartups} />
        </div>

        {/* Main Grid - 6 columns layout with consistent spacing */}
        <div className="flex-1 grid grid-cols-6 gap-4 overflow-hidden">
          {/* Left Column - Timeline Chart (spans 3 rows) */}
          <div className="col-span-2 row-span-3 shadow-xl shadow-black/20">
            <TimelineChart data={timelineData} />
          </div>

          {/* Middle Column Top - Donut Chart (Sector Distribution) */}
          <div className="col-span-2 row-span-1 shadow-xl shadow-black/20">
            <SectorChart data={sectorData} />
          </div>

          {/* Right Column Top - Funding Stages */}
          <div className="col-span-2 row-span-1 shadow-xl shadow-black/20">
            <FundingStages data={fundingStages} />
          </div>

          {/* Middle Row - Top Cities by Funding */}
          <div className="col-span-4 row-span-1 shadow-xl shadow-black/20">
            <CityLeaders data={cityData} />
          </div>

          {/* Bottom Left - Investor Network */}
          <div className="col-span-2 row-span-1 shadow-xl shadow-black/20">
            <InvestorNetwork data={investorData} />
          </div>

          {/* Bottom Middle - Top 10 Sectors Ranking */}
          <div className="col-span-2 row-span-1 shadow-xl shadow-black/20">
            <SubVerticals data={subVerticals} />
          </div>

          {/* Bottom Right - Key Insight Panel */}
          <div className="col-span-2 row-span-1 shadow-xl shadow-black/20">
            <InsightPanel insights={insights} />
          </div>
        </div>
      </div>
    </div>
  );
}