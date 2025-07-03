import { ProductRepositoryInterface } from './productRepository.interface';
import { baseRepository } from '../base/base.repository';
import prisma from '../../../config/db';
import { Product } from './type';

const base = baseRepository(prisma.product);

export const productRepository: ProductRepositoryInterface = {
  ...base,
  getNotDeletedRecords() : Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        deletedAt: null,
      }
    })
  }
};
