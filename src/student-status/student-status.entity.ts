import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  StudentStatus as StudentStatusModel,
  ClothingSize,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';

export class StudentStatusEntity implements StudentStatusModel {
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

  @ApiProperty({
    description: 'Student family income',
  })
  @IsString()
  familyIncome: string;

  @ApiPropertyOptional({
    description: 'Student family scholarship',
  })
  @IsOptional()
  @IsBoolean()
  familyScholarship: boolean;

  @ApiProperty({
    description: 'The number of adult the student has is in the family',
  })
  @IsString()
  numberOfAdultsInTheFamily: string;

  @ApiProperty({
    description: 'The number of children the student has is in the family',
  })
  @IsString()
  numberOfChildrenInTheFamily: string;

  @ApiPropertyOptional({
    description: 'Student per capita income',
  })
  @IsOptional()
  @IsString()
  perCapitaIncome: string;

  @ApiProperty({
    description: 'Number of family members of the student with college',
  })
  @IsString()
  collegeEducatedFamilyMembers: string;

  @ApiPropertyOptional({
    description: 'Benefits received by the student s family',
  })
  @IsOptional()
  @IsString()
  benefitsReceived: string;

  @ApiPropertyOptional({
    description: 'Computer and digital equipment that the student s family has',
  })
  @IsOptional()
  @IsString()
  computerAndDigitalEquipment: string;

  @ApiProperty({
    description: 'Student clothing size',
    enum: ClothingSize,
  })
  @IsEnum(ClothingSize, {})
  clothingSize: ClothingSize;

  @ApiPropertyOptional({
    description: 'Student shoe size',
  })
  @IsOptional()
  @IsString()
  shoeSize: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;
}
