import { StudentResponsibleEntity } from '../student-responsible.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Gender, Ethnicity, EducationLevel } from '@prisma/client';

export class StudentResponsibleUpdateDto extends PickType(
  StudentResponsibleEntity,
  [
    'rg',
    'cpf',
    'nis',
    'gender',
    'ethnicity',
    'dateOfBirth',
    'birth_state',
    'born_city',
    'current_job',
    'primary_phone',
    'secondary_phone',
    'education_level',
  ],
) {
  @ApiPropertyOptional({
    description: 'Responsible full Name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Responsible Gender',
    enum: Gender,
  })
  @IsEnum(Gender, {})
  @IsOptional()
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Responsible Ethnicity',
    enum: Ethnicity,
  })
  @IsEnum(Ethnicity, {})
  @IsOptional()
  ethnicity: Ethnicity;

  @ApiPropertyOptional({
    description: 'Responsible Date of Birth',
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @ApiPropertyOptional({
    description: 'Responsible Education Level',
    enum: EducationLevel,
  })
  @IsEnum(EducationLevel, {})
  @IsOptional()
  education_level: EducationLevel;
}
