import { ValidateNested } from 'class-validator';
import { ClassAttendanceEntity } from '../class-attendance.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateStudentAttendanceDto } from './update-student-attendance.dto';

export class ClassAttendanceUpdateDto extends PickType(ClassAttendanceEntity, [
  'classId',
]) {
  @ApiProperty({
    description: 'List of student attendances',
    type: [UpdateStudentAttendanceDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateStudentAttendanceDto)
  students: UpdateStudentAttendanceDto[];
}
