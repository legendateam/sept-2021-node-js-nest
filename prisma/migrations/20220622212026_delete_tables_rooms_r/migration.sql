/*
  Warnings:

  - You are about to drop the column `roomName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roomName_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roomName`;

-- DropTable
DROP TABLE `rooms`;
