import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentAddress as StudentAddressModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';

export class StudentAddressEntity implements StudentAddressModel {
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
    description: 'Student street address',
  })
  @IsOptional()
  @IsString()
  address_street: string;

  @ApiPropertyOptional({
    description: 'Student number address',
  })
  @IsOptional()
  @IsString()
  address_number: string;

  @ApiPropertyOptional({
    description: 'Student complement address',
  })
  @IsOptional()
  @IsString()
  address_complement: string;

  @ApiPropertyOptional({
    description: 'Student neighborhood address',
  })
  @IsOptional()
  @IsString()
  address_neighborhood: string;

  @ApiPropertyOptional({
    description: 'Student city address',
  })
  @IsOptional()
  @IsString()
  address_city: string;

  @ApiPropertyOptional({
    description: 'Student state address',
  })
  @IsOptional()
  @IsString()
  address_state: string;

  @ApiProperty({
    description: 'Student zip address',
  })
  @IsString()
  address_zip: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;
}
