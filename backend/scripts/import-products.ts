import "dotenv/config";
import { createReadStream } from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

const INR_TO_PKR = 3;
const CSV_PATH = path.join(process.cwd(), "../data/BigBasket.csv");

async function main() {
  const products: any[] = [];

  console.log("Reading BigBasket CSV...");

  await new Promise<void>((resolve, reject) => {
    createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => products.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Found ${products.length} products.`);

  // Prevent accidental duplicate imports.
  const existingCount = await prisma.product.count();

  if (existingCount > 0) {
    throw new Error(
      `Database already contains ${existingCount} products. Import stopped to prevent duplicates.`
    );
  }

  const categoryCache = new Map<string, string>();
  const brandCache = new Map<string, string>();

  const records = [];

  for (const row of products) {
    const categoryName = row.Category?.trim() || "Unknown";
    const brandName = row.Brand?.trim() || "Unknown";

    let categoryId = categoryCache.get(categoryName);

    if (!categoryId) {
      const category = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });

      categoryId = category.id;
      categoryCache.set(categoryName, categoryId);
    }

    let brandId = brandCache.get(brandName);

    if (!brandId) {
      const brand = await prisma.brand.upsert({
        where: { name: brandName },
        update: {},
        create: { name: brandName },
      });

      brandId = brand.id;
      brandCache.set(brandName, brandId);
    }

    const originalINR = Number(row.Price);
    const discountedINR = Number(row.DiscountPrice);

    if (
      !Number.isFinite(originalINR) ||
      !Number.isFinite(discountedINR) ||
      originalINR <= 0 ||
      discountedINR <= 0
    ) {
      console.warn(`Skipping invalid price: ${row.ProductName}`);
      continue;
    }

    const originalPrice = originalINR * INR_TO_PKR;
    const price = discountedINR * INR_TO_PKR;

    const discount =
      originalPrice > price
        ? ((originalPrice - price) / originalPrice) * 100
        : 0;

    records.push({
      name: row.ProductName?.trim() || "Unnamed Product",
      imageUrl: row.Image_Url?.trim() || "",
      originalPrice,
      price,
      discount: Number(discount.toFixed(2)),
      packageSize: row.Quantity?.trim() || null,
      productUrl: row.Absolute_Url?.trim() || null,
      categoryId,
      brandId,
    });
  }

  console.log(`Importing ${records.length} valid products...`);

  for (let i = 0; i < records.length; i += 500) {
    await prisma.product.createMany({
      data: records.slice(i, i + 500),
    });

    console.log(
      `Imported ${Math.min(i + 500, records.length)} / ${records.length}`
    );
  }

  console.log("Product import completed successfully!");
}

main()
  .catch((error) => {
    console.error("Import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
