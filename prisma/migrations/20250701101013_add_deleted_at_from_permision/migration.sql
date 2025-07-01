-- AlterTable
ALTER TABLE `Permission` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL;
