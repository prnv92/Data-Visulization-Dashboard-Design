import csv
import re
from collections import Counter, defaultdict
from pathlib import Path
import unicodedata

path = Path('startup_funding.csv')
if not path.exists():
    raise FileNotFoundError(path)

COUNTER = Counter()
PARENT = {}

def clean(text: str) -> str:
    if not text:
        return ''
    text = unicodedata.normalize('NFKC', text)
    text = text.replace('\n', ' ').replace('\r', ' ').strip()
    text = re.sub(r'\s+', ' ', text)
    return text

with path.open('r', encoding='utf-8', newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        sub = clean(row.get('SubVertical', ''))
        parent = clean(row.get('Industry Vertical', ''))
        if sub:
            COUNTER[sub] += 1
            if sub not in PARENT and parent:
                PARENT[sub] = parent

for name, count in COUNTER.most_common(10):
    print(f"{count:>4} {name} -> {PARENT.get(name, 'Unknown')}")
