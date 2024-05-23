import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentComplementaryData as StudentComplementaryDataModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';

export class StudentComplementaryDataEntity
  implements StudentComplementaryDataModel
{
  @ApiPropertyOptional({
    description: 'UUID generated',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Student UUID',
  })
  @IsUUID()
  studentId: string;

  @ApiPropertyOptional({
    description: 'Student like more in project',
  })
  @IsOptional()
  @IsString()
  likeMoreInProject: string;

  @ApiPropertyOptional({
    description: 'Student dream',
  })
  @IsOptional()
  @IsString()
  dream: string;

  @ApiPropertyOptional({
    description: 'Student health',
  })
  @IsOptional()
  @IsString()
  health: string;

  @ApiPropertyOptional({
    description: 'Student health problems or allergies',
  })
  @IsOptional()
  @IsString()
  healthProblemsOrAllergies: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;
}
