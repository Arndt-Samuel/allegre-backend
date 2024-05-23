import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student';
import { ClassModule } from './class';
import { StudentClassesModule } from './student-classes';
import { StudentCommentsModule } from './student-comments/student-comments.module';
import { ClassAttendanceModule } from './class-attendance/class-attendance.module';
import { StudentDocumentsModule } from './student-documents';
import { StudentResponsibleModule } from './student-responsible';
import { StudentSchoolDataModule } from './student-school-data';
@Module({
  imports: [
    OrganizationModule,
    UserModule,
    AuthModule,
    StudentModule,
    ClassModule,
    StudentClassesModule,
    StudentCommentsModule,
    ClassAttendanceModule,
    StudentDocumentsModule,
    StudentResponsibleModule,
    StudentSchoolDataModule,
  ],
})
export class AppModule {}
