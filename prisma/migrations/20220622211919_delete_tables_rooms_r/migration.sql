/*
  Warnings:

  - You are about to drop the `joinroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `joinroom` DROP FOREIGN KEY `JoinRoom_roomName_fkey`;

-- DropForeignKey
ALTER TABLE `joinroom` DROP FOREIGN KEY `JoinRoom_userId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_userId_fkey`;

-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roomName` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `joinroom`;

-- DropTable
DROP TABLE `messages`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roomName_fkey` FOREIGN KEY (`roomName`) REFERENCES `Rooms`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
