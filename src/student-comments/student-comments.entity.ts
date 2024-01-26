import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentComments as StudentCommentsModel } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';

export class StudentCommentsEntity implements StudentCommentsModel {
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
    description: 'Student Comment',
  })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Comments Date of created',
  })
  @IsDate()
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Comments Date of updated',
  })
  @IsDate()
  updatedAt: Date;

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
