-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('NAO_ALFABETIZADA', 'E_F_COMPLETO', 'E_F_INCOMPLETO', 'E_M_COMPLETO', 'E_M_INCOMPLETO', 'SUPERIOR');

-- CreateTable
CREATE TABLE "student_responsible" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT,
    "cpf" TEXT,
    "nis" TEXT,
    "gender" "Gender" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "birth_state" TEXT,
    "born_city" TEXT,
    "current_job" TEXT,
    "primary_phone" TEXT,
    "secondary_phone" TEXT,
    "education_level" "EducationLevel" NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "student_responsible_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_responsible" ADD CONSTRAINT "student_responsible_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
