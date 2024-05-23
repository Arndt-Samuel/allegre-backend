import { StudentComplementaryDataEntity } from '../student-complementary-data.entity';
import { PickType } from '@nestjs/swagger';

export class StudentComplementaryDataCreateDto extends PickType(
  StudentComplementaryDataEntity,
  [
    'studentId',
    'likeMoreInProject',
    'dream',
    'health',
    'healthProblemsOrAllergies',
  ],
) {}
