// Mock data representing India's startup funding ecosystem (2020-2025)

export const totalFunding = 46383914944; // $46.4B (derived from startup_funding.csv)
export const totalStartups = 1706;

export const sectorData = [
  { name: 'Consumer Internet', funding: 6253.08, color: '#6366f1' },
  { name: 'eCommerce', funding: 5002.53, color: '#8b5cf6' },
  { name: 'Transportation', funding: 3916.63, color: '#ec4899' },
  { name: 'Technology', funding: 2229.71, color: '#14b8a6' },
  { name: 'News Aggregator mobile app', funding: 2020, color: '#f59e0b' },
  { name: 'Premium Loyalty Rewards Point Management', funding: 2019.35, color: '#f97316' },
  { name: 'Online Jewellery Store', funding: 2016.2, color: '#10b981' },
  { name: 'Casual Dining restaurant Chain', funding: 2010, color: '#a855f7' },
];

export const timelineData = [
  { year: '2015', funding: 16909.24, deals: 654 },
  { year: '2016', funding: 3828.09, deals: 586 },
  { year: '2017', funding: 10429.31, deals: 456 },
  { year: '2018', funding: 5116.12, deals: 264 },
  { year: '2019', funding: 9700.92, deals: 105 },
  { year: '2020', funding: 390.21, deals: 7 },
];

export const cityData = [
  { name: 'Bangalore', startups: 457, funding: 11361.59, x: 55, y: 70 },
  { name: 'Bengaluru', startups: 127, funding: 7112.92, x: 55, y: 68 },
  { name: 'Mumbai', startups: 401, funding: 4921.19, x: 32, y: 58 },
  { name: 'New Delhi', startups: 241, funding: 3017.82, x: 45, y: 35 },
  { name: 'Gurgaon', startups: 198, funding: 3005.3, x: 45, y: 35 },
];

export const investorData = [
  { name: 'Westbridge Capital', deals: 1, amount: 3900 },
  { name: 'Softbank', deals: 6, amount: 3545 },
  { name: 'Accel Partners', deals: 59, amount: 2881.68 },
  { name: 'SoftBank Group', deals: 6, amount: 2487 },
  { name: 'Tiger Global', deals: 27, amount: 2045.4 },
  { name: 'IndianIdeas.com', deals: 1, amount: 2019.35 },
  { name: 'IvyCap Ventures', deals: 1, amount: 2016.2 },
  { name: 'Tiger Global Management', deals: 1, amount: 2020 },
];

export const fundingStages = [
  { name: 'Private Equity', value: 1071, color: '#6366f1' },
  { name: 'Seed Funding', value: 722, color: '#8b5cf6' },
  { name: 'Seed Angel Funding', value: 104, color: '#ec4899' },
  { name: 'Debt Funding', value: 25, color: '#14b8a6' },
  { name: 'Series A', value: 22, color: '#f59e0b' },
  { name: 'Series B', value: 20, color: '#10b981' },
  { name: 'Series C', value: 14, color: '#ef4444' },
];

export const featuredStartups = [
  {
    name: 'BYJU’S',
    industry: 'EdTech',
    funding: '$2.0B',
    round: 'Private Equity',
    year: 2020,
    description: 'Leading education platform with global reach',
  },
  {
    name: 'Zomato',
    industry: 'Consumer Internet',
    funding: '$1.5B',
    round: 'Private Equity',
    year: 2020,
    description: 'Food delivery & restaurant discovery network',
  },
];

export const insights = [
  'Consumer Internet and eCommerce dominate funding with 11.2% and 9.8% shares',
  'Bangalore and Bengaluru together contribute over 18B USD of investments',
  'Series A to C funding rounds represent the fastest growing deal activity',
  'Private Equity rounds led 1,071 deals in this CSV sample',
  'Seed and Angel activity accounted for 826 rounds across the period',
  'Debt funding remained a niche but steady component of the mix',
];

export const subVerticals = [
  { name: 'Online Lending Platform', parent: 'FinTech', deals: 11 },
  { name: 'Online Pharmacy', parent: 'eCommerce', deals: 10 },
  { name: 'Education', parent: 'Technology', deals: 5 },
  { name: 'Online Lending', parent: 'Finance', deals: 5 },
  { name: 'Food Delivery Platform', parent: 'Consumer Internet', deals: 8 },
];
