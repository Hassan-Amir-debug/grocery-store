import json
import re
import time
import shutil
import urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = Path(__file__).resolve().parent

JSON_PATH = BASE_DIR / "frontend" / "public" / "products.json"
IMAGE_DIR = BASE_DIR / "frontend" / "public" / "product-images"
BACKUP_PATH = BASE_DIR / "frontend" / "public" / "products.backup-before-images.json"

IMAGE_DIR.mkdir(parents=True, exist_ok=True)

# Read products
with open(JSON_PATH, "r", encoding="utf-8") as file:
    products = json.load(file)

# Keep a backup
shutil.copy2(JSON_PATH, BACKUP_PATH)


def download_image(index, product):
    url = product.get("image", "")

    if not url.startswith(("http://", "https://")):
        return index, None, "Invalid image URL"

    filename = f"product_{index}.jpg"
    destination = IMAGE_DIR / filename

    try:
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        with urllib.request.urlopen(request, timeout=20) as response:
            content_type = response.headers.get("Content-Type", "")

            if not content_type.startswith("image/"):
                return index, None, "URL did not return an image"

            image_data = response.read()

        if len(image_data) < 100:
            return index, None, "Image file too small"

        with open(destination, "wb") as image_file:
            image_file.write(image_data)

        return index, f"/product-images/{filename}", None

    except Exception as error:
        return index, None, str(error)


print(f"Starting image downloads for {len(products)} products...")

successful = 0
failed = 0

with ThreadPoolExecutor(max_workers=5) as executor:

    futures = [
        executor.submit(download_image, index, product)
        for index, product in enumerate(products)
    ]

    for future in as_completed(futures):
        index, local_path, error = future.result()

        if local_path:
            products[index]["image"] = local_path
            successful += 1
        else:
            failed += 1
            print(f"Failed: {products[index].get('title')} - {error}")

        completed = successful + failed

        if completed % 50 == 0:
            print(f"Progress: {completed}/{len(products)}")

# Update only image fields in products.json
with open(JSON_PATH, "w", encoding="utf-8") as file:
    json.dump(products, file, indent=2, ensure_ascii=False)

print("\nDownload completed!")
print("Successful:", successful)
print("Failed:", failed)
print("Images saved in:", IMAGE_DIR)
print("Original JSON backup:", BACKUP_PATH)