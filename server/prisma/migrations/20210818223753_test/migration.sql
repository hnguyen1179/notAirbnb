/*
  Warnings:

  - Made the column `description` on table `Host` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Host" ALTER COLUMN "description" SET NOT NULL;
