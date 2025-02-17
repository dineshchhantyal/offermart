import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create categories
    const categories = [
      { name: "Groceries" },
      { name: "Electronics" },
      { name: "Fashion" },
      { name: "Home & Living" },
      { name: "Health & Beauty" },
      { name: "Sports & Outdoor" },
      { name: "Books & Stationery" },
      { name: "Toys & Games" },
    ];

    console.log("🌱 Seeding categories...");
    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }

    console.log("✅ Seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
