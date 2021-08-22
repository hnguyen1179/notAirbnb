/*
  Warnings:

  - You are about to drop the column `score` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Host" ALTER COLUMN "dateJoined" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "score",
ADD COLUMN     "scores" TEXT[];
