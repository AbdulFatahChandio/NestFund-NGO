/*
  Warnings:

  - The values [active] on the enum `CampaignStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CampaignStatus_new" AS ENUM ('pending', 'actives', 'completed', 'cancelled');
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" TYPE "public"."CampaignStatus_new" USING ("status"::text::"public"."CampaignStatus_new");
ALTER TYPE "public"."CampaignStatus" RENAME TO "CampaignStatus_old";
ALTER TYPE "public"."CampaignStatus_new" RENAME TO "CampaignStatus";
DROP TYPE "public"."CampaignStatus_old";
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
