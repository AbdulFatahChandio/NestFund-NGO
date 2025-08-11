/*
  Warnings:

  - You are about to drop the `NGO_Registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."NGO_Registration";

-- CreateTable
CREATE TABLE "public"."NGO" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."NGO_type" NOT NULL DEFAULT 'trust',
    "purpose" "public"."Purpose" NOT NULL DEFAULT 'fund',
    "registration_ID" TEXT NOT NULL,
    "registered_Country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "no_Of_Staff" INTEGER NOT NULL,
    "no_Of_beneficiaries" INTEGER NOT NULL,

    CONSTRAINT "NGO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NGO_name_key" ON "public"."NGO"("name");
