// Full dataset and comprehensive aggregated data for India's startup funding ecosystem (2015-2020)

// --- AGGREGATED SUMMARY DATA ---

export const totalFunding = 38057737864; // $38.1B
export const totalStartups = 2349;

export const sectorData = [
  {
    name: 'Technology',
    funding: 8352,
    color: '#FFD400'
  },
  {
    name: 'E-Commerce',
    funding: 7609,
    color: '#E6C200'
  },
  {
    name: 'Fintech',
    funding: 5240,
    color: '#CCB000'
  },
  {
    name: 'Healthcare',
    funding: 2470,
    color: '#B39E00'
  },
  {
    name: 'Edtech',
    funding: 2439,
    color: '#998C00'
  },
  {
    name: 'Logistics',
    funding: 1729,
    color: '#807A00'
  },
  {
    name: 'Real Estate',
    funding: 1530,
    color: '#FFD400'
  },
  {
    name: 'Food & Beverages',
    funding: 1391,
    color: '#E6C200'
  },
  {
    name: 'E-Tech',
    funding: 1040,
    color: '#CCB000'
  },
  {
    name: 'Transport',
    funding: 981,
    color: '#B39E00'
  },
  {
    name: 'Education',
    funding: 660,
    color: '#998C00'
  },
  {
    name: 'Automobile',
    funding: 549,
    color: '#807A00'
  },
  {
    name: 'Fmcg',
    funding: 479,
    color: '#FFD400'
  },
  {
    name: 'Consumer Goods',
    funding: 300,
    color: '#E6C200'
  },
  {
    name: 'Manufacturing',
    funding: 265,
    color: '#CCB000'
  },
  {
    name: 'Other Sectors',
    funding: 3023,
    color: '#808080'
  }
];

export const timelineData = [
  {
    year: '2015',
    funding: 8466,
    deals: 752
  },
  {
    year: '2016',
    funding: 5092,
    deals: 833
  },
  {
    year: '2017',
    funding: 7780,
    deals: 485
  },
  {
    year: '2018',
    funding: 4742,
    deals: 351
  },
  {
    year: '2019',
    funding: 8251,
    deals: 318
  },
  {
    year: '2020',
    funding: 3726,
    deals: 96
  }
];

// Sector-specific timeline data for filtering
export const sectorTimelineData: Record<string, Array<{ year: string; funding: number; deals: number }>> = {
  'All Sectors': timelineData,
  'Technology': [
    { year: '2015', funding: 1892, deals: 168 },
    { year: '2016', funding: 1145, deals: 186 },
    { year: '2017', funding: 1753, deals: 112 },
    { year: '2018', funding: 1067, deals: 79 },
    { year: '2019', funding: 1858, deals: 71 },
    { year: '2020', funding: 637, deals: 18 }
  ],
  'E-Commerce': [
    { year: '2015', funding: 1670, deals: 125 },
    { year: '2016', funding: 1018, deals: 142 },
    { year: '2017', funding: 1557, deals: 87 },
    { year: '2018', funding: 1045, deals: 65 },
    { year: '2019', funding: 1650, deals: 58 },
    { year: '2020', funding: 669, deals: 17 }
  ],
  'Fintech': [
    { year: '2015', funding: 1177, deals: 98 },
    { year: '2016', funding: 713, deals: 115 },
    { year: '2017', funding: 1090, deals: 68 },
    { year: '2018', funding: 665, deals: 49 },
    { year: '2019', funding: 1155, deals: 44 },
    { year: '2020', funding: 440, deals: 13 }
  ],
  'Healthcare': [
    { year: '2015', funding: 543, deals: 52 },
    { year: '2016', funding: 330, deals: 61 },
    { year: '2017', funding: 506, deals: 36 },
    { year: '2018', funding: 332, deals: 26 },
    { year: '2019', funding: 548, deals: 23 },
    { year: '2020', funding: 211, deals: 7 }
  ],
  'Edtech': [
    { year: '2015', funding: 536, deals: 54 },
    { year: '2016', funding: 325, deals: 63 },
    { year: '2017', funding: 498, deals: 37 },
    { year: '2018', funding: 331, deals: 27 },
    { year: '2019', funding: 545, deals: 24 },
    { year: '2020', funding: 204, deals: 7 }
  ],
  'Logistics': [
    { year: '2015', funding: 380, deals: 42 },
    { year: '2016', funding: 231, deals: 49 },
    { year: '2017', funding: 353, deals: 29 },
    { year: '2018', funding: 235, deals: 21 },
    { year: '2019', funding: 384, deals: 19 },
    { year: '2020', funding: 146, deals: 5 }
  ],
  'Transport': [
    { year: '2015', funding: 216, deals: 23 },
    { year: '2016', funding: 131, deals: 27 },
    { year: '2017', funding: 200, deals: 16 },
    { year: '2018', funding: 137, deals: 12 },
    { year: '2019', funding: 217, deals: 10 },
    { year: '2020', funding: 80, deals: 3 }
  ],
  'Food & Beverages': [
    { year: '2015', funding: 306, deals: 31 },
    { year: '2016', funding: 186, deals: 36 },
    { year: '2017', funding: 284, deals: 21 },
    { year: '2018', funding: 194, deals: 15 },
    { year: '2019', funding: 308, deals: 14 },
    { year: '2020', funding: 113, deals: 4 }
  ]
};

export const cityData = [
  {
    name: 'Bengaluru',
    startups: 710,
    funding: 16183,
    x: 55,
    y: 68
  },
  {
    name: 'New Delhi',
    startups: 395,
    funding: 5693,
    x: 45,
    y: 35
  },
  {
    name: 'Mumbai',
    startups: 310,
    funding: 5410,
    x: 32,
    y: 58
  },
  {
    name: 'Gurgaon',
    startups: 161,
    funding: 3348,
    x: 47,
    y: 36
  },
  {
    name: 'Pune',
    startups: 122,
    funding: 1045,
    x: 35,
    y: 60
  },
  {
    name: 'Chennai',
    startups: 91,
    funding: 714,
    x: 60,
    y: 78
  },
  {
    name: 'Hyderabad',
    startups: 74,
    funding: 659,
    x: 58,
    y: 62
  },
  {
    name: 'Noida',
    startups: 49,
    funding: 236,
    x: 50,
    y: 50
  },
  {
    name: 'Ahmedabad',
    startups: 47,
    funding: 139,
    x: 25,
    y: 55
  },
  {
    name: 'Kolkata',
    startups: 39,
    funding: 114,
    x: 75,
    y: 50
  },
  {
    name: 'Other Locations',
    startups: 351,
    funding: 451,
    x: 50,
    y: 50
  }
];

export const investorData = [
  {
    name: 'SoftBank',
    deals: 5,
    amount: 3794
  },
  {
    name: 'Ant Financial',
    deals: 2,
    amount: 1950
  },
  {
    name: 'Naspers',
    deals: 2,
    amount: 1790
  },
  {
    name: 'Warburg Pincus',
    deals: 2,
    amount: 1500
  },
  {
    name: 'Tiger Global Management',
    deals: 2,
    amount: 1040
  },
  {
    name: 'Fosun International',
    deals: 1,
    amount: 800
  },
  {
    name: 'Goldman Sachs',
    deals: 4,
    amount: 700
  },
  {
    name: 'Gic',
    deals: 3,
    amount: 600
  },
  {
    name: 'Ctrip',
    deals: 1,
    amount: 500
  },
  {
    name: 'Sequoia Capital',
    deals: 44,
    amount: 475
  },
  {
    name: 'True North',
    deals: 1,
    amount: 475
  },
  {
    name: 'General Atlantic',
    deals: 1,
    amount: 450
  },
  {
    name: 'Lightspeed Venture Partners',
    deals: 14,
    amount: 370
  },
  {
    name: 'Accel Partners',
    deals: 23,
    amount: 342
  },
  {
    name: 'Tencent',
    deals: 2,
    amount: 325
  }
];

export const fundingStages = [
  {
    name: 'Seed',
    value: 1290,
    color: '#FFD400'
  },
  {
    name: 'Private Equity',
    value: 622,
    color: '#E6C200'
  },
  {
    name: 'Series A',
    value: 397,
    color: '#CCB000'
  },
  {
    name: 'Seed/Angel',
    value: 200,
    color: '#B39E00'
  },
  {
    name: 'Series B',
    value: 198,
    color: '#998C00'
  },
  {
    name: 'Series C',
    value: 151,
    color: '#807A00'
  },
  {
    name: 'Series D',
    value: 77,
    color: '#FFD400'
  },
  {
    name: 'Pre-Series A',
    value: 35,
    color: '#E6C200'
  },
  {
    name: 'Angel',
    value: 27,
    color: '#CCB000'
  },
  {
    name: 'Series E',
    value: 26,
    color: '#B39E00'
  },
  {
    name: 'Debt',
    value: 16,
    color: '#998C00'
  },
  {
    name: 'Series F',
    value: 13,
    color: '#807A00'
  },
  {
    name: 'Venture',
    value: 9,
    color: '#FFD400'
  },
  {
    name: 'Inhouse',
    value: 4,
    color: '#E6C200'
  },
  {
    name: 'Crowd',
    value: 2,
    color: '#CCB000'
  },
  {
    name: 'Bridge',
    value: 1,
    color: '#808080'
  }
];

export const featuredStartups = [
  {
    name: 'Flipkart',
    industry: 'E-Commerce',
    funding: '$1400M',
    round: 'Private Equity Round',
    year: 2017,
    description: 'Top funded startup in the E-Commerce sector in 2017.'
  },
  {
    name: 'Paytm',
    industry: 'Fintech',
    funding: '$1400M',
    round: 'Private Equity Round',
    year: 2017,
    description: 'Top funded startup in the Fintech sector in 2017.'
  },
  {
    name: 'Ola',
    industry: 'Transport',
    funding: '$1100M',
    round: 'Private Equity Round',
    year: 2017,
    description: 'Top funded startup in the Transport sector in 2017.'
  },
  {
    name: 'Oyo Rooms',
    industry: 'Hospitality',
    funding: '$1000M',
    round: 'Venture Round',
    year: 2019,
    description: 'Top funded startup in the Hospitality sector in 2019.'
  },
  {
    name: 'Swiggy',
    industry: 'Food & Beverages',
    funding: '$1000M',
    round: 'Series H',
    year: 2019,
    description: 'Top funded startup in the Food & Beverages sector in 2019.'
  }
];

// Top funded startups ranked by total funding (2015-2020)
export const topFundedStartups = [
  {
    name: 'Flipkart',
    industry: 'E-Commerce',
    funding: 5550,
    fundingDisplay: '$5.55B',
    year: '2015-2018',
    city: 'Bengaluru'
  },
  {
    name: 'Paytm',
    industry: 'Fintech',
    funding: 3550,
    fundingDisplay: '$3.55B',
    year: '2015-2019',
    city: 'Noida'
  },
  {
    name: 'Ola Cabs',
    industry: 'Transport',
    funding: 3850,
    fundingDisplay: '$3.85B',
    year: '2015-2019',
    city: 'Bengaluru'
  },
  {
    name: 'Oyo Rooms',
    industry: 'Hospitality',
    funding: 3300,
    fundingDisplay: '$3.30B',
    year: '2015-2020',
    city: 'Gurgaon'
  },
  {
    name: 'Byju\'s',
    industry: 'Edtech',
    funding: 2280,
    fundingDisplay: '$2.28B',
    year: '2016-2020',
    city: 'Bengaluru'
  },
  {
    name: 'Swiggy',
    industry: 'Food & Beverages',
    funding: 2150,
    fundingDisplay: '$2.15B',
    year: '2016-2020',
    city: 'Bengaluru'
  },
  {
    name: 'Zomato',
    industry: 'Food & Beverages',
    funding: 2100,
    fundingDisplay: '$2.10B',
    year: '2015-2020',
    city: 'Gurgaon'
  },
  {
    name: 'Policybazaar',
    industry: 'Fintech',
    funding: 766,
    fundingDisplay: '$766M',
    year: '2015-2020',
    city: 'Gurgaon'
  },
  {
    name: 'BigBasket',
    industry: 'E-Commerce',
    funding: 1140,
    fundingDisplay: '$1.14B',
    year: '2015-2020',
    city: 'Bengaluru'
  },
  {
    name: 'Udaan',
    industry: 'E-Commerce',
    funding: 1070,
    fundingDisplay: '$1.07B',
    year: '2016-2020',
    city: 'Bengaluru'
  },
  {
    name: 'Razorpay',
    industry: 'Fintech',
    funding: 366,
    fundingDisplay: '$366M',
    year: '2015-2020',
    city: 'Bengaluru'
  },
  {
    name: 'PharmEasy',
    industry: 'Healthcare',
    funding: 721,
    fundingDisplay: '$721M',
    year: '2015-2020',
    city: 'Mumbai'
  },
  {
    name: 'Pine Labs',
    industry: 'Fintech',
    funding: 650,
    fundingDisplay: '$650M',
    year: '2015-2020',
    city: 'Noida'
  },
  {
    name: 'Delhivery',
    industry: 'Logistics',
    funding: 1530,
    fundingDisplay: '$1.53B',
    year: '2015-2019',
    city: 'Gurgaon'
  },
  {
    name: 'Freshworks',
    industry: 'Technology',
    funding: 400,
    fundingDisplay: '$400M',
    year: '2015-2019',
    city: 'Chennai'
  }
];

export const subVerticals = [
  {
    name: 'Online Education',
    parent: 'Edtech',
    deals: 68
  },
  {
    name: 'Food And Beverages',
    parent: 'Food & Beverages',
    deals: 48
  },
  {
    name: 'Online Pharmacy',
    parent: 'Healthcare',
    deals: 38
  },
  {
    name: 'Online Payment',
    parent: 'Fintech',
    deals: 38
  },
  {
    name: 'Ecommerce Marketplace',
    parent: 'E-Commerce',
    deals: 37
  },
  {
    name: 'Logistics Tech',
    parent: 'Logistics',
    deals: 37
  },
  {
    name: 'Fintech',
    parent: 'Fintech',
    deals: 35
  },
  {
    name: 'Advertising',
    parent: 'Technology',
    deals: 30
  },
  {
    name: 'E-Commerce',
    parent: 'E-Commerce',
    deals: 29
  },
  {
    name: 'Healthcare',
    parent: 'Healthcare',
    deals: 27
  },
  {
    name: 'Software',
    parent: 'Technology',
    deals: 26
  },
  {
    name: 'Hyperlocal',
    parent: 'E-Commerce',
    deals: 25
  },
  {
    name: 'Aggregation',
    parent: 'Technology',
    deals: 24
  },
  {
    name: 'Saas',
    parent: 'Technology',
    deals: 23
  },
  {
    name: 'Online Lending',
    parent: 'Fintech',
    deals: 22
  }
];

export const insights = [
  'Technology accounts for 22% of all startup funding in India.',
  'Bengaluru hosts 30% of all unique funded startups.',
  'Average funding per deal: $12.5M.',
  'Top 15 investors drove 44% of total funding.',
  'Total deals recorded: 3044 between 2015 and 2020.'
];
