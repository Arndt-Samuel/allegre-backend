import { ClassAttendanceEntity } from '../class-attendance.entity';
import { PickType } from '@nestjs/swagger';

export class CreateStudentAttendanceDto extends PickType(
  ClassAttendanceEntity,
  ['studentId', 'isPresent', 'observations'],
) {}
