import { StudentsDocumentsEntity } from '../student-documents.entity';
import { PickType } from '@nestjs/swagger';

export class StudentsDocumentsCreateDto extends PickType(
  StudentsDocumentsEntity,
  ['studentId', 'title', 'document'],
) {}
