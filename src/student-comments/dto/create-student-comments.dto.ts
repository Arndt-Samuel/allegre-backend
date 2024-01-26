import { StudentCommentsEntity } from '../student-comments.entity';
import { PickType } from '@nestjs/swagger';

export class StudentCommentsCreateDto extends PickType(StudentCommentsEntity, [
  'comment',
  'studentId',
]) {}
