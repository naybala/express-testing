import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 10 categories
  const categories = [];
  for (let i = 1; i <= 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: `Category ${i}`,
        description: `Description for category ${i}`,
        createdBy: 1,
      },
    });
    categories.push(category);
  }

  // Create 100 products
  for (let i = 1; i <= 100; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    await prisma.product.create({
      data: {
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        categoryId: randomCategory.id,
        createdBy: 1,
      },
    });
  }

  console.log(`✅ Seeded ${categories.length} categories and 100 products.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
