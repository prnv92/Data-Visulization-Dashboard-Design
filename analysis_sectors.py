import csv
import re
import unicodedata
from collections import Counter
from pathlib import Path

path = Path('startup_funding.csv')
if not path.exists():
    raise FileNotFoundError(path)

def normalize_label(label: str) -> str:
    label = unicodedata.normalize('NFKC', label or '')
    label = label.strip()
    label = re.sub(r'\s+', ' ', label)
    label = re.sub(r'[^\w\s&\-\/]', '', label)
    label = label.title()
    return label or 'Other'

counter = Counter()
with path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        industry = normalize_label(row.get('Industry Vertical', ''))
        if industry:
            counter[industry] += 1

for name, count in counter.most_common(12):
    print(f"{count:>4} {name}")
