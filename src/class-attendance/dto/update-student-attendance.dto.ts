import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ClassAttendanceEntity } from '../class-attendance.entity';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class UpdateStudentAttendanceDto extends PickType(
  ClassAttendanceEntity,
  ['studentId'],
) {
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
