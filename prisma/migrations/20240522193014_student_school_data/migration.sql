-- CreateTable
CREATE TABLE "student_school_data" (
    "id" TEXT NOT NULL,
    "SchoolName" TEXT,
    "SchoolGrade" TEXT,
    "FavoriteSchoolSubject" TEXT,
    "SchoolObservations" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "student_school_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_school_data" ADD CONSTRAINT "student_school_data_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
