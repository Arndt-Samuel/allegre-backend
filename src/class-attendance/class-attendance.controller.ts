import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClassAttendanceCreateDto, ClassAttendanceUpdateDto } from './dto';
import { ClassAttendanceService } from './class-attendance.service';
import { ClassAttendanceEntity } from './class-attendance.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('class_attendance')
export class ClassAttendanceController {
  constructor(private classAttendanceService: ClassAttendanceService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new class attendance' })
  @ApiResponse({
    status: 200,
    description: 'Created new class attendance',
    type: ClassAttendanceEntity,
  })
  async createClassAttendance(
    @Request()
    req,
    @Body() data: ClassAttendanceCreateDto,
  ) {
    return this.classAttendanceService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/')
  @ApiOperation({ summary: 'List class attendance' })
  @ApiResponse({
    status: 200,
    description: 'Class attendance returned',
    type: [ClassAttendanceEntity],
    isArray: true,
  })
  async getClassAttendanceByDate(@Query('date') date: string) {
    const searchDate = new Date(date);

    return this.classAttendanceService.getByDateAndPresentStudents(searchDate);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update attendance' })
  @ApiResponse({
    status: 200,
    description: 'Attendance updated',
    type: ClassAttendanceEntity,
  })
  async update(
    @Param('id') StudentAttendanceId: string,
    @Body()
    data: ClassAttendanceUpdateDto,
  ): Promise<ClassAttendanceEntity> {
    return this.classAttendanceService.update(StudentAttendanceId, data);
  }
}
