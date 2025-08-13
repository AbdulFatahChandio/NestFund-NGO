/*
  Warnings:

  - The `type` column on the `ngoProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."NgoType" AS ENUM ('nonProfit', 'welfare', 'charitable', 'trust', 'society', 'company');

-- AlterTable
ALTER TABLE "public"."ngoProfile" DROP COLUMN "type",
ADD COLUMN     "type" "public"."NgoType" NOT NULL DEFAULT 'trust';

-- DropEnum
DROP TYPE "public"."NGO_type";
