const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Categories
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Electronics',
          description: 'Electronic devices and gadgets',
          createdAt: new Date(),
        },
        {
          name: 'Clothing',
          description: 'Apparel and fashion items',
          createdAt: new Date(),
        },
        {
          name: 'Books',
          description: 'Books and educational materials',
          createdAt: new Date(),
        },
        {
          name: 'Home & Garden',
          description: 'Home improvement and garden supplies',
          createdAt: new Date(),
        },
        {
          name: 'Sports & Outdoors',
          description: 'Sports equipment and outdoor gear',
          createdAt: new Date(),
        },
      ],
    });

    console.log('✅ Seeded categories');

    // Get created categories for product assignment
    const electronicsCategory = await prisma.category.findUnique({ where: { name: 'Electronics' } });
    const clothingCategory = await prisma.category.findUnique({ where: { name: 'Clothing' } });
    const booksCategory = await prisma.category.findUnique({ where: { name: 'Books' } });
    const homeGardenCategory = await prisma.category.findUnique({ where: { name: 'Home & Garden' } });
    const sportsCategory = await prisma.category.findUnique({ where: { name: 'Sports & Outdoors' } });

    // Seed Products
    const products = await prisma.product.createMany({
      data: [
        // Electronics
        {
          name: 'Smartphone',
          description: 'Latest model smartphone with advanced features',
          categoryId: electronicsCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Laptop',
          description: 'High-performance laptop for work and gaming',
          categoryId: electronicsCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Wireless Headphones',
          description: 'Premium wireless headphones with noise cancellation',
          categoryId: electronicsCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Smart Watch',
          description: 'Fitness tracking smart watch with health monitoring',
          categoryId: electronicsCategory.id,
          createdAt: new Date(),
        },
        
        // Clothing
        {
          name: 'Denim Jeans',
          description: 'Classic blue denim jeans, comfortable fit',
          categoryId: clothingCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Cotton T-Shirt',
          description: 'Soft cotton t-shirt in various colors',
          categoryId: clothingCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Winter Jacket',
          description: 'Warm winter jacket with insulation',
          categoryId: clothingCategory.id,
          createdAt: new Date(),
        },
        
        // Books
        {
          name: 'JavaScript: The Good Parts',
          description: 'Essential JavaScript programming guide',
          categoryId: booksCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Clean Code',
          description: 'A handbook of agile software craftsmanship',
          categoryId: booksCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Design Patterns',
          description: 'Elements of reusable object-oriented software',
          categoryId: booksCategory.id,
          createdAt: new Date(),
        },
        
        // Home & Garden
        {
          name: 'Garden Hose',
          description: 'Expandable garden hose for watering plants',
          categoryId: homeGardenCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'LED Light Bulbs',
          description: 'Energy-efficient LED bulbs for home lighting',
          categoryId: homeGardenCategory.id,
          createdAt: new Date(),
        },
        
        // Sports & Outdoors
        {
          name: 'Basketball',
          description: 'Official size basketball for indoor and outdoor play',
          categoryId: sportsCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Camping Tent',
          description: 'Waterproof camping tent for 4 people',
          categoryId: sportsCategory.id,
          createdAt: new Date(),
        },
        {
          name: 'Yoga Mat',
          description: 'Non-slip yoga mat for exercise and meditation',
          categoryId: sportsCategory.id,
          createdAt: new Date(),
        },
      ],
    });

    console.log('✅ Seeded products');

    // Get counts for summary
    const categoryCount = await prisma.category.count();
    const productCount = await prisma.product.count();
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Roles: ${roleCount}`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Products: ${productCount}`);
    console.log('\n🔑 Default login credentials:');
    console.log('   Admin: admin@example.com / password123');
    console.log('   Manager: manager@example.com / password123');
    console.log('   User: user1@example.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeder
main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });