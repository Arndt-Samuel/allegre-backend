import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClassAttendanceService } from './class-attendance.service';
import { ClassAttendanceController } from './class-attendance.controller';
@Module({
  imports: [DatabaseModule],
  providers: [ClassAttendanceService],
  controllers: [ClassAttendanceController],
  exports: [ClassAttendanceService],
})
export class ClassAttendanceModule {}
