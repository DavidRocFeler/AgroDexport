/*
  Warnings:

  - You are about to drop the `ProductStockChange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_detail_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_detail_products" DROP CONSTRAINT "order_detail_products_company_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_detail_products" DROP CONSTRAINT "order_detail_products_order_details_id_fkey";

-- DropTable
DROP TABLE "ProductStockChange";

-- DropTable
DROP TABLE "order_detail_products";

-- CreateTable
CREATE TABLE "product_stock_changes" (
    "order_product_stock_id" TEXT NOT NULL,
    "order_details_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "product_stock_changes_pkey" PRIMARY KEY ("order_product_stock_id")
);

-- CreateTable
CREATE TABLE "product_stock_order_detail_on_company_product" (
    "id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,
    "order_product_stock_id" TEXT NOT NULL,

    CONSTRAINT "product_stock_order_detail_on_company_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_order_detail_on_company_product_company_produ_key" ON "product_stock_order_detail_on_company_product"("company_product_id", "order_product_stock_id");

-- AddForeignKey
ALTER TABLE "product_stock_changes" ADD CONSTRAINT "product_stock_changes_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" ADD CONSTRAINT "product_stock_order_detail_on_company_product_company_prod_fkey" FOREIGN KEY ("company_product_id") REFERENCES "company_products"("company_product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" ADD CONSTRAINT "product_stock_order_detail_on_company_product_order_produc_fkey" FOREIGN KEY ("order_product_stock_id") REFERENCES "product_stock_changes"("order_product_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
