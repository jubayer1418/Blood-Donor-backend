/*
  Warnings:

  - You are about to drop the column `dateNeeded` on the `request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "request" DROP COLUMN "dateNeeded",
ADD COLUMN     "time" TEXT,
ALTER COLUMN "reason" DROP NOT NULL;
