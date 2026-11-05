import pandas as pd
import json
import re
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

CSV_PATH = BASE_DIR / "data" / "BigBasket.csv"
JSON_PATH = BASE_DIR / "frontend" / "public" / "products.json"
BACKUP_PATH = BASE_DIR / "frontend" / "public" / "products.backup.json"

# INR to PKR mid-market reference rate, November 2, 2026
INR_TO_PKR = 2.912212


def normalize(value):
    value = str(value).lower().strip()
    return re.sub(r"\s+", " ", value)


# Read existing products and CSV
with open(JSON_PATH, "r", encoding="utf-8") as file:
    products = json.load(file)

df = pd.read_csv(CSV_PATH).fillna("")

# Create price lookup using exact product name + brand
price_lookup = {}

for _, row in df.iterrows():
    key = (
        normalize(row["ProductName"]),
        normalize(row["Brand"])
    )

    try:
        # Use regular Price, NOT DiscountPrice
        price_lookup[key] = float(row["Price"])
    except (ValueError, TypeError):
        continue

# Create backup before updating
shutil.copy2(JSON_PATH, BACKUP_PATH)

matched = 0
unmatched = 0

for product in products:
    key = (
        normalize(product.get("title", "")),
        normalize(product.get("brand", ""))
    )

    if key in price_lookup:
        inr_price = price_lookup[key]
        pkr_price = round(inr_price * INR_TO_PKR)

        # Add/update only the simple price field
        product["price"] = pkr_price

        # Remove discount-related fields from the earlier script
        product.pop("originalPrice", None)
        product.pop("discount", None)
        product.pop("currency", None)

        matched += 1
    else:
        unmatched += 1

# Save updated products
with open(JSON_PATH, "w", encoding="utf-8") as file:
    json.dump(products, file, indent=2, ensure_ascii=False)

print("Price update completed!")
print("Products matched:", matched)
print("Products without matching prices:", unmatched)
print("Exchange rate: 1 INR =", INR_TO_PKR, "PKR")
print("Backup saved at:", BACKUP_PATH)