import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentResponsibleEntity } from './student-responsible.entity';
import {
  StudentResponsibleCreateDto,
  StudentResponsibleUpdateDto,
} from './dto';

@Injectable()
export class StudentResponsibleService {
  constructor(private readonly prisma: PrismaService) {}

  async list(data: { studentId: string }): Promise<StudentResponsibleEntity[]> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentResponsible.findMany({
      where: data,
    });
  }

  async create(
    data: StudentResponsibleCreateDto,
  ): Promise<StudentResponsibleEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentResponsible.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentResponsibleUpdateDto,
  ): Promise<StudentResponsibleEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentResponsible.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentResponsible.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentResponsibleEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentResponsible.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentResponsible.delete({
      where: {
        id,
      },
    });
  }
}
