import { StudentEntity } from '../student.entity';
import { PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Gender, Ethnicity } from '@prisma/client';

export class StudentUpdateDto extends PickType(StudentEntity, [
  'rg',
  'cpf',
  'nis',
  'gender',
  'ethnicity',
  'dateOfBirth',
  'primary_phone',
  'secondary_phone',
]) {
  @ApiPropertyOptional({
    description: 'Student full Name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Student Gender',
    enum: Gender,
  })
  @IsEnum(Gender, {})
  @IsOptional()
  gender: Gender;

  @ApiPropertyOptional({
    description: 'Student Ethnicity',
    enum: Ethnicity,
  })
  @IsEnum(Ethnicity, {})
  @IsOptional()
  ethnicity: Ethnicity;

  @ApiPropertyOptional({
    description: 'Student Date of Birth',
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;
}
