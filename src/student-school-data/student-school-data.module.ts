import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentSchoolDataService } from './student-school-data.service';
import { StudentSchoolDataController } from './student-school-data.controller';
@Module({
  imports: [DatabaseModule],
  providers: [StudentSchoolDataService],
  controllers: [StudentSchoolDataController],
  exports: [StudentSchoolDataService],
})
export class StudentSchoolDataModule {}
