/*
  Warnings:

  - A unique constraint covering the columns `[registration_ID]` on the table `ngoProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ngoProfile_registration_ID_key" ON "public"."ngoProfile"("registration_ID");
