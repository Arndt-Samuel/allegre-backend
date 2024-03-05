import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentsDocumentsEntity } from './student-documents.entity';
import { StudentDocumentsUpdateDto, StudentsDocumentsCreateDto } from './dto';

@Injectable()
export class StudentDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: StudentsDocumentsCreateDto,
    userId: string,
  ): Promise<StudentsDocumentsEntity> {
    return this.prisma.studentsDocuments.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async find(data: {
    studentId: string;
    userId?: string;
  }): Promise<StudentsDocumentsEntity[]> {
    return this.prisma.studentsDocuments.findMany({
      where: data,
    });
  }

  async update(
    id: string,
    data: StudentDocumentsUpdateDto,
  ): Promise<StudentsDocumentsEntity> {
    return this.prisma.studentsDocuments.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentsDocumentsEntity> {
    return this.prisma.studentsDocuments.delete({
      where: {
        id,
      },
    });
  }
}
