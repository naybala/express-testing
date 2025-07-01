/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Permission` DROP COLUMN `deletedAt`,
    DROP COLUMN `deletedBy`;
