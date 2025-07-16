import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // 1. Create one user
  const user = await prisma.user.createMany({
     data: [
     {
      email: 'admin@example.com',
      name: 'Admin User',
      password:"1111", 
    },
    ],
  });

  // 2. Create three categories
  await prisma.category.createMany({
    data: [
     {
      name: 'Electronics',
      description: 'Gadgets and devices',
      createdBy: 1,
      updatedBy: 1,
    },
    {
      name: 'Clothing',
      description: 'Apparel and accessories',
      createdBy: 1,
      updatedBy: 1,
    },
    {
      name: 'Books',
      description: 'Books and literature',
      createdBy: 1,
      updatedBy: 1,
    },
    ],
    skipDuplicates: true,
  });

  // 4. Seed 100,000 products
  const products: {
    name: string;
    description: string;
    categoryId: number;
    createdBy: number;
    updatedBy: number;
  }[] = [];

  for (let i = 1; i <= 100000; i++) {
    products.push({
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      categoryId: 1,
      createdBy: 1,
      updatedBy: 1,
    });
  }

  const chunkSize = 100;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    await prisma.product.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`Inserted products ${i + 1}–${i + chunk.length}`);
  }

  console.log('✅ Seeded: 1 user, 3 categories, 100,000 products.');
}

main()
  .catch((e) => {
    console.error('❌ Seeder failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
