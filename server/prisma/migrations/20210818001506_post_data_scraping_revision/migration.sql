/*
  Warnings:

  - You are about to drop the column `enhancedClean` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `responseRate` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `responseTime` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `superHost` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `checkIn` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `houseDescription` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `partiesRule` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `ruleDescription` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `selfCheckIn` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `accuracyScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `checkInScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `cleanScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `communicationScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `locationScore` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `valueScore` on the `Review` table. All the data in the column will be lost.
  - Added the required column `address` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleaningFee` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datesUnavailable` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingDescription` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationDescription` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stayDescription` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superhost` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateJoined` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Host" DROP COLUMN "enhancedClean",
DROP COLUMN "languages",
DROP COLUMN "lastName",
DROP COLUMN "responseRate",
DROP COLUMN "responseTime",
DROP COLUMN "superHost",
ADD COLUMN     "details" TEXT[],
ADD COLUMN     "medals" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "dateJoined" DROP DEFAULT;
DROP SEQUENCE "Host_id_seq";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
DROP COLUMN "houseDescription",
DROP COLUMN "partiesRule",
DROP COLUMN "ruleDescription",
DROP COLUMN "selfCheckIn",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "basicAmenities" TEXT[],
ADD COLUMN     "cleaningFee" INTEGER NOT NULL,
ADD COLUMN     "datesUnavailable" JSONB NOT NULL,
ADD COLUMN     "healthAndSafety" TEXT[],
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "houseRules" TEXT[],
ADD COLUMN     "imageComments" TEXT[],
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "listingDescription" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "locationDescription" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "scores" TEXT[],
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "stayDescription" TEXT NOT NULL,
ADD COLUMN     "superhost" BOOLEAN NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "zipCode" SET DATA TYPE TEXT;
DROP SEQUENCE "Listing_id_seq";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "accuracyScore",
DROP COLUMN "checkInScore",
DROP COLUMN "cleanScore",
DROP COLUMN "communicationScore",
DROP COLUMN "createdAt",
DROP COLUMN "locationScore",
DROP COLUMN "updatedAt",
DROP COLUMN "valueScore",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "score" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateJoined" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
