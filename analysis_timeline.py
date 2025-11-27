import csv
from collections import defaultdict, Counter
from pathlib import Path

path = Path('startup_funding.csv')
if not path.exists():
    raise FileNotFoundError(path)

def parse_year(date):
    if not date:
        return None
    date = date.strip()
    parts = date.split('/')
    for part in parts:
        if len(part) == 4 and part.isdigit():
            return part
    for part in parts:
        part = ''.join(ch for ch in part if ch.isdigit())
        if len(part) == 4:
            return part
    return None


def clean_amount(value):
    if not value:
        return 0.0
    cleaned = ''.join(ch for ch in value if ch.isdigit() or ch == '.' )
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

funding_year = defaultdict(lambda: {'funding': 0.0, 'deals': 0})
with path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        year = parse_year(row.get('Date dd/mm/yyyy', ''))
        amount = clean_amount(row.get('Amount in USD', ''))
        if year and amount > 0:
            funding_year[year]['funding'] += amount
            funding_year[year]['deals'] += 1

for year in sorted(funding_year, key=lambda y: int(y)):
    data = funding_year[year]
    print(year, round(data['funding']/1_000_000, 2), data['deals'])
