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
import { StudentComplementaryDataService } from './student-complementary-data.service';
import {
  StudentComplementaryDataCreateDto,
  StudentComplementaryDataUpdateDto,
} from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentComplementaryDataEntity } from './student-complementary-data.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('student-complementary-data')
@Controller('student-complementary-data')
@UseGuards(AuthGuard, RolesGuard)
export class StudentComplementaryDataController {
  constructor(
    private studentComplementaryDataService: StudentComplementaryDataService,
  ) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List complementary data of student' })
  @ApiResponse({
    status: 200,
    description: 'Complementary data of student returned',
    type: [StudentComplementaryDataEntity],
    isArray: true,
  })
  async listAllStudentComplementaryData(
    @Request()
    req,
    @Param('id') studentId: string,
  ): Promise<StudentComplementaryDataEntity[]> {
    return this.studentComplementaryDataService.list({ studentId });
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new complementary data of student' })
  @ApiResponse({
    status: 200,
    description: 'Created new complementary data of student',
    type: StudentComplementaryDataEntity,
  })
  async create(
    @Request()
    req,
    @Body()
    data: StudentComplementaryDataCreateDto,
  ): Promise<StudentComplementaryDataEntity> {
    return this.studentComplementaryDataService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete complementary data of student' })
  @ApiResponse({
    status: 200,
    description: 'Complementary data of student deleted',
    type: StudentComplementaryDataEntity,
  })
  async delete(
    @Request()
    req,
    @Param('id') studentComplementaryDataId: string,
  ): Promise<StudentComplementaryDataEntity> {
    return this.studentComplementaryDataService.delete(
      studentComplementaryDataId,
    );
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Put('/:id')
  @ApiOperation({ summary: 'Update complementary data of student' })
  @ApiResponse({
    status: 200,
    description: 'Complementary data of student updated',
    type: StudentComplementaryDataEntity,
  })
  async update(
    @Request()
    req,
    @Param('id') studentComplementaryDataId: string,
    @Body()
    data: StudentComplementaryDataUpdateDto,
  ): Promise<StudentComplementaryDataEntity> {
    return this.studentComplementaryDataService.update(
      studentComplementaryDataId,
      data,
    );
  }
}
