import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { StudentAddressService } from './student-address.service';
import {
  StudentAddressCreateDto,
  StudentAddressUpdateDto,
  StudentAddressFindDto,
} from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentAddressEntity } from './student-address.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { FindAllResponse } from 'src/shared/types/find-all.types';

@ApiTags('student-address')
@Controller('student-address')
@UseGuards(AuthGuard, RolesGuard)
export class StudentAddressController {
  constructor(private studentAddressService: StudentAddressService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/')
  @ApiOperation({ summary: 'List address of student' })
  @ApiResponse({
    status: 200,
    description: 'Address of student returned',
    type: [StudentAddressEntity],
    isArray: true,
  })
  async listAll(
    @Request()
    req,
    @Query() params: StudentAddressFindDto,
  ): Promise<FindAllResponse<StudentAddressEntity>> {
    return this.studentAddressService.list(params);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Post('/')
  @ApiOperation({ summary: 'Create new address of student' })
  @ApiResponse({
    status: 200,
    description: 'Created new address of student',
    type: StudentAddressEntity,
  })
  async create(
    @Request()
    req,
    @Body()
    data: StudentAddressCreateDto,
  ): Promise<StudentAddressEntity> {
    return this.studentAddressService.create(data);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Put('/:id')
  @ApiOperation({ summary: 'Update address of student' })
  @ApiResponse({
    status: 200,
    description: 'Address of student updated',
    type: StudentAddressEntity,
  })
  async update(
    @Request()
    req,
    @Param('id') studentAddressId: string,
    @Body()
    data: StudentAddressUpdateDto,
  ): Promise<StudentAddressEntity> {
    return this.studentAddressService.update(studentAddressId, data);
  }
}
