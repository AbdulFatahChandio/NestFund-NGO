/*
  Warnings:

  - The values [non_Profit] on the enum `NGO_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [old_house,orphan_house,women_Empowerment] on the enum `Purpose` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `no_Of_Staff` on the `ngoProfile` table. All the data in the column will be lost.
  - You are about to drop the column `no_Of_beneficiaries` on the `ngoProfile` table. All the data in the column will be lost.
  - You are about to drop the column `registered_Country` on the `ngoProfile` table. All the data in the column will be lost.
  - You are about to drop the column `registration_ID` on the `ngoProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationID]` on the table `ngoProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noOfBeneficiaries` to the `ngoProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noOfStaff` to the `ngoProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredCountry` to the `ngoProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationID` to the `ngoProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."NGO_type_new" AS ENUM ('nonProfit', 'welfare', 'charitable', 'trust', 'society', 'company');
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "type" TYPE "public"."NGO_type_new" USING ("type"::text::"public"."NGO_type_new");
ALTER TYPE "public"."NGO_type" RENAME TO "NGO_type_old";
ALTER TYPE "public"."NGO_type_new" RENAME TO "NGO_type";
DROP TYPE "public"."NGO_type_old";
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "type" SET DEFAULT 'trust';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Purpose_new" AS ENUM ('education', 'fund', 'health', 'oldHouse', 'orphanHouse', 'womenEmpowerment', 'disaster', 'relief');
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "purpose" DROP DEFAULT;
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "purpose" TYPE "public"."Purpose_new" USING ("purpose"::text::"public"."Purpose_new");
ALTER TYPE "public"."Purpose" RENAME TO "Purpose_old";
ALTER TYPE "public"."Purpose_new" RENAME TO "Purpose";
DROP TYPE "public"."Purpose_old";
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "purpose" SET DEFAULT 'fund';
COMMIT;

-- DropIndex
DROP INDEX "public"."ngoProfile_registration_ID_key";

-- AlterTable
ALTER TABLE "public"."ngoProfile" DROP COLUMN "no_Of_Staff",
DROP COLUMN "no_Of_beneficiaries",
DROP COLUMN "registered_Country",
DROP COLUMN "registration_ID",
ADD COLUMN     "noOfBeneficiaries" INTEGER NOT NULL,
ADD COLUMN     "noOfStaff" INTEGER NOT NULL,
ADD COLUMN     "registeredCountry" TEXT NOT NULL,
ADD COLUMN     "registrationID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ngoProfile_registrationID_key" ON "public"."ngoProfile"("registrationID");
