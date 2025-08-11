-- CreateEnum
CREATE TYPE "public"."NGO_type" AS ENUM ('non_Profit', 'welfare', 'charitable', 'trust', 'society', 'company');

-- CreateEnum
CREATE TYPE "public"."Purpose" AS ENUM ('education', 'fund', 'health', 'old_house', 'orphan_house', 'women_Empowerment', 'disaster', 'relief');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NGO_Registration" (
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

    CONSTRAINT "NGO_Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "NGO_Registration_name_key" ON "public"."NGO_Registration"("name");
