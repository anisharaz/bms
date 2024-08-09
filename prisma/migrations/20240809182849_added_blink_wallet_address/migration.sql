/*
  Warnings:

  - Added the required column `updatedAt` to the `CreateBlink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletaddredd` to the `CreateBlink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreateBlink" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walletaddredd" TEXT NOT NULL;
