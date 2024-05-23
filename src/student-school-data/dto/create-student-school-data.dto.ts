import { StudentSchoolDataEntity } from '../student-school-data.entity';
import { PickType } from '@nestjs/swagger';

export class StudentSchoolDataCreateDto extends PickType(
  StudentSchoolDataEntity,
  [
    'studentId',
    'SchoolName',
    'SchoolGrade',
    'FavoriteSchoolSubject',
    'SchoolObservations',
  ],
) {}
