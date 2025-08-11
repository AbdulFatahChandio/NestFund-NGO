/*
  Warnings:

  - You are about to drop the `ngo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ngo";

-- CreateTable
CREATE TABLE "public"."ngoProfile" (
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
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "ngoProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ngoProfile_name_key" ON "public"."ngoProfile"("name");

-- AddForeignKey
ALTER TABLE "public"."ngoProfile" ADD CONSTRAINT "ngoProfile_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
