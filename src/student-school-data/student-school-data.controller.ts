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
import { StudentSchoolDataService } from './student-school-data.service';
import { StudentSchoolDataCreateDto, StudentSchoolDataUpdateDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentSchoolDataEntity } from './student-school-data.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('student-school-data')
@Controller('student-school-data')
@UseGuards(AuthGuard, RolesGuard)
export class StudentSchoolDataController {
  constructor(private studentSchoolDataService: StudentSchoolDataService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List school data of student' })
  @ApiResponse({
    status: 200,
    description: 'School data of student returned',
    type: [StudentSchoolDataEntity],
    isArray: true,
  })
  async listAllStudentSchoolData(
    @Request()
    req,
    @Param('id') studentId: string,
  ): Promise<StudentSchoolDataEntity[]> {
    return this.studentSchoolDataService.list({ studentId });
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new school data of student' })
  @ApiResponse({
    status: 200,
    description: 'Created new school data of student',
    type: StudentSchoolDataEntity,
  })
  async create(
    @Request()
    req,
    @Body()
    data: StudentSchoolDataCreateDto,
  ): Promise<StudentSchoolDataEntity> {
    return this.studentSchoolDataService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete school data of student' })
  @ApiResponse({
    status: 200,
    description: 'School data of student deleted',
    type: StudentSchoolDataEntity,
  })
  async delete(
    @Request()
    req,
    @Param('id') studentSchoolDataId: string,
  ): Promise<StudentSchoolDataEntity> {
    return this.studentSchoolDataService.delete(studentSchoolDataId);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Put('/:id')
  @ApiOperation({ summary: 'Update school data of student' })
  @ApiResponse({
    status: 200,
    description: 'School data of student updated',
    type: StudentSchoolDataEntity,
  })
  async update(
    @Request()
    req,
    @Param('id') studentSchoolDataId: string,
    @Body()
    data: StudentSchoolDataUpdateDto,
  ): Promise<StudentSchoolDataEntity> {
    return this.studentSchoolDataService.update(studentSchoolDataId, data);
  }
}
