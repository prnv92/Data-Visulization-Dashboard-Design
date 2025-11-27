import csv
from collections import defaultdict, Counter
from pathlib import Path


def parse_amount(value):
    if not value:
        return 0.0
    value = value.replace('"', '').replace('\n', ' ').strip()
    value = value.replace(' ', '')
    if not value:
        return 0.0
    value_lower = value.lower()
    if value_lower in {'undisclosed', 'unknown', 'n/a', 'na', 'nan'}:
        return 0.0
    cleaned = ''.join(ch for ch in value if ch.isdigit() or ch == '.' or ch == '-')
    if not cleaned:
        return 0.0
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

csv_path = 'startup_funding.csv'
sector_map = defaultdict(float)
timeline = defaultdict(lambda: {'funding': 0.0, 'deals': 0})
city_map = defaultdict(lambda: {'funding': 0.0, 'startups': 0})
stage_map = Counter()
subvertical_map = Counter()
subvertical_parent = {}
investor_map = defaultdict(float)
investor_deals = Counter()
unique_startups = set()
total_funding = 0.0

with open(csv_path, encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        amount = parse_amount(row.get('Amount in USD', ''))
        if amount <= 0:
            continue
        total_funding += amount
        startup = row.get('Startup Name', '').strip()
        if startup:
            unique_startups.add(startup)
        industry = row.get('Industry Vertical', '').strip()
        if industry:
            sector_map[industry] += amount
        date = row.get('Date dd/mm/yyyy', '').strip()
        year = ''
        if date:
            parts = date.split('/')
            if parts:
                year = parts[-1]
        if year:
            timeline[year]['funding'] += amount
            timeline[year]['deals'] += 1
        city = row.get('City  Location', '').strip() or row.get('City', '').strip()
        if city:
            city_map[city]['funding'] += amount
            city_map[city]['startups'] += 1
        stage = row.get('InvestmentnType', '').strip()
        if stage:
            stage_map[stage] += 1
        subvertical = row.get('SubVertical', '').strip()
        if subvertical:
            subvertical_map[subvertical] += 1
            if industry:
                subvertical_parent[subvertical] = industry
        investors = row.get('Investors Name', '').strip()
        if investors:
            for part in investors.split(','):
                investor = part.strip()
                if investor:
                    investor_map[investor] += amount
                    investor_deals[investor] += 1

million = 1_000_000
sector_data = sorted(sector_map.items(), key=lambda x: x[1], reverse=True)
sector_data_millions = [(name, round(value / million, 2)) for name, value in sector_data][:8]
timeline_data = sorted(timeline.items(), key=lambda x: (int(x[0]) if x[0].isdigit() else float('inf')))
timeline_data_formatted = [
    {'year': year, 'funding': round(info['funding'] / million, 2), 'deals': info['deals']}
    for year, info in timeline_data
]
city_data = sorted(city_map.items(), key=lambda x: x[1]['funding'], reverse=True)
city_data_formatted = [
    {'name': name, 'funding': round(info['funding'] / million, 2), 'startups': info['startups']}
    for name, info in city_data[:5]
]
feeds = sorted(investor_map.items(), key=lambda x: x[1], reverse=True)
investor_data_formatted = [
    {'name': name, 'amount': round(value / million, 2), 'deals': investor_deals[name]}
    for name, value in feeds[:8]
]
stage_data_formatted = [
    {'name': name, 'value': count}
    for name, count in stage_map.most_common()
]
subverticals_data = sorted(subvertical_map.items(), key=lambda x: x[1], reverse=True)
subverticals_formatted = []
for name, deals in subverticals_data[:5]:
    subverticals_formatted.append({
        'name': name,
        'parent': subvertical_parent.get(name, 'Other'),
        'deals': deals
    })

import json
result = {
    'totalFunding': round(total_funding),
    'totalStartups': len(unique_startups),
    'sectorData': sector_data_millions,
    'timelineData': timeline_data_formatted,
    'cityData': city_data_formatted,
    'investorData': investor_data_formatted,
    'fundingStages': stage_data_formatted,
    'subVerticals': subverticals_formatted
}
json_text = json.dumps(result, indent=2)
Path('startup_summary.json').write_text(json_text, encoding='utf-8')
print(json_text)
