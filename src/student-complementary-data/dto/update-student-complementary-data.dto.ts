import { StudentComplementaryDataEntity } from '../student-complementary-data.entity';
import { PickType } from '@nestjs/swagger';

export class StudentComplementaryDataUpdateDto extends PickType(
  StudentComplementaryDataEntity,
  ['likeMoreInProject', 'dream', 'health', 'healthProblemsOrAllergies'],
) {}
