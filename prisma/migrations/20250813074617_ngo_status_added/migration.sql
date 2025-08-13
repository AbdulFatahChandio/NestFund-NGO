/*
  Warnings:

  - Added the required column `ngoStatus` to the `ngoProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "public"."ngoProfile" ADD COLUMN     "ngoStatus" "public"."Status" NOT NULL;
