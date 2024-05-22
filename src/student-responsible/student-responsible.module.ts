import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentResponsibleService } from './student-responsible.service';
import { StudentResponsibleController } from './student-responsible.controller';
@Module({
  imports: [DatabaseModule],
  providers: [StudentResponsibleService],
  controllers: [StudentResponsibleController],
  exports: [StudentResponsibleService],
})
export class StudentResponsibleModule {}
