-- CreateTable
CREATE TABLE "student_address" (
    "id" TEXT NOT NULL,
    "address_street" TEXT,
    "address_number" TEXT,
    "address_complement" TEXT,
    "address_neighborhood" TEXT,
    "address_city" TEXT,
    "address_state" TEXT,
    "address_zip" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "student_address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_address" ADD CONSTRAINT "student_address_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
