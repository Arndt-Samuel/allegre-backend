import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { LoggedUser } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { StudentsDocumentsCreateDto, StudentDocumentsUpdateDto } from './dto';
import { StudentsDocumentsEntity } from './student-documents.entity';
import { StudentDocumentsService } from './student-documents.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('student_documents')
export class StudentDocumentsController {
  constructor(private studentDocumentsService: StudentDocumentsService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER, UserRole.ORG_TEACHER)
  @Post()
  @ApiOperation({ summary: 'Create new student document' })
  @ApiResponse({
    status: 200,
    description: 'Created new document student',
    type: StudentsDocumentsEntity,
  })
  async createStudentComment(
    @Body() data: StudentsDocumentsCreateDto,
    @LoggedUser() { id }: UserEntity,
  ) {
    return this.studentDocumentsService.create(data, id);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List all student documents' })
  @ApiResponse({
    status: 200,
    description: 'All documents student returned',
    type: StudentsDocumentsEntity,
    isArray: true,
  })
  async getComments(@Param('id') studentId: string) {
    return this.studentDocumentsService.find({ studentId });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update Document' })
  @ApiResponse({
    status: 200,
    description: 'Document updated',
    type: StudentsDocumentsEntity,
  })
  async update(
    @Param('id') documentId: string,
    @Body()
    data: StudentDocumentsUpdateDto,
  ): Promise<StudentsDocumentsEntity> {
    return this.studentDocumentsService.update(documentId, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete document' })
  @ApiResponse({
    status: 200,
    description: 'Document deleted',
    type: StudentsDocumentsEntity,
  })
  async delete(
    @Param('id') documentId: string,
  ): Promise<StudentsDocumentsEntity> {
    return this.studentDocumentsService.delete(documentId);
  }
}
