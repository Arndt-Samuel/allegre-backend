import { StudentSchoolDataEntity } from '../student-school-data.entity';
import { PickType } from '@nestjs/swagger';

export class StudentSchoolDataUpdateDto extends PickType(
  StudentSchoolDataEntity,
  ['SchoolName', 'SchoolGrade', 'FavoriteSchoolSubject', 'SchoolObservations'],
) {}
