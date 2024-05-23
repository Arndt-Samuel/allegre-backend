import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentSchoolData as StudentSchoolDataModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';

export class StudentSchoolDataEntity implements StudentSchoolDataModel {
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
    description: 'Student school name',
  })
  @IsOptional()
  @IsString()
  SchoolName: string;

  @ApiPropertyOptional({
    description: 'Student school grade',
  })
  @IsOptional()
  @IsString()
  SchoolGrade: string;

  @ApiPropertyOptional({
    description: 'Favorite student school subject',
  })
  @IsOptional()
  @IsString()
  FavoriteSchoolSubject: string;

  @ApiPropertyOptional({
    description: 'Student school observations',
  })
  @IsOptional()
  @IsString()
  SchoolObservations: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;
}
