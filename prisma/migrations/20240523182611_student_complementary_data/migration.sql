-- CreateTable
CREATE TABLE "student_complementary_data" (
    "id" TEXT NOT NULL,
    "likeMoreInProject" TEXT,
    "dream" TEXT,
    "health" TEXT,
    "healthProblemsOrAllergies" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "student_complementary_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_complementary_data" ADD CONSTRAINT "student_complementary_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
