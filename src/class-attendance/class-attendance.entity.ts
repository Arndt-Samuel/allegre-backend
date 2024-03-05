import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassAttendance as ClassAttendanceModel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ClassEntity } from 'src/class/class.entity';
import { StudentEntity } from 'src/student/student.entity';

export class ClassAttendanceEntity implements ClassAttendanceModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Class UUID',
  })
  @IsUUID()
  classId: string;

  @ApiProperty({
    description: 'Student UUID',
  })
  @IsUUID()
  studentId: string;

  @ApiProperty({
    description: 'Date of class',
  })
  @IsDate()
  dateOfClass: Date;

  @ApiProperty({
    description: 'Student presence',
  })
  @IsBoolean()
  isPresent: boolean;

  @ApiPropertyOptional({
    description: 'Observations of class attendance',
  })
  @IsString()
  @IsOptional()
  observations: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;

  @ApiPropertyOptional({
    description: 'ClassEntity Object',
    type: () => ClassEntity,
  })
  @IsOptional()
  @Type(() => ClassEntity)
  class?: ClassEntity;
}
