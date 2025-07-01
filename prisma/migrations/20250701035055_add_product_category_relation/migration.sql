-- AlterTable
ALTER TABLE `Category` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
