/*
  Warnings:

  - The values [actives] on the enum `CampaignStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `ngoId` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CampaignStatus_new" AS ENUM ('pending', 'active', 'completed', 'cancelled');
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" TYPE "public"."CampaignStatus_new" USING ("status"::text::"public"."CampaignStatus_new");
ALTER TYPE "public"."CampaignStatus" RENAME TO "CampaignStatus_old";
ALTER TYPE "public"."CampaignStatus_new" RENAME TO "CampaignStatus";
DROP TYPE "public"."CampaignStatus_old";
ALTER TABLE "public"."Campaign" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Campaign" ADD COLUMN     "ngoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Campaign" ADD CONSTRAINT "Campaign_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "public"."ngoProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
