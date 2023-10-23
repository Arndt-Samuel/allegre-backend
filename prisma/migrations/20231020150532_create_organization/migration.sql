/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Organization";

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);
