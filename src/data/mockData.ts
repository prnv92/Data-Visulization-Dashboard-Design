// Mock data representing India's startup funding ecosystem (2020-2025)

export const totalFunding = 127500000000; // $127.5B
export const totalStartups = 3044;

export const sectorData = [
  { name: 'FinTech', funding: 32500, color: '#6366f1' },
  { name: 'E-commerce', funding: 28700, color: '#8b5cf6' },
  { name: 'EdTech', funding: 18900, color: '#ec4899' },
  { name: 'HealthTech', funding: 15600, color: '#14b8a6' },
  { name: 'SaaS', funding: 12800, color: '#f59e0b' },
  { name: 'LogisticsTech', funding: 9500, color: '#10b981' },
  { name: 'FoodTech', funding: 6200, color: '#ef4444' },
  { name: 'AgriTech', funding: 3300, color: '#84cc16' },
];

export const timelineData = [
  { year: '2020', funding: 11200, deals: 412 },
  { year: '2021', funding: 24800, deals: 678 },
  { year: '2022', funding: 35600, deals: 892 },
  { year: '2023', funding: 28900, deals: 654 },
  { year: '2024', funding: 27000, deals: 408 },
];

export const cityData = [
  { name: 'Bengaluru', startups: 1243, funding: 45600, x: 55, y: 68 },
  { name: 'Delhi NCR', startups: 876, funding: 32400, x: 45, y: 35 },
  { name: 'Mumbai', startups: 542, funding: 28700, x: 32, y: 58 },
  { name: 'Hyderabad', startups: 234, funding: 8900, x: 58, y: 62 },
  { name: 'Pune', startups: 149, funding: 5900, x: 35, y: 60 },
];

export const investorData = [
  { name: 'Sequoia Capital', deals: 187, amount: 12400 },
  { name: 'Tiger Global', deals: 156, amount: 9800 },
  { name: 'Accel', deals: 143, amount: 8600 },
  { name: 'SoftBank', deals: 89, amount: 15200 },
  { name: 'Nexus Venture', deals: 98, amount: 5400 },
  { name: 'Lightspeed', deals: 87, amount: 6700 },
  { name: 'Peak XV', deals: 76, amount: 7200 },
  { name: 'Matrix Partners', deals: 71, amount: 4900 },
];

export const fundingStages = [
  { name: 'Seed', value: 892, color: '#6366f1' },
  { name: 'Series A', value: 634, color: '#8b5cf6' },
  { name: 'Series B', value: 412, color: '#ec4899' },
  { name: 'Series C', value: 287, color: '#14b8a6' },
  { name: 'Series D+', value: 156, color: '#f59e0b' },
  { name: 'Private Equity', value: 234, color: '#10b981' },
  { name: 'Debt', value: 429, color: '#ef4444' },
];

export const featuredStartups = [
  {
    name: 'CRED',
    industry: 'FinTech',
    funding: '$805M',
    round: 'Series F',
    year: 2024,
    description: 'Rewarding credit card payments',
  },
  {
    name: 'PharmEasy',
    industry: 'HealthTech',
    funding: '$350M',
    round: 'Series E',
    year: 2023,
    description: 'Digital healthcare platform',
  },
];

export const insights = [
  'FinTech accounts for 26% of all startup funding in India',
  'Bengaluru hosts 41% of all funded startups',
  'Average Series A round size: $8.2M',
  'Top 10 investors drove 47% of total funding',
  'EdTech funding surged 340% during 2020-2021',
  'Seed funding rounds increased by 118% since 2020',
];

export const subVerticals = [
  { name: 'B2B SaaS', parent: 'SaaS', deals: 234 },
  { name: 'E-learning', parent: 'EdTech', deals: 189 },
  { name: 'Digital Payments', parent: 'FinTech', deals: 167 },
  { name: 'Quick Commerce', parent: 'E-commerce', deals: 145 },
  { name: 'Telemedicine', parent: 'HealthTech', deals: 123 },
];
