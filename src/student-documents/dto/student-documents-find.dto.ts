import { StudentsDocumentsEntity } from '../student-documents.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class StudentDocumentsFindDto extends IntersectionType(
  PaginationDto,
  PartialType(
    PickType(StudentsDocumentsEntity, [
      'id',
      'studentId',
      'document',
      'title',
      'userId',
    ]),
  ),
) {}
