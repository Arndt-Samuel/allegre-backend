import { StudentCommentsEntity } from '../student-comments.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class StudentCommentsUpdateDto extends PickType(StudentCommentsEntity, [
  'studentId',
]) {
  @ApiPropertyOptional({
    description: 'Comment',
  })
  @IsString()
  @IsOptional()
  comment: string;
}
