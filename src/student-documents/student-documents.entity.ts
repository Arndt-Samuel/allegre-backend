import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentsDocuments as StudentsDocumentsModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { StudentEntity } from 'src/student/student.entity';

export class StudentsDocumentsEntity implements StudentsDocumentsModel {
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
    description: 'User UUID',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Document Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Document Image',
  })
  @IsUrl()
  document: string;

  @ApiPropertyOptional({
    description: 'StudentEntity Object',
    type: () => StudentEntity,
  })
  @IsOptional()
  @Type(() => StudentEntity)
  student?: StudentEntity;

  @ApiPropertyOptional({
    description: 'UserEntity Object',
    type: () => UserEntity,
  })
  @IsOptional()
  @Type(() => UserEntity)
  user?: UserEntity;
}
