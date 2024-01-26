import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentCommentsController } from './student-comments.controller';
import { StudentCommentsService } from './student-comments.service';
@Module({
  imports: [DatabaseModule],
  providers: [StudentCommentsService],
  controllers: [StudentCommentsController],
  exports: [StudentCommentsService],
})
export class StudentCommentsModule {}
