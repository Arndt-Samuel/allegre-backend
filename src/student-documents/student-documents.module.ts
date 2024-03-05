import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentDocumentsController } from './student-documents.controller';
import { StudentDocumentsService } from './student-documents.service';

@Module({
  imports: [DatabaseModule],
  providers: [StudentDocumentsService],
  controllers: [StudentDocumentsController],
  exports: [StudentDocumentsService],
})
export class StudentDocumentsModule {}
