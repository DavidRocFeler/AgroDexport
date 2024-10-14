-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "user_lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nDni" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "country" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
