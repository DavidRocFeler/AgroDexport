/*
  Warnings:

  - You are about to drop the `product_stock_changes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `quality_certificate` on table `farmer_certifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `certificate_of_origin` on table `farmer_certifications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_stock_changes" DROP CONSTRAINT "product_stock_changes_order_details_id_fkey";

-- DropForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" DROP CONSTRAINT "product_stock_order_detail_on_company_product_order_produc_fkey";

-- AlterTable
ALTER TABLE "farmer_certifications" ALTER COLUMN "quality_certificate" SET NOT NULL,
ALTER COLUMN "certificate_of_origin" SET NOT NULL;

-- DropTable
DROP TABLE "product_stock_changes";

-- CreateTable
CREATE TABLE "product_stock_order_detail" (
    "order_product_stock_id" TEXT NOT NULL,
    "order_details_id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "product_stock_order_detail_pkey" PRIMARY KEY ("order_product_stock_id")
);

-- AddForeignKey
ALTER TABLE "product_stock_order_detail" ADD CONSTRAINT "product_stock_order_detail_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" ADD CONSTRAINT "product_stock_order_detail_on_company_product_order_produc_fkey" FOREIGN KEY ("order_product_stock_id") REFERENCES "product_stock_order_detail"("order_product_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
