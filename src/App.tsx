import { HeroStats } from './components/HeroStats';
import { SectorChart } from './components/SectorChart';
import { TimelineChart } from './components/TimelineChart';
import { IndiaHeatMap } from './components/IndiaHeatMap';
import { InvestorNetwork } from './components/InvestorNetwork';
import { FundingStages } from './components/FundingStages';
import { TopStartups } from './components/TopStartups';
import {
  totalFunding,
  totalStartups,
  sectorData,
  timelineData,
  cityData,
  investorData,
  fundingStages,
  topFundedStartups,
} from './data/mockData';

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0E0E0E] text-white">
      <div className="relative z-10 h-full flex flex-col p-4 gap-3">
        {/* Hero - KPI Cards at top */}
        <div className="h-[140px] flex-shrink-0">
          <HeroStats totalFunding={totalFunding} totalStartups={totalStartups} />
        </div>

        {/* Main Grid - 6 columns layout */}
        <div className="flex-1 grid grid-cols-6 gap-3 min-h-0">
          {/* Left Column - Timeline Chart (Sales Performance) */}
          <div className="col-span-2 row-span-3 min-h-0">
            <TimelineChart data={timelineData} />
          </div>

          {/* Middle Column Top - Sector Distribution (Donut) */}
          <div className="col-span-2 row-span-1 min-h-0">
            <SectorChart data={sectorData} />
          </div>

          {/* Right Column Top - Funding Stages */}
          <div className="col-span-2 row-span-1 min-h-0">
            <FundingStages data={fundingStages} />
          </div>

          {/* Middle Row - India Heat Map (Top Selling Location) */}
          <div className="col-span-4 row-span-1 min-h-0">
            <IndiaHeatMap data={cityData} />
          </div>

          {/* Bottom Left - Investor Network */}
          <div className="col-span-2 row-span-1 min-h-0">
            <InvestorNetwork data={investorData} />
          </div>

          {/* Bottom Middle - Top Funded Startups */}
          <div className="col-span-2 row-span-1 min-h-0">
            <TopStartups data={topFundedStartups} />
          </div>

          {/* Bottom Right - Empty (InsightPanel removed) */}
          <div className="col-span-2 row-span-1 min-h-0">
            {/* This space is intentionally left for future content */}
          </div>
        </div>
      </div>
    </div>
  );
}
