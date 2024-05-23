import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentSchoolDataEntity } from './student-school-data.entity';
import { StudentSchoolDataCreateDto, StudentSchoolDataUpdateDto } from './dto';

@Injectable()
export class StudentSchoolDataService {
  constructor(private readonly prisma: PrismaService) {}

  async list(data: { studentId: string }): Promise<StudentSchoolDataEntity[]> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentSchoolData.findMany({
      where: data,
    });
  }

  async create(
    data: StudentSchoolDataCreateDto,
  ): Promise<StudentSchoolDataEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentSchoolData.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentSchoolDataUpdateDto,
  ): Promise<StudentSchoolDataEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentSchoolData.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentSchoolData.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentSchoolDataEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentSchoolData.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentSchoolData.delete({
      where: {
        id,
      },
    });
  }
}
