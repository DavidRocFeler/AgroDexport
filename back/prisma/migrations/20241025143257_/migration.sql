-- CreateTable
CREATE TABLE "ProductStockChange" (
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductStockChange_order_id_key" ON "ProductStockChange"("order_id");
