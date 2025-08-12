/*
  Warnings:

  - You are about to drop the column `name` on the `ngoProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."ngoProfile_name_key";

-- AlterTable
ALTER TABLE "public"."ngoProfile" DROP COLUMN "name";
