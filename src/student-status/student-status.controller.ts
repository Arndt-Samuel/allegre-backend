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
import { StudentStatusService } from './student-status.service';
import { StudentStatusCreateDto, StudentStatusUpdateDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { StudentStatusEntity } from './student-status.entity';

@ApiTags('student-status')
@Controller('student-status')
@UseGuards(AuthGuard, RolesGuard)
export class StudentStatusController {
  constructor(private studentStatusService: StudentStatusService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List status of student' })
  @ApiResponse({
    status: 200,
    description: 'Status of student returned',
    type: [StudentStatusEntity],
    isArray: true,
  })
  async listStatusOfStudent(
    @Request()
    req,
    @Param('id') studentId: string,
  ): Promise<StudentStatusEntity[]> {
    return this.studentStatusService.list({ studentId });
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new status of student' })
  @ApiResponse({
    status: 200,
    description: 'Created new status of student',
    type: StudentStatusEntity,
  })
  async create(
    @Request()
    req,
    @Body()
    data: StudentStatusCreateDto,
  ): Promise<StudentStatusEntity> {
    return this.studentStatusService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete status of student' })
  @ApiResponse({
    status: 200,
    description: 'Status of student deleted',
    type: StudentStatusEntity,
  })
  async delete(
    @Request()
    req,
    @Param('id') studentStatusId: string,
  ): Promise<StudentStatusEntity> {
    return this.studentStatusService.delete(studentStatusId);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Put('/:id')
  @ApiOperation({ summary: 'Update Status of student' })
  @ApiResponse({
    status: 200,
    description: 'Status of student updated',
    type: StudentStatusEntity,
  })
  async update(
    @Request()
    req,
    @Param('id') studentStatusId: string,
    @Body()
    data: StudentStatusUpdateDto,
  ): Promise<StudentStatusEntity> {
    return this.studentStatusService.update(studentStatusId, data);
  }
}
