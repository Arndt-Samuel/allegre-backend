import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  StudentResponsible as StudentResponsibleModel,
  EducationLevel,
  Gender,
  Ethnicity,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';

export class StudentResponsibleEntity implements StudentResponsibleModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Responsible full Name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Responsible brazilian RG',
  })
  @IsOptional()
  @IsString()
  rg: string;

  @ApiPropertyOptional({
    description: 'Responsible brazilian CPF',
  })
  @IsOptional()
  @IsString()
  cpf: string;

  @ApiPropertyOptional({
    description: 'Responsible brazilian NIS',
  })
  @IsOptional()
  @IsString()
  nis: string;

  @ApiProperty({
    description: 'Responsible Gender',
    enum: Gender,
  })
  @IsEnum(Gender, {})
  gender: Gender;

  @ApiProperty({
    description: 'Responsible Ethnicity',
    enum: Ethnicity,
  })
  @IsEnum(Ethnicity, {})
  ethnicity: Ethnicity;

  @ApiProperty({
    description: 'Responsible Date of Birth',
  })
  @IsDateString()
  dateOfBirth: Date;

  @ApiPropertyOptional({
    description: 'Responsible Birth State',
  })
  @IsString()
  @IsOptional()
  birth_state: string;

  @ApiPropertyOptional({
    description: 'Responsible Born City',
  })
  @IsString()
  @IsOptional()
  born_city: string;

  @ApiPropertyOptional({
    description: 'Responsible Current Job',
  })
  @IsString()
  @IsOptional()
  current_job: string;

  @ApiPropertyOptional({
    description: 'Responsible primary contact phone ',
  })
  @IsString()
  @IsOptional()
  primary_phone: string;

  @ApiPropertyOptional({
    description: 'Responsible secondary contact phone ',
  })
  @IsString()
  @IsOptional()
  secondary_phone: string;

  @ApiProperty({
    description: 'Responsible Education Level',
    enum: EducationLevel,
  })
  @IsEnum(EducationLevel, {})
  education_level: EducationLevel;

  @ApiProperty({
    description: 'Responsible Student UUID',
  })
  @IsUUID()
  studentId: string;

  @ApiPropertyOptional({
    description: 'Responsible Organization Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;
}
