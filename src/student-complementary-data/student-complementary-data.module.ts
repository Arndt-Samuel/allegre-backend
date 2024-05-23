import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentComplementaryDataService } from './student-complementary-data.service';
import { StudentComplementaryDataController } from './student-complementary-data.controller';
@Module({
  imports: [DatabaseModule],
  providers: [StudentComplementaryDataService],
  controllers: [StudentComplementaryDataController],
  exports: [StudentComplementaryDataService],
})
export class StudentComplementaryDataModule {}
