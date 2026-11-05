
import requests
import json
import time

url = "https://world.openfoodfacts.org/api/v2/search"

headers = {
    "User-Agent": "GrocerySideProject/1.0 (student project)"
}


categories = {
    "Fruits": "en:fruits",
    "Vegetables": "en:vegetables",
    "Dairy & Eggs": "en:dairy-products",
    "Bakery": "en:bakery-products",
    "Meat & Poultry": "en:meats",
    "Seafood": "en:seafood",
    "Grains & Pulses": "en:grains",
    "Snacks": "en:snacks",
    "Chocolates & Sweets": "en:chocolates",
    "Cooking Essentials": "en:condiments",
    "Frozen Foods": "en:frozen-foods",
    "Household Cleaning": "en:cleaning-products",
    "Personal Care": "en:personal-care",
    "Baby Care": "en:baby-care"
}


all_products = []

for category_name, category_tag in categories.items():

    print(f"\nCollecting {category_name}...")

    params = {
        "categories_tags": category_tag,
        "page_size": 10,
        "fields": "product_name,brands,image_front_url,ingredients_text"
    }

    for attempt in range(3):
        try:
            response = requests.get(
                url,
                params=params,
                headers=headers,
                timeout=30
            )

            response.raise_for_status()

            products = response.json().get("products", [])

            for product in products:
                title = product.get("product_name")
                image = product.get("image_front_url")

                # Skip products without names or images
                if not title or not image:
                    continue

                all_products.append({
                    "title": title,
                    "brand": product.get("brands"),
                    "category": category_name,
                    "image": image,
                    "description": product.get("ingredients_text")
                })

            print(f"{category_name}: {len(products)} products received")
            break

        except requests.exceptions.RequestException as error:
            print(f"Attempt {attempt + 1} failed:", error)

            if attempt < 2:
                time.sleep(10 * (attempt + 1))

    time.sleep(7)

with open("products.json", "w", encoding="utf-8") as file:
    json.dump(all_products, file, indent=4, ensure_ascii=False)

print("\nTotal products saved:", len(all_products))
print("products.json created successfully!")
