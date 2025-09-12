/*
  Warnings:

  - The values [refunded] on the enum `DonationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DonationStatus_new" AS ENUM ('pending', 'succeeded', 'failed');
ALTER TABLE "public"."Donation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Donation" ALTER COLUMN "status" TYPE "public"."DonationStatus_new" USING ("status"::text::"public"."DonationStatus_new");
ALTER TYPE "public"."DonationStatus" RENAME TO "DonationStatus_old";
ALTER TYPE "public"."DonationStatus_new" RENAME TO "DonationStatus";
DROP TYPE "public"."DonationStatus_old";
ALTER TABLE "public"."Donation" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
