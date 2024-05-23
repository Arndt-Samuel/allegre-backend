/*
  Warnings:

  - The values [NAO_ALFABETIZADA,E_F_COMPLETO,E_F_INCOMPLETO,E_M_COMPLETO,E_M_INCOMPLETO] on the enum `EducationLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ClothingSize" AS ENUM ('2', '4', '6', '8', '10', '12', 'PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG');

-- AlterEnum
BEGIN;
CREATE TYPE "EducationLevel_new" AS ENUM ('Não alfabetizada', 'E.F. COMPLETO', 'E.F. INCOMPLETO', 'E.M. COMPLETO', 'E.M. INCOMPLETO', 'SUPERIOR');
ALTER TABLE "student_responsible" ALTER COLUMN "education_level" TYPE "EducationLevel_new" USING ("education_level"::text::"EducationLevel_new");
ALTER TYPE "EducationLevel" RENAME TO "EducationLevel_old";
ALTER TYPE "EducationLevel_new" RENAME TO "EducationLevel";
DROP TYPE "EducationLevel_old";
COMMIT;

-- CreateTable
CREATE TABLE "student_status" (
    "id" TEXT NOT NULL,
    "familyIncome" TEXT NOT NULL,
    "familyScholarship" BOOLEAN,
    "numberOfAdultsInTheFamily" TEXT NOT NULL,
    "numberOfChildrenInTheFamily" TEXT NOT NULL,
    "perCapitaIncome" TEXT,
    "collegeEducatedFamilyMembers" TEXT NOT NULL,
    "benefitsReceived" TEXT,
    "computerAndDigitalEquipment" TEXT,
    "clothingSize" "ClothingSize",
    "shoeSize" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "student_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
