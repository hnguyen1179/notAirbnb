-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0;
