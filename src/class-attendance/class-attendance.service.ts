import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ClassAttendanceEntity } from './class-attendance.entity';
import { ClassAttendanceCreateDto, ClassAttendanceUpdateDto } from './dto';

@Injectable()
export class ClassAttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ClassAttendanceCreateDto): Promise<ClassAttendanceEntity> {
    return this.prisma.classAttendance.create({
      data,
    });
  }

  async getByDateAndPresentStudents(
    date: Date,
  ): Promise<{ observations: string; name: string; isPresent: boolean }[]> {
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
  ): Promise<ClassAttendanceEntity> {
    return this.prisma.classAttendance.update({
      where: {
        id,
      },
      data,
    });
  }
}
