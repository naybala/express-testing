/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RolePermission` DROP FOREIGN KEY `RolePermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `RolePermission` DROP FOREIGN KEY `RolePermission_roleId_fkey`;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `permissions` JSON NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `roleId` INTEGER NULL;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `RolePermission`;
