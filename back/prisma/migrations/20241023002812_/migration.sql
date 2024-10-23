/*
  Warnings:

  - A unique constraint covering the columns `[company_name]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "companies_company_name_key" ON "companies"("company_name");
