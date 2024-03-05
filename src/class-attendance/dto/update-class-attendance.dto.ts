import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ClassAttendanceEntity } from '../class-attendance.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class ClassAttendanceUpdateDto extends PickType(ClassAttendanceEntity, [
  'classId',
  'studentId',
]) {
  @ApiPropertyOptional({
    description: 'Observations',
  })
  @IsString()
  @IsOptional()
  observations: string;

  @ApiPropertyOptional({
    description: 'isPresent',
  })
  @IsBoolean()
  @IsOptional()
  isPresent: boolean;
}
