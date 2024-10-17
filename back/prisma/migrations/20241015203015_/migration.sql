/*
  Warnings:

  - Added the required column `company_logo` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "company_logo" TEXT NOT NULL;
