import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentsDocumentsEntity } from './student-documents.entity';
import {
  StudentDocumentsUpdateDto,
  StudentsDocumentsCreateDto,
  StudentDocumentsFindDto,
} from './dto';
import { FindAllResponse } from 'src/shared/types/find-all.types';
import { Prisma } from '@prisma/client';

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

  async list(
    params: StudentDocumentsFindDto,
  ): Promise<FindAllResponse<StudentsDocumentsEntity>> {
    const where = {
      id: params.id || undefined,
      studentId: params.studentId || undefined,
      document: params.document
        ? { contains: params.document, mode: Prisma.QueryMode.insensitive }
        : undefined,
      title: params.title
        ? { contains: params.title, mode: Prisma.QueryMode.insensitive }
        : undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.studentsDocuments.count({ where }),
      this.prisma.studentsDocuments.findMany({
        where: where,
        take: Number(params.take) || 20,
        skip: Number(params.skip) || 0,
      }),
    ]);

    return { total, data };
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
