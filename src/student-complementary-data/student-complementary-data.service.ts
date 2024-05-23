import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentComplementaryDataEntity } from './student-complementary-data.entity';
import {
  StudentComplementaryDataCreateDto,
  StudentComplementaryDataUpdateDto,
} from './dto';

@Injectable()
export class StudentComplementaryDataService {
  constructor(private readonly prisma: PrismaService) {}

  async list(data: {
    studentId: string;
  }): Promise<StudentComplementaryDataEntity[]> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentComplementaryData.findMany({
      where: data,
    });
  }

  async create(
    data: StudentComplementaryDataCreateDto,
  ): Promise<StudentComplementaryDataEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentComplementaryData.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentComplementaryDataUpdateDto,
  ): Promise<StudentComplementaryDataEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord =
      await this.prisma.studentComplementaryData.findUnique({
        where: { id },
      });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentComplementaryData.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentComplementaryDataEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord =
      await this.prisma.studentComplementaryData.findUnique({
        where: { id },
      });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentComplementaryData.delete({
      where: {
        id,
      },
    });
  }
}
