-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "listingDescription" DROP NOT NULL,
ALTER COLUMN "locationDescription" DROP NOT NULL,
ALTER COLUMN "stayDescription" DROP NOT NULL;
