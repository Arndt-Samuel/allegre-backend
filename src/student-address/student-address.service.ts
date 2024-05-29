import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudentAddressEntity } from './student-address.entity';
import { FindAddressService } from 'src/find-address';
import {
  StudentAddressCreateDto,
  StudentAddressUpdateDto,
  StudentAddressFindDto,
} from './dto';
import { FindAllResponse } from 'src/shared/types/find-all.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentAddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findAddressService: FindAddressService,
  ) {}

  async list(
    params: StudentAddressFindDto,
  ): Promise<FindAllResponse<StudentAddressEntity>> {
    const where = {
      id: params.id || undefined,
      studentId: params.studentId || undefined,
      address_street: params.address_street
        ? {
            contains: params.address_street,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      address_neighborhood: params.address_neighborhood
        ? {
            contains: params.address_neighborhood,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      address_city: params.address_city
        ? {
            contains: params.address_city,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      address_state: params.address_state
        ? {
            contains: params.address_state,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.studentAddress.count({ where }),
      this.prisma.studentAddress.findMany({
        where: where,
        take: Number(params.take) || 20,
        skip: Number(params.skip) || 0,
      }),
    ]);

    return { total, data };
  }

  async create(data: StudentAddressCreateDto): Promise<StudentAddressEntity> {
    if (!data || !data.studentId) {
      throw new BadRequestException('Student ID is required');
    }

    if (!data.address_zip) {
      throw new BadRequestException('ZIP is required');
    }

    const address = await this.findAddressService.getAddressByZip(
      data.address_zip,
    );
    data.address_street = address.logradouro;
    data.address_city = address.localidade;
    data.address_state = address.uf;
    data.address_neighborhood = address.bairro;

    return this.prisma.studentAddress.create({
      data: {
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: StudentAddressUpdateDto,
  ): Promise<StudentAddressEntity> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingRecord = await this.prisma.studentAddress.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    if (data.address_zip) {
      const address = await this.findAddressService.getAddressByZip(
        data.address_zip,
      );
      data.address_street = address.logradouro;
      data.address_city = address.localidade;
      data.address_state = address.uf;
      data.address_neighborhood = address.bairro;
    }

    return this.prisma.studentAddress.update({
      where: { id },
      data,
    });
  }
}
