import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products: {
    name: string;
    description: string;
    categoryId: number;
    createdBy: number;
    updatedBy: number;
  }[] = [];

  for (let i = 1; i <= 100000; i++) {
    products.push({
      name: `Product ${1000+i}`,
      description: `Description for product ${i+1000}`,
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
  }

  console.log('✅ Seeded 1,000 products.');
}

main()
  .catch((e) => {
    console.error('Seeder failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
