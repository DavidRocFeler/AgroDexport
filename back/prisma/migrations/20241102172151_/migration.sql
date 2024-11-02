/*
  Warnings:

  - You are about to drop the column `iva` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `discount` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logistic_cost` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tariff` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "iva",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "logistic_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tariff" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN DEFAULT true;
