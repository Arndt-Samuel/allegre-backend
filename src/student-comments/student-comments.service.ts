import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentCommentsEntity } from './student-comments.entity';
import { StudentCommentsCreateDto, StudentCommentsUpdateDto } from './dto';

@Injectable()
export class StudentCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: StudentCommentsCreateDto,
    userId: string,
  ): Promise<StudentCommentsEntity> {
    return this.prisma.studentComments.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async find(data: {
    studentId: string;
    userId?: string;
  }): Promise<StudentCommentsEntity[]> {
    return this.prisma.studentComments.findMany({
      where: data,
    });
  }

  async update(
    id: string,
    data: StudentCommentsUpdateDto,
  ): Promise<StudentCommentsEntity> {
    return this.prisma.studentComments.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentCommentsEntity> {
    return this.prisma.studentComments.delete({
      where: {
        id,
      },
    });
  }
}
