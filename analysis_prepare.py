import csv
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

path = Path('startup_funding.csv')
if not path.exists():
    raise FileNotFoundError(path)


def clean_text(value: str) -> str:
    value = unicodedata.normalize('NFKC', value or '')
    value = value.replace('\n', ' ').replace('\r', ' ').strip()
    value = re.sub(r'\s+', ' ', value)
    return value


def clean_amount(value: str) -> float:
    value = clean_text(value)
    value = value.replace(',', '')
    value = re.sub(r'[^0-9.+-]', '', value)
    if not value:
        return 0.0
    try:
        return float(value)
    except ValueError:
        digits = ''.join(ch for ch in value if ch.isdigit() or ch == '.')
        return float(digits) if digits else 0.0


def extract_year(value: str) -> str | None:
    value = clean_text(value)
    matches = re.findall(r'(19|20)\d{2}', value)
    if matches:
        return matches[-1]
    digits = re.findall(r'\d{4}', value)
    return digits[-1] if digits else None


def normalize_name(value: str) -> str:
    value = clean_text(value)
    value = re.sub(r'[^\w\s&\-./]', '', value)
    value = re.sub(r'\s{2,}', ' ', value).strip()
    return value or 'Unknown'


def normalize_stage(value: str) -> str:
    value = clean_text(value).lower()
    value = value.replace('\n', ' ').replace('/', ' ').replace('-', ' ').replace('&', ' and ')
    value = re.sub(r'\s+', ' ', value).strip()
    if not value:
        return 'Other'
    return value.title()


million = 1_000_000
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

with path.open('r', encoding='utf-8', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        amount = clean_amount(row.get('Amount in USD', ''))
        if amount <= 0:
            continue
        total_funding += amount

        startup_name = clean_text(row.get('Startup Name', ''))
        if startup_name:
            unique_startups.add(startup_name)

        industry = normalize_name(row.get('Industry Vertical', ''))
        if industry and industry != 'Unknown':
            sector_map[industry] += amount

        year = extract_year(row.get('Date dd/mm/yyyy', ''))
        if year:
            timeline_map[year]['funding'] += amount
            timeline_map[year]['deals'] += 1

        city = normalize_name(row.get('City  Location', '') or row.get('City', ''))
        if city and city != 'Unknown':
            city_map[city]['funding'] += amount
            city_map[city]['startups'] += 1

        stage = normalize_stage(row.get('InvestmentnType', ''))
        stage_map[stage] += 1

        subvertical = normalize_name(row.get('SubVertical', ''))
        if subvertical != 'Unknown':
            subvertical_map[subvertical] += 1
            sector = normalize_name(row.get('Industry Vertical', ''))
            if sector != 'Unknown':
                subvertical_parent[subvertical] = sector

        investors_text = clean_text(row.get('Investors Name', ''))
        if investors_text:
            investors = [normalize_name(part) for part in re.split(r'[;,]', investors_text) if part.strip()]
            for investor in investors:
                investor_map[investor] += amount
                investor_deals[investor] += 1


def format_top(items, key_fn, limit=None):
    sorted_items = sorted(items.items(), key=lambda pair: key_fn(pair), reverse=True)
    return sorted_items if limit is None else sorted_items[:limit]

sector_data = [
    {'name': name, 'funding': round(amount / million, 2)}
    for name, amount in format_top(sector_map, lambda item: item[1], 8)
]
timeline_data = [
    {'year': year, 'funding': round(info['funding'] / million, 2), 'deals': info['deals']}
    for year, info in sorted(timeline_map.items(), key=lambda kv: int(kv[0]) if kv[0].isdigit() else 0)
    if year.isdigit()
]
city_data = [
    {'name': name, 'funding': round(info['funding'] / million, 2), 'startups': info['startups']}
    for name, info in format_top(city_map, lambda item: item[1]['funding'], 5)
]
investor_data = [
    {'name': name, 'amount': round(amount / million, 2), 'deals': investor_deals[name]}
    for name, amount in format_top(investor_map, lambda item: item[1], 8)
]
stage_data = [
    {'name': name, 'value': count}
    for name, count in stage_map.most_common(8)
]
subverticals_data = [
    {'name': name, 'parent': subvertical_parent.get(name, 'Other'), 'deals': deals}
    for name, deals in subvertical_map.most_common(5)
]

summary = {
    'totalFunding': round(total_funding),
    'totalStartups': len(unique_startups),
    'sectorData': sector_data,
    'timelineData': timeline_data,
    'cityData': city_data,
    'investorData': investor_data,
    'fundingStages': stage_data,
    'subVerticals': subverticals_data,
}

Path('startup_summary_prepped.json').write_text(json.dumps(summary, indent=2), encoding='utf-8')
print(json.dumps(summary, indent=2))
