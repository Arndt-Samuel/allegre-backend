import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StudentResponsibleService } from './student-responsible.service';
import {
  StudentResponsibleCreateDto,
  StudentResponsibleUpdateDto,
} from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentResponsibleEntity } from './student-responsible.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('student-responsible')
@Controller('student-responsible')
@UseGuards(AuthGuard, RolesGuard)
export class StudentResponsibleController {
  constructor(private studentResponsibleService: StudentResponsibleService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List responsible of student' })
  @ApiResponse({
    status: 200,
    description: 'Responsible of students returned',
    type: [StudentResponsibleEntity],
    isArray: true,
  })
  async listAllStudentResponsible(
    @Request()
    req,
    @Param('id') studentId: string,
  ): Promise<StudentResponsibleEntity[]> {
    return this.studentResponsibleService.list({ studentId });
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new responsible of student' })
  @ApiResponse({
    status: 200,
    description: 'Created new responsible of student',
    type: StudentResponsibleEntity,
  })
  async create(
    @Request()
    req,
    @Body()
    data: StudentResponsibleCreateDto,
  ): Promise<StudentResponsibleEntity> {
    return this.studentResponsibleService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete responsible of student' })
  @ApiResponse({
    status: 200,
    description: 'Responsible of student deleted',
    type: StudentResponsibleEntity,
  })
  async delete(
    @Request()
    req,
    @Param('id') studentResponsibleId: string,
  ): Promise<StudentResponsibleEntity> {
    return this.studentResponsibleService.delete(studentResponsibleId);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Put('/:id')
  @ApiOperation({ summary: 'Update responsible of student' })
  @ApiResponse({
    status: 200,
    description: 'responsible of student updated',
    type: StudentResponsibleEntity,
  })
  async update(
    @Request()
    req,
    @Param('id') studentResponsibleId: string,
    @Body()
    data: StudentResponsibleUpdateDto,
  ): Promise<StudentResponsibleEntity> {
    return this.studentResponsibleService.update(studentResponsibleId, data);
  }
}
