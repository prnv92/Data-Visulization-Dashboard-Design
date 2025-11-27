import csv
import json
import re
import unicodedata
from collections import defaultdict, Counter
from pathlib import Path

input_csv = Path('startup_funding.csv')
if not input_csv.exists():
    raise FileNotFoundError(input_csv)


def parse_amount(value: str) -> float:
    if not value:
        return 0.0
    value = unicodedata.normalize('NFKC', value)
    value = value.replace(',','').replace('\r','').strip().replace('"','')
    value = re.sub(r'[^0-9.+-]', '', value)
    if not value:
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def clean_text(value: str) -> str:
    value = unicodedata.normalize('NFKC', value or '')
    value = value.replace('\n', ' ').replace('\r', ' ').strip()
    value = re.sub(r'\s+', ' ', value)
    return value


def normalize_label(label: str) -> str:
    label = clean_text(label)
    label = re.sub(r'[^\w &/\-]', '', label)
    label = re.sub(r'\s{2,}', ' ', label).strip()
    return label or 'Other'


def extract_year(value: str) -> str | None:
    if not value:
        return None
    candidates = re.findall(r'(19|20)\d{2}', value)
    if candidates:
        return candidates[-1]
    parts = re.split(r'\D+', value)
    for part in reversed(parts):
        if len(part) == 4 and part.isdigit():
            return part
    return None


sector_map = defaultdict(float)
timeline_map = defaultdict(lambda: {'funding': 0.0, 'deals': 0})
city_map = defaultdict(lambda: {'funding': 0.0, 'startups': 0})
stage_map = Counter()
subvertical_map = Counter()
subvertical_parent = {}
investor_map = defaultdict(float)
investor_deals = Counter()
unique_startups = set()
total_funding = 0.0

with input_csv.open('r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        amount = parse_amount(row.get('Amount in USD', ''))
        if amount <= 0:
            continue
        total_funding += amount

        startup = clean_text(row.get('Startup Name', ''))
        if startup:
            unique_startups.add(startup)

        industry = normalize_label(row.get('Industry Vertical', ''))
        if industry != 'Other':
            sector_map[industry] += amount

        year = extract_year(row.get('Date dd/mm/yyyy', ''))
        if year:
            timeline_map[year]['funding'] += amount
            timeline_map[year]['deals'] += 1

        city = normalize_label(row.get('City  Location', '') or row.get('City', ''))
        if city and city != 'Other':
            city_map[city]['funding'] += amount
            city_map[city]['startups'] += 1

        stage = clean_text(row.get('InvestmentnType', ''))
        if stage:
            stage_map[stage] += 1

        subvertical = normalize_label(row.get('SubVertical', ''))
        if subvertical != 'Other':
            subvertical_map[subvertical] += 1
            parent = normalize_label(row.get('Industry Vertical', ''))
            if parent != 'Other':
                subvertical_parent[subvertical] = parent

        investors_raw = clean_text(row.get('Investors Name', ''))
        if investors_raw:
            parts = [inv.strip() for inv in re.split(r'[;,]', investors_raw) if inv.strip()]
            for investor in parts:
                investor_label = normalize_label(investor)
                investor_map[investor_label] += amount
                investor_deals[investor_label] += 1


def top_items(map_items, func, limit=None):
    result = sorted(map_items.items(), key=lambda x: func(x), reverse=True)
    return result if limit is None else result[:limit]

million = 1_000_000
summary = {
    'totalFunding': round(total_funding),
    'totalStartups': len(unique_startups),
    'sectorData': [
        {'name': name, 'funding': round(value / million, 2)}
        for name, value in top_items(sector_map, lambda item: item[1], 8)
    ],
    'timelineData': [
        {'year': year, 'funding': round(info['funding'] / million, 2), 'deals': info['deals']}
        for year, info in sorted(
            (item for item in timeline_map.items() if item[0].isdigit() and len(item[0]) == 4),
            key=lambda kv: int(kv[0])
        )
    ],
    'cityData': [
        {'name': name, 'funding': round(info['funding'] / million, 2), 'startups': info['startups']}
        for name, info in top_items(city_map, lambda item: item[1]['funding'], 5)
    ],
    'investorData': [
        {'name': name, 'amount': round(value / million, 2), 'deals': investor_deals[name]}
        for name, value in top_items(investor_map, lambda item: item[1], 8)
    ],
    'fundingStages': [
        {'name': name, 'value': count}
        for name, count in stage_map.most_common(8)
    ],
    'subVerticals': [
        {'name': name, 'parent': subvertical_parent.get(name, 'Other'), 'deals': deals}
        for name, deals in subvertical_map.most_common(5)
    ]
}

output = Path('startup_summary_clean.json')
output.write_text(json.dumps(summary, indent=2), encoding='utf-8')
print('Wrote summary to', output)
print(json.dumps(summary, indent=2))
