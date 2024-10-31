-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "user_lastname" VARCHAR(50) NOT NULL,
    "nDni" INTEGER,
    "birthday" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "profile_picture" TEXT,
    "isOlder" BOOLEAN NOT NULL,
    "role_id" TEXT NOT NULL,
    "credential_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "credential_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("credential_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" TEXT NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,
    "role_description" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "permission_id" TEXT NOT NULL,
    "permission_name" VARCHAR(50) NOT NULL,
    "permission_description" VARCHAR(255) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "roles_permissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "roles_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
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
    "company_logo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "commissions_id" TEXT NOT NULL,
    "user_id" TEXT,
    "commision_percentage" DOUBLE PRECISION NOT NULL,
    "commision_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("commissions_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" TEXT,
    "supply_chain_id" TEXT,
    "task_id" TEXT,
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
    "company_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "order_details_id" TEXT,
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
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "farmer_id" TEXT,

    CONSTRAINT "company_products_pkey" PRIMARY KEY ("company_product_id")
);

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "shipping_address_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_lastname" TEXT NOT NULL,
    "contact_phone" TEXT,
    "contact_email" TEXT NOT NULL,
    "delivery_hours" TEXT,
    "address" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("shipping_address_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" TEXT NOT NULL,
    "name_category" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "farmer_certifications" (
    "farmer_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "phytosanitary_certificate" TEXT,
    "agricultural_producer_cert" TEXT,
    "organic_certification" TEXT,
    "quality_certificate" TEXT,
    "certificate_of_origin" TEXT,

    CONSTRAINT "farmer_certifications_pkey" PRIMARY KEY ("farmer_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL,
    "id_company_sell" TEXT NOT NULL,
    "shipping_address_id" TEXT,
    "order_details_id" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "payment_id" TEXT,
    "id_company_buy" TEXT NOT NULL,
    "supply_chain_id" TEXT,
    "account_paypal" TEXT,

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
CREATE TABLE "product_stock_order_detail" (
    "order_product_stock_id" TEXT NOT NULL,
    "order_details_id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "product_stock_order_detail_pkey" PRIMARY KEY ("order_product_stock_id")
);

-- CreateTable
CREATE TABLE "product_stock_order_detail_on_company_product" (
    "id" TEXT NOT NULL,
    "company_product_id" TEXT NOT NULL,
    "order_product_stock_id" TEXT NOT NULL,

    CONSTRAINT "product_stock_order_detail_on_company_product_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount_decimal" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "payment_provider" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "payer_id" TEXT NOT NULL,
    "description" TEXT,
    "payment_method" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nDni_key" ON "users"("nDni");

-- CreateIndex
CREATE UNIQUE INDEX "users_credential_id_key" ON "users"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_name_key" ON "companies"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "commissions_user_id_key" ON "commissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_category_key" ON "categories"("name_category");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_details_id_key" ON "orders"("order_details_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_stock_order_detail_on_company_product_company_produ_key" ON "product_stock_order_detail_on_company_product"("company_product_id", "order_product_stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "supply_chain_order_id_key" ON "supply_chain"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "supply_chain_updateBy_company_id_key" ON "supply_chain"("updateBy_company_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_company_id_key" ON "payments"("company_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("credential_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_supply_chain_id_fkey" FOREIGN KEY ("supply_chain_id") REFERENCES "supply_chain"("supply_chain_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_products" ADD CONSTRAINT "company_products_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmer_certifications"("farmer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmer_certifications" ADD CONSTRAINT "farmer_certifications_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_buy_fkey" FOREIGN KEY ("id_company_buy") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_company_sell_fkey" FOREIGN KEY ("id_company_sell") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("shipping_address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_supply_chain_id_fkey" FOREIGN KEY ("supply_chain_id") REFERENCES "supply_chain"("supply_chain_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail" ADD CONSTRAINT "product_stock_order_detail_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "order_details"("order_details_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" ADD CONSTRAINT "product_stock_order_detail_on_company_product_company_prod_fkey" FOREIGN KEY ("company_product_id") REFERENCES "company_products"("company_product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock_order_detail_on_company_product" ADD CONSTRAINT "product_stock_order_detail_on_company_product_order_produc_fkey" FOREIGN KEY ("order_product_stock_id") REFERENCES "product_stock_order_detail"("order_product_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply_chain" ADD CONSTRAINT "supply_chain_updateBy_company_id_fkey" FOREIGN KEY ("updateBy_company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
