import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentStatusService } from './student-status.service';
import { StudentStatusController } from './student-status.controller';
@Module({
  imports: [DatabaseModule],
  providers: [StudentStatusService],
  controllers: [StudentStatusController],
  exports: [StudentStatusService],
})
export class StudentStatusModule {}
