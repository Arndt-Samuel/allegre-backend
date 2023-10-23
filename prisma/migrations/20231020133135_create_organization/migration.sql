-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
