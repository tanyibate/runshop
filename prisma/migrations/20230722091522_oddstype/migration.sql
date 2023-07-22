/*
  Warnings:

  - Added the required column `odds_type` to the `Odd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Odd" ADD COLUMN     "odds_type" INTEGER NOT NULL;
