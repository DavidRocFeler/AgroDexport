/*
  Warnings:

  - You are about to drop the `product_certifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_certifications" DROP CONSTRAINT "product_certifications_company_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_certifications" DROP CONSTRAINT "product_certifications_farmer_id_fkey";

-- AlterTable
ALTER TABLE "company_products" ADD COLUMN     "farmer_id" TEXT;

-- DropTable
DROP TABLE "product_certifications";

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmer_certifications"("farmer_id") ON DELETE SET NULL ON UPDATE CASCADE;
