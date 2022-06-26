/*
  Warnings:

  - You are about to drop the column `roomId` on the `joinroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomName]` on the table `JoinRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomName` to the `JoinRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `joinroom` DROP FOREIGN KEY `JoinRoom_roomId_fkey`;

-- AlterTable
ALTER TABLE `joinroom` DROP COLUMN `roomId`,
    ADD COLUMN `roomName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `JoinRoom_roomName_key` ON `JoinRoom`(`roomName`);

-- CreateIndex
CREATE UNIQUE INDEX `Rooms_name_key` ON `Rooms`(`name`);

-- AddForeignKey
ALTER TABLE `JoinRoom` ADD CONSTRAINT `JoinRoom_roomName_fkey` FOREIGN KEY (`roomName`) REFERENCES `Rooms`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
