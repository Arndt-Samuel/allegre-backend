import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentStatusEntity } from './student-status.entity';
import { StudentStatusCreateDto, StudentStatusUpdateDto } from './dto';

@Injectable()
export class StudentStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async list(data: { studentId: string }): Promise<StudentStatusEntity[]> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.prisma.studentStatus.findMany({
      where: data,
    });
  }

  async calculatePerCapitaIncome(
    familyIncome: string,
    numberOfAdultsInTheFamily: string,
    numberOfChildrenInTheFamily: string,
  ): Promise<string> {
    const income = parseFloat(familyIncome);
    const adults = parseInt(numberOfAdultsInTheFamily, 10);
    const children = parseInt(numberOfChildrenInTheFamily, 10);

    if (isNaN(income) || income < 0) {
      throw new BadRequestException(
        'Family income must be a non-negative number',
      );
    }
    if (isNaN(adults) || !Number.isInteger(adults) || adults < 0) {
      throw new BadRequestException(
        'Number of adults must be a non-negative integer',
      );
    }
    if (isNaN(children) || !Number.isInteger(children) || children < 0) {
      throw new BadRequestException(
        'Number of children must be a non-negative integer',
      );
    }
    if (adults + children === 0) {
      throw new BadRequestException('Family size must be greater than zero');
    }

    const perCapitaIncome = income / (adults + children);
    return perCapitaIncome.toString();
  }

  async create(data: StudentStatusCreateDto): Promise<StudentStatusEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    data.perCapitaIncome = await this.calculatePerCapitaIncome(
      data.familyIncome,
      data.numberOfAdultsInTheFamily,
      data.numberOfChildrenInTheFamily,
    );

    return this.prisma.studentStatus.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentStatusUpdateDto,
  ): Promise<StudentStatusEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentStatus.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    const {
      familyIncome = existingRecord.familyIncome,
      numberOfAdultsInTheFamily = existingRecord.numberOfAdultsInTheFamily,
      numberOfChildrenInTheFamily = existingRecord.numberOfChildrenInTheFamily,
    } = data;

    data.perCapitaIncome = await this.calculatePerCapitaIncome(
      familyIncome,
      numberOfAdultsInTheFamily,
      numberOfChildrenInTheFamily,
    );

    return this.prisma.studentStatus.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<StudentStatusEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentStatus.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.studentStatus.delete({
      where: {
        id,
      },
    });
  }
}
