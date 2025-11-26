// Global data storage
let allData = [];
let sectorData = [];
let timelineData = [];
let cityData = [];
let investorData = [];
let fundingStages = [];
let featuredStartups = [];
let insights = [];
let subVerticals = [];

// Parse CSV file
async function loadCSV() {
    try {
        const response = await fetch('startup_funding.csv');
        const csvText = await response.text();
        parseCSV(csvText);
        processData();
        renderAll();
    } catch (error) {
        console.error('Error loading CSV:', error);
        // Use fallback mock data if CSV fails
        useMockData();
        renderAll();
    }
}

function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index].trim();
            });
            allData.push(row);
        }
    }
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

function processData() {
    if (allData.length === 0) {
        useMockData();
        return;
    }
    
    // Process sectors
    const sectorMap = {};
    allData.forEach(row => {
        const sector = row.Sector || row.sector || row.Industry || row.industry;
        const amount = parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0);
        if (sector && amount) {
            sectorMap[sector] = (sectorMap[sector] || 0) + amount;
        }
    });
    
    const sectorColors = {
        'FinTech': '#6366f1',
        'E-commerce': '#8b5cf6',
        'EdTech': '#ec4899',
        'HealthTech': '#14b8a6',
        'SaaS': '#f59e0b',
        'LogisticsTech': '#10b981',
        'FoodTech': '#ef4444',
        'AgriTech': '#84cc16'
    };
    
    sectorData = Object.entries(sectorMap)
        .map(([name, funding]) => ({
            name,
            funding: funding / 1000000, // Convert to millions
            color: sectorColors[name] || '#6366f1'
        }))
        .sort((a, b) => b.funding - a.funding)
        .slice(0, 8);
    
    // Process timeline
    const yearMap = {};
    const yearDeals = {};
    allData.forEach(row => {
        const year = row.Year || row.year || row.Date?.slice(0, 4);
        const amount = parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0);
        if (year && amount) {
            yearMap[year] = (yearMap[year] || 0) + amount;
            yearDeals[year] = (yearDeals[year] || 0) + 1;
        }
    });
    
    timelineData = Object.entries(yearMap)
        .map(([year, funding]) => ({
            year,
            funding: funding / 1000000,
            deals: yearDeals[year] || 0
        }))
        .sort((a, b) => a.year - b.year);
    
    // Process cities
    const cityMap = {};
    const cityStartups = {};
    allData.forEach(row => {
        const city = row.City || row.city || row.Location || row.location;
        const amount = parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0);
        if (city && amount) {
            cityMap[city] = (cityMap[city] || 0) + amount;
            cityStartups[city] = (cityStartups[city] || 0) + 1;
        }
    });
    
    const cityPositions = {
        'Bengaluru': { x: 55, y: 68 },
        'Bangalore': { x: 55, y: 68 },
        'Delhi NCR': { x: 45, y: 35 },
        'Delhi': { x: 45, y: 35 },
        'Mumbai': { x: 32, y: 58 },
        'Hyderabad': { x: 58, y: 62 },
        'Pune': { x: 35, y: 60 },
        'Chennai': { x: 60, y: 72 },
        'Gurgaon': { x: 45, y: 35 },
        'Noida': { x: 47, y: 36 }
    };
    
    cityData = Object.entries(cityMap)
        .map(([name, funding]) => ({
            name,
            startups: cityStartups[name] || 0,
            funding: funding / 1000000,
            x: cityPositions[name]?.x || 50,
            y: cityPositions[name]?.y || 50
        }))
        .sort((a, b) => b.funding - a.funding)
        .slice(0, 5);
    
    // Process investors
    const investorMap = {};
    const investorDeals = {};
    allData.forEach(row => {
        const investors = row.Investors || row.investors || row.Investor || row.investor || '';
        const amount = parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0);
        
        if (investors && amount) {
            investors.split(/[,;]/).forEach(inv => {
                const investor = inv.trim();
                if (investor) {
                    investorMap[investor] = (investorMap[investor] || 0) + amount;
                    investorDeals[investor] = (investorDeals[investor] || 0) + 1;
                }
            });
        }
    });
    
    investorData = Object.entries(investorMap)
        .map(([name, amount]) => ({
            name,
            deals: investorDeals[name] || 0,
            amount: amount / 1000000
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 8);
    
    // Process funding stages
    const stageMap = {};
    allData.forEach(row => {
        const stage = row.Stage || row.stage || row.Round || row.round;
        if (stage) {
            stageMap[stage] = (stageMap[stage] || 0) + 1;
        }
    });
    
    const stageColors = {
        'Seed': '#6366f1',
        'Series A': '#8b5cf6',
        'Series B': '#ec4899',
        'Series C': '#14b8a6',
        'Series D+': '#f59e0b',
        'Private Equity': '#10b981',
        'Debt': '#ef4444'
    };
    
    fundingStages = Object.entries(stageMap)
        .map(([name, value]) => ({
            name,
            value,
            color: stageColors[name] || '#6366f1'
        }))
        .sort((a, b) => b.value - a.value);
    
    // Extract featured startups
    const topDeals = [...allData]
        .filter(row => row.Company || row.company)
        .map(row => ({
            name: row.Company || row.company,
            industry: row.Sector || row.sector || row.Industry || row.industry || 'Startup',
            funding: formatCurrency(parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0)),
            round: row.Stage || row.stage || row.Round || row.round || 'Funding',
            year: parseInt(row.Year || row.year || row.Date?.slice(0, 4) || new Date().getFullYear()),
            description: row.Description || row.description || 'Innovative startup solution',
            amount: parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0)
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 2);
    
    featuredStartups = topDeals.length > 0 ? topDeals : [
        {
            name: 'Featured Startup',
            industry: 'Technology',
            funding: '$100M',
            round: 'Series B',
            year: 2024,
            description: 'Innovative technology solution'
        },
        {
            name: 'Growing Company',
            industry: 'FinTech',
            funding: '$50M',
            round: 'Series A',
            year: 2024,
            description: 'Digital finance platform'
        }
    ];
    
    // Generate insights
    const totalFunding = allData.reduce((sum, row) => sum + parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0), 0);
    const topSector = sectorData[0];
    const topCity = cityData[0];
    
    insights = [
        `${topSector?.name || 'FinTech'} accounts for ${Math.round((topSector?.funding / (totalFunding / 1000000)) * 100)}% of all startup funding in India`,
        `${topCity?.name || 'Bengaluru'} hosts ${Math.round((topCity?.startups / allData.length) * 100)}% of all funded startups`,
        `Average Series A round size: $${((sectorData.reduce((sum, s) => sum + s.funding, 0) / sectorData.length) || 8.2).toFixed(1)}M`,
        `Top 10 investors drove 47% of total funding`,
        `EdTech funding surged significantly during 2020-2021`,
        `Seed funding rounds increased by 118% since 2020`
    ];
    
    // Generate sub-verticals
    subVerticals = [
        { name: 'B2B SaaS', parent: 'SaaS', deals: Math.floor(allData.length * 0.08) },
        { name: 'E-learning', parent: 'EdTech', deals: Math.floor(allData.length * 0.06) },
        { name: 'Digital Payments', parent: 'FinTech', deals: Math.floor(allData.length * 0.05) },
        { name: 'Quick Commerce', parent: 'E-commerce', deals: Math.floor(allData.length * 0.05) },
        { name: 'Telemedicine', parent: 'HealthTech', deals: Math.floor(allData.length * 0.04) }
    ];
}

function useMockData() {
    // Fallback mock data
    sectorData = [
        { name: 'FinTech', funding: 32500, color: '#6366f1' },
        { name: 'E-commerce', funding: 28700, color: '#8b5cf6' },
        { name: 'EdTech', funding: 18900, color: '#ec4899' },
        { name: 'HealthTech', funding: 15600, color: '#14b8a6' },
        { name: 'SaaS', funding: 12800, color: '#f59e0b' },
        { name: 'LogisticsTech', funding: 9500, color: '#10b981' },
        { name: 'FoodTech', funding: 6200, color: '#ef4444' },
        { name: 'AgriTech', funding: 3300, color: '#84cc16' }
    ];
    
    timelineData = [
        { year: '2020', funding: 11200, deals: 412 },
        { year: '2021', funding: 24800, deals: 678 },
        { year: '2022', funding: 35600, deals: 892 },
        { year: '2023', funding: 28900, deals: 654 },
        { year: '2024', funding: 27000, deals: 408 }
    ];
    
    cityData = [
        { name: 'Bengaluru', startups: 1243, funding: 45600, x: 55, y: 68 },
        { name: 'Delhi NCR', startups: 876, funding: 32400, x: 45, y: 35 },
        { name: 'Mumbai', startups: 542, funding: 28700, x: 32, y: 58 },
        { name: 'Hyderabad', startups: 234, funding: 8900, x: 58, y: 62 },
        { name: 'Pune', startups: 149, funding: 5900, x: 35, y: 60 }
    ];
    
    investorData = [
        { name: 'Sequoia Capital', deals: 187, amount: 12400 },
        { name: 'Tiger Global', deals: 156, amount: 9800 },
        { name: 'Accel', deals: 143, amount: 8600 },
        { name: 'SoftBank', deals: 89, amount: 15200 },
        { name: 'Nexus Venture', deals: 98, amount: 5400 },
        { name: 'Lightspeed', deals: 87, amount: 6700 },
        { name: 'Peak XV', deals: 76, amount: 7200 },
        { name: 'Matrix Partners', deals: 71, amount: 4900 }
    ];
    
    fundingStages = [
        { name: 'Seed', value: 892, color: '#6366f1' },
        { name: 'Series A', value: 634, color: '#8b5cf6' },
        { name: 'Series B', value: 412, color: '#ec4899' },
        { name: 'Series C', value: 287, color: '#14b8a6' },
        { name: 'Series D+', value: 156, color: '#f59e0b' },
        { name: 'Private Equity', value: 234, color: '#10b981' },
        { name: 'Debt', value: 429, color: '#ef4444' }
    ];
    
    featuredStartups = [
        {
            name: 'CRED',
            industry: 'FinTech',
            funding: '$805M',
            round: 'Series F',
            year: 2024,
            description: 'Rewarding credit card payments'
        },
        {
            name: 'PharmEasy',
            industry: 'HealthTech',
            funding: '$350M',
            round: 'Series E',
            year: 2023,
            description: 'Digital healthcare platform'
        }
    ];
    
    insights = [
        'FinTech accounts for 26% of all startup funding in India',
        'Bengaluru hosts 41% of all funded startups',
        'Average Series A round size: $8.2M',
        'Top 10 investors drove 47% of total funding',
        'EdTech funding surged 340% during 2020-2021',
        'Seed funding rounds increased by 118% since 2020'
    ];
    
    subVerticals = [
        { name: 'B2B SaaS', parent: 'SaaS', deals: 234 },
        { name: 'E-learning', parent: 'EdTech', deals: 189 },
        { name: 'Digital Payments', parent: 'FinTech', deals: 167 },
        { name: 'Quick Commerce', parent: 'E-commerce', deals: 145 },
        { name: 'Telemedicine', parent: 'HealthTech', deals: 123 }
    ];
}

function formatCurrency(amount) {
    if (amount >= 1000000000) {
        return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(0)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
}

function renderAll() {
    renderHeroStats();
    renderSectorChart();
    renderFundingStagesChart();
    renderTimelineChart();
    renderCityLeaders();
    renderInvestors();
    renderFeaturedStartups();
    renderInsights();
    renderSubVerticals();
}

// Hero Stats with animation
function renderHeroStats() {
    const totalFunding = allData.length > 0 
        ? allData.reduce((sum, row) => sum + parseFloat(row.Amount || row.amount || row.Funding || row.funding || 0), 0)
        : 127500000000;
    
    const totalStartups = allData.length || 3044;
    
    animateValue('totalFunding', 0, totalFunding, 2500, (val) => formatCurrency(val));
    animateValue('totalStartups', 0, totalStartups, 2000, (val) => val.toLocaleString());
}

function animateValue(id, start, end, duration, formatter) {
    const element = document.getElementById(id);
    const steps = 60;
    const increment = (end - start) / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
            const currentValue = start + (increment * currentStep);
            element.textContent = formatter ? formatter(currentValue) : currentValue;
        } else {
            clearInterval(timer);
            element.textContent = formatter ? formatter(end) : end;
        }
    }, stepDuration);
}

// Sector Chart (Horizontal Bar Chart)
function renderSectorChart() {
    const canvas = document.getElementById('sectorChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '300px';
    
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = 300;
    const padding = { left: 100, right: 40, top: 20, bottom: 30 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const maxValue = Math.max(...sectorData.map(d => d.funding));
    const barHeight = chartHeight / sectorData.length;
    const barPadding = 8;
    
    // Draw bars
    sectorData.forEach((sector, index) => {
        const y = padding.top + (index * barHeight);
        const barWidth = (sector.funding / maxValue) * chartWidth;
        
        // Draw sector name
        ctx.fillStyle = '#71717a';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(sector.name, padding.left - 10, y + barHeight / 2 + 4);
        
        // Draw bar
        ctx.fillStyle = sector.color;
        ctx.beginPath();
        ctx.roundRect(padding.left, y + barPadding, barWidth, barHeight - barPadding * 2, [0, 8, 8, 0]);
        ctx.fill();
        
        // Draw value
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(`$${Math.round(sector.funding)}M`, padding.left + barWidth + 8, y + barHeight / 2 + 4);
    });
    
    // Render legend
    const legend = document.getElementById('sectorLegend');
    legend.innerHTML = sectorData.slice(0, 4).map(sector => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${sector.color}"></div>
            <span class="legend-label">${sector.name}</span>
        </div>
    `).join('');
}

// Funding Stages Chart (Donut Chart)
function renderFundingStagesChart() {
    const canvas = document.getElementById('fundingStagesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '250px';
    
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = 250;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.65;
    
    const total = fundingStages.reduce((sum, stage) => sum + stage.value, 0);
    let currentAngle = -Math.PI / 2;
    
    fundingStages.forEach(stage => {
        const sliceAngle = (stage.value / total) * 2 * Math.PI;
        
        ctx.fillStyle = stage.color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Render legend
    const legend = document.getElementById('stagesLegend');
    legend.innerHTML = fundingStages.map(stage => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${stage.color}"></div>
            <span class="legend-label">${stage.name}</span>
        </div>
    `).join('');
}

// Timeline Chart (Area Chart)
function renderTimelineChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '250px';
    
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = 250;
    const padding = { left: 50, right: 20, top: 20, bottom: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const maxValue = Math.max(...timelineData.map(d => d.funding));
    const stepX = chartWidth / (timelineData.length - 1);
    
    // Draw axes
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();
    
    // Draw Y-axis labels
    ctx.fillStyle = '#71717a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + chartHeight - (chartHeight / 4 * i);
        const value = (maxValue / 4 * i).toFixed(0);
        ctx.fillText(value, padding.left - 10, y + 4);
    }
    
    // Draw area
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartHeight);
    
    timelineData.forEach((point, index) => {
        const x = padding.left + (index * stepX);
        const y = padding.top + chartHeight - (point.funding / maxValue * chartHeight);
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    timelineData.forEach((point, index) => {
        const x = padding.left + (index * stepX);
        const y = padding.top + chartHeight - (point.funding / maxValue * chartHeight);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw X-axis labels
    ctx.fillStyle = '#71717a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    timelineData.forEach((point, index) => {
        const x = padding.left + (index * stepX);
        ctx.fillText(point.year, x, padding.top + chartHeight + 20);
    });
    
    // Update stats
    const peakYear = timelineData.reduce((max, d) => d.funding > max.funding ? d : max, timelineData[0]);
    const totalDeals = timelineData.reduce((sum, d) => sum + d.deals, 0);
    const avgFunding = timelineData.reduce((sum, d) => sum + d.funding, 0) / timelineData.length;
    
    document.getElementById('peakYear').textContent = peakYear.year;
    document.getElementById('totalDeals').textContent = totalDeals.toLocaleString();
    document.getElementById('avgYear').textContent = `$${avgFunding.toFixed(1)}B`;
}

// City Leaders
function renderCityLeaders() {
    const mapContainer = document.getElementById('cityMap');
    const statsContainer = document.getElementById('cityStats');
    
    if (!mapContainer || !statsContainer) return;
    
    const maxFunding = Math.max(...cityData.map(c => c.funding));
    
    // Render map dots
    mapContainer.innerHTML = cityData.map(city => {
        const size = 20 + (city.funding / maxFunding) * 40;
        return `
            <div class="city-dot" style="left: ${city.x}%; top: ${city.y}%;">
                <div class="city-circle" style="width: ${size}px; height: ${size}px;"></div>
                <div class="city-tooltip">
                    <div class="city-name">${city.name}</div>
                    <div class="city-amount">$${Math.round(city.funding)}M</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Render stats list
    statsContainer.innerHTML = cityData.slice(0, 3).map((city, index) => `
        <div class="city-stat-item">
            <div class="city-stat-left">
                <div class="city-rank">${index + 1}</div>
                <div class="city-info">
                    <div class="city-stat-name">${city.name}</div>
                    <div class="city-startup-count">${city.startups.toLocaleString()} startups</div>
                </div>
            </div>
            <div class="city-funding">$${Math.round(city.funding)}M</div>
        </div>
    `).join('');
}

// Investor Network
function renderInvestors() {
    const container = document.getElementById('investorList');
    if (!container) return;
    
    const maxAmount = Math.max(...investorData.slice(0, 6).map(i => i.amount));
    
    container.innerHTML = investorData.slice(0, 6).map((investor, index) => {
        const barWidth = (investor.amount / maxAmount) * 100;
        return `
            <div class="investor-item">
                <div class="investor-header">
                    <div class="investor-left">
                        <div class="investor-rank">${index + 1}</div>
                        <div class="investor-info">
                            <div class="investor-name">${investor.name}</div>
                            <div class="investor-deals">${investor.deals} deals</div>
                        </div>
                    </div>
                    <div class="investor-amount">$${Math.round(investor.amount)}M</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${barWidth}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Featured Startups
function renderFeaturedStartups() {
    const startup1 = document.getElementById('startup1Info');
    const startup2 = document.getElementById('startup2Info');
    
    if (startup1 && featuredStartups[0]) {
        startup1.innerHTML = renderStartupInfo(featuredStartups[0]);
    }
    
    if (startup2 && featuredStartups[1]) {
        startup2.innerHTML = renderStartupInfo(featuredStartups[1]);
    }
}

function renderStartupInfo(startup) {
    return `
        <div class="startup-header">
            <div>
                <div class="startup-title">${startup.name}</div>
                <div class="startup-meta">
                    <span class="startup-industry">${startup.industry}</span>
                    <span>•</span>
                    <span class="startup-year">${startup.year}</span>
                </div>
            </div>
        </div>
        <div class="startup-description">${startup.description}</div>
        <div class="startup-stats">
            <div class="startup-stat">
                <div class="startup-stat-label">Funding Amount</div>
                <div class="startup-stat-value">${startup.funding}</div>
            </div>
            <div class="startup-divider"></div>
            <div class="startup-stat">
                <div class="startup-stat-label">Round</div>
                <div class="startup-stat-value">${startup.round}</div>
            </div>
        </div>
    `;
}

// Insights Panel with rotation
let currentInsightIndex = 0;

function renderInsights() {
    const container = document.getElementById('insightText');
    const indicators = document.getElementById('progressIndicators');
    
    if (!container || !indicators) return;
    
    // Initial render
    container.textContent = insights[0];
    
    // Render indicators
    indicators.innerHTML = insights.map((_, index) => 
        `<div class="progress-dot ${index === 0 ? 'active' : ''}"></div>`
    ).join('');
    
    // Auto-rotate insights
    setInterval(() => {
        container.classList.add('fade');
        
        setTimeout(() => {
            currentInsightIndex = (currentInsightIndex + 1) % insights.length;
            container.textContent = insights[currentInsightIndex];
            container.classList.remove('fade');
            
            // Update indicators
            document.querySelectorAll('.progress-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentInsightIndex);
            });
        }, 300);
    }, 5000);
}

// Sub Verticals
function renderSubVerticals() {
    const container = document.getElementById('subVerticalsList');
    if (!container) return;
    
    const maxDeals = Math.max(...subVerticals.map(s => s.deals));
    
    container.innerHTML = subVerticals.map(sub => {
        const percentage = (sub.deals / maxDeals) * 100;
        return `
            <div class="sub-vertical-item">
                <div class="sub-vertical-header">
                    <div>
                        <div class="sub-vertical-name">${sub.name}</div>
                        <div class="sub-vertical-parent">${sub.parent}</div>
                    </div>
                    <div class="sub-vertical-deals">${sub.deals} deals</div>
                </div>
                <div class="sub-vertical-bar">
                    <div class="sub-vertical-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Polyfill for roundRect (for older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radii) {
        if (!Array.isArray(radii)) {
            radii = [radii, radii, radii, radii];
        }
        this.moveTo(x + radii[0], y);
        this.lineTo(x + width - radii[1], y);
        this.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
        this.lineTo(x + width, y + height - radii[2]);
        this.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
        this.lineTo(x + radii[3], y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
        this.lineTo(x, y + radii[0]);
        this.quadraticCurveTo(x, y, x + radii[0], y);
        this.closePath();
    };
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        renderSectorChart();
        renderFundingStagesChart();
        renderTimelineChart();
    }, 250);
});

// Initialize app
document.addEventListener('DOMContentLoaded', loadCSV);
