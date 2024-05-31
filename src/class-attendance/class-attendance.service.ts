import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ClassAttendanceEntity } from './class-attendance.entity';
import { ClassAttendanceCreateDto, ClassAttendanceUpdateDto } from './dto';

@Injectable()
export class ClassAttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: ClassAttendanceCreateDto,
  ): Promise<ClassAttendanceEntity[]> {
    const attendances: ClassAttendanceEntity[] = [];
    const classExists = await this.prisma.class.findUnique({
      where: { id: data.classId },
    });

    if (!classExists) {
      throw new NotFoundException(`Class with ID ${data.classId} not found`);
    }

    for (const studentAttendance of data.students) {
      const studentExists = await this.prisma.student.findUnique({
        where: { id: studentAttendance.studentId },
      });

      if (!studentExists) {
        throw new NotFoundException(
          `Student with ID ${studentAttendance.studentId} not found`,
        );
      }

      const attendance = await this.prisma.classAttendance.create({
        data: {
          classId: data.classId,
          studentId: studentAttendance.studentId,
          isPresent: studentAttendance.isPresent,
          observations: studentAttendance.observations,
          dateOfClass: new Date(),
        },
      });
      attendances.push(attendance);
    }

    return attendances;
  }

  async getByDateAndPresentStudents(
    date: Date,
  ): Promise<{ observations: string; name: string; isPresent: boolean }[]> {
    if (!date) {
      throw new Error('Date is required');
    }

    const attendances = await this.prisma.classAttendance.findMany({
      where: {
        dateOfClass: date,
        isPresent: true,
      },
      select: {
        student: {
          select: {
            name: true,
          },
        },
        isPresent: true,
        dateOfClass: true,
        observations: true,
      },
    });

    return attendances.map((attendance) => ({
      name: attendance.student.name,
      isPresent: attendance.isPresent,
      observations: attendance.observations,
      dateOfClass: attendance.dateOfClass.toISOString().split('T')[0],
    }));
  }

  async update(
    id: string,
    data: ClassAttendanceUpdateDto,
  ): Promise<ClassAttendanceEntity[]> {
    const attendances: ClassAttendanceEntity[] = [];

    if (!id) {
      throw new Error('ID is required');
    }

    for (const studentAttendance of data.students) {
      const attendance = await this.prisma.classAttendance.update({
        where: {
          id,
        },
        data: {
          classId: data.classId,
          studentId: studentAttendance.studentId,
          isPresent: studentAttendance.isPresent,
          observations: studentAttendance.observations,
        },
      });
      attendances.push(attendance);
    }

    return attendances;
  }
}
