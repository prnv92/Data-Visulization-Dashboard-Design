import csv
from collections import Counter, defaultdict
from pathlib import Path
import unicodedata
import re

path = Path('startup_funding.csv')
if not path.exists():
    raise FileNotFoundError(path)


def clean(text: str) -> str:
    if not text:
        return ''
    text = unicodedata.normalize('NFKC', text)
    text = text.replace('\n', ' ').replace('\r', ' ').strip()
    text = re.sub(r'\s+', ' ', text)
    return text


def parse_amount(value: str) -> float:
    if not value:
        return 0.0
    value = clean(value)
    value = value.replace(',', '')
    value = re.sub(r'[^0-9.+-]', '', value)
    if not value:
        return 0.0
    try:
        return float(value)
    except ValueError:
        digits = ''.join(ch for ch in value if ch.isdigit() or ch == '.' or ch == '-')
        return float(digits) if digits else 0.0

total = defaultdict(float)
deals = Counter()

with path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        amount = parse_amount(row.get('Amount in USD', ''))
        if amount <= 0:
            continue
        investors = row.get('Investors Name', '')
        if not investors:
            continue
        for part in re.split(r'[;,]', investors):
            owner = clean(part)
            if not owner:
                continue
            total[owner] += amount
            deals[owner] += 1

for name, value in sorted(total.items(), key=lambda item: item[1], reverse=True)[:12]:
    print(name, round(value / 1_000_000, 2), deals[name])
