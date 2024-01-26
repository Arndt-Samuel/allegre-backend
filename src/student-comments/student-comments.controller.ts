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
import { StudentCommentsCreateDto, StudentCommentsUpdateDto } from './dto';
import { StudentCommentsService } from './student-comments.service';
import { StudentCommentsEntity } from './student-comments.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('student_comments')
export class StudentCommentsController {
  constructor(private studentCommentsService: StudentCommentsService) {}

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ORG_ADMIN,
    UserRole.ORG_MEMBER,
    UserRole.ORG_TEACHER,
  )
  @Get('/:id')
  @ApiOperation({ summary: 'List all student comments' })
  @ApiResponse({
    status: 200,
    description: 'All comments student returned',
    type: StudentCommentsEntity,
    isArray: true,
  })
  async getComments(@Param('id') studentId: string) {
    return this.studentCommentsService.find({ studentId });
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_MEMBER, UserRole.ORG_TEACHER)
  @Post()
  @ApiOperation({ summary: 'Create new student comment' })
  @ApiResponse({
    status: 200,
    description: 'Created new comment student',
    type: StudentCommentsEntity,
  })
  async createStudentComment(
    @Body() data: StudentCommentsCreateDto,
    @LoggedUser() { id }: UserEntity,
  ) {
    return this.studentCommentsService.create(data, id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment updated',
    type: StudentCommentsEntity,
  })
  async update(
    @Param('id') commentId: string,
    @Body()
    data: StudentCommentsUpdateDto,
  ): Promise<StudentCommentsEntity> {
    return this.studentCommentsService.update(commentId, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted',
    type: StudentCommentsEntity,
  })
  async delete(@Param('id') commentId: string): Promise<StudentCommentsEntity> {
    return this.studentCommentsService.delete(commentId);
  }
}
