import { ClassAttendanceEntity } from '../class-attendance.entity';
import { PickType } from '@nestjs/swagger';

export class ClassAttendanceCreateDto extends PickType(ClassAttendanceEntity, [
  'classId',
  'studentId',
  'isPresent',
  'observations',
]) {}
