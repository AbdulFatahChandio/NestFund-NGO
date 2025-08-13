-- AlterTable
ALTER TABLE "public"."ngoProfile" ALTER COLUMN "ngoStatus" DROP NOT NULL,
ALTER COLUMN "ngoStatus" SET DEFAULT 'pending';
