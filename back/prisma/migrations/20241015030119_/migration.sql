/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credential_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isOlder` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "credential_id" TEXT,
ADD COLUMN     "isOlder" BOOLEAN NOT NULL,
ADD COLUMN     "profile_picture" TEXT,
ALTER COLUMN "nDni" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL;

-- CreateTable
CREATE TABLE "credentials" (
    "credential_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("credential_id")
);

-- CreateTable
CREATE TABLE "companies" (
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_name" VARCHAR(50) NOT NULL,
    "tax_identification_number" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "website" TEXT,
    "account_paypal" TEXT,
    "company_description" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "commissions_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_products_id" TEXT NOT NULL,
    "commision_percentage" DOUBLE PRECISION NOT NULL,
    "commision_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("commissions_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "discount_id" TEXT,
    "orders_id" TEXT,
    "supply_chain_id" TEXT,
    "task_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notification_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "task_status" TEXT NOT NULL,
    "task_message" TEXT NOT NULL,
    "executed_date" TIMESTAMP(3),
    "nextRun_date" TIMESTAMP(3),
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "company_products" (
    "company_product_id" TEXT NOT NULL,
    "commission_id" TEXT,
    "farmer_id" TEXT,
    "company_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "order_details_id" TEXT,
    "discount_id" TEXT,
    "company_product_name" TEXT NOT NULL,
    "company_product_description" TEXT,
    "stock" INTEGER NOT NULL,
    "minimum_order" INTEGER NOT NULL DEFAULT 5,
    "origin" TEXT NOT NULL,
    "company_price_x_kg" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "harvest_date" TIMESTAMP(3) NOT NULL,
    "company_product_img" TEXT NOT NULL,
    "calories" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,

    CONSTRAINT "company_products_pkey" PRIMARY KEY ("company_product_id")
);

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "shipping_address_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "order_id" TEXT,
    "contact_name" TEXT NOT NULL,
    "contact_lastname" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "delivery_hours" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("shipping_address_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" TEXT NOT NULL,
    "name_category" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "discount_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "code_status" TEXT NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "farmer_certifications" (
    "farmer_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "phytosanitary_certificate" BOOLEAN NOT NULL,
    "agricultural_producer_cert" BOOLEAN NOT NULL,
    "organic_certification" BOOLEAN,
    "quality_certificate" BOOLEAN NOT NULL,
    "certificate_of_origin" BOOLEAN NOT NULL,

    CONSTRAINT "farmer_certifications_pkey" PRIMARY KEY ("farmer_id")
);

-- CreateTable
CREATE TABLE "product_discounts" (
    "discount_id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,

    CONSTRAINT "product_discounts_pkey" PRIMARY KEY ("discount_id","company_product_id")
);

-- CreateTable
CREATE TABLE "product_certifications" (
    "farmer_id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,

    CONSTRAINT "product_certifications_pkey" PRIMARY KEY ("farmer_id","company_product_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL,
    "id_company_sell" TEXT NOT NULL,
    "id_payments" TEXT,
    "notifications_id" TEXT,
    "shipping_address_id" TEXT,
    "order_details_id" TEXT NOT NULL,
    "suppy_chain_id" TEXT,
    "order_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "order_details_id" TEXT NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "order_status" TEXT NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("order_details_id")
);

-- CreateTable
CREATE TABLE "order_detail_products" (
    "order_details_id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,

    CONSTRAINT "order_detail_products_pkey" PRIMARY KEY ("order_details_id","company_product_id")
);

-- CreateTable
CREATE TABLE "supply_chain" (
    "supply_chain_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "updateBy_company_id" TEXT NOT NULL,
    "update_date" TIMESTAMP(3) NOT NULL,
    "shipping_status" TEXT NOT NULL,

    CONSTRAINT "supply_chain_pkey" PRIMARY KEY ("supply_chain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "commissions_user_id_key" ON "commissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "orders_shipping_address_id_key" ON "orders"("shipping_address_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_details_id_key" ON "orders"("order_details_id");

-- CreateIndex
CREATE UNIQUE INDEX "supply_chain_order_id_key" ON "supply_chain"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "supply_chain_updateBy_company_id_key" ON "supply_chain"("updateBy_company_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_credential_id_key" ON "users"("credential_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("credential_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("discount_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_supply_chain_id_fkey" FOREIGN KEY ("supply_chain_id") REFERENCES "supply_chain"("supply_chain_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmer_certifications" ADD CONSTRAINT "farmer_certifications_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("discount_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_company_product_id_fkey" FOREIGN KEY ("company_product_id") REFERENCES "company_products"("company_product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_certifications" ADD CONSTRAINT "product_certifications_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmer_certifications"("farmer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_certifications" ADD CONSTRAINT "product_certifications_company_product_id_fkey" FOREIGN KEY ("company_product_id") REFERENCES "company_products"("company_product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_sell_fkey" FOREIGN KEY ("id_company_sell") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("shipping_address_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail_products" ADD CONSTRAINT "order_detail_products_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail_products" ADD CONSTRAINT "order_detail_products_company_product_id_fkey" FOREIGN KEY ("company_product_id") REFERENCES "company_products"("company_product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply_chain" ADD CONSTRAINT "supply_chain_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply_chain" ADD CONSTRAINT "supply_chain_updateBy_company_id_fkey" FOREIGN KEY ("updateBy_company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
