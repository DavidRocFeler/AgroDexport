/*
  Warnings:

  - You are about to drop the column `discount_id` on the `company_products` table. All the data in the column will be lost.
  - You are about to drop the column `farmer_id` on the `company_products` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the `discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_discounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_company_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "product_discounts" DROP CONSTRAINT "product_discounts_company_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_discounts" DROP CONSTRAINT "product_discounts_discount_id_fkey";

-- AlterTable
ALTER TABLE "company_products" DROP COLUMN "discount_id",
DROP COLUMN "farmer_id",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "discount_id";

-- DropTable
DROP TABLE "discounts";

-- DropTable
DROP TABLE "product_discounts";
