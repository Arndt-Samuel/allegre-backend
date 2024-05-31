import { ClassAttendanceEntity } from '../class-attendance.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateStudentAttendanceDto } from './create-student-attendance.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ClassAttendanceCreateDto extends PickType(ClassAttendanceEntity, [
  'classId',
]) {
  @ApiProperty({
    description: 'List of student attendances',
    type: [CreateStudentAttendanceDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateStudentAttendanceDto)
  students: CreateStudentAttendanceDto[];
}
