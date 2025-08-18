/*
  Warnings:

  - You are about to alter the column `goalAmount` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `collectedAmount` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "public"."Campaign" ALTER COLUMN "goalAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "collectedAmount" SET DATA TYPE DECIMAL(65,30);
