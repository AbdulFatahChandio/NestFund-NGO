-- CreateEnum
CREATE TYPE "public"."CampaignStatus" AS ENUM ('pending', 'active', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE "public"."Campaign" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goalAmount" DOUBLE PRECISION NOT NULL,
    "collectedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "public"."CampaignStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);
