import { StudentsDocumentsEntity } from '../student-documents.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class StudentDocumentsUpdateDto extends PickType(
  StudentsDocumentsEntity,
  ['studentId'],
) {
  @ApiPropertyOptional({
    description: 'Title',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    description: 'Document',
  })
  @IsUrl()
  @IsOptional()
  document: string;
}
