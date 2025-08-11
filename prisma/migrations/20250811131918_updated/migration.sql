/*
  Warnings:

  - A unique constraint covering the columns `[creatorId]` on the table `ngoProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ngoProfile_creatorId_key" ON "public"."ngoProfile"("creatorId");
